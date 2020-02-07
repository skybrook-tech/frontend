const transformKey = key => {
  if (key === "primaryColor") return "primary";
  if (key === "secondaryColor") return "secondary";

  return key;
};

const getSiteColors = siteColorTheme => {
  const siteColors = {};

  Object.entries(siteColorTheme).forEach(([type, color]) => {
    const transformedType = transformKey(type);
    const defaultClassname = `.ui.${transformedType}.header`;

    siteColors[defaultClassname] = { color: `${color} !important` };
  });

  return siteColors;
};

const getComponentOverrides = buttonOverrides => {
  const componentOverrides = {};

  Object.entries(buttonOverrides).forEach(([type, overrides]) => {
    const transformedType = transformKey(type);
    const defaultClassname = `.ui.${transformedType}.header`;

    componentOverrides[defaultClassname] = overrides.default;
  });

  return componentOverrides;
};

export { transformKey, getSiteColors, getComponentOverrides };
