/// <reference types="cypress" />

context("Global Components e2e testing", function () {
    before(() => {
        const pathnames = ["/", "/contact", "/travels"];
        cy.visit(`${pathnames[Math.floor(Math.random() * (2 - 0) + 0)]}`);
    });

    describe("Cookies tests", function () {
        let enabledCookiesStorage;

        beforeEach(() => {
            enabledCookiesStorage = localStorage.getItem("EnableCookies");
        });

        it("should render the cookies alert based on local storage", () => {
            cy.wait(750);
            if (!enabledCookiesStorage) cy.get("#cookiealert").should("be.visible");
            else cy.get("#cookiealert").should("not.be.visible");
        });

        it("should disappear when clicking the accept button", () => {
            if (!enabledCookiesStorage) cy.get("#acceptcookies").click();
            cy.get("#cookiealert").should("not.have.class", "bottom-0").should("not.be.visible");
        });
    });

    describe("Scroll icon tests", function () {
        it("should show the scoll top icon", () => {
            cy.scrollTo(0, 200);
            cy.get("#scrolltopbutton").should("be.visible");
        });
    });

    describe("Navbar tests", function () {
        it("should render the navbar", () => {
            cy.get("nav").should("be.visible");
        });

        it("should contain the mobile icon on mobile", () => {
            cy.get("#mobileicon").should("not.be.visible");
            cy.viewport(550, 750);
            cy.get("aside").should("have.class", "-right-full").should("not.be.visible");
            cy.get("#mobileicon").should("be.visible");
        });

        it("should open and close the navbar on mobile", () => {
            cy.viewport(550, 750);
            cy.get("#mobileicon").click();
            const aside = cy.get("aside");
            aside.should("have.class", "right-0").should("be.visible");
            aside.find("#mobileicon_mobile").click();
            cy.get("aside").should("have.class", "-right-full").should("not.be.visible");
        });
    });

    describe("Footer tests", function () {
        it("should render the footer", () => {
            cy.get("#footer").scrollIntoView().should("be.visible");
        });

        it("should render the map", () => {
            cy.get("#footer").find("iframe").should("be.visible");
        });

        it("should contain the right year", () => {
            cy.get("#footer").find("#copyright").should("contain.text", `${new Date().getUTCFullYear()}`);
        });
    });
});
