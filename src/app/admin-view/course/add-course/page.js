"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
// import { updateCourse } from "@/services/users";
import { addCourse, updateCourse } from "@/services/course";
import { allTeachers } from "@/services/users";
import {
  AvailableSizes,
  registrationFormControls,
  updateUserformControls,
  courseFormControls,
  firebaseConfig,
  firebaseStroageURL,
} from "@/utils";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { resolve } from "styled-jsx/css";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `course/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

const initialFormData = {
  name: "",
  teacher_id: "",
  about_course: "",
  about_intro: "",
  thumbnail_url: "",
};

export default function AddNewUser() {
  const [formData, setFormData] = useState(initialFormData);
  const [teacher, setTeacher] = useState([]);

  const {
    componentLevelLoader,
    setComponentLevelLoader,
    currentUpdateCourse,
    setcurrentUpdateCourse,
    setCurrentUpdateCourse,
  } = useContext(GlobalContext);

  console.log(currentUpdateCourse);
  const getTeachers = async () => {
    const dataTeacher = await allTeachers();
    if (dataTeacher?.data) {
      console.log(dataTeacher.data);
      setTeacher(dataTeacher?.data);
    } else {
      console.log("api loi mat roi tai sao ko bij loi");
    }
  };

  const router = useRouter();

  useEffect(() => {
    getTeachers();
    if (currentUpdateCourse !== null) setFormData(currentUpdateCourse);
  }, [currentUpdateCourse]);

  async function handleImage(event) {
    const extractImageUrl = await helperForUPloadingImageToFirebase(
      event.target.files[0]
    );

    if (extractImageUrl !== "") {
      setFormData({
        ...formData,
        thumbnail_url: extractImageUrl,
      });
    } else {
      setFormData({
        ...formData,
        thumbnail_url: extractImageUrl,
      });
    }
  }

  async function handleAddUser() {
    // setComponentLevelLoader({ loading: true, id: "" });
    const res =
      currentUpdateCourse !== null
        ? await updateCourse(formData, currentUpdateCourse._id)
        : await addCourse(formData);

    // if (currentUpdateCourse === null) {
    //   const resp = await addCourse(formData);
    //   console.log("day la danwg ky", resp);
    // } else {
    //   const resp = await updateCourse(formData);
    //   console.log(" day la update", resp);
    // }
    console.log("day la tai sao", res);

    if (res?.success) {
      //   setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setFormData(initialFormData);

      setCurrentUpdateCourse(null);
      setTimeout(() => {
        router.push("/admin-view/course/");
      }, 1000);
    } else {
      toast.error(res?.message ? res.message : res, {
        position: toast.POSITION.TOP_RIGHT,
      });
      //   setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    }
  }
  const input = document.getElementById("upload-img");
  // input.addEventListener(
  //   ("change",
  //   (e) => {
  //     const file = e.target.files[0];
  //     const url = URL.createObjectURL(file);
  //     document.querySelector("img").src = url;
  //   })

  // );
  if (input) {
    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      document.querySelector("#thumb").src = url;
    });
  }

  // console.log(formData);

  return (
    <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <input
            id="upload-img"
            // accept="image/*"
            max="1000000"
            type="file"
            onChange={handleImage}
            className="text-black"
          />
          <img className="max-h-[20%] max-w-[20%] " id="thumb"></img>
          <div className="flex gap-2 flex-col">
            {/* <label>Available sizes</label> */}
            {/* <TileComponent
              selected={formData.sizes}
              onClick={handleTileClick}
              data={AvailableSizes}
            /> */}
          </div>
          {currentUpdateCourse == null ? (
            <>
              {courseFormControls.map((controlItem) =>
                controlItem.componentType === "input" ? (
                  <InputComponent
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    label={controlItem.label}
                    value={formData[controlItem.id]}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [controlItem.id]: event.target.value,
                      });
                    }}
                  />
                ) : controlItem.componentType === "select" ? (
                  <div className="relative">
                    <select
                      id="teacherName"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: e.target.value,
                        });
                      }}
                    >
                      {teacher.map((i, index) => (
                        <>
                          <option key={index} value={i._id}>
                            {i.name}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                ) : // <SelectComponent
                // label={controlItem.label}
                // options={controlItem.options}
                // value={formData[controlItem.id]}
                // onChange={(event) => {
                //   setFormData({
                //     ...formData,
                //     [controlItem.id]: event.target.value,
                //   });
                // }}
                //   />
                null
              )}
            </>
          ) : (
            <>
              {courseFormControls.map((controlItem) =>
                controlItem.componentType === "input" ? (
                  <InputComponent
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    label={controlItem.label}
                    value={formData[controlItem.id]}
                    onChange={(event) => {
                      setFormData({
                        ...formData,
                        [controlItem.id]: event.target.value,
                      });
                    }}
                  />
                ) : controlItem.componentType === "select" ? (
                  <div className="relative">
                    <select
                      id="teacherName"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          [controlItem.id]: e.target.value,
                        });
                      }}
                    >
                      <option selected>
                        {currentUpdateCourse.teacher_id.name}
                      </option>
                      {teacher.map((i, index) => (
                        <>
                          <option id={i._id} key={index} value={i._id}>
                            {i.name}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="relative">
                    <span>null</span>
                  </div>
                )
              )}
            </>
          )}

          <button
            onClick={handleAddUser}
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text={
                  currentUpdateCourse !== null ? "dang cap nhat" : "dang them "
                }
                color={"#ffffff"}
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : currentUpdateCourse !== null ? (
              "Update user"
            ) : (
              "Add user"
            )}
          </button>
        </div>
      </div>
      <Notification />
    </div>
  );
}
