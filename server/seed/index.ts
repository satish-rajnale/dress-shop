import { connectDb } from "../src/database";
import { Banner, Cart, Category, Product, User } from "../src/models";
import { Role } from "../src/types";
// import productList from "./data/products.json";
// import bannersList from "./data/banners.json";
// import categoryList from "./data/categories.json";

export async function seed() {
  // await connectDb();
  // const user = await User.create({
  //   email: "user123@gmail.com",
  //   password: "user123",
  //   name: "user123",
  //   role: Role.User,
  // });
  // Cart.create({
  //   user: user._id,
  //   items: [{ quantity: 1, product: "5e3e869df4a19c0417b8daef" }],
  // });
  // productList.forEach((item: any) => {
  //   Product.create({
  //     name: item.name,
  //     price: item.price,
  //     description: item.description,
  //     imageURL: item.imageURL,
  //     category: item.category,
  //   });
  // });
  // bannersList.forEach((item: any) => {
  //   Banner.create({
  //     name: item.name,
  //     imageURL: item.imageURL,
  //     link: item.link,
  //   });
  // });
  // categoryList.forEach((item: any) => {
  //   Category.create({
  //     name: item.name,
  //     imageURL: item.imageURL,
  //   });
  // });
}
