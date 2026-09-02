"use client"

import { useContext, useState } from "react";
import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/src//app/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SubmitButton from "@/src/app/_common/SubmitButton";
import BreakdownUnlockedNotification from "@/src/app/_common/BreakdownUnlockedNotification";
import StyledCard from "@/src/app/_common/StyledCard";
import { SolvedPuzzlesContext } from "../../_common/SolvedPuzzlesContextProvider";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { CHOOSE_USERNAME_SLUG, PROFILE_SLUG } from "../../_common/constants";

// TODO: investigate back button from forgot password page

type FormData = {
  username: string;
  password: string;
};

interface CredentialPayload extends JwtPayload {
  email: string;
}

const LoginForm = () => {
  const router = useRouter();
  const { login, storeToken } = AuthActions();
  const [newUser, setNewUser] = useState<string | null>(() => {
    if (typeof window === "undefined") 
      return null; 
    const stored = sessionStorage.getItem("newUser");
    if (stored) {
      sessionStorage.removeItem("newUser");
      return stored;
    }
    return null;
  });

  const [error, setError] = useState<null | string>(null)
  
  const { clearSolvedPuzzles } = useContext(SolvedPuzzlesContext);

  return (
      <StyledCard sx={{ width: {xs: "80%", sm: "60%", md: "45%", lg: "30%" }, mt: {xs: "2em", md: "4em"}, justifyContent:"center",
          alignItems:"center"}}>
        <Typography variant="h5" sx={{my:"0.5em"}}>Sign in using Google</Typography>
        <GoogleLogin 
                  onSuccess={async (credRes) => {
                    try {
                      console.log("cred res:", credRes)
                      const djangoResponse = await login(credRes.credential || "");
                      console.log("django response:", djangoResponse)
                      storeToken(djangoResponse.access, "access");
                      storeToken(djangoResponse.refresh, "refresh");
                      clearSolvedPuzzles();
                      if (djangoResponse.pendingUsernameChoice) {
                        const pendingUserInfo = jwtDecode(credRes.credential || "") as CredentialPayload;
                        sessionStorage.setItem("pendingUserEmail", pendingUserInfo.email);
                        console.log("Pending signup, redirecting to choose username page");
                        router.push(CHOOSE_USERNAME_SLUG);
                        return;
                      }
                      router.push(PROFILE_SLUG);
                    } catch (error) {
                      setError("Unable to authenticate with Google at this time")
                    }
                  }}
                  onError={() => {
                      setError("Unable to authenticate with Google at this time")
                    }
                  }
                  size="large"
                  shape = "pill"
                  containerProps={{ style: { marginTop: "1.5em", marginBottom: "2em" } }}
                  />
        {error && <Typography variant="h5" sx={{my:"0.5em"}}>Log in to your account</Typography>}
      </StyledCard>
  );
};

export default LoginForm;