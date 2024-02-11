import { getUsers } from "@/pages/api/user.api";
import Header from "@/pages/components/header";
import Table from "@/pages/components/table";
import { userHead } from "@/pages/constants/table";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";

export default function Users() {
  const [users, setUsers] = useState([]);

  const getAllUser = async (token: string | null) => {
    getUsers(token).then((res: any) => {
      if (res) {
        setUsers(res);
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    getAllUser(token);
  });

  return (
    <main className={`min-h-screen`}>
      <div>
        <Navbar />
        <Header title="Lists of users" size={"text-3xl"} />
        <Table head={userHead} title="users" body={users} />
      </div>
    </main>
  );
}
