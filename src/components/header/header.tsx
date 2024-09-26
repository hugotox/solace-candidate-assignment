import Image from "next/image";

export const Header = () => {
  return (
    <header className="p-6">
      <Image src="/solace.svg" alt="Solace Advocates" width="128" height="36" />
    </header>
  );
};
