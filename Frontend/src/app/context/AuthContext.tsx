import { ReactNode, createContext, useReducer } from "react";
import {
  AuthActionKind,
  AuthContextType,
  AuthDispatch,
  AuthState,
} from "../models/auth";

interface Props {
  children?: ReactNode;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("jwt"),
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
};

function authReducer(state: AuthState, action: AuthDispatch): AuthState {
  switch (action.type) {
    case AuthActionKind.LOGIN:
      return {
        ...state,
        token: action.payload!.token!,
        isLoggedIn: true,
        user: action.payload,
      };

    case AuthActionKind.LOGOUTUSER:
      localStorage.removeItem("jwt");
      return {
        ...state,
        token: null,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
}

export const AuthContext = createContext<null | AuthContextType>({
  state: initialState,
  dispatch: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
