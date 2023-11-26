"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { getAllOrdersForUser } from "@/services/order";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Orders() {
  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllOrders() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForUser(user?._id);

    if (res?.success) {
      setPageLevelLoader(false);

      setAllOrdersForUser(res.data);
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setPageLevelLoader(false);
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrders();
  }, [user]);

  allOrdersForUser?.sort(
    (a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
  );
  console.log(allOrdersForUser);
  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div>
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {allOrdersForUser && allOrdersForUser.length ? (
                  <ul className="flex flex-col gap-4">
                    {allOrdersForUser.map((item) => (
                      <li
                        key={item._id}
                        className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                      >
                        <div className="flex">
                          <h1 className="font-bold text-lg mb-3 flex-1">
                            Mã đơn hàng: #{item._id}
                            <div className="text-sm font-normal">
                              Thời gian đặt hàng:{" "}
                              {new Date(item.paidAt).toLocaleDateString(
                                "en-GB",
                                { hour12: false }
                              )}
                            </div>
                          </h1>

                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Tổng tiền:
                            </p>
                            <p className="mr-3 text-2xl  font-semibold text-gray-900">
                              {Intl.NumberFormat("vi-VN").format(
                                item.totalPrice
                              )}
                              vnd
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {item.orderItems.map((orderItem, index) => (
                            <div key={index} className="shrink-0">
                              <img
                                alt="Order Item"
                                className="h-24 w-24 max-w-full rounded-lg object-cover"
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imageUrl
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-5 items-center justify-between">
                          <div className="flex  items-center">
                            <p className="text-sm ">Trạng thái đơn hàng: </p>
                            <p
                              className={` inline-block ${
                                item.isProcessing === false
                                  ? "text-green-custom"
                                  : "text-black-custom"
                              }  px-5 py-3 text-base font-medium uppercase tracking-wide`}
                            >
                              {item.isProcessing
                                ? "Đang chờ xử lý"
                                : "Đơn hàng đã được vận chuyển"}
                            </p>
                          </div>
                          <button
                            onClick={() => router.push(`/orders/${item._id}`)}
                            className=" mt-5 mr-5 rounded-md hover:bg-yellow-custom transition hover:text-black inline-block bg-blue-custom text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                          >
                            Xem chi tiết đơn hàng
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
