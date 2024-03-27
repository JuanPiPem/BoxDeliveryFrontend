/// <reference types="cypress" />
import React from "react";
import { Provider } from "react-redux"; // Importa Provider de react-redux
import ManageOrders from "../../src/components/admin/manageOrders/ManageOrders";
import store from "../../src/state/store"; // Ajusta la ruta según tu configuración de almacenamiento

describe("<ManageOrders />", () => {
  it("renders", () => {
    cy.mount(
      <Provider store={store}>
        <ManageOrders />
      </Provider>
    );
    cy.get(".header_content__zNOBE").should("have.text", "Gestionar pedidos");
    cy.get(".manageOrders_info__P6UyE > :nth-child(1)").contains(
      "Repartidores"
    );
    cy.get(".manageOrders_info__P6UyE > :nth-child(3)").contains("Paquetes");

    cy.get('[href="/admin/add-packages"]').contains("Nuevo paquete");
  });
});
