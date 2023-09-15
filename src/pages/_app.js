import "@/styles/globals.css";
import Layout from "./layout";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
