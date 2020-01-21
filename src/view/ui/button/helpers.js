const defaultOpacity = { opacity: 0.75 };

const transformKey = key => {
  if (key === "primaryColor") return "primary";
  if (key === "secondaryColor") return "secondary";

  return key;
};

const getSiteColors = siteColorTheme => {
  const siteColors = {
    ".ui.button": {
      transition: "all ease-in-out 0.2s"
    }
  };

  Object.entries(siteColorTheme).forEach(([type, color]) => {
    const transformedType = transformKey(type);
    const defaultClassname = `.ui.${transformedType}.buttons .button, .ui.${transformedType}.button`;
    const basicClassname = `.ui.basic.${transformedType}.buttons .button, .ui.basic.${transformedType}.button`;

    siteColors[defaultClassname] = {
      backgroundColor: color,
      "&:hover, &:active, &:focus": {
        boxShadow: "none",
        backgroundColor: color,
        ...defaultOpacity
      }
    };

    siteColors[basicClassname] = {
      color: `${color} !important`,
      boxShadow: `0 0 0 1px ${color} inset !important`,
      "&:hover, &:active, &:focus": {
        color: `${color} !important`,
        boxShadow: `0 0 0 1px ${color} inset !important`,
        ...defaultOpacity
      }
    };
  });

  return siteColors;
};

const getComponentOverrides = buttonOverrides => {
  const componentOverrides = {};

  Object.entries(buttonOverrides).forEach(([type, overrides]) => {
    const transformedType = transformKey(type);
    const defaultClassname = `.ui.${transformedType}.buttons .button, .ui.${transformedType}.button`;
    const basicClassname = `.ui.basic.${transformedType}.buttons .button, .ui.basic.${transformedType}.button`;

    componentOverrides[defaultClassname] = overrides.default;
    componentOverrides[basicClassname] = overrides.basic;
  });

  return componentOverrides;
};

export { transformKey, getSiteColors, getComponentOverrides };
