export function oneTravelSchema(url, price, image, isAvailable, startDate, travelTitle) {
    return {
        "@context": "http://schema.org",
        "@type": "Product",
        "@id": "kalandozas.hu/travel",
        url: url,
        image: image,
        name: "Neoline-Kalandozás Utazási Iroda " + travelTitle,
        offers: {
            "@type": "offer",
            availability: isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            price: price,
            priceValidUntil: startDate,
            priceCurrency: "HUF",
        },
        description: "kalandozas.hu - " + travelTitle,
    };
}

export function agencySchema() {
    return {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Síp utca 4.",
            addressLocality: "Budapest",
            addressRegion: "Pest",
            addressCountry: "Hungary",
            postalCode: "1075",
        },
        currenciesAccepted: "HUF",
        openingHours: ["Mo-Fr 09:00-17:00"],
        paymentAccepted: "Cash, Credit Card, SZÉP card",
        priceRange: "$-$$$",
        geo: {
            "@type": "GeoCoordinates",
            latitude: "47.4956915001924",
            longitude: "19.06241531714505",
        },
        image: "https://kalandozas.hu/img/conti_logo.png",
        logo: "https://kalandozas.hu/img/conti_logo.png",
        telephone: "+3613171256",
        name: "Neoline-Kalandozás Utazási Iroda",
        brand: "Kalandozás Travel",
        email: "ertekesites@kalandozas.hu",
        legalName: "Neoline-Kalandozás Utazási Iroda",
        url: "https://kalandozas.hu",
    };
}
