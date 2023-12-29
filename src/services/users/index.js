import Cookies from "js-cookie";
//  add new user = register
export const getAllUsers = async () => {
  try {
    const res = await fetch("/api/users/all-users", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(">>service", error);
  }
};
export const deleteUser = async (id) => {
  try {
    const res = await fetch(`/api/users/delete-user?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(">>>service", error);
  }
};
export const updateAUser = async (formData) => {
  try {
    const res = await fetch(`/api/users/update-user`, {
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
    console.log(">>>service error update", error);
    return error;
  }
};
export const searchUsers = async (name) => {
  try {
    const res = await fetch(`/api/users/search-user?name=${name}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(">>>service error search", error);
  }
};
export const allTeachers = async () => {
  try {
    const res = await fetch(`/api/users/all-teacher`, {
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
export const allStudents = async () => {
  try {
    const res = await fetch(`/api/users/students`, {
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
export const getAStudent = async (id) => {
  try {
    const res = await fetch(`/api/users/student-by-id?id=${id}`, {
      method: "GET",
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const attachStudent = async (id, formBody) => {
  try {
    const res = await fetch(`/api/users/student-attach?id=${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formBody),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const disattachStudent = async (id, course_id) => {
  try {
    const res = await fetch(
      `/api/users/remove-student?id=${id}&course_id=${course_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const disattachALL = async (id) => {
  try {
    const res = await fetch(`/api/users/remove-all-student?id=${id}`, {
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
