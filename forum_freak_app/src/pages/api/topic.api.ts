import axios from "axios";
import { BASE_URL } from "../constants/base_url";

const getTopics = async (token: string | null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    let result = null;
    await axios.get(`${BASE_URL}/topics`, headers).then((res: any) => {
      if (res.status === 200 || res.status === 201) {
        result = res?.data?.data;
      }
    });
    return result;
  } catch (error) {
    console.log("Error getting topics info", error);
  }
};

const saveTopic = async (
  title: string,
  description: string,
  userId: number,
  categoryId: number,
  token: string | null
) => {
  try {
    let result = null;
    const payload = {
      title: title,
      message: description,
      userId: userId,
      categoryId: categoryId,
      deleted: false,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    await axios
      .post(`${BASE_URL}/topics`, payload, headers)
      .then((res: any) => {
        if (res.status === 201 || res.status === 200) {
          result = res?.data?.data;
        }
      });

    return result;
  } catch (error) {
    console.log("Error saving topic", error);
  }
};

// api de suppression d'un topic
const deleteTopic = async (id: number, token: string | null) => {
  try {
    let result = null;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    await axios.delete(`${BASE_URL}/topics/${id}`, headers).then((res: any) => {
      if (res.status === 201 || res.status === 200 || res.status === 202) {
        result = res?.data?.data;
      }
    });

    return result;
  } catch (error) {
    console.log("Error deleting topic", error);
  }
};

export { getTopics, saveTopic, deleteTopic };
