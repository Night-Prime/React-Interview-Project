import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";

const AdminLoginPage = () => {
  const {dispatch: globalDispatch} = React.useContext(GlobalContext);
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { dispatch: authDispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    data = {
      ...data,
      // adding role to the payload
      role: "admin",
    };
    console.log(data);
    let sdk = new MkdSDK();
    try {
      const response = await sdk.login(data.email, data.password, data.role);
      console.log(response);
      const token = localStorage.getItem("token", JSON.stringify(response.token))
      console.log(token);
      const role = response.role
      console.log(role);

      // if the role is actually admin, should navigate to admin dashboard
      if (response) {
        showToast(globalDispatch, 'Login Sucessful');
        authDispatch({
          type: "LOGIN",
          payload: {
            user: data,
            role:role,
            token:token,
          },
        });
        navigate("/admin/dashboard");
      }
    } catch (error) {
      // handle any errors that might occur during the login or role check process
      setError("email", {
        type: "manual",
        message: error.message,
      });
    }
  };
  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 "
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="******************"
            {...register("password")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">
            {errors.password?.message}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value="Sign In"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
