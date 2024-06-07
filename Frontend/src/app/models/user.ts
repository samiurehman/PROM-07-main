// export interface UserFormValues {
//   email: string;
//   password: string;
//   displayName?: string;
//   username?: string;
// }

export interface UserLoginValues {
  email: string;
  password: string;
}

export interface UserRegisterValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: number;
  role?: string;
}

export interface userLoginResponse {
  status: string;
  data: {
    id: string;
    username: string;
    email: string;
    token: string;
  };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  user: boolean;
  Role?: string;
}
