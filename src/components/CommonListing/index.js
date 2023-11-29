"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect } from "react";
import Notification from "../Notification";
import HeadeTitle from "../AdminView/HeadTitle";
// import Buttons from "../Button";
export default function CommonListing({ data }) {
  const router = useRouter();
  let index = 0;
  let num = index + 1;
  // let total = data?.map((i) => {
  //   let stt = new Date(i.createdAt);
  //   // console.log(stt.getTime());
  //   return stt.getTime();
  // });
  data?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  console.log("stt", data);

  useEffect(() => {
    router.refresh();
  }, []);
  const handleClick = () => {
    router.push("/admin-view/add-product");
  };
  return (
    <>
      {/* head crud */}
      <HeadeTitle
        home={"Home"}
        name={"Quan ly san pham"}
        onClick={() => handleClick()}
      ></HeadeTitle>

      {/* table */}

      <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">stt</div>
              </th>
              <th scope="col" class="px-6 py-3">
                Tên sản phẩm
                {/* data?.sort((a: any, b: any) => b.id - a.id */}
              </th>
              <th scope="col" class="px-6 py-3">
                Ảnh
              </th>
              <th scope="col" class="px-6 py-3">
                Danh mục
              </th>
              <th scope="col" class="px-6 py-3">
                Giá
              </th>
              <th scope="col" class="px-6 py-3">
                Giảm giá
              </th>
              <th scope="col" class="px-6 py-3">
                Thông tin
              </th>
              <th scope="col" class="px-6 py-3">
                Chức năng
              </th>
              <th scope="col" class="px-6 py-3">
                test button
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.length
              ? data.map((item, index) => (
                  <tr class="transition bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <td class="w-4 p-4">
                      <div class="flex items-center">{index + 1}</div>
                    </td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td class="px-6 py-4">
                      <img src={item.imageUrl} alt="" className="w-14 h-14" />
                    </td>

                    <td class="px-6 py-4">{item.category}</td>
                    <td class="px-6 py-4">
                      {Intl.NumberFormat("vi-VN").format(item.price)} đ
                    </td>
                    <td className="px-6 py-4">
                      {item.priceDrop ? `${item.priceDrop}%` : "0"}
                    </td>
                    <td className="px-6 py-4">{item.deliveryInfo}</td>
                    <td class="flex gap-2 px-6 py-4 items-center ">
                      <ProductButton item={item} />
                    </td>
                    {/* <td class=" gap-2 px-6 py-4 items-center ">
                      <Buttons id={item._id} name={"test"}></Buttons>
                    </td> */}
                    {/* <td>sdfhisdfh</td> */}
                    {/* <td class="flex gap-2 px-6 py-4 items-center ">
                      <Buttons id={item._id} name={"test"}></Buttons>
                    </td> */}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {/* pagin */}
        <nav
          class="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <ul class="inline-flex -space-x-px text-sm h-8">
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Trước
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Tiếp
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
