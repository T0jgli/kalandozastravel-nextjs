import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="hu">
                <Head />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&display=swap" rel="stylesheet" />

                <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_GAID}`} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_GAID}', {
                                    page_path: window.location.pathname,
                                });
                                `,
                    }}
                />
                <link rel="icon" type="image/png" href="/img/conti_logo.png" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="description" content="kalandozas.hu - Utazás, nyaralas, kirándulás, Görögország, Spanyolország, Olaszország" />
                <meta name="copyright" content="2020 © Contibus Neoline KFT." />
                <meta name="country" content="Hungary" />
                <meta name="robots" content="index, follow" />
                <meta
                    name="keywords"
                    content="iskolai osztálykirándulások, szakmai utak, kirándulás, nyaralás, sítúra, tanulmányút, körutazás, tengerparti üdülés, nyaralás, budapesti városnézés, Csoportos körutazások, Akciós utazások, városlátogatások, szervezett buszos kirándulások, adventi utazások, repülős utak, 1 napos utazás, Utazás, Buszos körutazások előfoglalási akció, Városlátogatások, Üdülések, Repülős utak, csoportos Városlátogatás, tengerparti nyaralás"
                />
                <meta name="content-language" content="hu" />
                <meta property="og:description" content="Kalandozas.hu - Utazás, nyaralas, kirándulás, Görögország, Spanyolország, Olaszország" />
                <meta property="og:site_name" content="Kalandozás Utazási iroda" />
                <meta property="og:title" content="Kalandozás Utazási iroda" />
                <meta property="og:locale" content="hu_HU" />
                <meta property="og:image" content="https://kalandozas.hu/img/conti_logo.png" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Kalandozás Utazási iroda" />
                <meta name="twitter:description" content="kalandozas.hu - Utazás, nyaralas, kirándulás, Görögország, Spanyolország, Olaszország" />
                <meta property="twitter:image" content="https://kalandozas.hu/img/conti_logo.png" />
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
