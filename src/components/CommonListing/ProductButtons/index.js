"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteAProduct } from "@/services/product";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

export default function ProductButton({ item }) {
  const pathName = usePathname();
  const {
    setcurrentUpdate,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  const router = useRouter();
  const isAdminView = pathName.includes("admin-view");

  async function handleDeleteProduct(item) {
    setComponentLevelLoader({ loading: true, id: item._id });
    const res = await deleteAProduct(item._id);

    let check = confirm(`Delete product ${item.name} ?`);
    // if (check == true) {
    //   setComponentLevelLoader({ loading: true, id: item._id });
    //   await deleteAProduct(item._id);
    // } else {
    //   // setComponentLevelLoader({ loading: false, id: item._id });
    //   console.log("huy delate");
    // }
    if (check == true) {
      if (res.success) {
        setComponentLevelLoader({ loading: false, id: "" });
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        router.refresh();
      }
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }
  useEffect(() => {
    setComponentLevelLoader();
  }, []);
  async function handleAddToCart(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });

    const res = await addToCart({ productID: getItem._id, userID: user._id });

    if (res?.success) {
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

    console.log(res);
  }

  return isAdminView ? (
    <>
      <button
        onClick={() => {
          setcurrentUpdate(item);
          router.push("/admin-view/add-product");
        }}
        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
      >
        Cập nhật
      </button>
      <button
        onClick={() => handleDeleteProduct(item)}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={"Đang xóa"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Xóa"
        )}
      </button>
    </>
  ) : (
    <>
      {/* <button
        onClick={() => handleAddToCart(item)}
        className="mt-1.5 flex w-full justify-center bg-[#22B24C] px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        componentLevelLoader.id === item._id ? (
          <ComponentLevelLoader
            text={"Đang thêm vào giỏ hàng"}
            color={"#ffffff"}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Thêm vào giỏ hàng"
        )}
      </button> */}
    </>
  );
}
