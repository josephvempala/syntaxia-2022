import HeaderComponent from "../components/HeaderComponent";
import Footer from "../components/FooterComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import "font-awesome/css/font-awesome.min.css";
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
