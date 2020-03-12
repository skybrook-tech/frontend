import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CoreLayoutTopNav = props => {
  const { children, modules } = props;

  return (
    <div className="">
      <div className="flex ">
        <Link to="/">home</Link>

        {modules.map(({ name, route }) => (
          <Link to={route}>{name}</Link>
        ))}
      </div>

      <div>{children}</div>
    </div>
  );
};

CoreLayoutTopNav.defaultProps = {};

CoreLayoutTopNav.propTypes = {};

export default CoreLayoutTopNav;
