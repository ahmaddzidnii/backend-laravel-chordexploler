import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";

import EditSongPage from "@/features/songs/pages/EditSongPage";
import { FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Edit Song",
  description: "Edit your song",
};

const SongEditPage = () => {
  return (
    <div className="mx-4 flex flex-col relative">
      <header className="w-full h-[55px]">
        <Link
          href="/songs"
          className="text-[25px] pt-[23px] w-max font-bold flex items-center"
        >
          <FaArrowLeft className="size-6 mr-3" />
          Back to Songs
        </Link>
      </header>
      <Suspense>
        <EditSongPage />
      </Suspense>
    </div>
  );
};

export default SongEditPage;
