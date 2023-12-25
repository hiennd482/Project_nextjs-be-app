import Cookies from "js-cookie";
export const getAllLesson = async () => {
  try {
    const res = await fetch("/api/lesson/all-lesson", {
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

export const addLesson = async (formData) => {
  try {
    const res = await fetch("/api/lesson/add-lesson", {
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
export const deleteLesson = async (id) => {
  try {
    const res = await fetch(`/api/lesson/delete-lesson?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateLesson = async (formBody) => {
  try {
    const res = await fetch(`/api/lesson/update-lesson`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formBody),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const addFileLesson = async (formData) => {
  try {
    const res = await fetch("/api/file/add-file-lesson", {
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
export const deleteFileLesson = async (id) => {
  try {
    const res = await fetch(`/api/file/delete-file?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getFilelessons = async (id) => {
  try {
    const res = await fetch(`/api/file/file-by-chapter?id=${id}`, {
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
export const updateFilelessons = async (id, formBody) => {
  try {
    const res = await fetch(`/api/file/update-file?id=${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify(formBody),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
