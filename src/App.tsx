import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import { Footer } from "./components/Footer/Footer";
import { useEffect } from "react";
import styles from "./App.module.css";
import { Header } from "./components/Header/Header";

// Import version from package.json
const version = import.meta.env.VITE_APP_VERSION || "0.0.0";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    console.log(`App version: ${version}`);
  }, []);

  const isProduction = import.meta.env.MODE === "production";
  const basename = isProduction ? "/infinite-llm-dialogue" : "/";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className={styles.appContainer}>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basename}>
            <Header />
            <main className={styles.mainContent}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/privacy" element={<Privacy />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
