import { API_BASE_URL } from "../constants/Texts";

export const signUp = async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      throw new Error('Failed to sign up');
    }
    return response.json();
  };
  
  export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Failed to log in');
    }
    return response.json();
  };