/** @jsx jsx */
import { jsx } from "@emotion/core";
import TopBarMenu from "../components/menus/top-bar";
import Public404 from "@core/screens/404";

const NotFound = props => {
  return (
    <Public404
      {...props}
      TopBar={ptProps => <TopBarMenu {...ptProps} header="MockEnd" primary />}
    />
  );
};

export default NotFound;
