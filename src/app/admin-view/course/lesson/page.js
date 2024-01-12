"use client";
import { GlobalContext } from "@/context";
import { getOneCourse } from "@/services/course";
import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  AccordionItem,
  Accordion,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import imgPath from "@/assets/index";
import Navbar from "@/components/AdminView/Navbar";
import {
  FaFolderPlus,
  FaPen,
  FaRegTrashAlt,
  FaBookMedical,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

import { addLesson, deleteLesson } from "@/services/lesson";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import ModalUpdate from "@/components/AdminView/ModalUpdate";

const Lesson = () => {
  let getStorage = [];
  if (typeof window !== "undefined") {
    getStorage = JSON.parse(sessionStorage.getItem("course"));
  }
  // lay khoa hoc tu session
  const [course, setCourse] = useState(getStorage);
  // set data tu session de lay' ra cac; chuong tu api getOneCourse
  const [data, setData] = useState([]);

  //api them chuong moi'
  const [chapter, setChapter] = useState("");
  // const dataSession = async () => {
  //   if (typeof window !== "undefined") {
  //     const res = await JSON.parse(sessionStorage.getItem("course"));
  //     if (res !== null) {
  //       console.log("tai sao", res._id);
  //       setCourse(res._id);
  //       console.log(course);
  //     } else {
  //       console.log("tai sao", res);
  //     }
  //     // console.log(res);
  //     // data = res;
  //   }
  // };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showModdal, setShowModdal] = useState(false);
  const [updateChapter, setUpdateChapter] = useState([]);
  const getLesson = async () => {
    const res = await getOneCourse(course._id);
    if (res?.data) {
      // console.log(res.data);
      setData(res.data);
    } else {
      console.log("dat sesion  ", course);
    }
  };
  const router = new useRouter();
  const handleFile = (item) => {
    console.log(item);
    sessionStorage.setItem("chapter", JSON.stringify(item));
    router.push("/admin-view/course/lesson/file-lesson/");
  };
  useEffect(() => {
    getLesson();
  }, []);
  // console.log(dataSession());
  const handleAddChapter = async () => {
    console.log("phần tử cuối", chapter);
    const res = await addLesson({ name: chapter, course_id: course._id });
    if (res?.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleDetele = async (item) => {
    console.log(item._id);
    if (confirm(`Delete chapter ${item.name}?`) == true) {
      const res = await deleteLesson(item._id);
      if (res?.success) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  const handleEdit = async (item) => {
    console.log(item);
    setUpdateChapter(item);
    setShowModdal(!showModdal);
  };
  return (
    <div className="p-2 m-3">
      <div className=" sticky">
        <Navbar></Navbar>
      </div>

      <Card className="p-2 ">
        <CardHeader className="flex gap-3">
          <p className="text-lg font-bold">{data.name}</p>
        </CardHeader>
        {/* <Divider className="my-4" /> */}
        <CardBody>
          <div className="flex  gap-2 justify-between items-stretch">
            <div className="flex-col ">
              <h3 className="text-small pb-3">
                <text className="font-bold">Mô tả về khóa học:</text> {""}
                {data.about_course} <br />
              </h3>
              <h3 className="text-small">
                <text className="font-bold"> Giới thiệu về khóa học:</text> {""}
                {data.about_intro}
              </h3>
            </div>
            {/* <span>{course.teacher_id?.name}</span> */}
          </div>
        </CardBody>
        <Divider className="" />
        <CardBody>
          <div>
            <span>Nội dung khóa học:</span>

            {data.lessons_id?.map((i, index) => (
              <div className="flex items-center">
                <Accordion variant="splitted" key={index}>
                  <AccordionItem
                    key={i._id}
                    aria-label="Accordion 2"
                    title={i.name}
                    className="my-1"
                  >
                    <Button
                      className="ml-2 my-3 text-white"
                      color="primary"
                      onPress={() => handleFile(i)}
                      // onPress={console.log("day la press")}
                    >
                      Thêm bài học mới <FaBookMedical />
                    </Button>
                  </AccordionItem>
                </Accordion>
                <div className="flex gap-2">
                  {/* edit */}
                  <Button
                    size="sm"
                    isIconOnly
                    color="warning"
                    className="text-white"
                    onPress={() => handleEdit(i)}
                    // onPress={onOpen}
                  >
                    <FaPen />
                  </Button>
                  {/* xoa */}
                  <Button
                    size="sm"
                    isIconOnly
                    color="danger"
                    onPress={() => handleDetele(i)}
                  >
                    <FaRegTrashAlt />
                  </Button>
                </div>
              </div>
            ))}
            <Button
              className="ml-2 my-3 text-white"
              color="success"
              onPress={onOpen}
              // onPress={console.log("day la press")}
            >
              Thêm chương mới <FaFolderPlus />
            </Button>
          </div>
        </CardBody>
        <Divider className="" />
        <CardFooter></CardFooter>
      </Card>
      {/* modal */}
      <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(isClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Thêm chương mới
                </ModalHeader>
                <ModalBody>
                  <input
                    type="text"
                    placeholder="nhập tên chương..."
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                    id="default-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={isClose}>
                    Đóng
                  </Button>
                  <Button color="primary" onPress={() => handleAddChapter()}>
                    Đồng ý
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <ModalUpdate
          showModal={showModdal}
          setShowModal={setShowModdal}
          lesson={updateChapter}
          setLesson={setUpdateChapter}
        ></ModalUpdate>
      </div>
      <Notification />
    </div>
  );
};

export default Lesson;
