"use client";
import React, { useEffect, useState } from "react";
import "./pagin.css";

const renderData = (data) => {
  return (
    <ul>
      {data.map((todo, index) => {
        return (
          <li key={index}>
            {todo.id}
            {todo.title}
          </li>
        );
      })}
    </ul>
  );
};

const Pagin = () => {
  const [data, setData] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFistItem = indexOfLastItem - itemsPerPage;

  const currentItems = data.slice(indexOfFistItem, indexOfLastItem);

  const renderPageNumber = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          className={` ${
            currentPage == number ? "active" : null
          } p-2 border cursor-pointer rounded m-[2px]`}
          key={number}
          id={number}
          onClick={handleClick}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
    // if (pages.length > maxPageNumberLimit) {
    //     pageIncrementBtn = <li onClick={handleNextbtn}>&hellip;</li>;
    //   }
  });
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit); //
    }
  };
  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit); //
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}>&hellip;</li>;
  }
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}>&hellip;</li>;
  }
  return (
    <div className="ml-5">
      Pagin
      {renderData(currentItems)}
      <ul className="flex pagin items-center">
        <li>
          <button
            onClick={handlePrevbtn}
            hidden={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumber}
        {pageIncrementBtn}
        <li>
          <button
            className="border py-2"
            onClick={handleNextbtn}
            hidden={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagin;
