import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // created this function to check token validity
  const checkTokenValidity = async (token, role) => {
    try {
      const response = await fetch(sdk._baseurl + "/v2/api/lambda/check", {
        method: "POST",
        headers: sdk.getHeader(),
        body: JSON.stringify({
          role: role,
        }),
      });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      dispatch({ type: "login_failure" });
      console.error(error);
      const token = await sdk.login(email, password);
      checkTokenValidity(token, role);
    }
  };

  React.useEffect(() => {
    if (state.isAuthenticated) {
      const token = localStorage.getItem("token");
      checkTokenValidity(token, "admin");
    }
  }, [state.isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
