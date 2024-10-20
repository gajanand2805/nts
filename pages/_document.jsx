import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="shortcut icon"
          href="/favicon.png"
        />
        <link
          rel="preconnect"
          href="https:/fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https:/fonts.gstatic.com"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:wght@400;500&display=swap"
          rel="stylesheet"></link>
        <meta
          name="facebook-domain-verification"
          content="qehwx3htzaevxh2xxsuy1z3m4altsn"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0QVNQFQ19Y"
          strategy="afterInteractive"></Script>
        <Script
          id="google-analytics"
          strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0QVNQFQ19Y');
          `}
        </Script>
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  )
}
