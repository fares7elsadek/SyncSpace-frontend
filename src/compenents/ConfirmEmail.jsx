import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const navigate = useNavigate();
  const code = searchParams.get("code");
  
  useEffect(() => {
    if (code) {
      confirmEmail(code);
    }
  }, []);

  const confirmEmail = async (code) => {
    try {
      await axios.get(`https://syncspace.runasp.net/api/Auth/confirmEmail?userId=${userId}&code=${code}`)
      .then(response =>{
        toast.success(`${response.data.result}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "toast-container",
            bodyClassName: "toast-body",
            progressClassName: "toast-progress",
          });
          setTimeout(() => navigate("/login"), 3000);
      }).catch(error =>{
        toast.error(error.response.data.errors[0], {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "toast-container",
            bodyClassName: "toast-body",
            progressClassName: "toast-progress",
          });
      });
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return <div>Processing email confirmation...</div>;
};

export default ConfirmEmail;
