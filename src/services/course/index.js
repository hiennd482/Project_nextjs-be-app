import Cookies from "js-cookie";
export const getAllCourse = async () => {
  try {
    const res = await fetch("/api/course/all-courses", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(">>service", error);
  }
};

export const getOneCourse = async (id) => {
  try {
    const res = await fetch(`/api/course/course-by-id?id=${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteCourse = async (id) => {
  try {
    const res = await fetch(`/api/course/delete-course?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(">>service", error);
  }
};
export const addCourse = async (formData) => {
  try {
    const res = await fetch(`/api/course/add-course`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCourse = async (formData, id) => {
  try {
    const res = await fetch(`/api/course/update-course?id=${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      cache: "no-store",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
