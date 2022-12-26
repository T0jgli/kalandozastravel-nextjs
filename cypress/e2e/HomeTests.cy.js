/// <reference types="cypress" />

context("Home Components e2e testing", function () {
    before(() => {
        cy.visit(`/`);
    });

    describe("Carousel Tests", function () {
        it("should render the carousel", () => {
            cy.get("#carousel").scrollIntoView().should("be.visible");
        });

        it("should render the title", () => {
            cy.get("#carousel").scrollIntoView().find("h1").should("have.text", "Neoline-Kalandozás Utazási Iroda");
        });

        it("should have working arrows", () => {
            const arrows = ["arrowleft", "arrowright"];
            cy.get("#carousel")
                .find(`${arrows[Math.floor(Math.random() * arrows.length + 0)]}`)
                .click();
        });
    });

    describe("Modal tests", function () {
        it("should open and close the modals", () => {
            cy.get("figure")
                .filter(":visible")
                .then(($value) => {
                    for (let i = 0; i < $value.length; i++) {
                        cy.get("figure").filter(":visible").eq(i).scrollIntoView().click();
                        cy.get(".modal").should("be.visible");
                        cy.get(".modalcloseicon").filter(":visible").click();

                        cy.get(".modal").should("not.be.visible");
                    }
                });
        });
    });

    describe("Newsletter tests", function () {
        it("should render the newsletter", () => {
            cy.get("#newslettercontainer").should("be.visible");
        });
        it("should have working input fields", () => {
            cy.get("#newslettercontainer")
                .find("form")
                .find("input[name='nev']")
                .clear()
                .type("Cypress IO")
                .should("have.value", "Cypress IO")
                .clear();
            cy.get("#newslettercontainer")
                .find("form")
                .find("input[name='email']")
                .clear()
                .type("admin@kalandozas.hu")
                .should("have.value", "admin@kalandozas.hu")
                .clear();
            cy.get("#newslettercontainer").find("form").find("button[type='submit']").should("be.visible");
        });
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
                        cy.get("article").eq(i).find("a").should("have.attr", "href");
                        cy.get("article").eq(i).find("img").should("be.visible");
                    }
                });
        });
    });

    describe("Gallery tests", function () {
        it("should render the gallery", () => {
            cy.get(".gallery").should("be.visible");
        });

        it("should have working image change", () => {
            cy.get(".gallery")
                .find("nav > button")
                .filter(":visible")
                .then(($value) => {
                    const randomNumber = Math.floor(Math.random() * $value.length + 0);
                    const el = Cypress.$(".gallery").find("nav > button").filter(":visible").eq(randomNumber);
                    const src = el.find("img").attr("src");
                    el.trigger("click");
                    cy.get(".image-gallery-slide.center").find(".image-gallery-image").should("have.attr", "src", src);
                });
        });
    });

    describe("FAQ tests", function () {
        it("should have render the faq section", () => {
            cy.get("#faqsdiv").scrollIntoView().should("be.visible");
        });

        it("should have working faq section", () => {
            const faqdiv = cy
                .get("#faqsdiv")
                .find(".faq")
                .then(($value) => {
                    for (let i = 0; i < $value.length; i++) {
                        const faq = faqdiv.get(".faq").eq(i);
                        faq.get(".faqcontent").should("have.class", "h-0");
                        faqdiv.get(".faq").eq(i).find(".question").click();
                        faq.get(".faqcontent").should("have.class", "h-full");
                        faqdiv.get(".faq").eq(i).find(".question").click();
                        faq.get(".faqcontent").should("have.class", "h-0");
                    }
                });
        });
    });

    describe("Searchfilter tests", function () {
        it("should render the filter", () => {
            cy.get("#searchfilter").should("be.visible");
        });
        it("should have working input fields", () => {
            cy.get("#searchfilter").find("input[name='title']").clear().type("Cypress IO").should("have.value", "Cypress IO").clear();
            cy.get("#searchfilter").find("select[name='country']").select("Ausztria").should("have.value", "Ausztria");
            cy.get("#searchfilter").find("input[name='startingDate']").clear().type("2022-12").should("have.value", "2022-12");

            cy.get("#searchfilter").find("button[type='submit']").should("be.visible");
        });

        it("should redirect to a proper travels filter", () => {
            cy.get("#searchfilter").find("button[type='submit']").click();

            cy.url().should("include", "country=Ausztria&startingDate=2022-12");
            cy.go("back");
        });
    });
});
