"use client";

import { GlobalContext } from "@/context";
import { getAllAdminProducts } from "@/services/product";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import iconPath from "@/assets/index";
import Footer from "@/components/Footer";
import { Button } from "@nextui-org/react";
export default function Home() {
  const { isAuthUser } = useContext(GlobalContext);

  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function getListOfProducts() {
    const res = await getAllAdminProducts();

    if (res?.success) {
      setProducts(res.data);
    }
  }

  useEffect(() => {
    getListOfProducts();
  }, []);

  console.log(products);

  return (
    <main className="">
      <section className="">
        <div className="bg-banner bg-no-repeat bg-cover bg-[70%] rounded-lg">
          <div className=" max-w-[1300px] mx-auto px-0 ">
            <div className="lg:pt-[220px] lg:pb-[240px]">
              <p className="text-green-custom text-[36px] mb-[15px] capitalize font-sanscustom">
                Made With Nature
              </p>

              <h1 className="text-[70px] mt-[20px]  font-roboto font-bold text-blue-custom leading-tight">
                Welcome to the <br />
                world of nature <br />
                and organic.
              </h1>
              {/* <Btn
              text={"Explore More"}
              background="bg-yellow-custom"
              border="border-yellow-custom"
              color="text-black"
            ></Btn> */}
            </div>
          </div>
        </div>

        <div className="py-[100px] xl:py-[120px] xl:max-w-[1300px] max-w-[900px] mx-auto px-0 ">
          <div className="max-w-[940px] mx-0 px-[30px]   xl:max-w-[1440px] xl:mx-auto xl:px-0">
            <div className="grid xl:grid-cols-2 gap-[16px]">
              <div className="bg-section1 bg-no-repeat bg-cover bg-[50%] rounded-[30px] xl:pt-[50px] xl:pb-[95px] xl:pl-[55px] ">
                <p className="text-white mb-0 text-[36px] font-sanscustom">
                  Natural!!
                </p>
                <h2 className="text-white mt-0 text-[40px] font-[Roboto,sans-serif] font-bold leading-tight">
                  Get garder <br></br>Fresh fruit
                </h2>
              </div>
              <div className="bg-section2 bg-no-repeat bg-cover bg-[50%] rounded-[30px] xl:pt-[50px] xl:pb-[95px] xl:pl-[55px] ">
                <p className="text-green-custom mb-0 text-[36px] font-sanscustom">
                  Offer!!
                </p>
                <h2 className="text-blue-custom mt-0 text-[40px] font-[Roboto,sans-serif] font-bold leading-tight">
                  Get 10% off <br></br>on Vesgestable
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* section about us */}
        <div className="bg-[#f9f8f8] pt-[40px] pb-[110px] xl:pt-[110px] xl:pb-[120px] 2xl:pt-[130px] 2xl:pb-[140px]">
          <div className="xl:max-w-[1300px] max-w-[900px] mx-auto px-0">
            <div className=" px-3 xl:px-0 grid xl:grid-cols-2 grid-cols-1">
              <div>
                <Image
                  src={iconPath.sectionaboutus}
                  alt="section about us"
                ></Image>
              </div>

              <div>
                <div className="text-left">
                  <p className="text-green-custom font-sanscustom font-bold text-[32px] capitalize mb-0">
                    about us
                  </p>
                  <h2 className="mb-[18px] text-[44px] xl:text-[50px] font-roboto leading-tight">
                    We Believe In Organic <br /> Foods For Strong Health
                  </h2>
                  <p className="text-black-custom text-[18px] mb-[15px] font-normal leading-relaxed">
                    Welcome to the world of natural and organic. Here you can
                    discover the bounty of nature. We have grown on the
                    principles of health, and care. We aim to give our customers
                    a healthy chemical-free meal for perfect nutrition
                  </p>
                </div>
                <>
                  <div className="flex items-center mb-[30px] justify-start ">
                    <div className="bg-white h-[100px] xl:w-[100px] xl:min-h-[100px] xl:min-w-[100px] flex items-center justify-center rounded-3xl">
                      <Image src={iconPath.foodaboutus} alt="food"></Image>
                    </div>
                    <div className="pl-5 ">
                      <h3 className="text-blue-custom font-bold text-[25px]">
                        Organic Foods Only
                      </h3>
                      <p className="text-black-custom text-lg">
                        The Product that you ordered will be verified that we
                        have or not if have we will start to move on with the
                        next step.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mb-[30px] justify-start ">
                    <div className="bg-white h-[100px] xl:w-[100px] xl:min-h-[100px] xl:min-w-[100px] flex items-center justify-center rounded-3xl">
                      <Image src={iconPath.quality} alt="food"></Image>
                    </div>
                    <div className="pl-5 ">
                      <h3 className="text-blue-custom font-bold text-[25px]">
                        Quality Standards
                      </h3>
                      <p className="text-black-custom text-lg">
                        Once your product is packed it will be delivered to your
                        nearby locality you can directly visit the to buy the
                        product.
                      </p>
                    </div>
                  </div>
                  {/* <Btn
                  text="Shop"
                  background="bg-blue-custom"
                  color="text-white"
                  border="border-black"
                ></Btn> */}
                </>
              </div>
            </div>
          </div>
        </div>
        <div className=" py-[100px] xl:py-[120px] xl:max-w-[700px] max-w-[900px] mx-auto px-0 lg:col-span-2 lg:py-8 ">
          <h1 className="flex items-center justify-center font-bold text-2xl p-2 text-blue-custom">
            Sản phẩm nổi bật
          </h1>
          <ul className="grid grid-cols-3 gap-4">
            {products && products.length
              ? products
                  .filter((item) => item.onSale === "yes")
                  .splice(0, 3)
                  .map((productItem) => (
                    <li
                      onClick={() => router.push(`/product/${productItem._id}`)}
                      className="cursor-pointer border p-2 hover:border-green-custom transition"
                      key={productItem._id}
                    >
                      <div>
                        <img
                          src={productItem.imageUrl}
                          alt="Sale Product Item"
                          className="object-cover w-full rounded aspect-square border-b"
                        />
                      </div>
                      <div className="mt-3">
                        <h3 className="font-bold text-gray-900">
                          {productItem.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-800">
                          {Intl.NumberFormat("vi-VN").format(productItem.price)}{" "}
                          vnd
                          <span className="text-red-700">{`(-${productItem.priceDrop}%) Off`}</span>
                        </p>
                      </div>
                    </li>
                  ))
              : null}
          </ul>
        </div>

        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-bold text-blue-custom sm:text-3xl">
              MUA THEO DANH MỤC
            </h2>
          </div>
          <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
            <li>
              <div className="relative block group">
                <img
                  src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2018/04/Fruit-Juice-155376375-770x533-1.jpg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">Thức uống</h3>
                  <button
                    onClick={() => router.push("/product/listing/kids")}
                    className="mt-1.5 inline-block bg-green-custom px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="relative block group">
                <img
                  src="https://suckhoedoisong.qltns.mediacdn.vn/zoom/480_300/324455921873985536/2023/3/16/cach-an-ngu-coc-1-16789564460451894116736-0-8-442-715-crop-1678956453754251821595.jpg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Ngũ cốc và đậu
                  </h3>
                  <button
                    onClick={() => router.push("/product/listing/women")}
                    className="mt-1.5 inline-block bg-green-custom px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="relative block group">
                <img
                  src="https://foxillinois.com/resources/media2/16x9/full/1015/center/80/9452f45b-6733-49e2-900a-7d224fa43c80-large16x9_AdobeStock_202106669.jpeg"
                  className="object-cover w-full aspect-square"
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">Rau củ </h3>
                  <button
                    onClick={() => router.push("/product/listing/men")}
                    className="mt-1.5 inline-block bg-green-custom px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className=" rounded-[30px] bg-subscibe-footer w-[1400px] h-[323px] bg-no-repeat  mx-auto px-0">
          <div className="flex items-center justify-between py-[100px] px-16">
            <h1 className="text-5xl font-extrabold text-white">
              Subscribe Our
              <br />
              Newsletter
              <br />
            </h1>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type here..."
                className="rounded-2xl w-80 h-20 p-10"
              />
              {/* <Btn
              color="text-white"
              background="bg-blue-custom"
              text="Subcribe"
              border="border-black"
            ></Btn> */}
              <div
                className={`flex w-52 h-20 rounded-xl px-12 py-7 border items-center  justify-between text-xl font-bold border-black bg-blue-custom cursor-pointer hover:text-black text-white transition hover:bg-white `}
              >
                {/* <div className="flex items-center justify-between"> */}
                Đăng kí
                <Image
                  src={iconPath.arrow}
                  alt="arrow"
                  className="w-4 h-4 mt-1"
                ></Image>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </main>
  );
}
