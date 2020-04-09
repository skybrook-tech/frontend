/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Form from "../../../core/ui/forms/form";
import { withRouter } from "react-router-dom";
import SemanticFormBuilder from "../../../core/ui/forms/formig";

const formStyles = css`
  &&& {
    width: 300px;

    & button.submit {
      width: 100%;
    }
  }
`;

const formConfig = {
  form: {
    header: "Log in to MockEnd",
    submitButtonConfig: { text: "Login", className: "primary" },
    onSubmit: async (values, formik) => {
      const { dispatch, config } = formik.props;

      await dispatch(config.actions.onLogin(values, formik));
    },
    validate: values => {
      return Form.validations.isRequired(values, ["email", "password"]);
    },
    name: "loginPage-authForm"
  },
  fields: [
    {
      type: "Input",
      name: "email",
      props: {
        placeholder: "Enter your email"
      }
    },
    {
      type: "PasswordInput",
      name: "password",
      props: {
        placeholder: "Enter your password",
        type: "password"
      }
    }
  ]
};

const LoginForm = props => {
  return (
    <SemanticFormBuilder
      css={formStyles}
      raised
      card
      {...props}
      formConfig={formConfig}
    />
  );
};

export default withRouter(LoginForm);
