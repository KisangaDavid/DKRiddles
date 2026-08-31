import wretch from "wretch";
import Cookies from "js-cookie";
import { backendBaseUrl, googleClientId } from "../_common/constants";

const api = wretch(backendBaseUrl).options({ credentials: 'include' }).accept("application/json");
type LoginResponse = {
  access: string;
  refresh: string;
  email?: string;
  pendingUsernameChoice?: boolean;
};

interface DjangoLoginResponse {
  status: number;
  data: {
    user: {
      username: string;
      email: string;
    };
  }
  meta: {
    is_authenticated: boolean;
  }
}

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

const getJwts = async (): Promise<LoginResponse> => {
  const tokens = await api
    .headers({ "X-CSRFToken": Cookies.get("csrftoken") ?? "" })
    .post({}, "auth/get-jwt/")
    .json<LoginResponse>();
  console.log("tokens are", tokens)
  return {
    access: tokens.access,
    refresh: tokens.refresh,
  };
};

const login = async (jwt: string): Promise<LoginResponse> => {
  await api.get("auth/csrf/").res();
  // TODO: better way to do csrf token
  console.log("should be id token:", jwt)
  console.log("within the try stuff")
  const django_login_response: DjangoLoginResponse = await api
    .headers({ "X-CSRFToken": Cookies.get("csrftoken") ?? "" })
    .post({
      provider: "google",
      process: "login",
      token: {
        id_token: jwt,
        client_id: googleClientId
      }
    }, "_allauth/browser/v1/auth/provider/token")
    .json();
    const pendingUsernameChoice = django_login_response.data.user.username.startsWith("__pending__");
    const email = django_login_response.data.user.email;
    const tokens = await getJwts();
    return { ...tokens, email, pendingUsernameChoice };
};

// const completeProviderSignup = async (username: string, email: string) => {
//   await api
//     .headers({ "X-CSRFToken": Cookies.get("csrftoken") ?? "" })
//     .post({ username, email }, "_allauth/browser/v1/auth/provider/signup")
//     .res();
//   return getJwts();
// };

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
