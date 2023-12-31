import "@/styles/globals.css";
import Layout from "./layout";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import AppContext from "@/context/AppContext";
import useInitialState from "@/hooks/useInitialState";
import { appWithTranslation } from "next-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const WalletConnectionProvider = dynamic(
  () => import("../context/WalletConnectioProvider"),
  {
    ssr: false,
  }
);

function App({ Component, pageProps }) {
  return (
    <AppContext.Provider value={useInitialState()}>
      <WalletConnectionProvider>
        <ThemeProvider attribute="class">
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </ThemeProvider>
      </WalletConnectionProvider>
    </AppContext.Provider>
  );
}

export default appWithTranslation(App);
