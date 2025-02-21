"use client";

// import { Metadata } from "next";
import { Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

import EditSongPage from "@/modules/studio/songs/ui/views/EditSongPage";

// export const metadata: Metadata = {
//   title: "Edit Song",
//   description: "Edit your song",
// };

const SongEditPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div className="mx-4 flex flex-col relative">
      <header className="w-full h-[55px]">
        <button
          onClick={handleBack}
          className="text-[25px] pt-[23px] w-max font-bold flex items-center"
        >
          <FaArrowLeft className="size-6 mr-3" />
          Back to Songs
        </button>
      </header>
      <Suspense>
        <EditSongPage />
      </Suspense>
    </div>
  );
};

export default SongEditPage;
