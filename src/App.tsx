
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MosqueDetails from "./pages/MosqueDetails";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import RegisterMosque from "./pages/admin/RegisterMosque";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mosque/:id" element={<MosqueDetails />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register-mosque" element={<RegisterMosque />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
