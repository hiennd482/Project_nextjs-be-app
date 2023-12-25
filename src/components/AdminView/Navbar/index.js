import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function App() {
  const pathname = usePathname();

  return (
    <Navbar className="p-2 my-2" position="sticky">
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            color={
              pathname === "/admin-view/course/lesson"
                ? "primary"
                : "foreground"
            }
            href="/admin-view/course/lesson"
            underline={
              pathname === "/admin-view/course/lesson" ? "always" : "none"
            }
          >
            Gioi thieu ve khoa hoc
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color={
              pathname === "/admin-view/course/lesson/file-lesson"
                ? "primary"
                : "foreground"
            }
            href="/admin-view/course/lesson/file-lesson"
            underline={
              pathname === "/admin-view/course/lesson/file-lesson"
                ? "always"
                : "none"
            }
          >
            bai hoc
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
