import { ButtonInterface } from "../interfaces/button.interface";
import classNames from "../utils/className";

export default function Button({ name, style, othersProps }: ButtonInterface) {
  return (
    <div>
      <button
        type="button"
        className={classNames(
          style
            ? `inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${style}`
            : "inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        )}
      >
        {othersProps}
        {name}
      </button>
    </div>
  );
}
