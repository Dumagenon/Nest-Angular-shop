export interface UserLogin {
  login: string;
  password?: string;
}

export interface UserSignUp {
  login: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: any;
  token: string;
}
