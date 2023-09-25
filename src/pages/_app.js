import "@/styles/globals.css";
import Layout from "./layout";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";

const WalletConnectionProvider = dynamic(
  () => import("../context/WalletConnectioProvider"),
  {
    ssr: false,
  }
);

function App({ Component, pageProps }) {
  return (
    <WalletConnectionProvider>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </WalletConnectionProvider>
  );
}

export default appWithTranslation(App);
