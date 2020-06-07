export type UserPayload = {
  username: string;
  userId: string;
};

export type Creds = {
  login: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
};

export type RegisterResponse = {
  success: boolean;
};
