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
  const handleFilter = () => {
    let newData = [];
    if (dataUser) {
      dataUser.map((i) => {
        if (i.role !== "user" && i.role !== "admin") {
          // setDataUser(i);
          // console.log(i);
          newData.push(i);
          console.log(newData);
          setDataUser(newData);
          router.refresh();
        }
      });
    }
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
      <Button onPress={() => handleFilter()}>loc</Button>
      <Button onPress={() => allUsers()}>tất cả</Button>
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
