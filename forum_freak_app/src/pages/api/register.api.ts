import axios from "axios";
import { BASE_URL } from "../constants/base_url";

// api de creation des utilisateurs
const RegisterApi = async (
  pseudo: string,
  email: string,
  banner: string,
  birthDate: string,
  password: string,
  role: string
) => {
  try {
    let result = null;
    const payload = {
      pseudo,
      email,
      password,
      banner,
      role,
      birthDate,
      deleted: false,
      activated: false,
    };

    await axios.post(`${BASE_URL}/auth/register`, payload).then((res: any) => {
      if (res.status === 200 || res.status === 201) {
        result = res?.data;
      }
    });

    return result;
  } catch (error) {
    console.log("Error getting register", error);
  }
};
export default RegisterApi;
