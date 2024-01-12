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
  CircularProgress,
} from "@nextui-org/react";
import {
  FaFolderPlus,
  FaPen,
  FaRegTrashAlt,
  FaBookMedical,
  FaCheck,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Notification from "@/components/Notification";
import Image from "next/image";
import img from "@/assets/index";
import {
  addFileLesson,
  deleteFileLesson,
  getFilelessons,
  updateFilelessons,
} from "@/services/lesson";
import { fileFormControls, firebaseConfig, firebaseStroageURL } from "@/utils";
import { initializeApp } from "firebase/app";
import ModalUpdate from "@/components/AdminView/ModalUpdate";
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

const createUniqueFileName = (getFile) => {
  const timeStamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);

  return `${getFile.name}-${timeStamp}-${randomStringValue}`;
};

const formInnit = {
  name: "",
  lesson_url: "",
  lesson_file: "",
};
const Addlesson = () => {
  let getStorage = [];
  if (typeof window !== "undefined") {
    getStorage = JSON.parse(sessionStorage.getItem("chapter"));
  }

  const [chapter, setChapter] = useState(getStorage);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [file, setFile] = useState(formInnit);
  const [url, setUrl] = useState("");
  const [value, setValue] = useState(0);
  // console.log(chapter._id);
  async function helperForUPloadingImageToFirebase(file) {
    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `lesson/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageReference, file);

    return new Promise((resolve, reject) => {
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log("day la progress", Math.round(progress));
          setValue(progress);
        },
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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const getFile = async () => {
    const res = await getFilelessons(chapter?._id);
    if (res?.data) {
      setData(res.data);
      // console.log(file);
    } else {
      console.log("ko tim thay");
    }
  };
  useEffect(() => {
    getFile();
    document.getElementById("upload-img");
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
      console.log("image", extractImageUrl);
      setUrl(extractImageUrl);
      // setFile()
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
      setTimeout(() => {
        window.location.reload();
        setFile(formInnit);
      }, 1000);
    } else {
      toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setFile(formInnit);
    }
    // console.log("day la handle add", { ...file, lesson_id: chapter._id });
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
    // console.log(item);
    setId(item._id);
    formInnit.name = item.name;
    formInnit.lesson_file = item.lesson_file;
    formInnit.lesson_url = item.lesson_url;
    console.log("update", formInnit);
    setFile(formInnit);
    onOpen();
  };
  const handleClose = async () => {
    formInnit.name = "";
    formInnit.lesson_file = "";
    formInnit.lesson_url = "";
    setFile(formInnit);
    setUrl("");
    setId("");
    onClose();
    setValue(0);
  };

  const handleEdit = async () => {
    if (file !== null) {
      console.log("hanlde edit", file);
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
  const onDisable = () => {
    if (url === "") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {data.length !== 0 ? (
        <>
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
                      <span>Danh sách bài học:</span>

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
                                file:
                                {i.lesson_file ? i.lesson_file : "chua co'"}
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
                        Thêm bài học mới <FaFolderPlus />
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
                          {file.name === "" ? (
                            <ModalHeader className="flex flex-col gap-1">
                              Thêm bài học
                            </ModalHeader>
                          ) : (
                            <ModalHeader className="flex flex-col gap-1">
                              Sửa bài học
                            </ModalHeader>
                          )}
                          <ModalBody>
                            {file.name === "" &&
                            file.lesson_file === "" &&
                            file.lesson_url === "" ? (
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
                            <div className="flex items-center">
                              <input
                                id="upload-img"
                                // accept="video/mp4"
                                max="1000000"
                                type="file"
                                onChange={handleImage}
                                className="text-black"
                              />
                              {value < 99 ? (
                                <>
                                  <CircularProgress
                                    aria-label="Loading..."
                                    size="md"
                                    value={value}
                                    color={value === 100 ? "success" : "waring"}
                                    showValueLabel={true}
                                  />
                                </>
                              ) : (
                                <>
                                  <text>
                                    <FaCheck color="green" />
                                  </text>
                                </>
                              )}
                            </div>
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              color="danger"
                              variant="light"
                              onPress={() => handleClose()}
                            >
                              Đóng
                            </Button>
                            {id !== "" ? (
                              <>
                                <Button
                                  color="primary"
                                  onPress={() => handleEdit()}
                                >
                                  Sửa
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  isDisabled={onDisable()}
                                  color="primary"
                                  onPress={() => handleAddFile()}
                                >
                                  Thêm
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
        </>
      ) : (
        <>
          <div className="p-2">
            <div className="sticky">
              <Navbar></Navbar>
            </div>
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
                        {file.name === "" ? (
                          <ModalHeader className="flex flex-col gap-1">
                            Thêm bài học
                          </ModalHeader>
                        ) : (
                          <ModalHeader className="flex flex-col gap-1">
                            Sửa bài học
                          </ModalHeader>
                        )}
                        <ModalBody>
                          {file.name === "" &&
                          file.lesson_file === "" &&
                          file.lesson_url === "" ? (
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
                          <div className="flex">
                            <input
                              id="upload-img"
                              // accept="video/mp4"
                              max="1000000"
                              type="file"
                              onChange={handleImage}
                              className="text-black"
                            />
                            {value < 99 ? (
                              <>
                                <CircularProgress
                                  aria-label="Loading..."
                                  size="md"
                                  value={value}
                                  color={value === 100 ? "success" : "waring"}
                                  showValueLabel={true}
                                />
                              </>
                            ) : (
                              <>
                                <text>done</text>
                              </>
                            )}
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
                          {id !== "" ? (
                            <>
                              <Button
                                color="primary"
                                onPress={() => handleEdit()}
                              >
                                edit
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                isDisabled={onDisable()}
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
          </div>
        </>
      )}
    </div>
  );
};

export default Addlesson;
