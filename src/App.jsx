import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Topic from "./pages/Topic";
import Advertise from "./pages/Advertise";
import About from "./pages/About";
import NewsletterPage from "./pages/NewsletterPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-4xl lg:max-w-6xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:slug" element={<Topic />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/about" element={<About />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
