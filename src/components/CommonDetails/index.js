"use client";
import { GlobalContext } from "@/context";
import { useContext } from "react";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { addToCart } from "@/services/cart";
import Notification from "../Notification";
import { useRouter } from "next/navigation";
export default function CommonDetails({ item, allPrd }) {
  const {
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);
  async function handleAddToCart(getItem) {
    setComponentLevelLoader({ loading: true, id: "" });
    const res = await addToCart({ productID: getItem._id, userID: user._id });
    if (res.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  }
  const router = useRouter();

  return (
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start direction-column flex-col">
              <div className="  text-center">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={item.imageUrl}
                    className="h-full w-full object-cover border-2 border-gray-100"
                    alt="Product Details"
                  />
                </div>
              </div>
              <div className="mt-6 w-full lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-row">
                  <button
                    type="button"
                    className="flex-0 aspect-square mr-6 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={item.imageUrl}
                      className="h-full w-full object-cover"
                      alt="Product Details"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-2xl font-bold text-gray-900  border-b-2 border-gray-100 pb-8">
              {item && item.name}
            </h1>
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 botder-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-start flex-col">
                <h1
                  className={`text-xl font-bold mr-2 ${
                    item.onSale === "yes" ? "line-through" : ""
                  }`}
                >
                  {item && item.price}vnd
                </h1>
                {item.onSale === "yes" ? (
                  <h1 className="text-xl font-bold text-[#22B24C]">{`${(
                    item.price -
                    item.price * (item.priceDrop / 100)
                  ).toFixed(2)} vnd`}</h1>
                ) : null}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleAddToCart(item)}
              className="mt-1.5 inline-block bg-[#22B24C] px-5 py-3 text-xs font-medium tracking-wide uppercase text-white w-full"
            >
              {componentLevelLoader && componentLevelLoader.loading ? (
                <ComponentLevelLoader
                  text={"Adding to Cart"}
                  color={"#FFFFFF"}
                  loading={componentLevelLoader && componentLevelLoader.loading}
                />
              ) : (
                "Add to Cart"
              )}
            </button>
            <ul className="mt-8 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {item && item.deliveryInfo}
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {"Cancel anytime"}
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 flex flex-row items-start border-b-2 pb-4">
            <div className="mr-8">
              <a href="#" className=" text-sm font-medium text-gray-400">
                DESCRIPTION
              </a>
            </div>
            <div className="flex flex-row">
              <p className="font-bold">Chứng nhận/ Canh tác:&nbsp; </p>
              {item && item.description}
            </div>
          </div>
          <div className="lg:col-span-3 flex flex-col items-start border-b-2 pb-4">
            <div className="mr-8">
              <a href="#" className=" text-sm font-medium text-gray-400">
                SẢN PHẨM MỌI NGƯỜI THƯỜNG MUA CHUNG
              </a>
            </div>

            <div className="flex flex-row flex-wrap mt-5">
              {allPrd.map((prd) => {
                return (
                  <div
                    key={prd}
                    className="w-48 border hover:border-[#22B24C] ease-linear mr-6"
                    onClick={() => router.push(`/product/${prd._id}`)}
                  >
                    <img src={prd.imageUrl} className="w-full" />
                    <div className="p-3">
                      <p className="text-xl">{prd.name}</p>
                      <p className="pt-3 text-[#22B24C]">{prd.price}Đ</p>
                      <p>{prd.category}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
