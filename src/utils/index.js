export const navOptions = [
  {
    id: "home",
    label: "Trang chủ",
    path: "/",
  },
  {
    id: "listing",
    label: "Sản phẩm",
    path: "/product/listing/all-products",
  },
  {
    id: "vegetable",
    label: "Cửa hàng",
    path: "/product/listing/men",
  },
  {
    id: "listingWomen",
    label: "Về chúng tôi",
    path: "/product/listing/women",
  },
];
export const sieBarOps = [
  {
    id: "listing",
    label: "Tất cả sản phẩm",
    path: "/product/listing/all-products",
  },
  {
    id: "vegetable",
    label: "Rau củ quả",
    path: "/product/listing/men",
  },
  {
    id: "listingWomen",
    label: "Ngũ cốc, Đậu & Hạt",
    path: "/product/listing/women",
  },
  {
    id: "listingKids",
    label: " Thức uống",
    path: "/product/listing/kids",
  },
];
export const adminNavOptions = [
  {
    id: "adminListing",
    label: " ",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: " ",
    path: "/admin-view/add-product",
  },
];

export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    options: [
      {
        id: "teacher",
        label: "teacher",
      },
      {
        id: "user",
        label: "user",
      },
    ],
  },
];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
];

export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "input",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "rau",
        label: "Rau củ quả",
      },
      {
        id: "ngucoc",
        label: "Ngũ cốc, Đậu & Hạt",
      },
      {
        id: "nuocuong",
        label: "Thức uống",
      },
    ],
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Enter deliveryInfo",
    label: "Delivery Info",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Price Drop",
    label: "Price Drop",
    componentType: "input",
  },
];
export const updateUserformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "nhap ho va ten nguoi dung",
    label: "Ho va ten",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Role",
    componentType: "select",
    options: [
      {
        id: "teacher",
        label: "teacher",
      },
      {
        id: "user",
        label: "user",
      },
    ],
  },
];
export const firebaseConfig = {
  apiKey: "AIzaSyAPmUNlivEkUTlyXK2-P5Oys3eE6cjUF-c",
  authDomain: "nextjs-projectxoay-85d8f.firebaseapp.com",
  projectId: "nextjs-projectxoay-85d8f",
  storageBucket: "nextjs-projectxoay-85d8f.appspot.com",
  messagingSenderId: "1078330415562",
  appId: "1:1078330415562:web:f795417b455486acd79733",
  measurementId: "G-RWMMKRM7J6",
};

export const firebaseStroageURL = "gs://nextjs-projectxoay-85d8f.appspot.com";

export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Enter your full name",
    label: "Full Name",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Enter your full address",
    label: "Address",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Enter your city",
    label: "City",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Enter your country",
    label: "Country",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Enter your postal code",
    label: "Postal Code",
    componentType: "input",
  },
];
