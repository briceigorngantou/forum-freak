import Link from "next/link";
import { useRouter } from "next/router";
import { deleteCategory } from "../api/category.api";
import { deleteTopic } from "../api/topic.api";
import { deleteUser } from "../api/user.api";
import tableInterface from "../interfaces/table.interface";
import Pagination from "./pagination";

export default function Table({ head, body, title }: tableInterface) {
  const router = useRouter();
  const handleDelete = async (id: number) => {
    if (title.toLowerCase() == "category") {
      await deleteCategory(id, localStorage.getItem("token")).then(
        (res: any) => {
          router.push("/admin/category");
        }
      );
    }
    if (title.toLowerCase() == "users") {
      await deleteUser(id, localStorage.getItem("token")).then((res: any) => {
        router.push("/admin/users");
      });
    }
    if (title.toLowerCase() == "topics") {
      await deleteTopic(id, localStorage.getItem("token")).then((res: any) => {
        router.push("/admin/topics");
      });
    }
  };
  return (
    <div className="m-10">
      <div className="relative p-5 flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
          <div className="flex flex-col justify-between gap-8 mb-4 md:flex-row md:items-center">
            <div>
              <p className="block mt-1 font-sans text-2xl antialiased font-normal leading-relaxed text-gray-700">
                These are details about the last {title}
              </p>
            </div>
            <div className="flex w-full gap-2 shrink-0 md:w-max">
              {title.toLowerCase() == "category" && (
                <button
                  className="flex select-none items-center gap-3  rounded-lg bg-gray-900 p-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  <Link href="/admin/category/add">New Category</Link>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="p-6 px-0 overflow-scroll">
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                {head.map((value: any, key) => (
                  <th
                    className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                    key={key}
                  >
                    <p
                      className="block font-sans text-sm antialiased leading-none text-blue-gray-900 opacity-70"
                      key={key}
                    >
                      {value}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            {title.toLowerCase() == "category" && (
              <tbody>
                {body.map((value: any, key) => (
                  <tr key={key}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.id}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.name}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.description}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.date_created}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <button
                        className="relative h-10 max-h-[40px] w-30 max-w-[60px] p-2 mx-1 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-blue-500 transition-all hover:bg-blue-500 hover:text-white active:bg-blue-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(value?.id);
                        }}
                        className="relative h-10 max-h-[40px] w-30 max-w-[60px] p-2 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500 hover:text-white active:bg-red-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
            {title.toLowerCase() == "users" && (
              <tbody>
                {body.map((value: any, key) => (
                  <tr key={key}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.id}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.pseudo}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.email}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.banner}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.birthDate}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.date_created}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <button
                        onClick={() => {
                          handleDelete(value?.id);
                        }}
                        className="relative h-10 max-h-[40px] w-30 max-w-[60px] p-2 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500 hover:text-white active:bg-red-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
            {title.toLowerCase() == "topics" && (
              <tbody>
                {body.map((value: any, key) => (
                  <tr key={key}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.id}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.title}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.message}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block font-sans text-sm antialiased leading-normal text-blue-gray-900">
                        {value?.date_created}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <button
                        onClick={() => {
                          handleDelete(value?.id);
                        }}
                        className="relative h-10 max-h-[40px] w-30 max-w-[60px] p-2 select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500 hover:text-white active:bg-red-500 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
        <Pagination />
      </div>
    </div>
  );
}
