import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useLoginWithGoogle() {
  const login = () => {
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirect_uri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL;

    if (!client_id || !redirect_uri) {
      console.error("Google Client ID atau Redirect URI tidak ditemukan.");
      return;
    }

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=email%20profile&prompt=select_account&access_type=offline`;

    window.location.href = googleLoginUrl;
  };

  const handleCallback = (code: string) => {
    return useQuery({
      queryKey: ["google", "callback"],
      retry: false,
      queryFn: async () => {
        const response = await axios.get<{
          status_code: number;
          message: string;
          data: { access_token: string };
        }>("http://localhost:8000/api/auth/oauth/google/callback", {
          params: { code },
          withCredentials: true,
        });

        return response.data.data.access_token;
      },
    });
  };

  return { login, handleCallback };
}
