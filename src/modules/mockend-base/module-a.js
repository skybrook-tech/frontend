/** @jsx jsx */
import { useState } from "react";
import { jsx, css } from "@emotion/core";

const ModuleA = {
  Component: () => {
    return <div css>Module A</div>;
  },
  name: "Module A",
  route: "module-a"
};

export default ModuleA;
