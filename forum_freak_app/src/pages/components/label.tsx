import { CalendarIcon } from "@heroicons/react/20/solid";

export default function Label({ label = "", isDate = false }) {
  return (
    <div className="mt-2 flex items-center text-sm text-gray-500">
      {isDate && (
        <CalendarIcon
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
      )}
      {label}
    </div>
  );
}
