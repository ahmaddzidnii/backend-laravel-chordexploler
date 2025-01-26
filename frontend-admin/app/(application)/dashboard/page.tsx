import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page",
};

export default async function Dashboard() {
  return (
    <div className="mx-4 flex flex-col relative">
      <div className="w-full h-[55px]">
        <p
          className="text-[25px] pt-[23px] w-max font-bold"
          role="heading"
        >
          Dashboard
        </p>
      </div>
    </div>
  );
}
