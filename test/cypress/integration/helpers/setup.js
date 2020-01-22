const baseURL = "http://localhost:3006";

const findAuthFieldsAndType = (props = {}) => {
  const defaults = {
    page: "loginPage",
    email: "j.smith@email.com",
    password: "Sasquatch123",
    disable: [],
    clear: [],
    ...props
  };

  const { page, password, email, disable, clear } = defaults;

  if (clear.includes("email")) {
    cy.get(`[data-testid=${page}-authForm-emailInput] input`).clear();
  }

  if (clear.includes("password")) {
    cy.get(`[data-testid=${page}-authForm-passwordInput] input`).clear();
  }

  if (!disable.includes("email")) {
    cy.get(`[data-testid=${page}-authForm-emailInput]`).type(email);
  }

  if (!disable.includes("password")) {
    cy.get(`[data-testid=${page}-authForm-passwordInput]`).type(password);
  }
};

const visitLandingPage = () => {
  localStorage.clear();
  cy.visit(baseURL);
};

const setup = () => {};

export { baseURL, setup, findAuthFieldsAndType, visitLandingPage };
