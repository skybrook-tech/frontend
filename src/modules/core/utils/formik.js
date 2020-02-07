const getCheckboxProps = (name, formik, initialValue = false) => ({
  name,
  onClick: (e, { checked }) => formik.setFieldValue(name, checked),
  value: formik.values[name] || initialValue,
  error: !!formik.errors[name],
  onBlur: (e, { value }) => formik.setFieldTouched(name, value),
  onChange: (e, { value }) => formik.setFieldValue(name, value)
});

const getSelectProps = (name, formik, initialValue = null) => ({
  name,
  value: formik.values[name] || initialValue,
  error: !!formik.errors[name],
  onBlur: (e, { value }) => formik.setFieldTouched(name, value),
  onChange: (e, { value }) => formik.setFieldValue(name, value)
});

const getFieldPropsWithErrors = (name, formik, initialValue) => {
  const { submitCount, touched, errors } = formik;

  const error = touched[name] || submitCount ? errors[name] : null;

  return {
    name,
    ...formik.getFieldProps(name),
    error
  };
};
export { getCheckboxProps, getSelectProps, getFieldPropsWithErrors };
