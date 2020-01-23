/** @jsx jsx */
import { jsx } from "@emotion/core";
import TopBarMenu from "../../components/menus/top-bar";
import { Link } from "@reach/router";
const NotFound = () => {
  return (
    <div className="flex flex-column fit-parent">
      <TopBarMenu primary />

      <div className="flex-column flex-center">
        <h2 data-testid="404-pageNotFoundText">Page not found...</h2>
        <h4>
          <span>This page may be private. You may be able to view it by </span>
          <Link to="/login">
            <span className="underline" data-testid="404-loginPageHint">
              logging in.
            </span>
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default NotFound;
