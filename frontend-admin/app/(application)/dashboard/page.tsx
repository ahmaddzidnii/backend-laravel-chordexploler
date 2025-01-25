import { Checkbox } from "@/components/ui/checkbox";
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
          <div className="w-[50px] px-4 py-3 text-center">
            <Checkbox id="check-all" />
          </div>
          <div className="w-[500px] min-w-[400px] overflow-hidden px-4 py-3 text-center">Song</div>
          <div className="flex-1 px-4 py-3 text-center hidden lg:block">Visibilitas</div>
          <div className="flex-1 px-4 py-3 text-center hidden lg:block">Key</div>
          <div className="flex-1 px-4 py-3 text-center hidden lg:block">Tanggal</div>
          <div className="flex-1 px-4 py-3 text-center hidden lg:block">Komentar</div>
          <div className="flex-1 px-4 py-3 text-center hidden lg:block">Like</div>
        </div>
      </div>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          role="table"
          className="flex border-b items-center"
          key={index}
        >
          <div className="w-[50px] px-4 py-3 text-center">
            <Checkbox id={String(index)} />
          </div>
          {/* Mobile */}
          <div className="w-full px-4 py-3 flex items-center lg:hidden">
            <img
              src="https://lh3.googleusercontent.com/IQbc62SxoNHGxQ9dUTtgL-U5d0NJTxBVAF2_UKG8VlQDjV5bSF0TV4Fy1QlfR9RZoPiMDx0dnMmZ_lCW"
              alt="song"
              className="aspect-square size-14 rounded-md mr-4"
            />
            <div className="flex-1 justify-start">
              <p className="line-clamp-1">Armada - Awas jatuh Cinta Cover Piano</p>
              <p className="line-clamp-1 text-sm">
                12 views . <span>1 week ago</span>
              </p>
              <p className="line-clamp-1 text-xs font-bold">C Mayor</p>
            </div>
          </div>
          {/* Mobile */}

          <div className="hidden lg:flex w-[500px] min-w-[400px] overflow-hidden px-4 py-3 text-center items-center">
            <img
              src="https://lh3.googleusercontent.com/IQbc62SxoNHGxQ9dUTtgL-U5d0NJTxBVAF2_UKG8VlQDjV5bSF0TV4Fy1QlfR9RZoPiMDx0dnMmZ_lCW"
              alt="song"
              className="aspect-square size-14 rounded-md mr-4"
            />
            <p className="hidden lg:block">Armada - Awas jatuh Cinta Cover Piano</p>
            <div className="lg:hidden flex-1 justify-start">
              <p>Armada - Awas jatuh Cinta Cover Piano</p>
              <p>12 views</p> <p>1 week ago</p>
              <p>P</p>
            </div>
          </div>
          <div className="flex-1 px-4 py-3 text-center hidden lg:block">Tidak publik</div>
          <div className="flex-1 px-4 py-3 text-center hidden lg:block">C</div>
          <div className="flex-1 px-4 py-3 text-center hidden lg:block">26 Mei 202</div>
          <div className="flex-1 px-4 py-3 text-center hidden lg:block">12</div>
          <div className="flex-1 px-4 py-3 text-center hidden lg:block">0</div>
        </div>
      ))}
    </div>
  );
}
