import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

export const Footer = ({ className }: HTMLProps<HTMLElement>) => {
  return (
    <footer
      className={cn("p-6 text-center text-gray-100 bg-primary", className)}
    >
      <p>© 2024 Find Solace, Inc. All rights reserved.</p>
    </footer>
  );
};
