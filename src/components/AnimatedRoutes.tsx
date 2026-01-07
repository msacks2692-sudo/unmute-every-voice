import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Features from "@/pages/Features";
import Accessibility from "@/pages/Accessibility";
import Contact from "@/pages/Contact";
import MVP from "@/pages/MVP";
import ThankYou from "@/pages/ThankYou";
import NotFound from "@/pages/NotFound";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";
import { CookieConsent } from "./CookieConsent";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <CookieConsent />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Index />
              </PageTransition>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransition>
                <About />
              </PageTransition>
            }
          />
          <Route
            path="/features"
            element={
              <PageTransition>
                <Features />
              </PageTransition>
            }
          />
          <Route
            path="/accessibility"
            element={
              <PageTransition>
                <Accessibility />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <Contact />
              </PageTransition>
            }
          />
          <Route
            path="/mvp"
            element={
              <PageTransition>
                <MVP />
              </PageTransition>
            }
          />
          <Route
            path="/thank-you"
            element={
              <PageTransition>
                <ThankYou />
              </PageTransition>
            }
          />
          <Route
            path="/privacy"
            element={
              <PageTransition>
                <Privacy />
              </PageTransition>
            }
          />
          <Route
            path="/terms"
            element={
              <PageTransition>
                <Terms />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default AnimatedRoutes;
