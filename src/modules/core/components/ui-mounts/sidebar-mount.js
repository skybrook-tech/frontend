import React, { useState, useEffect } from "react";
import { Portal } from "semantic-ui-react";

const HeaderMount = ({ children }) => {
  const [el, setEl] = useState(null);

  useEffect(() => {
    const EL = document.getElementById("app-side-menu-mount");

    if (EL) {
      setEl(EL);
    }
  }, [el]);

  if (!el) return null;

  return (
    <Portal open mountNode={el}>
      {children}
    </Portal>
  );
};

export default HeaderMount;
