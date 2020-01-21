/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Card } from "semantic-ui-react";
import Header from "./header";

// Example for how to theme the semantic-ui Card compnents
const styleOverrides = () => ({
  "&&&": {
    // padding: "10px"
  }
});

const ThemedCard = props => <Card css={styleOverrides} {...props} />;

const AssignedCard = Object.assign(ThemedCard, Card);

AssignedCard.Header = props => (
  <Header css={{ "&&&": { padding: "0.75em 0" } }} {...props} />
);

AssignedCard.Content = props => (
  <Card.Content css={{ "&&&": { padding: "1.25em" } }} {...props} />
);

export default AssignedCard;
