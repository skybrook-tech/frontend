const colors = {
  primary: "#3B9ABF",
  dark: "rgb(89, 94, 94)",
  lightGrey: "#F6F6F6",
  mainGradient: `linear-gradient(
    -45deg,
    #30CACD,
    #30CACD,
    #3B9ABF,
    #35528C,
    #330E6A
  )`
};

const theme = {
  colors,
  semanticUI: {
    site: {
      colors: {
        primaryColor: colors.primary,
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
