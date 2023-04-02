import { signInWithEmailAndPassword, Auth } from "firebase/auth";

export const loginRequest = (auth: Auth, email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
