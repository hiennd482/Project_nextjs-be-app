"use client";
import React, { useContext, useEffect, useState } from "react";
import "./pagin.css";
import { GlobalContext } from "@/context";
import { getAllOrdersForAllUsers } from "@/services/order";
import { getAllAdminProducts } from "@/services/product";
import { Bar, Pie, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

const Pagin = () => {
  const {
    allOrdersForAllUsers,
    setAllOrdersForAllUsers,
    user,
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  const [allproduct, setAllproduct] = useState(0);
  let resProduct = 0;
  const getALLproduct = async () => {
    resProduct = await getAllAdminProducts();
    // return allProducts.data.length;
    setAllproduct(resProduct.data.length);
  };
  // console.log("product", allproduct);

  async function extractAllOrdersForAllUsers() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForAllUsers();

    // console.log(res);

    if (res?.success) {
      setPageLevelLoader(false);
      setAllOrdersForAllUsers(
        res.data && res.data.length
          ? res.data.filter((item) => item.user?._id !== user._id)
          : []
      );
    } else {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrdersForAllUsers();
    getALLproduct();
  }, [user]);
  let totalAmout = 0;
  allOrdersForAllUsers.forEach((i) => {
    totalAmout += i?.totalPrice;
  });
  // console.log(" sum", totalAmout);
  // console.log("first", allOrdersForAllUsers.length);
  let orderShipped = 0;
  let orderProcessing = 0;
  allOrdersForAllUsers.map((i) => {
    orderShipped += i?.isProcessing == false;
  });
  allOrdersForAllUsers.map((i) => {
    orderProcessing += i?.isProcessing == true;
  });
  // console.log("check order", or);
  return (
    <div className="ml-5 mt-3">
      {/* <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
        Thống kê
      </h1> */}
      <div className="grid grid-cols-3 justify-around gap-3">
        <a
          href="#"
          className="block w-[400px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="">
            <h5 className="mb-2 flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Đơn hàng <p className="font-normal text-xs">|trong tháng</p>
            </h5>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-[28px] h-[28px] text-blue-500  rounded  dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
              />
            </svg>
            {allOrdersForAllUsers.length}
          </div>
        </a>
        <a
          href="#"
          className="block w-[400px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="">
            <h5 className="mb-2 flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Doanh thu <p className="font-normal text-xs">|trong tháng</p>
            </h5>
          </div>
          {/* w-[28px] h-[28px] text-blue-500 */}
          <div className="flex items-center gap-2">
            <svg
              className="w-[28px] h-[28px] text-green-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 11 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M1.75 15.363a4.954 4.954 0 0 0 2.638 1.574c2.345.572 4.653-.434 5.155-2.247.502-1.813-1.313-3.79-3.657-4.364-2.344-.574-4.16-2.551-3.658-4.364.502-1.813 2.81-2.818 5.155-2.246A4.97 4.97 0 0 1 10 5.264M6 17.097v1.82m0-17.5v2.138"
              />
            </svg>
            {Intl.NumberFormat("vi-VN").format(totalAmout)} vnd
          </div>
        </a>
        <a
          href="#"
          className="block w-[400px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="">
            <h5 className="mb-2 flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Tổng số sản phẩm{" "}
              <p className="font-normal text-xs">|trong tháng</p>
            </h5>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-[28px] h-[28px] text-blue-500  rounded  dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <svg
                className="w-[28px] h-[28px] text-orange-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M1 17V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M5 15V1m8 18v-4"
                />
              </svg>
            </svg>
            {allproduct}
          </div>
        </a>
        <a
          href="#"
          className="block w-[400px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="">
            <h5 className="mb-2 flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Đơn hàng đã vận chuyển{" "}
              <p className="font-normal text-xs">|trong tháng</p>
            </h5>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-[28px] h-[28px] text-green-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M15.5 10.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0 0a2.225 2.225 0 0 0-1.666.75H12m3.5-.75a2.225 2.225 0 0 1 1.666.75H19V7m-7 4V3h5l2 4m-7 4H6.166a2.225 2.225 0 0 0-1.666-.75M12 11V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v9h1.834a2.225 2.225 0 0 1 1.666-.75M19 7h-6m-8.5 3.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
              />
            </svg>
            {orderShipped}
          </div>
        </a>
        <a
          href="#"
          className="block w-[400px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <div className="">
            <h5 className="mb-2 flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Đơn hàng chờ xử lý{" "}
              <p className="font-normal text-xs">|trong tháng</p>
            </h5>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-[28px] h-[28px] text-red-500 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M15.5 10.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0 0a2.225 2.225 0 0 0-1.666.75H12m3.5-.75a2.225 2.225 0 0 1 1.666.75H19V7m-7 4V3h5l2 4m-7 4H6.166a2.225 2.225 0 0 0-1.666-.75M12 11V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v9h1.834a2.225 2.225 0 0 1 1.666-.75M19 7h-6m-8.5 3.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z"
              />
            </svg>
            {orderProcessing}
          </div>
        </a>
      </div>
    </div>
  );
};

export default Pagin;
