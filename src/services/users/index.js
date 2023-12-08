import Cookies from "js-cookie";
//  add new user = register
export const getAllUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users/all-users", {
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
    const res = await fetch(
      `http://localhost:3000/api/users/search-user?name=${name}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.log(">>>service error search", error);
  }
};
