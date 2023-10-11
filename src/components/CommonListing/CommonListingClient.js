"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect } from "react";
import Notification from "../Notification";

export default function CommonListingClient({ data }) {
  const router = useRouter();

  return (
    <section className="bg-white py-12 sm:py-16 w-full">
      <div className="px-20 w-full">
        <div className="mt-6 flex justify-center w-full">
          <div>
            <p className="text-xl">SẢN PHẨM HOT</p>

            <div className="mt-6">
              <p className="text-md text-[#22B24C]">Quần phổ thông</p>
              <ul className="ml-4 list-disc">
                <li className="text-md ml-3 mt-3 hover:text-[#22B24C] cursor-pointer">
                  Quần hot boy
                </li>
                <li className="text-md ml-3 mt-3 hover:text-[#22B24C] cursor-pointer">
                  Quần cao bồi
                </li>
                <li className="text-md ml-3 mt-3 hover:text-[#22B24C] cursor-pointer">
                  Quần chăn bò
                </li>
                <li className="text-md ml-3 mt-2 hover:text-[#22B24C] cursor-pointer">
                  Quần siêu nhân
                </li>
                <li className="text-md ml-3 mt-2 hover:text-[#22B24C] cursor-pointer">
                  Quần hot boy
                </li>
                <li className="text-md ml-3 mt-2 hover:text-[#22B24C] cursor-pointer">
                  Quần cao bồi
                </li>
                <li className="text-md ml-3 mt-2 hover:text-[#22B24C] cursor-pointer">
                  Quần chăn bò
                </li>
                <li className="text-md ml-3 mt-2 hover:text-[#22B24C] cursor-pointer">
                  Quần siêu nhân
                </li>
              </ul>

              <ul className="mt-5">
                <li className="text-md mt-2 cursor-pointer">Quần hot boy</li>
                <li className="text-md mt-2 cursor-pointer">Quần cao bồi</li>
                <li className="text-md mt-2 cursor-pointer">Quần chăn bò</li>
                <li className="text-md mt-2 cursor-pointer">Quần siêu nhân</li>
                <li className="text-md mt-2 cursor-pointer">Quần hot boy</li>
                <li className="text-md mt-2 cursor-pointer">Quần cao bồi</li>
                <li className="text-md mt-2 cursor-pointer">Quần chăn bò</li>
                <li className="text-md mt-2 cursor-pointer">Quần siêu nhân</li>
              </ul>
            </div>
          </div>

          <div className="w-[1100px] ml-24">
            <p className="ml-5 text-xl">RAU ĂN LÁ (32)</p>

            <div className="flex flex-wrap">
              {data && data.length
                ? data.map((prd) => (
                    <div
                      key={prd}
                      className="w-48 border hover:border-[#22B24C] ease-linear m-5"
                      onClick={() => router.push(`/product/${prd._id}`)}
                    >
                      <img src={prd.imageUrl} className="w-full" />
                      <div className="p-3">
                        <p className="text-xl">{prd.name}</p>
                        <p className="pt-3 text-[#22B24C]">{prd.price}Đ</p>
                        <p>{prd.category}</p>
                      </div>
                      <ProductButton item={prd} />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
