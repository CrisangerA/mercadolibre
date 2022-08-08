import * as React from 'react';
// next
import Document, { Html, Head, Main, NextScript } from 'next/document';

// ----------------------------------------------------------------------


export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <meta charSet="utf-8" />                            
          <link rel="icon" type="image/png" sizes="32x32" href="ic_shipping.png" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <meta
            name='description'
            content='Compre productos con Envío Gratis en el día en Mercado Libre Colombia. Encuentre miles de marcas y productos a precios increíbles.'
          />
          <meta name="author" content="cristian alejandro" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
