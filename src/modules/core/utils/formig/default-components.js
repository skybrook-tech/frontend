/** @jsx jsx */
import { jsx, css } from "@emotion/core";

// formik  formig
const defaultFormStyles = css`
  .formig.form-wrapper {
    display: flex;
    flex-direction: column;
  }

  .formig.field-group {
    display: flex;
    flex-direction: column;

    & .label {
      margin-bottom: 1rem;
    }

    & .fields {
      display: flex;
    }
  }

  .field.formig {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    padding: 0 0.5rem;

    & label {
      margin-bottom: 0.5rem;
    }
  }

  .field.formig.radio,
  .field.formig.checkbox {
    flex-direction: row;
    align-items: center;

    & label {
      margin-bottom: 0;
      margin-left: 0.5rem;
    }
  }

  .formig.radio-group {
    display: flex;
    padding: 0 0.5rem;
  }

  .formig.buttons {
    display: flex;
    justify-content: flex-end;
    padding: 0 0.5rem;
    margin-top: 1.5rem;

    & .formig.button:not(:last-child) {
      margin-right: 0.5rem;
    }

    & .formig.button.delete {
      margin-right: auto;
    }
  }
`;

const labelPosition = className => {
  switch (className) {
    case "radio":
    case "checkbox":
      return "after";

    default:
      return "before";
  }
};

const withLabel = Component => props => {
  const position = labelPosition(props.className.split(" ")[1]);

  return (
    <div className={`formig field ${props.className}`}>
      {position === "before" && (
        <label className={props.className} htmlFor={props.name}>
          {props.label}
        </label>
      )}

      <Component {...props} />

      {position === "after" && (
        <label className={props.className} htmlFor={props.name}>
          {props.label}
        </label>
      )}
    </div>
  );
};

const Input = props => {
  return <input type="text" {...props} value={props.value} />;
};

const TextArea = props => <textarea {...props} />;

const Checkbox = props => (
  <input type="checkbox" {...props} value={props.value || false} />
);

const Radio = withLabel(props => (
  <input type="radio" {...props} value={props.value} />
));

function RadioGroup({ options = [], FieldComponents, ...rest }) {
  console.log(this);
  return (
    <FieldComponents.Group className="formig radio-group">
      <label>{rest.label}</label>

      {options.map(({ value, label }) => (
        <FieldComponents.Radio
          {...rest}
          key={label}
          label={label}
          checked={value === rest.value}
          value={value}
          className="formig radio"
        />
      ))}
    </FieldComponents.Group>
  );
}

const Select = ({ options = [], ...rest }) => {
  return (
    <select {...rest} value={rest.value}>
      {options.map(({ value, label }) => (
        <option key={label} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

const Form = ({ children, loading, ...rest }) => (
  <form {...rest} css={defaultFormStyles}>
    {children}
  </form>
);

const Group = ({ children, label, className }) => (
  <div className="formig field-group">
    {label && <label className="label">{label}</label>}

    <div className={`fields ${className}`}>{children}</div>
  </div>
);

const ButtonGroup = ({ children }) => (
  <div className="formig buttons">{children}</div>
);

const Button = ({ children, ...rest }) => (
  <button type="button" {...rest}>
    {children}
  </button>
);

Form.RadioGroup = RadioGroup;
Form.Checkbox = Checkbox;
Form.Input = Input;
Form.TextArea = TextArea;
Form.Select = Select;
Form.Form = Form;
Form.Group = Group;
Form.ButtonGroup = ButtonGroup;
Form.Button = Button;
Form.Radio = Radio;

export default Form;
