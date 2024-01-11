"use client";
import React, { useEffect, useState } from "react";
import "./pagin.css";
import { getTopCoursesByStudent } from "@/services/lesson";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { getAllCourse } from "@/services/course";
import { getAllUsers } from "@/services/users";
import { getTop5UserCompleteCourse } from "@/services/dashboard";

const Pagin = () => {
  const [topCoursesByStudent, setTopCoursesByStudent] = useState([]);
  const [topUserCompletedCourse, setTopUserCompletedCourse] = useState([]);
  const [course, setCourse] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const initData = async () => {
      const courseData = await getAllCourse();
      const res = await getTopCoursesByStudent();
      const userData = await getAllUsers();
      const userCompletedData = await getTop5UserCompleteCourse();
      setTopCoursesByStudent(res.data.courses);
      setCourse(courseData.data);
      setUser(userData.data);
      setTopUserCompletedCourse(userCompletedData.data);
    };

    initData();
  }, []);

  console.log(topUserCompletedCourse);

  const sortTotalStudent = topCoursesByStudent.sort((a, b) => {
    return b.total_student - a.total_student;
  });

  const teacherInUser = user.filter((item) => {
    if (item.teacher_of.length > 0) {
      return item;
    }
  });

  const studentInUser = user.filter((item) => {
    if (item.student_of.length > 0) {
      return item;
    }
  });

  return (
    <div className="ml-5 mt-10">
      <div className="flex gap-10 mb-10">
        <Card className="w-[250px] flex justify-center items-center rounded-sm">
          <CardHeader className="flex-col items-center">
            <h4 className="font-bold text-large">{course.length}</h4>
          </CardHeader>
          <CardBody className="flex-col items-center">
            <h4 className="text-tiny uppercase font-bold">Khoá học</h4>
          </CardBody>
        </Card>

        <Card className="w-[250px] flex justify-center items-center rounded-sm">
          <CardHeader className="flex-col items-center">
            <h4 className="font-bold text-large">{teacherInUser.length}</h4>
          </CardHeader>
          <CardBody className="flex-col items-center">
            <h4 className="text-tiny uppercase font-bold">Giảng viên</h4>
          </CardBody>
        </Card>

        <Card className="w-[250px] flex justify-center items-center rounded-sm">
          <CardHeader className="flex-col items-center">
            <h4 className="font-bold text-large">{studentInUser.length}</h4>
          </CardHeader>
          <CardBody className="flex-col items-center">
            <h4 className="text-tiny uppercase font-bold">Học viên</h4>
          </CardBody>
        </Card>
      </div>

      <div className="flex flex-col w-96">
        <h4 className="font-bold text-large mb-5">Top khoá học</h4>
        <div className="flex justify-between border-b-1 border-gray-400 py-3">
          <p className="w-8">#</p>

          <h3 className="w-64 font-bold">Khoá học</h3>

          <h3 className="w-24 font-bold">Số học viên</h3>
        </div>

        <div className="flex flex-col w-96">
          {sortTotalStudent?.map((item, index) => {
            const isLastItem = index === sortTotalStudent.length - 1;

            return (
              <div
                key={item._id}
                className="flex justify-between border-b-1 border-gray-400 py-3"
                style={isLastItem ? { borderBottom: "none" } : {}}
              >
                <p className="w-8">{index + 1}</p>

                <div className="w-64">{item.about_course}</div>

                <div className="w-24">{item.total_student}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pagin;
