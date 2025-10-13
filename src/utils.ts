import clsx from "clsx";
import { twMerge } from "tailwind-merge";

type MCArgs = (
  | string
  | false
  | undefined
  | null
  | { [key: string]: boolean | undefined }
)[];

const cn = (...args: MCArgs) =>
  twMerge(
    clsx(
      ...args.map((arg) => {
        if (typeof arg === "object" && arg !== null) {
          return Object.entries(arg)
            .filter(([, value]) => value)
            .map(([key]) => key);
        }
        return arg;
      }),
    ),
  );

export { cn };
