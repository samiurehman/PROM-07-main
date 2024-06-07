export type AuthContextType = {
  state: AuthState;
  dispatch: React.Dispatch<AuthDispatch>;
};

export interface AuthDispatch {
  type: string;
  payload: User | null;
}

export interface AuthState {
  user: null | User;
  token: null | string;
  isLoggedIn: boolean;
}

export enum AuthActionKind {
  LOGIN = "LOGIN",
  LOGOUTUSER = "LOGOUTUSER",
  SETTOKEN = "SETTOKEN",
}

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
  token: string;
  role?: string;
}
