"use client";
import React, {
  useState,
  useEffect,
  Suspense,
  useMemo,
  useContext,
} from "react";
import {
  allStudents,
  disattachALL,
  disattachStudent,
  getAStudent,
  getAllUsers,
  searchUsers,
  studentStudying,
} from "@/services/users";
import Notification from "@/components/Notification";
import { useRouter } from "next/navigation";
import UserButton from "@/components/Button/UserButton";
import HeadeTitle from "@/components/AdminView/HeadTitle";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import { GlobalContext } from "@/context";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Student = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState([]);
  const [newData, setNewData] = useState([]);
  const [page, setPage] = React.useState(1);
  const [student, setStudent] = useState([]);
  const { setcurrentUpdateUser } = useContext(GlobalContext);

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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
  let test = [];
  const convertData = async () => {
    if (dataUser.length !== 0) {
      dataUser.map((item) => {
        if (item.student_of.length !== 0 && item.role === "user") {
          test.push(item);
        }
      });
    }
  };
  test?.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  convertData();

  // console.log(test);
  const rowsPerPage = 5;

  const pages = Math.ceil(test.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return test.slice(start, end);
  }, [page, test]);

  let index = 0;
  let num = index + 1;
  // const data = allUsers.data;

  // console.log("first data user", dataUser);
  useEffect(() => {
    // router.refresh();
    allUsers();
  }, []);
  const handleClick = () => {
    router.push("/admin-view/students/attach-student");
  };
  const handleDeleteUser = async (item) => {
    console.log(item);
    if (confirm(`Delete student ${item.name} ?`) == true) {
      const res = await disattachALL(item._id);
      if (res?.success) {
        // console.log(">>> mutate ", data.success);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // router.push("/admin-view/users/refresh-page/");
        // router.refresh();
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      console.log("caclles");
    }
  };
  const handleEdit = async (item) => {
    onOpen();
    console.log(item);
    const res = await getAStudent(item._id);
    if (res?.success) {
      // console.log("first", res);
      setStudent(res.data);
    } else {
      console.log("loix roi ", res.message);
    }
  };

  const handleDisattach = async (item) => {
    // console.log(item);
    if (item !== null) {
      const res = await disattachStudent(item.id, item.course_id);
      if (res?.success) {
        // console.log(">>> mutate ", data.success);
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // router.push("/admin-view/users/refresh-page/");
        // router.refresh();
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      console.log("item", item);
    }
  };
  const handleClose = () => {
    setStudent(null);
    onClose();
  };
  return (
    <>
      {/* head title */}
      <HeadeTitle
        home={"Home"}
        name={"Quan ly collage"}
        onClick={() => handleClick()}
      ></HeadeTitle>
      {/* table */}
      {test && test.length ? (
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
            <TableColumn key="course">Tong so khoa' hoc</TableColumn>
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
                <TableCell>{item.student_of.length}</TableCell>
                <TableCell className="">
                  <div className="flex gap-5">
                    <Button
                      isIconOnly
                      color="warning"
                      onClick={
                        () => handleEdit(item)
                        // console.log("pass item", currentUpdate);
                      }
                      className="text-white"
                      // className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      <FaEdit></FaEdit>
                    </Button>
                    <Button
                      isIconOnly
                      color="danger"
                      onClick={() => handleDeleteUser(item)}
                      className="text-white"
                      // className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      {/* {componentLevelLoader &&
                        componentLevelLoader.loading &&
                        item._id === componentLevelLoader.id ? (
                          <ComponentLevelLoader
                            text={"Đang xóa"}
                            color={"#ffffff"}
                            loading={
                              componentLevelLoader &&
                              componentLevelLoader.loading
                            }
                          />
                        ) : ( */}
                      <FaRegTrashAlt></FaRegTrashAlt>
                      {/* )} */}
                    </Button>
                  </div>
                  {/* xin chafo */}
                </TableCell>
                {/* {(data) => <TableCell>{getKeyValue(item, data)}</TableCell>} */}
              </TableRow>
            ))}
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
        <div>
          <Modal
            size="4xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isClose={onClose}
          >
            <ModalContent>
              {() => (
                <>
                  {student && student.length !== 0 ? (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Thông tin tham gia khóa học
                      </ModalHeader>
                      <ModalBody>
                        <div className="">
                          Học viên:
                          <span className="font-semibold text-base pl-2">
                            {student.name}
                          </span>
                          <div className="text-sm mt-8">
                            Các khóa học mà học viên đã tham gia:
                          </div>
                          <Table aria-label="Example table with client side pagination">
                            <TableHeader>
                              <TableColumn key="no">stt</TableColumn>
                              <TableColumn key="name">Tiêu đề</TableColumn>
                              <TableColumn key="actions">CHỨC NĂNG</TableColumn>
                            </TableHeader>
                            <TableBody items={student}>
                              {student?.student_of?.map((i, index) => (
                                <TableRow
                                  key={index}
                                  className="hover:bg-slate-100 transition "
                                >
                                  <TableCell>{index + 1}</TableCell>

                                  <TableCell> {i.name}</TableCell>
                                  <TableCell>
                                    <div className="flex gap-5">
                                      <Button
                                        isIconOnly
                                        color="danger"
                                        className="text-white"
                                        onPress={() => {
                                          handleDisattach({
                                            id: student._id,
                                            course_id: i._id,
                                          });
                                        }}
                                      >
                                        <FaRegTrashAlt></FaRegTrashAlt>
                                        {/* )} */}
                                      </Button>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={() => handleClose()}
                        >
                          Close
                        </Button>

                        <></>

                        {/* <Button color="primary" onPress={() => handleAddFile()}>
                        Action
                      </Button> */}
                      </ModalFooter>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center">
                        {" "}
                        <Spinner color="primary" />
                      </div>
                    </>
                  )}
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <Notification></Notification>
      </div>
    </>
  );
};

export default Student;
