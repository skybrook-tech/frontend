/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Message } from "semantic-ui-react";
import Form from "../../ui/form";
import Card from "../../ui/card";
import { withFormik } from "formik";
import { api } from "../../../config/api";
import get from "lodash/get";
import { Link, navigate } from "@reach/router";
import currentUser from "../../../utils/current-user";

const formConfig = {
  validate: values => {
    return Form.validations.isRequired(values, ["email", "password"]);
  },
  handleSubmit: async (values, { setFieldError }) => {
    try {
      const { data } = await api.mockend.post("users/login", values);
      currentUser.set({ token: data.token });
      const userId = currentUser.get("userDetails.id");

      navigate(`/u/${userId}`);
    } catch (error) {
      setFieldError("response", error.response.data.error);
    }
  }
};

const getFieldPropsWithErrors = (name, formik, initialValue) => {
  const { submitCount, touched, errors } = formik;

  const error = touched[name] || submitCount ? errors[name] : null;

  return {
    name,
    ...formik.getFieldProps(name),
    error
  };
};

const SignupForm = props => {
  const { handleSubmit, isSubmitting, errors } = props;

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
      data-testid="loginPage-authForm"
    >
      <Card raised fluid>
        <Card.Content>
          <Card.Header textAlign="center" color="secondary">
            Log In To MockEnd
          </Card.Header>

          <Card.Description>
            <Form.Input
              label="Email"
              placeholder="john.smith@email.com"
              {...getFieldPropsWithErrors("email", props)}
              data-testid="loginPage-authForm-emailInput"
            />
            <Form.Input
              label="Password"
              placeholder="******"
              {...getFieldPropsWithErrors("password", props)}
              data-testid="loginPage-authForm-passwordInput"
            />

            <Message
              error
              content={get(errors, "response.message")}
              data-testid="loginPage-authForm-responseError"
            />
          </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Form.Button
            data-testid="loginPage-authForm-submitButton"
            raised
            animated
            fluid
            primary
            type="submit"
          >
            Log In
          </Form.Button>
        </Card.Content>
      </Card>

      <Link to="/signup">
        <h4 css={{ color: "white" }}>Don't have an account? sign up</h4>
      </Link>
    </Form>
  );
};

export default withFormik(formConfig)(SignupForm);
