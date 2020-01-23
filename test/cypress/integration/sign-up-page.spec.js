import { visitLandingPage, findAuthFieldsAndType } from "./helpers/setup";

// TODO: create tests for failure and trying to navigate to private route
describe("Signup", () => {
  describe("on success", () => {
    it("returns token and signs user in", () => {
      visitLandingPage();
      cy.server({ delay: 1000 });
      cy.fixture("users/auth.success.json").as("registerJSON");

      cy.route("POST", "**/users/register", "@registerJSON");

      cy.get("[data-testid=topBarNav-signupButton]").click();
      cy.get("[data-testid=signupPage-createAccountButton]").click();

      cy.get("[data-testid=signupPage-authForm] .field .prompt").should(
        "have.length",
        2
      );
      cy.get("[data-testid=signupPage-authForm] .field .prompt:first").should(
        "have.text",
        "Required"
      );

      findAuthFieldsAndType({ page: "signupPage", password: "sasquatch" });

      cy.get("[data-testid=signupPage-authForm] .field .prompt").should(
        "exist"
      );
      cy.get("[data-testid=signupPage-authForm] .field .prompt").should(
        "have.text",
        "Password must contain at least one number and be at least six characters long."
      );

      findAuthFieldsAndType({
        page: "signupPage",
        disable: ["email"],
        clear: ["password"]
      });

      cy.get("[data-testid=signupPage-createAccountButton]")
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
      cy.fixture("users/auth.failure.json").as("registerJSON");

      cy.route("POST", "**/users/register", "@registerJSON", { status: 401 });

      cy.get("[data-testid=topBarNav-signupButton]").click();

      findAuthFieldsAndType({ page: "signupPage" });

      cy.get("[data-testid=signupPage-createAccountButton]")
        .click()
        .wait(1000)
        .should(() => {
          expect(JSON.parse(localStorage.getItem("currentUser")).token).to.be
            .null;
        });

      cy.get("[data-testid=signupPage-authForm-responseErrors]").should(
        "exist"
      );
      cy.get("[data-testid=signupPage-authForm-responseErrors] p").should(
        "have.text",
        "Some Error Message."
      );
    });
  });
});
