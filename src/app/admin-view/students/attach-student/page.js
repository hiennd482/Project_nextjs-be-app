"use client";
import { getAllCourse } from "@/services/course";
import { allStudents, attachStudent } from "@/services/users";
import React, { useEffect, useState } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { toast } from "react-toastify";
import Notification from "@/components/Notification";
import { useRouter } from "next/navigation";

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
          router.push("/admin-view/students/");
        }, 1000);
      } else {
        toast.error(res?.message ? res.message : res, {
          position: toast.POSITION.TOP_RIGHT,
        });
        //   setComponentLevelLoader({ loading: false, id: "" });
      }
    }
  };

  return (
    <div className="p-2 m-3">
      <div className=" border border-red-500">
        {/* <Select
          label="Chon hoc vien de gan"
          className="max-w-xs"
          onChange={handleSelectionChange}
          selectedKeys={[idUser]}
        >
          {student.map((i, index) => (
            <SelectItem key={index} value={i._id}>
              {i.name}
            </SelectItem>
          ))}
        </Select> */}
        <select onChange={(e) => setIdUser(e.target.value)}>
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
        </select>
        {/* <Select
          label="Chon khoa hoc "
          className="max-w-xs"
          onChange={(e) => setCourse(e.target.value)}
        >
          {course.map((i, index) => (
            <SelectItem key={index} value={i._id}>
              {i.name}
            </SelectItem>
          ))}
        </Select> */}
        <p className="text-small text-default-500">Selected: {idUser}</p>
        <p className="text-small text-default-500">Selected: {idCourse}</p>
        <div>
          <Button onPress={() => handleSubmit()}>Submit</Button>
        </div>
      </div>
      <Notification></Notification>
    </div>
  );
};

export default Attach;
