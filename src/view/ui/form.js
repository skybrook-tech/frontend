/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Form } from "semantic-ui-react";
import ThemedButton from "./button/index";

// Example for how to theme the semantic-ui Form compnents
const styleOverrides = css`
  &&& {
    .input input,
    .dropdown {
      // border-color: red;
    }
  }
`;

const ThemedForm = props => <Form css={styleOverrides} {...props} />;

const AssignedForm = Object.assign(ThemedForm, Form);

AssignedForm.Button = ThemedButton;

export default AssignedForm;
