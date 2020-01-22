const theme = {
  colors: {
    primary: "var(--main-primary);",
    mainGradient: `linear-gradient(
      -45deg,
      #30CACD,
      #30CACD,
      #3B9ABF,
      #35528C,
      #330E6A
    )`
  },
  semanticUI: {
    site: {
      colors: {
        primaryColor: "#3B9ABF",
        secondaryColor: "#5E6C84",
        anotherColor: "pink",
        white: "white",
        totallyNewColors: "rebeccapurple"
      }
    },
    component: {
      Button: {
        white: {
          default: {
            backgroundColor: "white",
            color: "#3B9ABF",
            "&:hover": {
              opacity: "0.85"
            }
          }
        }
      }
    }
  }
};

export default theme;
