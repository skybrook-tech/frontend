/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Message, Rating, Label } from "semantic-ui-react";
import Card from "../../ui/card";
import Form from "../../ui/form";
import { withFormik } from "formik";
import { api } from "../../../config/api";
import get from "lodash/get";
import { Link, navigate } from "@reach/router";
import currentUser from "../../../utils/current-user";
import { getFieldPropsWithErrors } from "../../../utils/formik";
import isRequired from "../../../utils/validations/is-required";

const validateEmail = value => {
  let error;

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]/i.test(value)) {
    error = "Invalid email address";
  }

  return error;
};

const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

var mediumRegex = new RegExp(
  "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
);

const validatePassword = value => {
  let error;

  if (!mediumRegex.test(value)) {
    error =
      "Password must contain at least one number and be at least six characters long.";
  }

  return error;
};

const formConfig = {
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
  handleSubmit: async (values, { setFieldError }) => {
    try {
      const { data } = await api.mockend.post("users/register", values);

      currentUser.set({ token: data.token });
      const userId = currentUser.get("userDetails.id");

      navigate(`/u/${userId}`);
    } catch (error) {
      setFieldError("response", error.response.data.error);
    }
  }
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

const SignupForm = props => {
  const { handleSubmit, values, isSubmitting, errors } = props;

  const HP = getHP(values.password);

  return (
    <Form
      css={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "300px"
      }}
      error={errors.response}
      onSubmit={handleSubmit}
      loading={isSubmitting}
      data-testid="signupPage-authForm"
    >
      <Card raised fluid>
        <Card.Content>
          <Card.Header textAlign="center" color="secondary">
            Try MockEnd for free
          </Card.Header>

          <Card.Description>
            <Form.Input
              label="Email"
              placeholder="john.smith@email.com"
              {...getFieldPropsWithErrors("email", props)}
              data-testid="signupPage-authForm-emailInput"
            />

            <Form.Field>
              <label>Password</label>

              {values.password && (
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
              <Form.Input
                placeholder="******"
                {...getFieldPropsWithErrors("password", props)}
                data-testid="signupPage-authForm-passwordInput"
              />
            </Form.Field>

            <Message
              data-testid="signupPage-authForm-responseErrors"
              error
              content={get(errors, "response.message")}
            />
          </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Form.Button
            data-testid="signupPage-createAccountButton"
            raised
            animated
            fluid
            primary
            type="submit"
          >
            Create free account
          </Form.Button>
        </Card.Content>
      </Card>

      <Link to="/login">
        <h4 css={{ color: "white" }}>Already have an account? sign in</h4>
      </Link>
    </Form>
  );
};

export default withFormik(formConfig)(SignupForm);
