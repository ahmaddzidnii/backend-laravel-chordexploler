import { IoFilter } from "react-icons/io5";

export default async function Dashboard() {
  return (
    <div className="mx-4 flex flex-col relative">
      <div className="w-full h-[55px]">
        <p
          className="text-[25px] pt-[23px] w-max font-bold"
          role="heading"
        >
          Chord Channel
        </p>
      </div>

      <div className="sticky top-0 bg-white left-0">
        <div className="flex space-x-6 text-sm font-medium mt-[23px]">
          <a href="#">Semua</a>
          <a href="#">Terbaru</a>
        </div>
        <div className="mt-2 border-y py-2">
          <button className="flex items-center text-sm text-gray-400">
            <IoFilter className="mr-2 size-6" />
            Filter
          </button>
        </div>
        <div
          role="table"
          className="flex border-b"
        >
          <div className="w-[500px] px-4 py-3 text-center">Song</div>
          <div className="flex-1 px-4 py-3 text-center">Visibilitas</div>
          <div className="flex-1 px-4 py-3 text-center">Key</div>
          <div className="flex-1 px-4 py-3 text-center">Tanggal</div>
          <div className="flex-1 px-4 py-3 text-center">Komentar</div>
          <div className="flex-1 px-4 py-3 text-center">Like</div>
        </div>
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          role="table"
          className="flex border-b items-center"
        >
          <div className="w-[500px] px-4 py-3 text-center flex items-center">
            <img
              src="https://lh3.googleusercontent.com/IQbc62SxoNHGxQ9dUTtgL-U5d0NJTxBVAF2_UKG8VlQDjV5bSF0TV4Fy1QlfR9RZoPiMDx0dnMmZ_lCW"
              alt="song"
              className="aspect-square size-14 rounded-md mr-4"
            />
            Armada - Awas jatuh Cinta Cover Piano
          </div>
          <div className="flex-1 px-4 py-3 text-center">Tidak publik</div>
          <div className="flex-1 px-4 py-3 text-center">C</div>
          <div className="flex-1 px-4 py-3 text-center">26 Mei 202</div>
          <div className="flex-1 px-4 py-3 text-center">12</div>
          <div className="flex-1 px-4 py-3 text-center">0</div>
        </div>
      ))}
    </div>
  );
}
