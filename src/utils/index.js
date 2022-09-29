export const storeTokenData = async (token, refreshToken, expirationDate) => {
  sessionStorage.setItem("accessToken", token);
  sessionStorage.setItem("refreshToken", refreshToken);
  sessionStorage.setItem("expirationDate", expirationDate);
};

export const newExpirationDate = () => {
  var expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  return expiration;
};
export const tokenExpired = () => {
  const now = Date.now();

  const expirationDate = sessionStorage.getItem("expirationDate");
  const expDate = new Date(expirationDate);

  if (now > expDate.getTime()) {
    return true; // token expired
  }

  return false; // valid token
};

export const getToken = async () => {
  if (tokenExpired()) {
    const refreshtoken = sessionStorage.getItem("refreshToken");
    const token = await getValidTokenFromServer(refreshtoken);
    sessionStorage.setItem("accessToken", token.accessToken);
    sessionStorage.setItem("expirationDate", newExpirationDate());
    return token.accessToken;
  } else {
    console.log("token not expired");
    return sessionStorage.getItem("accessToken");
  }
};

const getValidTokenFromServer = async (refreshToken) => {
  // get new token from server with refresh token
  try {
    const request = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/google/getValidToken`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      }
    );
    const token = await request.json();
    return token;
  } catch (error) {
    console.log("getValidTokenFromServer catch block error", error);
    throw new Error("Issue getting new token", error.message);
  }
};

export const createGoogleAuthLink = async () => {
  try {
    const request = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/google/createAuthLink`,
      {
        method: "POST",
      }
    );
    const response = await request.json();
    window.location.href = response.url;
  } catch (error) {
    console.log("createGoogleAuthLink catch block error", error);
    throw new Error("Issue with Login", error.message);
  }
};
