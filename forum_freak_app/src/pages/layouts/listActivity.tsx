import { useRouter } from "next/router";
import { people } from "../constants/table";

export default function ListActivity() {
  const router = useRouter();

  const getRole = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("role");
    } else return "";
  };

  const handleSubmitComment = () => {
    if (getRole() == "admin" || getRole() == "user") {
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="bg-white p-5 m-5">
      <ul role="list" className="pb-2 divide-y divide-gray-300">
        {people.map((person) => (
          <li key={person.email} className="">
            <div className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {person.pseudo}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.banner}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {person.email}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Join at {person.lastSeenDateTime}
                </p>
              </div>
            </div>
            <div className="pb-2">
              <h1>{person.message}</h1>
            </div>
          </li>
        ))}
      </ul>
      <div className="my-4 col-span-full">
        <label
          htmlFor="comment"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Comment
        </label>
        <div className="mt-2">
          <textarea
            id="comment"
            name="comment"
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
          />
        </div>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          Write your opinion
        </p>
      </div>
      <button
        type="submit"
        onClick={handleSubmitComment}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Comment
      </button>
    </div>
  );
}
