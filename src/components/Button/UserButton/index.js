"use client";

import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import { deleteUser } from "@/services/users";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useContext, useEffect } from "react";
import ImgPath from "@/assets/index";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
// import { deleteUser } from "@/services/users";
import { mutate } from "swr";
import { Button } from "@nextui-org/react";
import Image from "next/image";
const UserButton = ({ item }) => {
  const pathName = usePathname();

  const {
    currentUpdate,
    setcurrentUpdateUser,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  const router = useRouter();
  const isAdminView = pathName.includes("admin-view");

  async function handleDeleteUser(item) {
    setComponentLevelLoader({ loading: true, id: item._id });

    if (confirm(`Delete product ${item.name} ?`) == true) {
      const data = await deleteUser(item._id);
      if (data?.success) {
        // console.log(">>> mutate ", data.success);
        setComponentLevelLoader({ loading: false, id: "" });
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          router.push("/admin-view/users/refresh-page/");
        }, 1000);
        // router.push("/admin-view/users/refresh-page/");
        // router.refresh();
      } else {
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setComponentLevelLoader({ loading: false, id: "" });
      }
    } else {
      // console.log("caclles");
      setComponentLevelLoader({ loading: false, id: "" });
    }
    // if (check == true) {
    //   setComponentLevelLoader({ loading: true, id: item._id });
    //   await deleteAProduct(item._id);
    // } else {
    //   // setComponentLevelLoader({ loading: false, id: item._id });
    //   console.log("huy delate");
    // }
    // if (check == true) {
    //   if (res.success) {
    //     setComponentLevelLoader({ loading: false, id: "" });
    //     toast.success(res.message, {
    //       position: toast.POSITION.TOP_RIGHT,
    //     });
    //     router.refresh();
    //   }
    // } else {
    //   toast.error(res.message, {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //   setComponentLevelLoader({ loading: false, id: "" });
    // }
  }
  useEffect(() => {
    setComponentLevelLoader();
  }, []);
  return isAdminView ? (
    <div className="flex gap-5">
      <Button
        isIconOnly
        color="warning"
        onClick={() => {
          setcurrentUpdateUser(item);
          router.push("/admin-view/users/add-user");
          // console.log("pass item", currentUpdate);
        }}
        className="text-white"
        // className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
      >
        <FaEdit></FaEdit>
      </Button>

      {/* <button
        onClick={() => {
          setcurrentUpdate(item);
          router.push("/admin-view/users/add-user");
          // console.log("pass item", currentUpdate);
        }}
      >
        suar
      </button> */}
      <Button
        isIconOnly
        color="danger"
        onClick={() => handleDeleteUser(item)}
        className="text-white"
        // className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
          <FaRegTrashAlt></FaRegTrashAlt>
        )}
      </Button>
    </div>
  ) : (
    <>null</>
  );
};

export default UserButton;
