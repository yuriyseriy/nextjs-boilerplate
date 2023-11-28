const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

const _postRequest = async (url: string, params: any) => {
  const res = await fetch(`${NEXT_PUBLIC_URL}/api/${url}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  return res.json();
};

export const signUp = (email: string, password: string) => {
  return _postRequest("auth/signup", { email, password });
};

export const resetPasswordForEmail = (email: string) => {
  return _postRequest("auth/forgotPassword", { email });
};
