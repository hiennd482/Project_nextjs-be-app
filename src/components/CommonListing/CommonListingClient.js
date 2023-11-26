"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect } from "react";
import Notification from "../Notification";
import { sieBarOps } from "@/utils";

export default function CommonListingClient({ data }) {
  const router = useRouter();

  return (
    <section className="bg-white py-12 sm:py-16 w-full">
      <div className="px-20 w-full">
        <div className="mt-6 flex justify-center w-full">
          <div>
            <p className="text-xl">SẢN PHẨM HOT</p>

            <div className="mt-6">
              {/* <p className="text-md text-[#22B24C]">Quần phổ thông</p> */}
              <ul className="mt-5">
                {sieBarOps.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => router.push(item.path)}
                    className="text-md mt-2 cursor-pointer hover:text-green-500"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-[1100px] ml-24">
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
                        <p className="pt-3 text-[#22B24C]">
                          {Intl.NumberFormat("vi-VN").format(prd.price)}vnd
                        </p>
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
