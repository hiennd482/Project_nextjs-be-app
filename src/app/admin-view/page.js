"use client";
import React, { useEffect, useState } from "react";
import "./pagin.css";
import { getTopCoursesByStudent } from "@/services/lesson";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { getAllCourse } from "@/services/course";
import { allStudents, getAllUsers } from "@/services/users";
import { getTop5UserCompleteCourse } from "@/services/dashboard";
import { FaBook, FaChalkboardTeacher, FaRegUser } from "react-icons/fa";
const Pagin = () => {
  const [topCoursesByStudent, setTopCoursesByStudent] = useState([]);
  const [topUserCompletedCourse, setTopUserCompletedCourse] = useState([]);
  const [course, setCourse] = useState([]);
  const [user, setUser] = useState([]);
  const [student, setStudent] = useState([]);

  useEffect(() => {
    initData();
  }, []);
  const initData = async () => {
    const courseData = await getAllCourse();
    const res = await getTopCoursesByStudent();
    const userData = await getAllUsers();
    const userCompletedData = await getTop5UserCompleteCourse();
    setTopCoursesByStudent(res.data.courses);
    setCourse(courseData.data);
    setUser(userData.data);
    setTopUserCompletedCourse(userCompletedData.data);
    getStudent();
  };
  // console.log(topUserCompletedCourse);
  const getStudent = async () => {
    const resStudent = await allStudents();
    if (resStudent.success) {
      // console.log(resStudent.data);
      setStudent(resStudent.data);
    } else {
      console.log("first");
    }
  };

  const sortTotalStudent = topCoursesByStudent.sort((a, b) => {
    return b.total_student - a.total_student;
  });
  const sortStudent = student.sort((a, b) => {
    return b.student_of.length - a.student_of.length;
  });
  const teacherInUser = user.filter((item) => {
    if (item.role === "teacher") {
      return item;
      // console.log(item);
    }
  });

  const studentInUser = user.filter((item) => {
    if (item.role === "user") {
      return item;
      // console.log(item);
    }
  });

  return (
    <div className="ml-5 mt-10">
      <div className="flex gap-8 mb-10 justify-center">
        <Card className="w-full bg-purple-500 flex items-center rounded-md">
          <CardHeader className="flex-col items-center">
            <h4 className="font-bold text-large text-white">{course.length}</h4>
          </CardHeader>
          <Divider className="w-[70%] bg-white" />
          <CardBody className="flex-col items-center">
            <h4 className="text-tiny gap-2 uppercase font-bold text-white flex items-center">
              <FaBook className="text-lg" />
              Khoá học
            </h4>
          </CardBody>
        </Card>

        <Card className="w-full bg-purple-500 flex justify-center items-center rounded-sm">
          <CardHeader className="flex-col items-center">
            <h4 className="font-bold text-large text-white">
              {teacherInUser.length}
            </h4>
          </CardHeader>
          <Divider className="w-[70%] bg-white" />
          <CardBody className="flex-col items-center">
            <h4 className="text-tiny uppercase font-bold text-white flex items-center gap-2">
              <FaChalkboardTeacher className="text-lg"></FaChalkboardTeacher>{" "}
              Giảng viên
            </h4>
          </CardBody>
        </Card>

        <Card className="w-full bg-purple-500 flex justify-center items-center rounded-sm">
          <CardHeader className="flex-col items-center">
            <h4 className="font-bold text-large text-white">
              {studentInUser.length}
            </h4>
          </CardHeader>
          <Divider className="w-[70%] bg-white" />
          <CardBody className="flex-col items-center">
            <h4 className="text-tiny uppercase font-bold text-white flex items-center gap-2">
              <FaRegUser className="text-lg"></FaRegUser>Học viên
            </h4>
          </CardBody>
        </Card>
      </div>
      <div className="flex gap-3 justify-evenly">
        <div className="flex flex-col w-[45%]">
          <h4 className="font-bold text-large mb-5">Top khoá học</h4>
          <div className="flex justify-between border-b-1 border-gray-400 py-3">
            <p className="w-8">#</p>

            <h3 className="w-auto font-bold">Khoá học</h3>

            <h3 className="w-24 font-bold">Số học viên</h3>
          </div>

          <div className="flex flex-col ">
            {sortTotalStudent?.map((item, index) => {
              const isLastItem = index === sortTotalStudent.length - 1;

              return (
                <div
                  key={item._id}
                  className="flex justify-between border-b-1 border-gray-400 py-3"
                  style={isLastItem ? { borderBottom: "none" } : {}}
                >
                  <p className="w-8">{index + 1}</p>

                  <div className="w-auto">{item.name}</div>

                  <div className="w-24">{item.total_student}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col w-[45%]">
          <h4 className="font-bold text-large mb-5">Top học viên </h4>
          <div className="flex justify-between border-b-1 border-gray-400 py-3">
            <p className="w-8">#</p>

            <h3 className="w-auto font-bold">Họ và tên</h3>

            <h3 className="w-24 font-bold">Hoàn thành khóa học</h3>
          </div>

          <div className="flex flex-col ">
            {sortStudent?.map((item, index) => {
              // console.log(student);
              const isLastItem = index === sortStudent.length - 1;

              return (
                <div
                  key={item._id}
                  className="flex justify-between border-b-1 border-gray-400 py-3"
                  style={isLastItem ? { borderBottom: "none" } : {}}
                >
                  <p className="w-8">{index + 1}</p>

                  <div className="w-auto">{item.name}</div>

                  <div className="w-24">{item.student_of.length}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagin;
