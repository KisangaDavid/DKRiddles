"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Box, TextField, Typography } from "@mui/material";
import SubmitButton from "@/src/app/_common/SubmitButton";
import StyledCard from "@/src/app/_common/StyledCard";
import { AuthActions } from "../utils";
import { patcher } from "../../_common/ClientUtils";

type FormData = { username: string };
export default function ChooseUsernameForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async ({ username }: FormData) => {
    setLoading(true);
    setBackendError("");
    try {
        await patcher("setUsername", { username });
        router.push("/profile");
    } catch (error: unknown) {
      try {
        const details = JSON.parse(error instanceof Error ? error.message : "");
        setBackendError(details.username || "Unable to save that username.");
      } catch {
        setBackendError("Unable to save that username.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledCard sx={{ width: { xs: "80%", sm: "60%", md: "45%", lg: "30%" }, mt: { xs: "2em", md: "4em" } }}>
      <Typography variant="h5" sx={{ my: "0.5em" }}>Select a username</Typography>
      <Typography sx={{ width: "80%", mb: "1em" }}>This will show up on the global leaderboard.</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          sx={{ width: "80%" }}
          id="username"
          label="Username"
          autoFocus
          {...register("username", { required: "Username is required" })}
        />
        <Box sx={{ minHeight: "1.4em", display: "flex", justifyContent: "center" }}>
          {(errors.username || backendError) && (
            <Typography sx={{ fontSize: "0.875em", color: "#b81818", width: "80%" }}>
              {errors.username?.message || backendError}
            </Typography>
          )}
        </Box>
        <SubmitButton sx={{ width: "80%", mt: "0.3em", mb: "2em" }} loading={loading}>
          <Typography>Continue</Typography>
        </SubmitButton>
      </form>
    </StyledCard>
  );
}