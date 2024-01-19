import React from "react";
import iconPath from "@/assets/index";
import Image from "next/image";
import { images } from "../../../next.config";
function Footer() {
  return (
    <footer className="h-96  mt-6">
      <div className="  px-[130px]">
        <div className="grid lg:grid-cols-[300px_minmax(600px,_1fr)_300px] grid-cols-1 gap-5">
          <div className=" flex-col text-right px-3  border-r-[1px] border-gray-custom">
            <h3 className="text-4xl font-bold text-blue-custom">Contact us</h3>
            <div className="py-6 cursor-default">
              <div className="py-3">
                <h4 className="text-xl font-bold text-blue-custom">Email</h4>
                <text className="cursor-pointer hover:text-green-custom">
                  dhien482@gmail.com
                </text>
              </div>
              <div className="py-3">
                <h4 className="text-xl font-bold text-blue-custom">Phone</h4>
                <text className="cursor-pointer hover:text-green-custom">
                  031447375
                </text>
              </div>
              <div className="py-3">
                <h4 className="text-xl font-bold text-blue-custom">Address</h4>
                <text className="cursor-pointer hover:text-green-custom">
                  234 hoang quoc viet
                </text>
              </div>
            </div>
          </div>
          {/* <div className=""></div> */}
          {/* padding */}
          <div className=" flex-col text-center px-3  ">
            <div className="flex  justify-center">
              <Image
                src={iconPath.logo2}
                alt="logo"
                className="w-[200px] h-[200px]"
              ></Image>
            </div>
            <div className="flex items-center gap-2 justify-center cursor-pointer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                alt=""
                className="w-[20%] h-[20%]"
              />
              <Image
                src={iconPath.qrapp}
                alt="logo"
                className="w-[100px] h-[100px]"
              ></Image>
            </div>
            <div className="flex gap-4 justify-center mt-8 cursor-pointer">
              <Image
                src={iconPath.fbicon}
                alt="fb"
                className="hover:bg-green-custom"
              ></Image>
              <Image src={iconPath.igicon} alt="ig"></Image>
              <Image src={iconPath.twicon} alt="tw"></Image>
              <Image src={iconPath.pesticon} alt="pin"></Image>
            </div>
          </div>
          <div className=" flex-col text-left px-3 border-l-[1px]  border-gray-custom ">
            <h3 className="text-4xl font-bold text-blue-custom">
              Utility Pages
            </h3>
            <div className="py-6 cursor-default">
              <div className="py-3">
                <h4 className="text-xl font-bold text-blue-custom">
                  Style Guide
                </h4>
              </div>
              <div className="py-3">
                <h4 className="text-xl font-bold text-blue-custom">
                  Style Guide
                </h4>
              </div>
              <div className="py-3">
                <h4 className="text-xl font-bold text-blue-custom">
                  Page Not Found
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
