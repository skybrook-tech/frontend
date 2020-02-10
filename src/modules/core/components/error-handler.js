import React from "react";
import PropTypes from "prop-types";

class CoreErrorHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    console.log("getDerivedStateFromError");
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log("componentDidCatch");

    console.error(error);
    console.error(info);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    console.log(hasError);

    if (hasError) {
      return (
        <div className="fit-parent flex items-center justify-center">
          <h4>
            Oops, something broke... Please be patient while our code monkeys
            fix it for you.
          </h4>
        </div>
      );
    }

    return children;
  }
}

CoreErrorHandler.propTypes = {
  children: PropTypes.node.isRequired
};

const withCoreErrorBoundary = (Component, ErrorBoundary = CoreErrorHandler) => {
  // eslint-disable-next-line
  return ({ childRef, ...props }) => (
    <ErrorBoundary>
      <Component ref={childRef} {...props} />
    </ErrorBoundary>
  );
};

export { withCoreErrorBoundary };

export default CoreErrorHandler;
