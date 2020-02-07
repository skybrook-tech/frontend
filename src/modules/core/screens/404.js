/** @jsx jsx */
import { jsx } from "@emotion/core";
import TopBarMenu from "../components/menus/top-bar";
import { Link } from "@reach/router";

const NotFound = props => {
  const { TopBar = TopBarMenu, location } = props;

  return (
    <div className="flex flex-column fit-parent">
      <TopBar
        {...props}
        primary
        linkState={{ from404Page: true, fromUrl: location.pathname }}
      />

      <div className="flex-column flex-auto pb4 mb4 flex-center">
        <h2 data-testid="404-pageNotFoundText">Page not found...</h2>
        <h4>
          <span>This page may be private. You may be able to view it by </span>
          <Link
            to="/login"
            state={{ from404Page: true, fromUrl: location.pathname }}
          >
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
