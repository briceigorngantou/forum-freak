import axios from "axios";
import { BASE_URL } from "../constants/base_url";

const CommentApi = async (
  userId: number,
  topicId: number,
  message: string,
  token: string | null
) => {
  try {
    let result = null;
    const payload = {
      userId,
      topicId,
      message,
      deleted: false,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    await axios
      .post(`${BASE_URL}/comments`, payload, headers)
      .then((res: any) => {
        if (res.status === 200 || res.status === 201) {
          result = res?.data;
        }
      });

    return result;
  } catch (error) {
    console.log("Error saving comments", error);
  }
};

const getCommentByTopicId = async (token: string | null, topicId: number) => {
  try {
    let result = null;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
    };
    await axios
      .get(`${BASE_URL}/comments/${topicId}`, headers)
      .then((res: any) => {
        if (res.status === 200 || res.status === 201) {
          result = res?.data;
        }
      });
    return result;
  } catch (error) {
    console.log("Error getting comments info", error);
  }
};
export { CommentApi, getCommentByTopicId };
