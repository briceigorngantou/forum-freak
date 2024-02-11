import axios from "axios";
import { BASE_URL } from "../constants/base_url";

// api retourne la liste des categories
const getCategory = async (token: string | null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    let result = null;
    await axios.get(`${BASE_URL}/category`, headers).then((res: any) => {
      if (res.status === 200 || res.status === 201) {
        result = res?.data?.data;
      }
    });
    return result;
  } catch (error) {
    console.log("Error getting category info", error);
  }
};

// api enregistre une categorie
const saveCategory = async (
  name: string,
  description: string,
  token: string | null
) => {
  try {
    let result = null;
    const payload = {
      name: name,
      description: description,
      deleted: false,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    await axios
      .post(`${BASE_URL}/category`, payload, headers)
      .then((res: any) => {
        if (res.status === 201 || res.status === 200) {
          result = res?.data?.data;
        }
      });

    return result;
  } catch (error) {
    console.log("Error saving category", error);
  }
};

// api de suppression d'une categorie
const deleteCategory = async (id: number, token: string | null) => {
  try {
    let result = null;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    await axios
      .delete(`${BASE_URL}/category/${id}`, headers)
      .then((res: any) => {
        if (res.status === 201 || res.status === 200 || res.status === 202) {
          result = res?.data?.data;
        }
      });

    return result;
  } catch (error) {
    console.log("Error deleting category", error);
  }
};
export { getCategory, saveCategory, deleteCategory };
