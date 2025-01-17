export const getAccessToken = () => localStorage.getItem("accessToken");


export const setTokens = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

export const removeTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("avatar");
};
