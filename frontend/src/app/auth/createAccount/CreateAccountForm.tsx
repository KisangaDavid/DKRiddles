"use client"

import { useForm } from "react-hook-form";
import { AuthActions } from "@/src/app/auth/utils";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import SubmitButton from "@/src/app/_common/SubmitButton";
import StyledCard from "@/src/app/_common/StyledCard";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { standardTextFade } from "../../_common/constants";
import Fade from "@mui/material/Fade";


type FormData = {
  email: string;
  username: string;
  password: string;
};

const CreateAccountForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const router = useRouter();
    const [backendError, setBackendError] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const { register: registerUser} = AuthActions();

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        await registerUser(data.email, data.username, data.password)
            .json(() => {
              sessionStorage.setItem("newUser", data.username);
              router.push("/auth/login");
            })
            .catch((err) => {
              if (err.status == 429) {
                console.log("error is", err);
                console.log("error message is", err.message);
                // console.log()
                setBackendError({ email: JSON.parse(err.message).detail});
              }
              else {
                setBackendError(JSON.parse(err.message));
              }
            });
        setLoading(false);          
    };

    return (
      <Fade unmountOnExit mountOnEnter in={true} timeout={standardTextFade}>
        <StyledCard sx={{ width: {xs: "80%", sm: "60%", md: "45%", lg: "30%" }, mt: {xs: "2em", md: "4em"}}}>
          <Typography variant="h5" sx={{my:"0.5em"}}>Create an Account</Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '1em' }}>
            <div>
              <TextField
                sx = {{width: "80%"}}
                id="username"
                variant="outlined"
                size="medium"
                label="Username"
                {...register("username", { 
                  required: "Username is required",
                  onChange: (e) => setBackendError((prev) => ({ ...prev, username: "" }))
                })}
              />
              <Box sx={{minHeight: "1.4em",  display: "flex", justifyContent: "center"}}>
                {!errors.username && backendError.username && (
                  <Typography sx={{fontSize: "0.875em", color: "#b81818", width: "80%"}}>{backendError.username}</Typography>
                )}
                {errors.username && (
                  <Typography sx={{fontSize: "0.875em", color: "#b81818", width: "80%"}}>{errors.username.message}</Typography>
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
                  required: "Password is required",
                  onChange: (e) => setBackendError((prev) => ({ ...prev, password: "" })) 
                })}
              />
              <Box sx={{minHeight: "1.4em", display: "flex", justifyContent: "center"}}>
                {!errors.password && backendError.password && (
                  <Typography sx={{fontSize: "0.875em", color: "#b81818", width: "80%"}}>{backendError.password}</Typography>
                )}
                {errors.password && (
                    <Typography sx={{fontSize: "0.875em", color: "#b81818", width: "80%"}}>{errors.password.message}</Typography>
                )}
              </Box>
              <TextField
                sx = {{
                  width: "80%",
                  mt: "0.3em",
                }}
                id="email"
                type="text"
                variant="outlined"
                size="medium"
                autoComplete="off"
                label="Email (Optional)"
                {...register("email", {
                  onChange: (e) => setBackendError((prev) => ({ ...prev, email: "" }))
                })}
              />
              <Box sx={{minHeight: "1.4em", display: "flex", justifyContent: "center"}}>
                {!errors.email && backendError.email && (
                  <Typography sx={{fontSize: "0.875em", color: "#b81818", width: "80%"}}>{backendError.email}</Typography>
                )}
                {errors.email && (
                  <Typography sx={{fontSize: "0.875em", color: "#b81818", width: "80%"}}>{errors.email.message}</Typography>
                )}
              </Box>
              <SubmitButton sx={{width: "80%", mt: "0.3em", mb: "2em"}} loading={loading}>
                <Typography>Create Account</Typography>
              </SubmitButton>
          </form>
        </StyledCard>
      </Fade>
  );
};

export default CreateAccountForm;