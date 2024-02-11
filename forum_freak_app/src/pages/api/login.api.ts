import axios from "axios";
import { BASE_URL } from "../constants/base_url";

// api de connection des utilisateurs
const LoginApi = async (pseudo: string, password: string) => {
  try {
    let result = null;
    const payload = {
      pseudo: pseudo,
      password: password,
    };
    await axios.post(`${BASE_URL}/auth/login`, payload).then((res: any) => {
      if (res.status === 201 || res.status === 200) {
        result = res?.data?.data;
        localStorage.setItem("token", res?.data?.data?.accessToken);
        localStorage.setItem("role", res?.data?.data?.user?.role);
      }
    });

    return result;
  } catch (error) {
    console.log("Error getting login", error);
  }
};
export default LoginApi;
