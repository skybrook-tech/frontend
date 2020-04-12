/** @jsx jsx */
import { useState } from "react";
import { jsx } from "@emotion/core";
import { Message } from "semantic-ui-react";
import createFormBuilder from "@core/utils/formig/create-form-builder";
import Form from "./form";

function RadioGroup({ options = [], FieldComponents, ...rest }) {
  return (
    <Form.Field>
      <label>{rest.label}</label>

      <Form.Group className="formig radio-group">
        {options.map(({ value, label }) => {
          return (
            <Form.Radio
              {...rest}
              id={`${rest.name}_${value}`}
              key={label}
              label={label}
              value={value}
              checked={value === rest.value}
              className="formig radio"
            />
          );
        })}
      </Form.Group>
    </Form.Field>
  );
}

Form.RadioGroup = RadioGroup;

Form.ButtonWrapper = ({ children }) => (
  <div className={`formig button-wrapper content extra`}>{children}</div>
);

const Select = props => {
  return <Form.Select fluid {...props} />;
};

Form.FieldWrapper = ({ children }) => (
  <div className={`formig field-wrapper content`}>{children}</div>
);

const PasswordInput = ({ ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Form.Input
      {...props}
      type={showPassword ? "text" : "password"}
      icon={{
        name: "eye",
        circular: true,
        link: true,
        onClick: togglePasswordVisibility
      }}
    />
  );
};

const Group = ({ children, label }) => (
  <div className="formig field-group">
    {label && <label className="label">{label}</label>}

    <Form.Group widths="equal">{children}</Form.Group>
  </div>
);

const FormComponents = {
  Form: ({ card, children, hasErrors, dispatch, raised, ...rest }) => {
    let className = rest.className;

    if (card) {
      className += " card";
    }

    if (raised) {
      className += " raised";
    }

    return (
      <Form {...rest} error={hasErrors} className={className}>
        {children}
      </Form>
    );
  },
  ...Form,
  Select,
  Group,
  Message,
  PasswordInput
};

const fieldPropMutator = ({ fieldProps, field, formik }) => {
  if (field.type !== "Select") {
    return fieldProps;
  }

  fieldProps.selection = true;

  const onChange = (e, semanticUI) => {
    if (semanticUI) {
      e.target.value = semanticUI.value;
      e.target = semanticUI;
    }

    formik.setFieldValue(field.name, e.target.value);
  };

  const onBlur = (e, semanticUI) => {
    if (semanticUI) {
      e.target.value = semanticUI.value;
    }

    fieldProps.onBlur(e);
  };

  return { ...fieldProps, onChange, onBlur };
};

export default createFormBuilder({ FormComponents, fieldPropMutator });
