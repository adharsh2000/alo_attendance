import { useMutation } from "react-query";
import * as auth from "@/services/auth/auth";

export const useAppLogin = () => {
    return useMutation((formData) => auth.appLogin(formData));
};
