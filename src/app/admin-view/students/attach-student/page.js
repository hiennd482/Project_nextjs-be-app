"use client";
import { getAllCourse } from "@/services/course";
import { allStudents, attachStudent } from "@/services/users";
import React, { useEffect, useState } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import { useRouter } from "next/navigation";
import { FaRegUser, FaTable } from "react-icons/fa";
const Attach = () => {
  const [student, setStudent] = useState([]);
  const [course, setCourse] = useState([]);
  const [idUser, setIdUser] = useState("");
  const [idCourse, setIdCourse] = useState("");
  const getStudent = async () => {
    const res = await allStudents();
    if (res?.data) {
      setStudent(res.data);
    } else {
      console.log("ko tim thay data");
    }
  };
  const getCourse = async () => {
    const res = await getAllCourse();
    if (res?.data) {
      setCourse(res.data);
    } else {
      console.log("ko co khoa hoc");
    }
  };
  const router = useRouter();

  useEffect(() => {
    getStudent();
    getCourse();
  }, []);
  const handleSubmit = async () => {
    console.log("data", idUser);
    if (idCourse !== null && idUser !== null) {
      const res = await attachStudent(idUser, { student_of: idCourse });

      if (res?.success) {
        //   setComponentLevelLoader({ loading: false, id: "" });
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error(res?.message ? res.message : res, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        //   setComponentLevelLoader({ loading: false, id: "" });
      }
    }
  };
  const onDisable = () => {
    if (idUser !== "" && idCourse !== "") {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="p-2 m-3">
      <div className=" border p-2">
        <div className="flex justify-center">
          <h3 className="font-bold">Thêm học viên</h3>
        </div>
        <div className="flex justify-around my-2">
          <Select
            items={student}
            labelPlacement="outside"
            startContent={<FaRegUser color="blue" />}
            label="Danh sách học viên:"
            placeholder="chọc học viên để gắn"
            className="max-w-xs"
            onChange={(e) => setIdUser(e.target.value)}
          >
            {(i) => <SelectItem key={i._id.toString()}>{i.name}</SelectItem>}
          </Select>
          <Select
            items={course}
            labelPlacement="outside"
            startContent={<FaTable color="purple"></FaTable>}
            label="Danh sách khóa học:"
            placeholder="chọn khóa học"
            className="max-w-xs"
            onChange={(e) => setIdCourse(e.target.value)}
          >
            {(i) => <SelectItem key={i._id.toString()}>{i.name}</SelectItem>}
          </Select>
        </div>
        {/* <select onChange={(e) => setIdUser(e.target.value)}>
          <option selected>{"--chon hoc vien--"}</option>

          {student.map((i, index) => (
            <option key={index} value={i._id}>
              {i.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setIdCourse(e.target.value)}>
          <option selected>{"--chon giao' vien--"}</option>

          {course.map((i, index) => (
            <option key={index} value={i._id}>
              {i.name}
            </option>
          ))}
        </select> */}
        <div className="flex justify-center">
          <Button
            color="secondary"
            isDisabled={onDisable()}
            onPress={() => handleSubmit()}
          >
            Đồng ý
          </Button>
        </div>
      </div>
      <Notification></Notification>
    </div>
  );
};

export default Attach;
