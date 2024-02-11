import Navbar from "@/pages/components/navbar";
import DataProfileDisplay from "@/pages/layouts/dataProfileDisplay";
import Header from "../components/header";

export default function Profile() {
  return (
    <main className={`min-h-screen`}>
      <div className="bg-white">
        <Navbar />
        <Header title="My Profile" size={"text-3xl"} />
        <DataProfileDisplay />
      </div>
    </main>
  );
}
