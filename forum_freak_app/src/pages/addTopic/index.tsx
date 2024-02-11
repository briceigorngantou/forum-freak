import Navbar from "@/pages/components/navbar";
import { useRouter } from "next/router";
import { useState } from "react";
import { saveTopic } from "../api/topic.api";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleOnchangeTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleOnchangeDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const getRole = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("role");
    } else return "";
  };

  const handleSubmit = async () => {
    if (getRole() === "user" || getRole() === "admin") {
      const result = await saveTopic(
        title,
        description,
        1,
        1,
        localStorage.getItem("token")
      ).then((res: any) => {
        router.push("/");
      });
      return result;
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <main className={`min-h-screen bg-white`}>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add new Topic
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title Of Topic
            </label>
            <div className="mt-2">
              <input
                id="title"
                title="title"
                type="text"
                autoComplete="title"
                onChange={(e: any) => {
                  handleOnchangeTitle(e);
                }}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="my-4 col-span-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                title="description"
                onChange={(e) => {
                  handleOnchangeDescription(e);
                }}
                rows={3}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
