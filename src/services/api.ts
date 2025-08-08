import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/signup`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Signup failed";
      throw new Error(message);
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/signin`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  },
};

export const tokenStorage = {
  setTokens(accessToken: string, refreshToken: string) {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("refreshToken", refreshToken);

    document.cookie = `accessToken=${accessToken}; path=/; max-age=86400; SameSite=Strict`;
    document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; SameSite=Strict`;
  },

  getAccessToken(): string | null {
    return sessionStorage.getItem("accessToken");
  },

  getRefreshToken(): string | null {
    return sessionStorage.getItem("refreshToken");
  },

  clearTokens() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");

    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  },

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  },
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/doc-collab/users/forgot-password`,
      { email },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to send OTP";
    throw new Error(message);
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/doc-collab/users/verify-otp`,
      { email, otp },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Invalid OTP";
    throw new Error(message);
  }
};

export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/doc-collab/users/reset-password`,
      { email, otp, newPassword },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || "Failed to reset password";
    throw new Error(message);
  }
};
