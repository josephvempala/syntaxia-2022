import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "../components/HeaderComponent";
import Footer from "../components/FooterComponent";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeaderComponent />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
