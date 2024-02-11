import Header from "./components/header";
import Navbar from "./components/navbar";
import CategorySection from "./layouts/categorySection";
import ListActivity from "./layouts/listActivity";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <main className={`min-h-screen bg-white`}>
      <div>
        <Navbar />
        <Header
          title="Welcome to your interface"
          size={"text-2xl"}
          btn={true}
        />
        <div className="flex mb-4">
          <div className="w-1/3 shadow m-5">
            <CategorySection />
          </div>
          <div className="w-2/3 shadow m-5">
            <ListActivity />
          </div>
        </div>
      </div>
      <main>{children}</main>
    </main>
  );
}
