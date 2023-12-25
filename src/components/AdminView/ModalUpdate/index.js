import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { updateLesson } from "@/services/lesson";
import { toast } from "react-toastify";
const ModalUpdate = (props) => {
  const { showModal, setShowModal, setLesson, lesson } = props;
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const handleClose = () => {
    setName("");
    setId("");
    setShowModal(false);
    setLesson(null);
  };
  const handleSumbit = async () => {
    const res = await updateLesson({ name: name, _id: id });
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
  useEffect(() => {
    console.log(lesson);
    if (lesson && lesson._id) {
      setName(lesson.name);
      setId(lesson._id);
    }
  }, [lesson]);
  return (
    <div>
      {" "}
      <div className="">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
          <div>
            <div
              className={`${
                showModal ? "act" : "inact"
              } fixed inset-0 hidden  bg-black/60 z-[999] overflow-y-auto `}
            >
              <div className="flex  items-start justify-center min-h-screen px-4 right-0">
                <div
                  // ref={menuRef}
                  className="animate-modal transition-all transform bg-white relative shadow-3xl border-0 p-0 rounded-lg overflow-hidden my-8 w-full max-w-lg"
                >
                  <div className="flex bg-white items-center border-b border-black/10 justify-between px-5 py-3">
                    <h5 className="font-semibold text-lg">Lorem ne hihi</h5>
                    <button
                      className=" hover:text-black"
                      onClick={() => setShowModal(!showModal)}
                    >
                      {/* <img className="text-gray-400 w-4" src={exit} alt="" /> */}
                    </button>
                  </div>
                  <div className="p-5 ">
                    <div className="text-sm text-black flex flex-col">
                      <div>
                        <label htmlFor="">title</label>
                        <input
                          type="text"
                          className="border border-black p-2 m-2"
                          placeholder="..."
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end items-center  gap-4">
                      <button
                        onClick={handleClose}
                        className="px-4 py-2 rounded-md !bg-[red] !text-white text-[14px]"
                      >
                        close
                      </button>
                      <button
                        onClick={handleSumbit}
                        className="px-4 py-2 rounded-md bg-[#f3f3f3] text-black hover:bg-black hover:text-white  text-[14px]"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
