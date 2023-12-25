"use client";
import Navbar from "@/components/AdminView/Navbar";
import React, { useState, useEffect } from "react";
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
import {
  FaFolderPlus,
  FaPen,
  FaRegTrashAlt,
  FaBookMedical,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Notification from "@/components/Notification";
import {
  addFileLesson,
  deleteFileLesson,
  getFilelessons,
  updateFilelessons,
} from "@/services/lesson";
import { fileFormControls, firebaseConfig, firebaseStroageURL } from "@/utils";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

async function helperForUPloadingImageToFirebase(file) {
  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `lesson/${getFileName}`);
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
const Addlesson = () => {
  let getStorage = [];
  if (typeof window !== "undefined") {
    getStorage = JSON.parse(sessionStorage.getItem("chapter"));
  }
  const formInnit = {
    name: "",
    lesson_url: "",
    lesson_file: "",
  };
  const [chapter, setChapter] = useState(getStorage);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [file, setFile] = useState(formInnit);
  console.log(chapter._id);

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const getFile = async () => {
    const res = await getFilelessons(chapter._id);
    if (res?.data) {
      setData(res.data);
      // console.log(file);
    } else {
      console.log("ko tim thay");
    }
  };
  useEffect(() => {
    getFile();
  }, []);
  async function handleImage(event) {
    const extractImageUrl = await helperForUPloadingImageToFirebase(
      event.target.files[0]
    );

    if (extractImageUrl !== "") {
      setFile({
        ...file,
        lesson_file: extractImageUrl,
      });
    } else {
      setFile({
        ...file,
        lesson_file: extractImageUrl,
      });
    }
  }
  const handleAddFile = async () => {
    const res = await addFileLesson({
      ...file,
      lesson_id: chapter._id,
    });
    if (res?.success) {
      toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFile(formInnit);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFile(formInnit);
    }
  };
  const handleDetele = async (item) => {
    console.log(item);
    if (confirm(`Delete lesson ${item.name}?`) == true) {
      const res = await deleteFileLesson(item._id);
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

  const openEdit = async (item) => {
    console.log(item);
    setId(item._id);
    formInnit.name = item.name;
    formInnit.lesson_file = item.lesson_file;
    formInnit.lesson_url = item.lesson_url;
    console.log("update", formInnit);
    setFile(formInnit);
    onOpen();
  };
  const handleClose = (item) => {
    if (file.name !== "" && file.lesson_url !== "") {
      console.log("day la data ?", file);
      setFile(formInnit);
      setId("");
      onClose();
    } else {
      console.log("lam gi co' data ma log", item);
      onClose();
    }
  };
  const handleEdit = async () => {
    if (file !== null) {
      // console.log("update", file);
      const res = await updateFilelessons(id, file);
      if (res?.success) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFile(formInnit);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(res.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFile(formInnit);
      }
    }
  };
  // const input = document.getElementById("upload-img");
  // // input.addEventListener(
  // //   ("change",
  // //   (e) => {
  // //     const file = e.target.files[0];
  // //     const url = URL.createObjectURL(file);
  // //     document.querySelector("img").src = url;
  // //   })

  // // );
  // if (input) {
  //   input.addEventListener("change", (e) => {
  //     const uploadFile = e.target.files[0];
  //     const url = URL.createObjectURL(uploadFile);
  //     document.querySelector("#thumb").src = url;
  //   });
  // }

  return (
    <div className="p-2 m-3">
      <div className="sticky">
        <Navbar></Navbar>
      </div>
      {chapter && chapter !== null ? (
        <>
          <Card className="p-2 ">
            <CardHeader className="flex gap-3">
              <p className="text-lg font-bold">{chapter.name}</p>
            </CardHeader>
            {/* <Divider className="my-4" /> */}
            <Divider className="" />
            <CardBody>
              <div>
                <span>danh sach bai hoc:</span>

                {data?.map((i, index) => (
                  <div key={index} className="flex items-center">
                    <Accordion variant="splitted" key={index}>
                      <AccordionItem
                        key={i._id}
                        aria-label="Accordion 2"
                        title={i.name}
                        className="my-1"
                      >
                        <div>video:{i.lesson_url}</div>
                        <div>
                          file:{i.lesson_file ? i.lesson_file : "chua co'"}
                        </div>
                      </AccordionItem>
                    </Accordion>
                    <div className="flex gap-2">
                      {/* edit */}
                      <Button
                        size="sm"
                        isIconOnly
                        color="warning"
                        className="text-white"
                        onPress={() => openEdit(i)}
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
                  Them bai hoc moi <FaFolderPlus />
                </Button>
              </div>
            </CardBody>
            <Divider className="" />
            <CardFooter></CardFooter>
          </Card>
          {/* modal */}
          <div>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isClose={onClose}
              isDismissable={false}
            >
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Them bai hoc
                    </ModalHeader>
                    <ModalBody>
                      {file == null ? (
                        <>
                          {fileFormControls.map((formItem, index) => (
                            // <label htmlFor="">{formItem.label}<label/>
                            <input
                              key={index}
                              type={formItem.type}
                              placeholder={formItem.placeholder}
                              value={file[formItem.id]}
                              onChange={(e) =>
                                setFile({
                                  ...file,
                                  [formItem.id]: e.target.value,
                                })
                              }
                              id="default-input"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            />
                          ))}
                        </>
                      ) : (
                        <>
                          {fileFormControls.map((formItem, index) => (
                            <input
                              key={index}
                              type={formItem.type}
                              placeholder={formItem.placeholder}
                              label={formItem.label}
                              value={file[formItem.id]}
                              onChange={(e) =>
                                setFile({
                                  ...file,
                                  [formItem.id]: e.target.value,
                                })
                              }
                              id="default-input"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            />
                          ))}
                        </>
                      )}
                      <div>
                        <input
                          id="upload-img"
                          // accept="image/*"
                          max="1000000"
                          type="file"
                          onChange={handleImage}
                          className="text-black"
                        />
                      </div>

                      {/* <input
                        type="text"
                        name=""
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      />
                      <input
                        type="text"
                        name=""
                        value={file}
                        onChange={(e) => setFile(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      /> */}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={() => handleClose()}
                      >
                        Close
                      </Button>
                      {id !== "" ? (
                        <>
                          <Button color="primary" onPress={() => handleEdit()}>
                            edit
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            color="primary"
                            onPress={() => handleAddFile()}
                          >
                            add
                          </Button>
                        </>
                      )}
                      {/* <Button color="primary" onPress={() => handleAddFile()}>
                        Action
                      </Button> */}
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <Notification></Notification>
        </>
      ) : (
        <>
          <span>loading...</span>
        </>
      )}
    </div>
  );
};

export default Addlesson;
