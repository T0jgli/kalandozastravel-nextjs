export default (url, price, image, isAvailable) => {
    const data = {
        "@context": "http://schema.org",
        "@type": "Travel",
        "@id": "kalandozas.hu",
        name: "Neoline-Kalandozás Utazási Iroda",
        logo: "https://kalandozas.hu/img/conti_logo.png",
        telephone: "+36 1 317-1256",
        email: "kalandozas@t-online.hu",
        sameAs: ["kalandozastravel.hu"],
        url: url,
        image: image,
        offers: {
            "@type": "offer",
            availability: isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            price: price,
            priceCurrency: "HUF",
        },
        description: "kalandozas.hu - Utazás, nyaralas, kirándulás, Görögország, Spanyolország, Olaszország",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Síp utca 4.",
            addressLocality: "Budapest",
            addressRegion: "Budapest",
            postalCode: "1075",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "47.4956915001924",
            longitude: "19.06241531714505",
        },
    };
    return data;
};
