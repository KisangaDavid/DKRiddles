import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { AuthActions } from "@/src//app/auth/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@mui/material";

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const router = useRouter();

  const { login, storeToken } = AuthActions();
  const [buttonHovered, setButtonHovered] = useState(false);

  const onSubmit = (data: FormData) => {
    login(data.username, data.password)
      .json((json) => {
        storeToken(json.access, "access");
        storeToken(json.refresh, "refresh");

        router.push("/profile");
      })
      .catch((err) => {
        setError("root", { type: "manual", message: err.json.detail });
      });
  };
// TODO: set error message when  no user / password found
// TODO: rate limit login attempts
// TODO: middlewear that redirects /profile to /login if not logged in
  const StyledCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  background: 'hsla(220, 35%, 3%, 0.4)',
  border: `1px solid hsla(0, 0%, 23%, 0.60)`,
  boxShadow: 'hsla(223, 41%, 3%, 0.70) 0px 0px 20px 0px, hsla(220, 29%, 8%, 0.80) 0px 0px 20px 0px',
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
});

  return (
        <StyledCard sx={{ width: {xs: "80%", sm: "65%", md: "50%", lg: "35%" }, mt: {xs: "2em", md: "4em"}}}>
          <Typography variant="h5" sx={{mt:"0.5em"}}>Log into your account</Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "1rem" }}>
          <div>
            <label style={{ display: "block" }} htmlFor="username">
              <Typography>Username</Typography>
            </label>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
              style={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", marginTop: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.375rem" }}
            />
            {errors.username && (
              <Typography style={{ fontSize: "0.75rem", color: "#dc2626" }}>Username is required</Typography>
            )}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label style={{ display: "block" }} htmlFor="password">
              <Typography>Password</Typography>
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              style={{ paddingLeft: "1rem", paddingRight: "1rem", paddingTop: "0.5rem", paddingBottom: "0.5rem", marginTop: "0.5rem", border: "1px solid #d1d5db", borderRadius: "0.375rem" }}
            />
            {errors.password && (
              <Typography style={{ fontSize: "0.75rem", color: "#dc2626" }}>Password is required</Typography>
            )}
          </div>
            <button 
              style={{ 
                paddingLeft: "3rem", 
                paddingRight: "3rem", 
                paddingTop: "0.5rem", 
                paddingBottom: "0.5rem", 
                lineHeight: "1.25", 
                color: "white", 
                transition: "background-color 200ms, color 200ms",
                backgroundColor: buttonHovered ? "#1d4ed8" : "#2563eb",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                marginTop: "1.5em"
              }}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
            >
              Login
            </button>
          {errors.root && (
            <span style={{ fontSize: "0.75rem", color: "#dc2626" }}>{errors.root.message}</span>
          )}
        </form>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <Link
            href="/auth/password/reset-password"
            style={{ fontSize: "0.875rem", color: "#2563eb", textDecoration: "none" }}
            className="hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </StyledCard>
  );
};

export default Login;