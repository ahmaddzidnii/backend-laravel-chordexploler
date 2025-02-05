import { SectionRender } from "@/features/sections/components/pages/SectionRender";
import { Metadata } from "next";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { SongInfo } from "./SongInfo";

export const metadata: Metadata = {
  title: "Song Details",
  description: "Song details page",
};

const SongIdPage = () => {
  return (
    <div className="mx-4 space-y-4">
      <header className="w-full h-[55px]">
        <Link
          href="/songs"
          className="text-[25px] pt-[23px] w-max font-bold flex items-center"
        >
          <FaArrowLeft className="size-6 mr-3" />
          Back to Songs
        </Link>
      </header>
      <SongInfo />
      <SectionRender />
    </div>
  );
};

export default SongIdPage;
