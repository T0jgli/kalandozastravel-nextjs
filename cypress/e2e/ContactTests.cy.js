/// <reference types="cypress" />

context("Contact Components e2e testing", function () {
    before(() => {
        cy.visit("/contact");
    });

    describe("Contact form tests", function () {
        it("should render the form", () => {
            cy.get("#contactform").should("be.visible");
        });

        it("should have working input fields", () => {
            cy.get("#contactform").find("input[name='name']").clear().type("Cypress IO").should("have.value", "Cypress IO").clear();
            cy.get("#contactform")
                .find("input[name='email']")
                .clear()
                .type("admin@kalandozas.hu")
                .should("have.value", "admin@kalandozas.hu")
                .clear();
            cy.get("#contactform")
                .find("textarea[name='message']")
                .clear()
                .type(`Hello!\nThis is an integration test from: ${new Date().toLocaleDateString("hu-HU")}`)
                .should("have.value", `Hello!\nThis is an integration test from: ${new Date().toLocaleDateString("hu-HU")}`)
                .clear();
            cy.get("#contactform").find("button[type='submit']").should("be.visible");
        });

        it("should get code 200 from smtp verification", () => {
            cy.request("/api/verify").should((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property("message", "Success");
            });
        });
    });

    describe("Gallery tests", function () {
        it("should render the gallery", () => {
            cy.get(".gallery").should("be.visible");
        });

        // it("should have working image change", () => {
        //     cy.get(".gallery")
        //         .find("nav > button")
        //         .filter(":visible")
        //         .then(($value) => {
        //             const randomNumber = Math.floor(Math.random() * $value.length + 0);
        //             const el = Cypress.$(".gallery").find("nav > button").filter(":visible").eq(randomNumber);
        //             const src = el.find("img").attr("src");
        //             el.trigger("click");
        //             cy.get(".image-gallery-slide.center").find(".image-gallery-image").should("have.attr", "src", src);
        //         });
        // });
    });
});
