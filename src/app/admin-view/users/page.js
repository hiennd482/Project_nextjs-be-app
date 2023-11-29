"use client";
import React, { useState, useEffect, Suspense } from "react";
import { getAllUsers } from "@/services/users";
// import CommonListing from "@/components/CommonListing";
import { useRouter } from "next/navigation";
import UserButton from "@/components/Button/UserButton";
import HeadeTitle from "@/components/AdminView/HeadTitle";
import { data } from "autoprefixer";
import Notification from "@/components/Notification";
import Loading from "./loading";
import { PulseLoader } from "react-spinners";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

const Mainuser = () => {
  const router = useRouter();
  // const router = useRouter();
  const [dataUser, setDataUser] = useState([]);

  const allUsers = async () => {
    const data = await getAllUsers();
    // console.log(">>data user ", data.data);
    if (data?.data) {
      setDataUser(data.data);
    } else {
      console.log(">>data user", data);
    }
    router.refresh();
  };
  let index = 0;
  let num = index + 1;
  // const data = allUsers.data;

  dataUser?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  // console.log("first data user", dataUser);
  useEffect(() => {
    allUsers();
    // setTimeout(() => {
    //  const  router.refresh();
    // }, 100);
    // router.refresh();
    // console.log(">> state", dataUser);
    // console.log(">> day data user", allUsers);
  }, []);
  const handleClick = () => {
    console.log(">> day la test navigation");
  };
  return (
    <>
      {/* head title */}
      <HeadeTitle
        home={"Home"}
        name={"Quan ly user"}
        onClick={() => handleClick()}
      ></HeadeTitle>

      {/* table */}
      <Button
        color="success"
        className="text-white"
        onClick={() => console.log("xin choa vine ")}
      >
        xin chao
      </Button>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">stt</div>
              </th>
              <th scope="col" class="px-6 py-3">
                ho va ten
                {/* data?.sort((a: any, b: any) => b.id - a.id */}
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Ngay dang ky
              </th>
              <th scope="col" class="px-6 py-3">
                Chức năng
              </th>
            </tr>
          </thead>
          {dataUser && dataUser.length ? (
            dataUser.map((item, index) => (
              <tbody>
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
                  {/* <td class="px-6 py-4">
                      <img src={item.imageUrl} alt="" className="w-14 h-14" />
                    </td> */}

                  <td class="px-6 py-4">{item.email}</td>

                  <td className="px-6 py-4">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("vi-VN") +
                        " " +
                        new Date(item.createdAt).toLocaleTimeString("vi-VN")
                      : " chua cho"}
                  </td>
                  <td class="flex gap-2 px-6 py-4 items-center ">
                    <UserButton item={item} />
                  </td>
                  {/* <td class=" gap-2 px-6 py-4 items-center ">
                      <Buttons id={item._id} name={"test"}></Buttons>
                    </td> */}
                  {/* <td>sdfhisdfh</td> */}
                  {/* <td class="flex gap-2 px-6 py-4 items-center ">
                      <Buttons id={item._id} name={"test"}></Buttons>
                    </td> */}
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr class="transition bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                  <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                    <span class="sr-only">Loading...</span>
                  </div>
                </th>
                {/* <td class="px-6 py-4">
                  <img src={item.imageUrl} alt="" className="w-14 h-14" />
                </td> */}

                <td class="px-6 py-4">
                  {" "}
                  <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                    <span class="sr-only">Loading...</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {" "}
                  <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
                <td class="flex gap-2 px-6 py-4 items-center ">
                  {" "}
                  <div role="status" class="max-w-sm animate-pulse">
                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>

                    <span class="sr-only">Loading...</span>
                  </div>
                </td>
                {/* <td class=" gap-2 px-6 py-4 items-center ">
                  <Buttons id={item._id} name={"test"}></Buttons>
                </td> */}
                {/* <td>sdfhisdfh</td> */}
                {/* <td class="flex gap-2 px-6 py-4 items-center ">
                  <Buttons id={item._id} name={"test"}></Buttons>
                </td> */}
              </tr>
            </tbody>
          )}
          {/* {dataUser.length ?(dataUser.map(item,i))} */}
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
            <li></li>
          </ul>
        </nav>
        <Notification />
      </div>
    </>
  );
};

export default Mainuser;
