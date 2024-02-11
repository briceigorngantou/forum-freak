import Link from "next/link";
import classNames from "../utils/className";
import Button from "./button";

export default function Header({ size = "", title = "", btn = false }) {
  return (
    <div>
      <header className="bg-white shadow">
        <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p
            className={classNames(
              size
                ? `${size} font-bold tracking-tight text-gray-900`
                : "text-3xl font-bold tracking-tight text-gray-900"
            )}
          >
            {title}
          </p>
          {btn && (
            <Link href="/addTopic">
              <Button name="New Topic" style="bg-blue" />
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}
