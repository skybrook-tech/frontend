import { visitLandingPage, findAuthFieldsAndType } from "./helpers/setup";

// TODO: create tests for failure and trying to navigate to private route
describe("Login", () => {
  describe("on success", () => {
    it("returns token and signs user in", () => {
      visitLandingPage();
      cy.server({ delay: 1000 });
      cy.fixture("users/auth.success.json").as("loginJSON");

      cy.route("POST", "**/users/login", "@loginJSON");

      cy.get("[data-testid=landingPage-loginButton]").click();
      cy.get("[data-testid=loginPage-authForm-submitButton]").click();

      cy.get("[data-testid=loginPage-authForm] .field .prompt").should(
        "have.length",
        2
      );
      cy.get("[data-testid=loginPage-authForm] .field .prompt:first").should(
        "have.text",
        "Required"
      );

      findAuthFieldsAndType({ page: "loginPage" });

      cy.get("[data-testid=loginPage-authForm-submitButton]")
        .click()
        .wait(1000)
        .should(() => {
          expect(JSON.parse(localStorage.getItem("currentUser")).token).to.not
            .be.null;
        });

      cy.get("[data-testid=dashboardPage]").should("exist");
    });
  });

  describe("on failure", () => {
    it("renders an error message", () => {
      visitLandingPage();
      cy.server({ delay: 1000 });
      cy.fixture("users/auth.failure.json").as("loginJSON");

      cy.route("POST", "**/users/login", "@loginJSON", { status: 401 });

      cy.get("[data-testid=landingPage-loginButton]").click();

      findAuthFieldsAndType({ page: "loginPage" });

      cy.get("[data-testid=loginPage-authForm-submitButton]")
        .click()
        .wait(1000)
        .should(() => {
          expect(JSON.parse(localStorage.getItem("currentUser")).token).to.be
            .null;
        });

      cy.get("[data-testid=loginPage-authForm-responseError]").should("exist");
      cy.get("[data-testid=loginPage-authForm-responseError] p").should(
        "have.text",
        "Some Error Message."
      );
    });
  });
});
