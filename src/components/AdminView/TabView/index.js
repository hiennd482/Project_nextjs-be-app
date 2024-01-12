"use client";
import React from "react";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import HeadeTitle from "@/components/AdminView/HeadTitle";

export default function TabView() {
  const [selected, setSelected] = React.useState("intro");

  return (
    <div className="flex w-full flex-col mt-3 p-2">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        color="primary"
      >
        <Tab key="intro" title="Intro Course">
          <HeadeTitle
            home={"Home"}
            name={"Quản lý user"}
            onClick={() => handleClick()}
          ></HeadeTitle>
        </Tab>
        <Tab key="lesson" title="Lesson">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="setting" title="Setting">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
