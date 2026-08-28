import wretch from "wretch";
import Cookies from "js-cookie";
import { backendBaseUrl, googleClientId } from "../_common/constants";

const api = wretch(backendBaseUrl).options({ credentials: 'include' }).accept("application/json");


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

const login = async (idToken: string) => {
  await api.get("auth/csrf/").res();
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
    const tokens = await api
      .headers({ "X-CSRFToken": Cookies.get("csrftoken") ?? "" })
      .post({}, "auth/get-jwt/")
      .json<{ access: string; refresh: string }>();
  return {
      access: tokens.access,
      refresh: tokens.refresh,
  };
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
