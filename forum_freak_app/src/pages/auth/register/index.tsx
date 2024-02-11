import RegisterApi from "@/pages/api/register.api";
import Navbar from "@/pages/components/navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birtDate, setBirtDate] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [role, setRole] = useState("user");
  const [banner, setBanner] = useState("");

  const router = useRouter();

  const handleOnchangeEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleOnchangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleOnchangePseudo = (e: any) => {
    setPseudo(e.target.value);
  };
  const handleOnchangeBanner = (e: any) => {
    setBanner(e.target.value);
  };

  const handleOnchangeBirthDate = (e: any) => {
    setBirtDate(e.target.value);
  };
  const handleOnchangeRole = (e: any) => {
    setRole(e.target.value);
  };

  const handleSubmit = async () => {
    await RegisterApi(pseudo, email, banner, birtDate, password, role).then(
      (res: any) => {
        if (res) {
          router.push("/auth/login");
        }
      }
    );
  };
  return (
    <main className={`min-h-screen bg-white`}>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Registration
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="pseudo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Pseudo
            </label>
            <div className="mt-2">
              <input
                id="pseudo"
                name="pseudo"
                type="pseudo"
                autoComplete="pseudo"
                onChange={(e: any) => {
                  handleOnchangePseudo(e);
                }}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e: any) => {
                  handleOnchangeEmail(e);
                }}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Birth date
            </label>
            <div className="mt-2">
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                autoComplete="birthDate"
                onChange={(e: any) => {
                  handleOnchangeBirthDate(e);
                }}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="banner"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Banner
            </label>
            <div className="mt-2">
              <input
                id="banner"
                name="banner"
                type="banner"
                autoComplete="banner"
                onChange={(e: any) => {
                  handleOnchangeBanner(e);
                }}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                onChange={(e: any) => handleOnchangePassword(e)}
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="flex w-full my-2 justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              href="/auth/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
