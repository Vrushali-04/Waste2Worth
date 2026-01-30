
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import SellPage from "./pages/SellPage";
import BuyPage from "./pages/BuyPage";
import RecyclePage from "./pages/RecyclePage";
import GetStarted from "./pages/GetStarted";
import ExploreCategories from "./pages/ExploreCategories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/explore-categories" element={<ExploreCategories />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/recycle" element={<RecyclePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
