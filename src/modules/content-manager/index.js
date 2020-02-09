/** @jsx jsx */
import { useState } from "react";
import { jsx, css } from "@emotion/core";

const ModuleA = {
  Component: () => {
    return <div css>Content Creator</div>;
  },
  name: "Content Creator",
  route: "content-creator"
};

export default ModuleA;
