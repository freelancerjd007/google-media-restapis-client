export const getLocalStorageItems = () => {
  const accessToken = localStorage.getItem("accessToken");
  const expirationDate = localStorage.getItem("expirationDate");
  return {
    accessToken,
    expirationDate,
  };
};

export const newExpirationDate = () => {
  var expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  return expiration;
};

export const tokenExpired = () => {
  const now = new Date().getTime();
  const expirationDate = localStorage.getItem("expirationDate");
  const expDate = new Date(expirationDate).getTime();
  if (now > expDate) {
    return true; // token expired
  }
  return false; // valid token
};
