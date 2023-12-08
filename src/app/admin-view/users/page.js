"use client";
import React, {
  useState,
  useEffect,
  Suspense,
  useMemo,
  useContext,
} from "react";
import { getAllUsers, searchUsers } from "@/services/users";
// import CommonListing from "@/components/CommonListing";
import { useRouter } from "next/navigation";
import UserButton from "@/components/Button/UserButton";
import HeadeTitle from "@/components/AdminView/HeadTitle";
import { data } from "autoprefixer";
import Notification from "@/components/Notification";
import Loading from "./loading";
import { PulseLoader } from "react-spinners";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { GlobalContext } from "@/context";

const Mainuser = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState([]);
  const [dataSearch, setSearch] = useState(null);
  const [page, setPage] = React.useState(1);
  const { setcurrentUpdateUser } = useContext(GlobalContext);
  dataUser?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const allUsers = async () => {
    const data = await getAllUsers();
    // console.log(">>data user ", data.data);
    if (data?.data) {
      setDataUser(data.data);
      setcurrentUpdateUser(null);
      // router.push("/users/refresh-page");
      // router.push("/admin-view/users/refresh-page");
      router.refresh();
    } else {
      console.log(">>data user", data);
      // router.refresh();
    }
  };
  // const handleSearch = async (e) => {
  //   // e.preventDefault();
  //   console.log("data", dataSearch);
  //   const res = await searchUsers(dataSearch);
  //   if (res?.data) {
  //     // setDataUser(res.data);
  //     // setcurrentUpdateUser(null);
  //     console.log(" seacr");
  //   } else {
  //     console.log("<<<first>>>", res.data);
  //   }
  // };
  const rowsPerPage = 5;

  const pages = Math.ceil(dataUser.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return dataUser.slice(start, end);
  }, [page, dataUser]);

  let index = 0;
  let num = index + 1;
  // const data = allUsers.data;

  // console.log("first data user", dataUser);
  useEffect(() => {
    // router.refresh();
    allUsers();
    // router.push("/admin-view/users/refresh-page");
    // setTimeout(() => {
    //   router.refresh();
    // }, 100);
    // console.log(">> state", dataUser);
    // console.log(">> day data user", allUsers);
  }, []);
  const handleClick = () => {
    router.push("/admin-view/users/add-user");
  };
  return (
    <>
      {/* head title */}
      <HeadeTitle
        home={"Home"}
        name={"Quan ly user"}
        onClick={() => handleClick()}
      ></HeadeTitle>

      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      {/* <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          value={dataSearch}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos..."
          required
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div> */}

      {/* table */}
      {dataUser && dataUser.length ? (
        <Table
          aria-label="Example table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="no">stt</TableColumn>
            <TableColumn key="name">HO VA TEN</TableColumn>
            <TableColumn key="role">EMAIL</TableColumn>
            <TableColumn key="status">NGAY DANG KY</TableColumn>
            <TableColumn key="actions">CHỨC NĂNG</TableColumn>
          </TableHeader>
          <TableBody items={items}>
            {items.map((item, index) => (
              <TableRow
                key={item._id.toString()}
                className="hover:bg-slate-100 transition "
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  {" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("vi-VN") +
                      " " +
                      new Date(item.createdAt).toLocaleTimeString("vi-VN")
                    : " chua cho"}
                </TableCell>
                <TableCell className="">
                  <UserButton item={item} />
                  {/* xin chafo */}
                </TableCell>
                {/* {(data) => <TableCell>{getKeyValue(item, data)}</TableCell>} */}
              </TableRow>
            ))}

            {/* <TableRow >
        <TableCell>
          <Button>xin chao</Button>
        </TableCell>
      </TableRow> */}
          </TableBody>
        </Table>
      ) : (
        <Table
          aria-label="Example table with client side pagination"
          bottomContent={
            <div className="flex w-full justify-center">
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="no">stt</TableColumn>
            <TableColumn key="name">HO VA TEN</TableColumn>
            <TableColumn key="role">EMAIL</TableColumn>
            <TableColumn key="status">NGAY DANG KY</TableColumn>
            <TableColumn key="actions">CHỨC NĂNG</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </TableCell>
              <TableCell>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </TableCell>
              <TableCell>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </TableCell>
              <TableCell>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </TableCell>
              <TableCell>
                <div role="status" className="max-w-sm animate-pulse">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              </TableCell>

              {/* {(data) => <TableCell>{getKeyValue(item, data)}</TableCell>} */}
            </TableRow>

            {/* <TableRow >
          <TableCell>
            <Button>xin chao</Button>
          </TableCell>
        </TableRow> */}
          </TableBody>
        </Table>
      )}
      <div>
        <Notification></Notification>
      </div>
    </>
  );
};

export default Mainuser;
