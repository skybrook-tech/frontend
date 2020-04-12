/** @jsx jsx */
import { jsx } from "@emotion/core";
import SemanticFormBuilder from "@core/utils/formig/semantic-ui-form-builder";

const formConfig = {
  form: {
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
    },
    onReset: onReset => {
      console.log({ onReset });
    },
    onCancel: (...args) => {
      console.log({ args });
    },
    onDelete: (...args) => {
      console.log({ args });
    }
  },
  fields: [
    { name: "textInput", type: "Input", label: "First Name", props: {} },
    {
      name: "radioGroup",
      type: "RadioGroup",
      Component: () => <div>foo</div>,
      props: {
        inline: true,
        options: [
          { value: "sml", label: "Small" },
          { value: "med", label: "Medium" },
          { value: "lge", label: "Large" }
        ]
      }
    },
    { name: "checkbox", type: "Checkbox", label: "First Name", props: {} },
    {
      name: "sex",
      type: "Select",
      label: "Sex",
      props: {
        multiple: true,
        options: [
          { value: "male", text: "Male" },
          { value: "female", text: "Female" },
          { value: "ambiguous", text: "Ambiguous" }
        ]
      }
    },
    {
      name: "GroupOne",
      label: "Group One",
      props: { widths: "equal" },
      fields: [
        {
          name: "groupOneInputOne",
          type: "Input",
          label: "First Name",
          props: { fluid: true }
        },
        {
          name: "groupOneInputTwo",
          type: "Input",
          label: "Last Name",
          props: { type: "number", fluid: true }
        }
      ]
    }
  ]
};

const NotFound = props => {
  return (
    <div className="flex flex-column fit-parent">
      <div className="flex-column flex-auto flex-center">
        <SemanticFormBuilder
          card
          formConfig={formConfig}
          data={{ textInput: "initialValue" }}
        ></SemanticFormBuilder>
      </div>
    </div>
  );
};

export default NotFound;
