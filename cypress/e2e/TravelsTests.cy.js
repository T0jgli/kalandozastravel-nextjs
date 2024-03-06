/// <reference types="cypress" />

let url = "";

context("Travels Components e2e testing", function () {
    before(() => {
        cy.visit("/travels");
    });

    describe("Travel articles tests", function () {
        it("should render articles", () => {
            cy.get("article").should("be.visible");
        });
        it("should render articles details", () => {
            cy.get("article")
                .filter(":visible")
                .then(($value) => {
                    for (let i = 0; i < $value.length; i++) {
                        cy.get("article").eq(i).scrollIntoView().find("a").should("have.attr", "href");
                        cy.get("article").eq(i).scrollIntoView().find("img").should("be.visible");
                    }
                    url = Cypress.$("article")
                        .not(".unavailable")
                        .eq(Math.floor(Math.random() * $value.length + 0))
                        .find("a")
                        .attr("href");
                });
        });
    });
});

context("One travel Components e2e testing", function () {
    before(() => {
        cy.visit(`${url}`);
    });

    describe("Travel Top tests", function () {
        it("should render the blurred image", () => {
            cy.get("#blurimage").should("be.visible");
            cy.get("#blurimage").should("have.css", "filter", "blur(55px)");
        });
        it("should render the top image", () => {
            cy.get("#topimage").should("be.visible");
        });
    });

    describe("Travel body tests", function () {
        it("should render the country flag", () => {
            cy.get("#countryimage").should("be.visible");
        });
        it("should render the images container", () => {
            cy.get("#travelimages").should("be.visible");
        });

        it("should open the image", () => {
            cy.get("#travelimages")
                .find("img")
                .filter(":visible")
                .then(($value) => {
                    for (let i = 0; i < $value.length; i++) {
                        cy.get("#travelimages").find("img").eq(i).click();
                        cy.get(".imgwrapper").should("be.visible");
                        cy.get("button.ril-close").click();
                        cy.get(".imgwrapper").should("not.be.visible");
                    }
                });
        });
    });

    describe("Input tests", function () {
        it("should have working input fields", () => {
            cy.get("#travelinput").find("input[name='name']").clear().type("Cypress IO").should("have.value", "Cypress IO");
            cy.get("#travelinput").find("input[name='postalCode']").clear().type("1201").should("have.value", "1201");
            cy.get("#travelinput").find("input[name='city']").clear().type("Los Angeles").should("have.value", "Los Angeles");
            cy.get("#travelinput").find("input[name='address']").clear().type("Groove street 1").should("have.value", "Groove street 1");
            cy.get("#travelinput").find("input[name='phone']").clear().type("0650607889").should("have.value", "0650607889");
            cy.get("#travelinput").find("input[name='email']").clear().type("admin@kalandozas.hu").should("have.value", "admin@kalandozas.hu");

            cy.get("#travelinput").find("input[name='people']").clear().type(2).should("have.value", 2);
            cy.get("#travelinput").find("input[name='matesNames0']").clear().type("Cypress, E2E").should("have.value", "Cypress, E2E");

            if (Cypress.$("#travelinput").find("input[name='needinsurance']").length > 0) {
                cy.get("#travelinput").find("input[id='needinsurance']").check();
                cy.get("#travelinput").find("input[name='insurancename0']").clear().type("Cypress IO").should("have.value", "Cypress IO");
                cy.get("#travelinput")
                    .find("input[name='insurancebirthdate0']")
                    .clear()
                    .type(new Date().toLocaleDateString("hu-HU"))
                    .should("have.value", new Date().toLocaleDateString("hu-HU"));
                cy.get("#travelinput").find("input[name='people']").clear().type(2);
                cy.get("#travelinput").find("input[name='insurancename1']").should("be.visible");
                cy.get("#travelinput").find("input[name='insurancebirthdate1']").should("be.visible");
            }

            cy.get("#travelinput").find("input[id='needseat']").check();
            cy.get("#travelinput").find("input[name='seatNumber']").clear().type("Back").should("have.value", "Back");

            cy.get("#travelinput").find("select[name='feedback']").select("Közösségi oldal").should("have.value", "Közösségi oldal");
            cy.get("#travelinput").find("select[name='payment']").select("Személyesen").should("have.value", "Személyesen");
            cy.get("#travelinput")
                .find("textarea[name='desc']")
                .clear()
                .type("Successfully tested these input fields")
                .should("have.value", "Successfully tested these input fields");

            cy.get("#travelinput").find("input[name='accept']").check().should("be.checked").uncheck().should("not.be.checked");
        });

        it("should render the send button", () => {
            cy.get("#travelinput").find("button[type='submit']").should("be.visible");
        });

        it("should get code 200 from smtp verification", () => {
            cy.request("/api/verify").should((res) => {
                expect(res.status).to.eq(200);
                expect(res.body).to.have.property("message", "Success");
            });
        });
    });
});
