"use client"

import { useForm } from "react-hook-form";
import { AuthActions } from "@/src/app/auth/utils";
import StyledCard from "../../../_common/StyledCard";
import { Typography, TextField, Box, Fade } from "@mui/material";
import SubmitButton from "@/src/app/_common/SubmitButton";
import { standardTextFade } from "@/src/app/_common/constants";
import { useRouter } from "next/dist/client/components/navigation";

type FormData = {
  email: string;
};

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { resetPassword } = AuthActions();
  
  const router  = useRouter();
  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword(data.email).res();
      alert("If the provided email has a corresponding account, the password reset email has been sent. Please check your inbox and spam folder.");
      router.push('/auth/login');
    } catch (err) {
      alert("Failed to send password reset email. Please try again.");
    }
  };
    return (
      <Fade in={true} mountOnEnter unmountOnExit timeout={standardTextFade}>
        <StyledCard sx={{ width: {xs: "80%", sm: "60%", md: "45%", lg: "30%" }, mt: {xs: "2em", md: "4em"}}}>
            <Typography variant="h5" sx={{my:"0.5em"}}>Reset Password</Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "1em" }}>
                <TextField
                    sx = {{width: "80%"}}
                    id="email"
                    variant="outlined"
                    size="medium"
                    label="Email"
                    {...register("email", { 
                    required: true,
                    // onChange: (e) => setError("root", { type: "manual", message: ""}) 
                    })}
                />
                <Box sx={{minHeight: "1.4em"}}>
                {errors.email && (
                    <Typography style={{fontSize: "0.875em", color: "#b81818" }}>Email is required</Typography>
                )}
                </Box>
              <SubmitButton sx={{width: "80%", mt: "0.3em", mb: "1em"}}>
                <Typography>Send Reset Email</Typography>
              </SubmitButton>
            </form>
        </StyledCard>
      </Fade>
    )
};

export default ResetPasswordForm;