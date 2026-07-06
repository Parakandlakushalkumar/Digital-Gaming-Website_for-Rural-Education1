import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "@/contexts/TranslationContext";
import Index from "./pages/Index";
import { TeacherPortal } from "./pages/TeacherPortal";
import { StudentPortal } from "./pages/StudentPortal";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "@/components/ErrorBoundary";
import ImprovedTranslate from "@/components/ImprovedTranslate";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <TranslationProvider>
          <Toaster />
          <Sonner />
          <ImprovedTranslate />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/teacher" element={<TeacherPortal />} />
              <Route path="/student" element={<StudentPortal />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TranslationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
