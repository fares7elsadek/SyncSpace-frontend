import logo from '../logo/logo.svg'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";


const API_URL = "https://syncspace.runasp.net/api"
const Register = () => {
    const navigate = useNavigate();
    const formSchema = z.object({
      username: z.string().min(1, "Username is required"),
      email: z.string().email("Enter a valid email"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters and include special characters, uppercase, and lowercase letters"),
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(formSchema),
    });


    const onSubmit = async (data) => {
      const dataToBeSent = {
        userName: data.username,
        email: data.email,
        password: data.password,
      };
      await axios
      .post(`${API_URL}/auth/register`, dataToBeSent)
      .then((response) => {
        toast.success("Account created! Check your email.", {
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
      })
      .catch((error) => {
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
    };

    return (
      <>
      <div class="h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="SyncSpace"
              src={logo}
              className="mx-auto h-20 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
              Register new account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm/6 font-medium text-white">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    {...register("username")}
                    required
                    autoComplete="username"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    {...register("email")}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
                </div>
              </div>
  
              <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                    Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    {...register("password")}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already registered?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Login in
              </Link>
            </p>
          </div>
        </div>
      </div>
      </>
    )
  }
  
  export default Register;