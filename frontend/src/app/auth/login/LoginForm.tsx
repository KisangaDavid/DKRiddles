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

// TODO: investigate back button from forgot password page

type FormData = {
  username: string;
  password: string;
};

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  
  const { clearSolvedPuzzles } = useContext(SolvedPuzzlesContext);
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await login(data.username, data.password)
      .json((json) => {
        storeToken(json.access, "access");
        storeToken(json.refresh, "refresh");
        clearSolvedPuzzles();
        router.push("/profile");
      })
      .catch((err) => setError("root", { type: "manual", message: JSON.parse(err.message).detail}));
    setLoading(false);
  };

  return (
      <StyledCard sx={{ width: {xs: "80%", sm: "60%", md: "45%", lg: "30%" }, mt: {xs: "2em", md: "4em"}}}>
        <Typography variant="h5" sx={{my:"0.5em"}}>Log in to your account</Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "1em" }}>
          <div>
            <TextField
              sx = {{width: "80%"}}
              id="username"
              variant="outlined"
              size="medium"
              label="Username"
              {...register("username", { 
                required: true,
                onChange: (e) => setError("root", { type: "manual", message: ""}) 
              })}
            />
            <Box sx={{minHeight: "1.4em", display: "flex", justifyContent: "center"}}>
            {errors.username && (
              <Typography sx={{fontSize: "0.875em", color: "#b81818", width: "80%" }}>Username is required</Typography>
            )}
            </Box>
          </div>
            <TextField
              sx = {{
                width: "80%",
                mt: "0.3em",
              }}
              id="password"
              type="password"
              variant="outlined"
              size="medium"
              autoComplete="off"
              label="Password"
              {...register("password", { 
                required: true,
                onChange: (e) => setError("root", { type: "manual", message: ""})
              })}
            />
            <Box sx={{minHeight: "1.4em", display: "flex", justifyContent: "center"}}>
            {errors.password && (
              <Typography style={{fontSize: "0.875em", color: "#b81818", width: "80%"  }}>Password is required</Typography>
            )}
            </Box>
          <SubmitButton sx={{width: "80%", mt: "0.3em"}} loading={loading}>
            <Typography>Log in</Typography>
          </SubmitButton>
           <Box sx={{minHeight: "1.4em", display: "flex", justifyContent: "center"}}>
          {errors.root &&
            (
              <Typography style={{fontSize: "0.875em", color: "#b81818", width: "80%"  }}>{errors.root.message}</Typography>
            )
        }
          </Box>
        </form>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{mb: "1em"}}
        >
          <Link
            href="/auth/password/reset-password"
            style={{ fontSize: "0.875em", color: "#2563eb", textDecoration: "none" }}
          >
            Forgot password?
          </Link>
              <Divider sx={{width: "80%"}} >
                <Typography>or</Typography>
              </Divider>
          <Link
            href="/auth/createAccount"
            style={{ fontSize: "0.875em", marginBottom: "0.5em", color: "#2563eb", textDecoration: "none" }}
          >
            Create new account
          </Link>
        </Stack>
        <BreakdownUnlockedNotification
          open={newUser != null}
          onClose={() => setNewUser(null)}
          text={`Successfully created new account with username ${newUser}`}
        />
      </StyledCard>
  );
};

export default LoginForm;