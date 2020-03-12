/** @jsx jsx */
import { useState } from "react";
import { jsx } from "@emotion/core";
import { Message } from "semantic-ui-react";
import Form from "../../../core/ui/form";
import Card from "../../../core/ui/card";
import { withFormik } from "formik";
import get from "lodash/get";
import { withRouter } from "react-router-dom";

import currentUser from "../../../core/utils/current-user";
// TODO: figure out where to put these
import { api, setAuthorisationHeaders } from "../../../../config/api";

const formConfig = {
  validate: values => {
    return Form.validations.isRequired(values, ["email", "password"]);
  },
  handleSubmit: async (values, { setFieldError, setFormError, props }) => {
    try {
      const { history } = props;
      const { data } = await api.userService.post("/users/login", values);

      currentUser.set({ token: data.token });
      setAuthorisationHeaders(data.token);

      if (get(props, "location.state.fromUrl")) {
        history.push(props.location.state.fromUrl);
      } else {
        history.push("app");
      }
    } catch (error) {
      const responseError = get(error, "response.data.error");

      if (responseError) {
        setFieldError("response", responseError);
      } else {
        setFieldError("response", error);
      }
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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

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
              placeholder="Enter your email"
              {...getFieldPropsWithErrors("email", props)}
              data-testid="loginPage-authForm-emailInput"
            />
            <Form.Input
              placeholder="Enter your password"
              {...getFieldPropsWithErrors("password", props)}
              type={showPassword ? "text" : "password"}
              icon={{
                name: "eye",
                circular: true,
                link: true,
                onClick: togglePasswordVisibility
              }}
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
    </Form>
  );
};

export default withRouter(withFormik(formConfig)(SignupForm));
