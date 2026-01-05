import "@styles/index.scss";
import { Outlet, ScrollRestoration } from "react-router";
import useApp from "@hooks/useApp";
import Menu from "@components/Menu";
import { useAppStore } from "@store/appStore";
import Footer from "./Footer";
import AppLoading from "./AppLoading";
import CodeBrowser from "./CodeBrowser";

/**
 * MAIN APP LAYOUT
 * ---------------
 * - Navbar / Menu (hidden/shown)
 * - Code Window (available on all routes)
 * - Outlet (child content from current route)
 */
function App() {
  useApp();

  // Don't render anything until we are initialized.
  const isAppInitialized = useAppStore((s) => s.isAppInitialized);
  if (!isAppInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      {/* Scroll to top on route change */}
      <ScrollRestoration />

      {/* Appwide menu */}
      <Menu />

      {/* Floating source code browser - visible everywhere except Code page */}
      <CodeBrowser isWindow={true} />

      {/* content from /routes  */}
      <Outlet />

      {/* Appwide cooter */}
      <Footer />
    </>
  );
}

export default App;
