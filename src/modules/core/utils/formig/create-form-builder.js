/** @jsx jsx */
import { jsx, css, Global } from "@emotion/core";
import { useFormik } from "formik";
import merge from "lodash/merge";
import get from "lodash/get";

const defaultStyles = css`
  .formig.button-wrapper {
    display: flex;
    margin-top: 1rem;
    & .delete {
      margin-right: auto;
    }
  }

  .formig.field-group .label {
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .formig.field-wrapper,
  .formig.field-group,
  .formig.field-group-fields {
    display: flex;
    flex-direction: column;
  }

  .ui.header {
    padding: 0.75rem 0;
  }
`;

const DefaultGroup = ({ children, label, className }) => (
  <div className="formig field-group">
    {label && <label className="label">{label}</label>}

    <div className={`formig field-group-fields`}>{children}</div>
  </div>
);

const DefaultFieldWrapper = ({ children }) => (
  <div className="formig field-wrapper">{children}</div>
);

const DefaultButtonWrapper = ({ children }) => (
  <div className="formig button-wrapper">{children}</div>
);

const defaultFormConfig = {
  form: { name: "form" }
};

const defaultComponents = {
  FieldWrapper: DefaultFieldWrapper,
  ButtonWrapper: DefaultButtonWrapper
};

const mapPropsToValues = ({ formConfig, data = {} }) => {
  const values = {};

  const getValuesFromFields = ({ fields, name }) => {
    if (fields) {
      fields.map(getValuesFromFields);
    } else {
      values[name] = data[name] || null;
    }
  };

  formConfig.fields.map(getValuesFromFields);

  return values;
};

const preventDefaultWrapper = handler => e => {
  e.preventDefault();
  handler();
};

const createFormBuilder = (config = {}) => {
  const {
    FormComponents: ConfigFormComponents = {},
    fieldPropMutator = fieldProps => fieldProps
  } = config;
  const FormComponents = merge({}, defaultComponents, ConfigFormComponents);
  const { Form, Button, Message } = FormComponents;

  const getFieldPropsWithErrors = (field, formik) => {
    const { name } = field;
    const { submitCount, touched, errors } = formik;
    const error = touched[name] || submitCount ? errors[name] : null;

    const fieldProps = formik.getFieldProps(name);

    return {
      name,
      id: name,
      ...fieldPropMutator({ fieldProps, field, formik }),
      error,
      value: fieldProps.value || ""
    };
  };

  const RenderFields = ({ fields, formik, formConfig }) => {
    return fields.map(fieldOrGroup => {
      const {
        Component,
        type = "FormigComponent",
        label,
        props,
        fields,
        name
      } = fieldOrGroup;

      if (type || Component) {
        const FieldComponent = Component || FormComponents[type];

        const FieldProps = {
          label,
          className: `formig ${type.toLowerCase()}`,
          "data-testid": `${formConfig.form.name}-${name}-${type}`,
          ...props,
          ...getFieldPropsWithErrors(fieldOrGroup, formik)
        };

        if (Component) {
          FieldProps.FormComponents = FormComponents;
        }

        return (
          <FieldComponent
            key={`${formConfig.form.name}-${name}-${type}`}
            {...FieldProps}
          />
        );
      }

      const GroupComponent = Component || FormComponents.Group || DefaultGroup;

      return (
        <GroupComponent key={name} label={label} {...props}>
          <RenderFields fields={fields} formik={formik} />
        </GroupComponent>
      );
    });
  };

  const createButtonConfig = ({
    defaultConfig,
    config = {},
    formik,
    props,
    handler,
    name
  }) => {
    const finalConfig = merge({}, { name, ...defaultConfig }, config);

    finalConfig.handler = preventDefaultWrapper((...args) => {
      formik.props = props;
      handler(formik);
    });

    return finalConfig;
  };

  const ButtonHandler = ({ buttonConfig, className }) => {
    const { handler, text } = buttonConfig;

    const ButtonComponent = get(buttonConfig, "Component", Button);

    return (
      <ButtonComponent
        data-testid={buttonConfig.name}
        onClick={handler}
        className={className}
      >
        {text}
      </ButtonComponent>
    );
  };

  const FormBuilder = props => {
    const { data, formConfig: FormConfig, className, ...rest } = props;

    const formConfig = merge(
      {},
      defaultFormConfig,
      { form: props },
      FormConfig
    );

    const {
      onReset,
      onSubmit,
      onDelete,
      onCancel,
      header,
      deleteButtonConfig,
      cancelButtonConfig,
      resetButtonConfig,
      submitButtonConfig
    } = formConfig.form;

    const formik = useFormik({
      initialValues: mapPropsToValues({ formConfig, data }),
      ...formConfig.form,
      onSubmit: (values, formik) => {
        formik.props = props;

        onSubmit.handler
          ? onSubmit.handler(values, formik)
          : onSubmit(values, formik);
      }
    });

    const { isSubmitting, handleSubmit, handleReset } = formik;

    const FieldWrapper =
      formConfig.form.FieldWrapper || FormComponents.FieldWrapper;
    const ButtonWrapper =
      formConfig.form.ButtonWrapper || FormComponents.ButtonWrapper;

    const hasErrors = !!Object.keys(formik.errors).length;

    return (
      <div className={className}>
        <Form
          onSubmit={handleSubmit}
          loading={isSubmitting}
          hasErrors={hasErrors}
          {...formConfig.form.props}
        >
          <Global styles={defaultStyles} />

          <FieldWrapper {...rest}>
            {header && (
              <div className="header ui secondary center">{header}</div>
            )}

            <RenderFields
              fields={formConfig.fields}
              formik={formik}
              formConfig={formConfig}
            />

            <Message
              error
              content={get(formik, "errors.response.message")}
              data-testid="loginPage-authForm-responseError"
            />
          </FieldWrapper>

          <ButtonWrapper {...rest}>
            {onDelete && (
              <ButtonHandler
                buttonConfig={createButtonConfig({
                  handler: onDelete,
                  config: deleteButtonConfig,
                  defaultConfig: { text: "Delete" },
                  formik,
                  props,
                  name: `${formConfig.form.name}-delete-button`
                })}
                className="formig button delete"
              />
            )}

            {onCancel && (
              <ButtonHandler
                buttonConfig={createButtonConfig({
                  handler: onCancel,
                  config: cancelButtonConfig,
                  defaultConfig: { text: "Cancel" },
                  formik,
                  props,
                  name: `${formConfig.form.name}-cancel-button`
                })}
                className="formig button cancel"
              />
            )}

            {onReset && (
              <ButtonHandler
                buttonConfig={createButtonConfig({
                  handler: handleReset,
                  config: resetButtonConfig,
                  defaultConfig: { text: "Reset" },
                  formik,
                  props,
                  name: `${formConfig.form.name}-reset-button`
                })}
                className="formig button reset"
              />
            )}

            {onSubmit && (
              <ButtonHandler
                buttonConfig={createButtonConfig({
                  handler: handleSubmit,
                  config: submitButtonConfig,
                  defaultConfig: { text: "Submit" },
                  formik,
                  props,
                  name: `${formConfig.form.name}-submit-button`
                })}
                className="formig button submit primary"
              />
            )}
          </ButtonWrapper>
        </Form>
      </div>
    );
  };

  FormBuilder.defaultProps = {
    formConfig: {}
  };

  return FormBuilder;
};

export default createFormBuilder;
