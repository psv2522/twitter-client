import Image from "next/image";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";

export function FeedCard() {
  return (
    <div className="border border-l-0 border-r-0 border-b-0 border-gray-600 p-4 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-1">
          <Image
            src="https://avatars.githubusercontent.com/u/87223770?v=4"
            alt="userimage"
            className="rounded-full"
            height={50}
            width={50}
          ></Image>
        </div>
        <div className="col-span-11">
          <h5>Prathmesh Vhatkar</h5>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam
            voluptas quidem reiciendis harum adipisci repellat sapiente fugit.
            Voluptatum porro, labore, aliquam repellat libero sed, recusandae
            eius corporis fuga ut modi.
          </p>
          <div className="flex justify-between mt-5 text-xl items-center p-2 w-[90%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
