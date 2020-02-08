/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Icon as IconSUI } from "semantic-ui-react";

const Icon = props => <IconSUI {...props} />;

export default Object.assign(IconSUI, Icon);
