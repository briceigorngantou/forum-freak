import axios from "axios";
import { BASE_URL } from "../constants/base_url";

const getUsers = async (token: string | null) => {
  try {
    let result = null;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    await axios.get(`${BASE_URL}/users`, headers).then((res: any) => {
      if (res.status === 200 || res.status === 201) {
        result = res?.data?.data;
      }
    });
    return result;
  } catch (error) {
    console.log("Error getting users info", error);
  }
};

const getUserById = async (token: string | null, id: number) => {
  try {
    let result = null;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    await axios.get(`${BASE_URL}/users/${id}`, headers).then((res: any) => {
      if (res.status === 200 || res.status === 201) {
        result = res?.data?.data;
      }
    });
    return result;
  } catch (error) {
    console.log("Error getting user info", error);
  }
};

// api de suppression d'un user
const deleteUser = async (id: number, token: string | null) => {
  try {
    let result = null;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    await axios.delete(`${BASE_URL}/users/${id}`, headers).then((res: any) => {
      if (res.status === 201 || res.status === 200 || res.status === 202) {
        result = res?.data?.data;
      }
    });

    return result;
  } catch (error) {
    console.log("Error deleting user", error);
  }
};

export { getUserById, getUsers, deleteUser };
