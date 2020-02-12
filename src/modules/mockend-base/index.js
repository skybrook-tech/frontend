import createApp from "../core";

// Modules
import projectModule from "../project-manager";

// Screens
import landingPage from "./screens/landing-page";

export default createApp({ modules: [landingPage, projectModule] });
