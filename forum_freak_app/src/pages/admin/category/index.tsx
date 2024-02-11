import { getCategory } from "@/pages/api/category.api";
import Header from "@/pages/components/header";
import Table from "@/pages/components/table";
import { categoryHead } from "@/pages/constants/table";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";

export default function Category() {
  const [category, setCategory] = useState([]);

  const getAllCategory = async (token: string | null) =>
    getCategory(token).then((res: any) => {
      if (res) {
        setCategory(res);
      }
    });

  useEffect(() => {
    getAllCategory(localStorage.getItem("token"));
  });

  return (
    <main className={`min-h-screen`}>
      <div>
        <Navbar />
        <Header title="Lists of category" size={"text-3xl"} />
        <Table head={categoryHead} title="category" body={category} />
      </div>
    </main>
  );
}
