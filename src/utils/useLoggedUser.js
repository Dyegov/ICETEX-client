import { jwtDecode } from "jwt-decode";

export const useLoggedUser = () => {
  const token = localStorage.getItem("token");
  let loggedUser = undefined;
  if (token) {
    loggedUser = jwtDecode(token);
    if (loggedUser.exp < Date.now() / 1000) {
      localStorage.clear();
    }
  }
  return { loggedUser };
};
