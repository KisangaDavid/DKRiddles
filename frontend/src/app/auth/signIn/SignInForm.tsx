"use client"

import { useContext, useState } from "react";
import { Typography } from "@mui/material";
import { AuthActions } from "@/src//app/auth/utils";
import { useRouter } from "next/navigation";
import StyledCard from "@/src/app/_common/StyledCard";
import { SolvedPuzzlesContext } from "../../_common/SolvedPuzzlesContextProvider";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { CHOOSE_USERNAME_SLUG, PROFILE_SLUG } from "../../_common/constants";

interface CredentialPayload extends JwtPayload {
  email: string;
}

const LoginForm = () => {
  const { login, storeToken } = AuthActions();
  const router = useRouter();
  const [error, setError] = useState<null | string>(null)
  const { clearSolvedPuzzles } = useContext(SolvedPuzzlesContext);

  return (
      <StyledCard sx={{ width: {xs: "80%", sm: "60%", md: "45%", lg: "30%" }, mt: {xs: "2em", md: "4em"}, justifyContent:"center",
          alignItems:"center"}}>
        <Typography variant="h5" sx={{my:"0.5em"}}>Sign in using Google</Typography>
        <GoogleLogin 
                  onSuccess={async (credRes) => {
                    try {
                      const djangoResponse = await login(credRes.credential || "");
                      storeToken(djangoResponse.access, "access");
                      storeToken(djangoResponse.refresh, "refresh");
                      clearSolvedPuzzles();
                      if (djangoResponse.pendingUsernameChoice) {
                        const pendingUserInfo = jwtDecode(credRes.credential || "") as CredentialPayload;
                        sessionStorage.setItem("pendingUserEmail", pendingUserInfo.email);
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
        {error && <Typography sx={{ fontSize: "0.875em", color: "#b81818", width: "80%" }}>{error}</Typography>}
      </StyledCard>
  );
};

export default LoginForm;