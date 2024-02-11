import Link from "next/link";
import React from "react";
import { getCategory } from "../api/category.api";

export default function CategorySection() {
  const [category, setCategory] = React.useState([]);

  const getAllCategory = async (token: string | null) =>
    await getCategory(token).then((res: any) => {
      if (res) {
        setCategory(res);
      }
    });

  React.useEffect(() => {
    getAllCategory(localStorage.getItem("token"));
  }, []);
  return (
    <header className="bg-white p-5">
      <div className="p-4">
        <h2>Lists of category</h2>
        {category.map((item: any, key) => (
          <div
            key={key}
            className="group  flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
          >
            <div className="flex-auto">
              <Link href="/" className="block font-semibold text-gray-900">
                {item?.name}
                <span className=" inset-0" />
              </Link>
              <p className="mt-1 text-gray-600">
                {item?.description.length > 55
                  ? `${item.description.slice(0, 55)}...`
                  : item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </header>
  );
}
