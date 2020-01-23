import { visitLandingPage, baseURL } from "./helpers/setup";

// TODO: create tests for failure and trying to navigate to private route
describe("404 Page", () => {
  describe("when navigating to route that does not exist.", () => {
    it("displays 404 page", () => {
      visitLandingPage();
      cy.visit(`${baseURL}/route-that-doesnt-exist`);

      cy.get("[data-testid=landingPage-signupButton]").should("exist");
      cy.get("[data-testid=landingPage-loginButton]").should("exist");
      cy.get("[data-testid=404-pageNotFoundText]").should("exist");
      cy.get("[data-testid=404-loginPageHint]").should("exist");
    });
  });

  describe("when navigating to route that exists but needs authentication.", () => {
    it("displays 404 page", () => {
      visitLandingPage();
      cy.visit(`${baseURL}/u/fake-user`);

      cy.get("[data-testid=landingPage-signupButton]").should("exist");
      cy.get("[data-testid=landingPage-loginButton]").should("exist");
      cy.get("[data-testid=404-pageNotFoundText]").should("exist");
      cy.get("[data-testid=404-loginPageHint]").should("exist");
    });
  });
});
