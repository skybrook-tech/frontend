import { css } from "@emotion/core";

const globalCSS = css`
  body,
  html,
  #root,
  .App {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  html {
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  :root {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    --primary-hue: 169;
    --primary-sat: 75%;
    --primary-light: 49%;
    --primary-lighter: 49%;
    --secondary-hue: 145;
    --secondary-sat: 72%;
    --secondary-light: 47%;
    --shader: 10%;
    --primary-satDarker: calc(var(--primary-sat) + var(--shader));
    --primary-lightDarker: calc(var(--primary-light) - var(--shader));
    --secondary-satDarker: calc(var(--secondary-sat) + var(--shader));
    --secondary-lightDarker: calc(var(--secondary-light) - var(--shader));
    --main-white: #fff;

    --main-primary: hsl(
      var(--primary-hue),
      var(--primary-sat),
      var(--primary-light)
    );

    --main-primary-light: hsl(
      var(--primary-hue),
      var(--primary-sat),
      var(--primary-lighter)
    );

    --main-primary-dark: hsl(
      var(--primary-hue),
      var(--primary-satDarker),
      var(--primary-lightDarker)
    );

    --main-secondary: hsl(
      var(--secondary-hue),
      var(--secondary-sat),
      var(--secondary-light)
    );

    --main-secondary-dark: hsl(
      var(--secondary-hue),
      var(--secondary-satDarker),
      var(--secondary-lightDarker)
    );

    --main-light-grey: #f8fafc;
    --main-darker-grey: #eef1f5;
    --main-darker: #c8d7e6;
    --main-light-blue: #e8f3ff;
    --main-red: #fd5353;
    --main-error: #cb5858;
    --main-green: #21ce6a;
    --main-orange: #ff9300;
    --main-light-yellow: #fff6c3;
    --main-title-dark: #5e6973;
    --main-success-green: #35c58b;
    --main-border-color: #eaeaea;
    --main-form-border-color: #e9ecef;
    --main-outline-color: rgba(64, 158, 255, 0.6);
    --main-overlay-color: rgba(57, 94, 154, 0.67);
    --main-info-background: #e3f0ff;
    --main-text: #717d8a;
  }

  .fit-parent {
    width: 100%;
    height: 100%;
  }
  a,
  a:hover {
    color: inherit;
  }
`;

export default globalCSS;
