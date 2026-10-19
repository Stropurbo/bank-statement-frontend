import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SponsorBar from "./components/SponsorBar";
import UseCaseModal from "./components/UseCaseModal";
import Home from "./pages/Home";
import Topic from "./pages/Topic";
import Advertise from "./pages/Advertise";
import About from "./pages/About";
import NewsletterPage from "./pages/NewsletterPage";
import PrivacyPage from "./pages/PrivacyPage";
import NewPage from "./pages/NewPage";
import AgentsPage from "./pages/AgentsPage";
import TopicsPage from "./pages/TopicsPage";
import AgentPage from "./pages/AgentPage";
import UseCasePage from "./pages/UseCasePage";
import AppsPage from "./pages/AppsPage";
import AppPostPage from "./pages/AppPostPage";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  const location = useLocation();
  // When a card is clicked, we navigate to /use-case/:id with the current
  // location as background — the page stays, a modal opens on top.
  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:slug" element={<Topic />} />
        <Route path="/use-case/:id" element={<UseCasePage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/agents/:slug" element={<AgentPage />} />
        <Route path="/advertise" element={<Advertise />} />
        <Route path="/about" element={<About />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/apps" element={<AppsPage />} />
        <Route path="/apps/:slug" element={<AppPostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/use-case/:id" element={<UseCaseModal />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  useEffect(() => {
    try {
      if (localStorage.getItem("sheetlypro_theme") === "dark") {
        document.documentElement.classList.add("dark");
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-4xl lg:max-w-6xl mx-auto px-4 pb-16">
        <AppRoutes />
      </main>
      <Footer />
      <SponsorBar />
    </div>
  );
}
