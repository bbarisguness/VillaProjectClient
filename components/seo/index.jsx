import Head from "next/head";

const Seo = ({ pageTitle, pageDesc }) => (
  <>
    <Head>
      <title>
        {pageTitle &&
          `${pageTitle}`}
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={pageDesc ? `${pageDesc}` : 'Labirent Fethiye'} />
    </Head>
  </>
);

export default Seo;
