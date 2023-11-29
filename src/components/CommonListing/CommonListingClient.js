"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons";
import ProductTile from "./ProductTile";
import { useEffect } from "react";
import Notification from "../Notification";
import { sieBarOps } from "@/utils";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Skeleton,
  Card,
} from "@nextui-org/react";
export default function CommonListingClient({ data }) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <section className="bg-white py-12 sm:py-16 w-full">
      <div className="px-20 w-full">
        <div className="mt-6 flex justify-center w-full">
          <div>
            <p className="text-xl">SẢN PHẨM HOT</p>

            <div className="mt-6">
              {/* <p className="text-md text-[#22B24C]">Quần phổ thông</p> */}
              <ul className="mt-5">
                {sieBarOps.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => router.push(item.path)}
                    className="text-md mt-2 cursor-pointer hover:text-green-500"
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-[1100px] ml-24">
            <Card className="w-[200px] space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-24 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </Card>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Modal Title
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor
                        quam.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor
                        quam.
                      </p>
                      <p>
                        Magna exercitation reprehenderit magna aute tempor
                        cupidatat consequat elit dolor adipisicing. Mollit dolor
                        eiusmod sunt ex incididunt cillum quis. Velit duis sit
                        officia eiusmod Lorem aliqua enim laboris do dolor
                        eiusmod. Et mollit incididunt nisi consectetur esse
                        laborum eiusmod pariatur proident Lorem eiusmod et.
                        Culpa deserunt nostrud ad veniam.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" onPress={onClose}>
                        Action
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
            <div className="flex flex-wrap">
              {data && data.length
                ? data.map((prd) => (
                    <div
                      key={prd}
                      className="w-48 border hover:border-[#22B24C] ease-linear m-5"
                      onClick={() => router.push(`/product/${prd._id}`)}
                    >
                      <img src={prd.imageUrl} className="w-full" />
                      <div className="p-3">
                        <p className="text-xl">{prd.name}</p>
                        <p className="pt-3 text-[#22B24C]">
                          {Intl.NumberFormat("vi-VN").format(prd.price)}vnd
                        </p>
                        <p>{prd.category}</p>
                      </div>
                      <ProductButton item={prd} />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
