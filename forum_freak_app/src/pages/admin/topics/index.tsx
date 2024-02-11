import { getTopics } from "@/pages/api/topic.api";
import Header from "@/pages/components/header";
import Table from "@/pages/components/table";
import { topicHead } from "@/pages/constants/table";
import React from "react";
import Navbar from "../../components/navbar";

export default function Topics() {
  const [topics, setTopics] = React.useState([]);
  const getAllTopics = async (token: string | null) => {
    getTopics(token).then((res: any) => {
      if (res) {
        setTopics(res);
      }
    });
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    getAllTopics(token);
  });

  return (
    <main className={`min-h-screen`}>
      <div>
        <Navbar />
        <Header title="Lists of topics" size={"text-3xl"} />
        <Table head={topicHead} title="topics" body={topics} />
      </div>
    </main>
  );
}
