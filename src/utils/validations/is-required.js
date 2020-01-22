const isRequired = (values, requiredFields) => {
  return requiredFields.reduce((accumulator, currentValue) => {
    if (!values[currentValue]) {
      accumulator[currentValue] = "Required";
    }

    return accumulator;
  }, {});
};

export default isRequired;
