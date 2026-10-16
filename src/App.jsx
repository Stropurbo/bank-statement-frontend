import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SponsorBar from "./components/SponsorBar";
import Home from "./pages/Home";
import Topic from "./pages/Topic";
import Advertise from "./pages/Advertise";
import About from "./pages/About";
import NewsletterPage from "./pages/NewsletterPage";
import PrivacyPage from "./pages/PrivacyPage";
import NewPage from "./pages/NewPage";
import AgentsPage from "./pages/AgentsPage";
import AgentPage from "./pages/AgentPage";
import UseCasePage from "./pages/UseCasePage";
import NotFound from "./pages/NotFound";

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:slug" element={<Topic />} />
          <Route path="/use-case/:id" element={<UseCasePage />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/agents/:slug" element={<AgentPage />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/about" element={<About />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <SponsorBar />
    </div>
  );
}
