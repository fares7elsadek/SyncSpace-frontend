export const isAuthenticated = () => {
    return !!localStorage.getItem("accessToken");
};