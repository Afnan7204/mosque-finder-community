
import { useEffect, useState } from "react";
import { useAuth as useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useAuth = (requireAuth: boolean = false, redirectTo: string = "/admin/login") => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!auth.loading) {
      const isAuthenticated = !!auth.user;
      
      if (requireAuth && !isAuthenticated) {
        toast({
          title: "Authentication required",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
        navigate(redirectTo);
      } else if (!requireAuth && isAuthenticated && redirectTo) {
        navigate("/admin/dashboard");
      }
      
      setAuthChecked(true);
    }
  }, [auth.loading, auth.user, requireAuth, navigate, redirectTo, toast]);

  return { ...auth, authChecked };
};
