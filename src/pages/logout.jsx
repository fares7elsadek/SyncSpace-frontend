import { removeTokens } from "../utils/tokenService";
import { toast } from "react-toastify";

const Logout = () => {
  const handleLogout = () => {
    removeTokens();
    toast.success("Logged out successfully.");
    window.location.href = "/login";
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
