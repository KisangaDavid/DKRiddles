"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "@/src/app/auth/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { standardTextFade } from "@/src/app/_common/constants";
import StyledCard from "@/src/app/_common/StyledCard";
import { Fade, TextField, Typography } from "@mui/material";
import SubmitButton from "@/src/app/_common/SubmitButton";
type FormData = {
  password: string;
};

const ResetPasswordConfirmationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const { resetPasswordConfirm } = AuthActions();

  const searchParams = useSearchParams();

  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (searchParams.get("uid") && searchParams.get("token")) {
      setUid(searchParams.get("uid") as string);
      setToken(searchParams.get("token") as string);
    }
  }, [searchParams]);

  const onSubmit = async (data: FormData) => {
    try {
      await resetPasswordConfirm(
        data.password,
        data.password,
        token,
        uid,
      ).res();
      alert("Password has been reset successfully.");
      router.push("/auth/login");
    } catch (err) {
      alert("Failed to reset password. Please try again.");
    }
  };

  return (
    <Fade unmountOnExit mountOnEnter in={true} timeout={standardTextFade}>
        <StyledCard sx={{ width: {xs: "80%", sm: "60%", md: "45%", lg: "30%" }, mt: {xs: "2em", md: "4em"}}}>
            <Typography variant="h5" sx={{my:"0.5em"}}>Set New Password</Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "1em" }}>
                <TextField
                    sx = {{width: "80%"}}
                    type="password"
                    id="username"
                    variant="outlined"
                    size="medium"
                    label="Password"
                    placeholder="Enter your new password"
                    {...register("password", { required: true })}
                />
                {errors.password && (
                    <span className="text-xs text-red-600">Password is required</span>
                )}
                <SubmitButton sx={{width: "80%", mt: "1.5em", mb: "1em"}}>
                    <Typography>Reset Password</Typography>
                </SubmitButton>
            </form>
      </StyledCard>
    </Fade>
  );
};

export default ResetPasswordConfirmationForm;