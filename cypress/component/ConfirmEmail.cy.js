import React from "react";
import ConfirmEmail from "../../src/components/confirmEmail/ConfirmEmail";

describe("<ManageOrders />", () => {
  it("renders", () => {
    cy.mount(<ConfirmEmail />);

    cy.get(".header_content__zNOBE").should("have.text", "Confirmar cuenta");

    cy.get(".confirmEmail_button__K4Y_N")
      .should("be.visible")
      .and("be.enabled");
  });
});
