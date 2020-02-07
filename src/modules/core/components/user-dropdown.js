/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Icon, Label, Dropdown, Image } from "semantic-ui-react";
import currentUser from "../utils/current-user";

// import routes from "../constants/routes";
import { navigate } from "@reach/router";

const UserDropdown = () => {
  const options = [
    { key: "settings", icon: "user", text: "Profile Settings" },
    {
      key: "logout",
      icon: "lock",
      text: "Logout",
      onClick: () => {
        currentUser.set({ token: null });
        navigate("/");
      }
    }
  ];

  return (
    <Dropdown
      floating
      icon={null}
      direction="left"
      options={options}
      trigger={
        <Label as="a" color="primary" image>
          <Image
            avatar
            src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg"
          />

          <span className="mr1">KC</span>
          <Icon css={{ "&&&": { marginRight: 0 } }} name="dropdown"></Icon>
        </Label>
      }
    />
  );
};

export default UserDropdown;
