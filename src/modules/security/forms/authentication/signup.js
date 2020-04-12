/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import { withRouter } from "react-router-dom";
import SemanticFormBuilder from "@core/ui/forms/formig";
import { Rating, Label } from "semantic-ui-react";
import isRequired from "@core/utils/validations/is-required";
import globalsCache from "@core/globals-cache";

const formStyles = css`
  &&& {
    width: 300px;

    & button.submit {
      width: 100%;
    }
  }
`;

const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

var mediumRegex = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
);

const validateEmail = value => {
  let error;

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]/i.test(value)) {
    error = "Invalid email address";
  }

  return error;
};

const validatePassword = value => {
  let error;

  if (!mediumRegex.test(value)) {
    error =
      "Password must contain at least one number and be at least six characters long.";
  }

  return error;
};

const getHP = (password = "") => {
  if (strongRegex.test(password)) {
    return { number: 5, text: "OVERLORD" };
  }

  if (mediumRegex.test(password) && password.length > 8) {
    return { number: 4, text: "STRONG" };
  }

  if (mediumRegex.test(password)) {
    return { number: 3, text: "YOU GOT THIS" };
  }

  if (!mediumRegex.test(password) && password.length >= 6) {
    return { number: 2, text: "WEAK" };
  }

  if (password.length >= 3 && password.length <= 6) {
    return { number: 1, text: "EXHAUSTED" };
  }

  return { number: 0, text: "(x__X )" };
};

const formConfig = {
  form: {
    props: { className: "card raised" },
    header: "Try Mockend for free",
    submitButtonConfig: { text: "Create free account", className: "primary" },
    onSubmit: async (values, formik) => {
      const { dispatch } = formik.props;
      const { actions } = globalsCache.get("Security");

      await dispatch(actions.onSignup(values, formik));
    },
    validate: values => {
      const { email, password } = values;
      const errors = {};
      const emailErrors = validateEmail(email);
      const passwordErrors = validatePassword(password);

      if (emailErrors) {
        errors.email = emailErrors;
      }

      if (passwordErrors) {
        errors.password = passwordErrors;
      }

      const requiredFieldErrors = isRequired(values, ["email", "password"]);

      return { ...errors, ...requiredFieldErrors };
    },
    name: "signuppage-authForm"
  },
  fields: [
    {
      type: "Input",
      name: "email",
      props: { placeholder: "Enter your email" }
    },
    {
      type: "Input",
      name: "fullname",
      props: { placeholder: "Enter your full name" }
    },
    {
      name: "password",
      Component: ({ FormComponents, ...props }) => {
        const HP = getHP(props.value);

        return (
          <>
            {props.value && (
              <Label
                fluid
                css={{
                  "&&&": {
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }
                }}
                image
              >
                <span>
                  <span css={{ paddingRight: "5px" }}>HP:</span>
                  <span>{HP.text}</span>
                </span>

                <Rating
                  icon="heart"
                  rating={HP.number}
                  maxRating={5}
                  disabled
                />
              </Label>
            )}

            <FormComponents.PasswordInput {...props} />
          </>
        );
      },
      props: {
        placeholder: "Create password",
        type: "password"
      }
    }
  ]
};

const SignupForm = props => {
  const { location, history, match, dispatch, config } = props;

  return (
    <SemanticFormBuilder
      css={formStyles}
      formConfig={formConfig}
      location={location}
      history={history}
      match={match}
      dispatch={dispatch}
      config={config}
    />
  );
};

export default withRouter(SignupForm);
