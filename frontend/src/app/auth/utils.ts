import wretch from "wretch";
import Cookies from "js-cookie";
import { backendBaseUrl, googleClientId } from "../_common/constants";

const api = wretch(backendBaseUrl).options({ credentials: 'include' }).accept("application/json");
type GoogleTokens = {
  access: string;
  refresh: string;
  pendingSignup?: boolean;
};


const storeToken = (token: string, type: "access" | "refresh") => {
  Cookies.set(type + "Token", token);
};

const getToken = (type: string) => {
  return Cookies.get(type + "Token");
};

const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

const register = (email: string, username: string, password: string) => {
  return api.post({ email, username, password }, "auth/users/");
};

const getGoogleJwt = async (): Promise<GoogleTokens> => {
  const tokens = await api
    .headers({ "X-CSRFToken": Cookies.get("csrftoken") ?? "" })
    .post({}, "auth/get-jwt/")
    .json<GoogleTokens>();
  return {
    access: tokens.access,
    refresh: tokens.refresh,
  };
};

const login = async (idToken: string): Promise<GoogleTokens> => {
  await api.get("auth/csrf/").res();
  try {
    await api
      .headers({ "X-CSRFToken": Cookies.get("csrftoken") ?? "" })
      .post({
        provider: "google",
        process: "login",
        token: {
          id_token: idToken,
          client_id: googleClientId
        }
      }, "_allauth/browser/v1/auth/provider/token")
        .res();
  } catch (error) {
    if (error instanceof Error && (error as { status?: number }).status === 401) {
      return { access: "", refresh: "", pendingSignup: true };
    }
    throw error;
  }
  return getGoogleJwt();
};

const completeProviderSignup = async (username: string) => {
  await api
    .headers({ "X-CSRFToken": Cookies.get("csrftoken") ?? "" })
    .post({ username }, "_allauth/browser/v1/auth/provider/signup")
    .res();
  return getGoogleJwt();
};

const setUsername = (username: string) => {
  return api.patch({ username }, "setUsername");
};

const logout = () => {
  const refreshToken = getToken("refresh");
  return api.post({ refresh: refreshToken }, "auth/logout/");
};

const handleJWTRefresh = async () => {
  const refreshToken = getToken("refresh");
  const response = await api
    .post({ refresh_token: refreshToken }, "_allauth/app/v1/tokens/refresh")
    .json<{ data: { access_token: string; refresh_token?: string } }>();
  if (!refreshToken) {
    throw new Error("No refresh token is available.");
  }
  const nextRefreshToken = response.data.refresh_token ?? refreshToken;
  return {
    access: response.data.access_token,
    refresh: nextRefreshToken,
  };
};

const resetPassword = (email: string) => {
  return api.post({ email }, "auth/users/reset_password/");
};

const resetPasswordConfirm = (
  new_password: string,
  re_new_password: string,
  token: string,
  uid: string
) => {
  return api.post(
    { uid, token, new_password, re_new_password },
    "auth/users/reset_password_confirm/"
  );
};

export const AuthActions = () => {
  return {
    login,
    completeProviderSignup,
    setUsername,
    resetPasswordConfirm,
    handleJWTRefresh,
    register,
    resetPassword,
    storeToken,
    getToken,
    logout,
    removeTokens,
  };
};
