import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="hu">
                <Head />
                <link rel="icon" type="image/png" href="/img/conti_logo.png" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="description" content="kalandozas.hu - Utazás, nyaralas, kirándulás, Görögország, Spanyolország, Olaszország" />
                <meta name="copyright" content="2020 © Contibus Neoline KFT." />
                <meta name="country" content="Hungary" />
                <meta name="robots" content="index, follow" />
                <meta
                    name="keywords"
                    content="iskolai osztálykirándulások, szakmai utak, kirándulás, nyaralás, sítúra, tanulmányút, körutazás, tengerparti üdülés, nyaralás, budapesti városnézés, Csoportos körutazások, Akciós utazások, városlátogatások, szervezett buszos kirándulások, adventi utazások, repülős utak, 1 napos utazás, Utazás, Buszos körutazások előfoglalási akció, Városlátogatások, Üdülések, Repülős utak, csoportos Városlátogatás, tengerparti nyaralás, teherszállítás"
                />
                <meta name="content-language" content="hu" />
                <meta property="og:description" content="Kalandozas.hu - Utazás, nyaralas, kirándulás, Görögország, Spanyolország, Olaszország" />
                <meta property="og:site_name" content="Kalandozás Utazási iroda" />
                <meta property="og:title" content="Kalandozás Utazási iroda" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="hu_HU" />
                <meta property="og:image" content="https://cdn.kalandozas.hu/img/conti_logo.png" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Kalandozás Utazási iroda" />
                <meta name="twitter:description" content="kalandozas.hu - Utazás, nyaralas, kirándulás, Görögország, Spanyolország, Olaszország" />
                <meta property="twitter:image" content="https://cdn.kalandozas.hu/img/conti_logo.png" />
                <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
                <title>Kalandozás Utazási iroda</title>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
