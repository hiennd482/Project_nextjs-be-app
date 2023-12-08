"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { users } from "./data";

export default function App() {
  const [page, setPage] = React.useState(1);
  //   let index = 0;
  const rowsPerPage = 6;

  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="no">NAME</TableColumn>
        <TableColumn key="name">NAME</TableColumn>
        <TableColumn key="role">ROLE</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
        <TableColumn key="actions">actions</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {items.map((item, index) => (
          <TableRow key={item.key}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.role}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell className="">
              <Button color="primary">xin chao</Button>
              <Button color="warning">xin </Button>
              {/* xin chafo */}
            </TableCell>
            {/* {(data) => <TableCell>{getKeyValue(item, data)}</TableCell>} */}
          </TableRow>
        ))}

        {/* <TableRow >
          <TableCell>
            <Button>xin chao</Button>
          </TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  );
}
