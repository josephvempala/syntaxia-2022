import Head from "next/head";

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      {children}
    </div>
  );
};

Layout.defaultProps = {
  title: "Syntaxia 2021",
  description: "participate in various events",
  keywords: "college,cybernetics",
};

export default Layout;
