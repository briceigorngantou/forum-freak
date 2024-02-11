import { saveCategory } from "@/pages/api/category.api";
import Navbar from "@/pages/components/navbar";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const handleOnchangeName = (e: any) => {
    setName(e.target.value);
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
    if (getRole() === "admin") {
      const result = await saveCategory(
        name,
        description,
        localStorage.getItem("token")
      )
        .then((res: any) => {
          router.push("/admin/category");
        })
        .catch((error: any) => {
          console.log(error);
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
            Add new Category
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name Of Category
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                onChange={(e: any) => {
                  handleOnchangeName(e);
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
                name="description"
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
