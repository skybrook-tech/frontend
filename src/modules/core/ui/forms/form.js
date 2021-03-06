/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Form } from "semantic-ui-react";
import ThemedButton from "../button/index";
import isRequired from "@core/utils/validations/is-required";

// Example for how to theme the semantic-ui Form compnents
const styleOverrides = css`
  &&& {
    .ui.button:last-child {
      margin: 0;
    }

    .ui.card:last-child {
      margin: 0;
    }
  }
`;

const ThemedForm = props => <Form css={styleOverrides} {...props} />;

const AssignedForm = Object.assign(ThemedForm, Form);

AssignedForm.Button = ThemedButton;

AssignedForm.validations = {
  isRequired
};

export default AssignedForm;
