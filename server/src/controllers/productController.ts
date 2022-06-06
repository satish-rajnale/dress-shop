import { Request, Response } from "express";
import { Product } from "../models";
import APIFeatures from "../utils/ApiFeatures";
import { Cloudinary } from "../lib/cloudinary";

export const index = async (req: Request, res: Response) => {
  try {
    const features = new APIFeatures(Product.find(), Product, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const products = await features.query;
    const data = [
      {
        _id: "5e3e8f19f4a19c0417b8dafd",
        name: "Long Sleeves Polka Dots",
        price: 900,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1581158167/sbiuoziiqi5gkuvrsymv.jpg",
        category: "women",
        createdAt: "2020-02-08T10:36:09.862Z",
        updatedAt: "2020-02-08T10:36:09.862Z",
      },
      {
        _id: "5e3e8eabf4a19c0417b8dafc",
        name: "Brown Jacket",
        price: 800,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1581158056/dqtdtglewxjvig4x7rlk.jpg",
        category: "men",
        createdAt: "2020-02-08T10:34:19.597Z",
        updatedAt: "2020-02-08T10:34:19.597Z",
      },
      {
        _id: "5e3e8dbdf4a19c0417b8dafb",
        name: "Sleeveless Shirt",
        price: 400,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1581157817/kx5kld8ndqqpfqemslc2.jpg",
        category: "women",
        createdAt: "2020-02-08T10:30:21.244Z",
        updatedAt: "2020-02-08T10:30:21.244Z",
      },
      {
        _id: "5e3e8d57f4a19c0417b8dafa",
        name: "White Long Sleeves",
        price: 800,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1581157717/z9pytwztom7gj2dri1tb.jpg",
        category: "women",
        createdAt: "2020-02-08T10:28:39.779Z",
        updatedAt: "2020-02-08T10:28:39.779Z",
      },
      {
        _id: "5e3e8ce6f4a19c0417b8daf9",
        name: "Black Leather Jacket",
        price: 700,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1581157604/qfebd5mqwqcwbjsbehxr.jpg",
        category: "women",
        createdAt: "2020-02-08T10:26:46.937Z",
        updatedAt: "2020-02-08T10:26:46.937Z",
      },
      {
        _id: "5e3e8c93f4a19c0417b8daf8",
        name: "White Floral Dress",
        price: 1200,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1581157521/n1vilxhjdrdhrppu4u5m.jpg",
        category: "women",
        createdAt: "2020-02-08T10:25:23.354Z",
        updatedAt: "2020-02-08T10:25:23.354Z",
      },
      {
        _id: "5e3e87bef4a19c0417b8daf7",
        name: "Herschel Supply Long Sleeves",
        price: 900,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1582456742/longsleeves-hershel_mampai.jpg",
        category: "men",
        createdAt: "2020-02-08T10:04:46.639Z",
        updatedAt: "2020-02-08T10:04:46.639Z",
      },
      {
        _id: "5e3e87a3f4a19c0417b8daf6",
        name: "Femmo T-shirt",
        price: 499,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1581156257/ndixpyvh4goiegf8c3ws.jpg",
        category: "women",
        createdAt: "2020-02-08T10:04:19.089Z",
        updatedAt: "2020-02-08T10:04:19.089Z",
      },
      {
        _id: "5e3e8785f4a19c0417b8daf5",
        name: "Pieces Mettalic Printed",
        price: 500,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1581156228/bumiptjx37aqwkez2x4o.jpg",
        category: "women",
        createdAt: "2020-02-08T10:03:49.014Z",
        updatedAt: "2020-02-08T10:03:49.014Z",
      },
      {
        _id: "5e3e8764f4a19c0417b8daf4",
        name: "Shirt in stretch cotton",
        price: 1000,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1581156196/hefaqrcrdhxmabag1ozl.jpg",
        category: "women",
        createdAt: "2020-02-08T10:03:16.861Z",
        updatedAt: "2020-02-08T10:03:16.861Z",
      },
      {
        _id: "5e3e874bf4a19c0417b8daf3",
        name: "Front Pocket Jumper",
        price: 700,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1581156169/aci28zybd4kn0irklxzz.jpg",
        category: "women",
        createdAt: "2020-02-08T10:02:51.084Z",
        updatedAt: "2020-02-08T10:02:51.084Z",
      },
      {
        _id: "5e3e872bf4a19c0417b8daf2",
        name: "Classic Trench Coat",
        price: 900,
        description:
          "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
        imageURL:
          "https://res.cloudinary.com/djlbfjouc/image/upload/v1581156139/nsmtzzw1gpn0l71w4mai.jpg",
        category: "women",
        createdAt: "2020-02-08T10:02:19.562Z",
        updatedAt: "2020-02-08T10:02:19.562Z",
      },
    ];
    const total = await features.count().total;

    res
      .status(200)
      .json({ data: { total, count: data.length, products: data } });
  } catch (error) {
    res.status(500).json({ message: "Error in getting products" });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    // if (!product) return res.status(404).json({ message: "Product not found" });

    // find related products based on product category
    const relatedProducts = await Product.find({
      category: product?.category,
      _id: { $ne: id },
    }).limit(8);

    res.status(200).json({
      data: {
        product: {
          _id: "5e3e8eabf4a19c0417b8dafc",
          name: "Long Sleeves Polka Dots",
          price: 900,
          description:
            "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
          imageURL:
            "https://res.cloudinary.com/djlbfjouc/image/upload/v1581158167/sbiuoziiqi5gkuvrsymv.jpg",
          category: "women",
          createdAt: "2020-02-08T10:36:09.862Z",
          updatedAt: "2020-02-08T10:36:09.862Z",
        },
        relatedProducts: [
          {
            _id: "5e3e8eabf4a19c0417b8dafc",
            name: "Long Sleeves Polka Dots",
            price: 900,
            description:
              "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
            imageURL:
              "https://res.cloudinary.com/djlbfjouc/image/upload/v1581158167/sbiuoziiqi5gkuvrsymv.jpg",
            category: "women",
            createdAt: "2020-02-08T10:36:09.862Z",
            updatedAt: "2020-02-08T10:36:09.862Z",
          },
        ],
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error in getting product" });
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, category } = req.body;

    // upload base64 image to cloudinary
    const imageURL = await Cloudinary.upload(image, "products", {
      height: 600,
      width: 600,
    });

    const product = await Product.create({
      name,
      price,
      description,
      imageURL,
      category,
    });

    res.status(200).json({ data: { product } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in creating product" });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  let product = await Product.findOne({ _id: id });

  if (!product) return res.status(404).json({ message: "Product not found" });

  product.remove();

  res.status(204).json({ data: null });
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let product = await Product.findOne({ _id: id });

    if (!product) return res.status(404).json({ message: "Product not found" });

    product = await Product.findOneAndUpdate({ _id: product._id }, req.body, {
      new: true,
    });

    res.status(200).json({ data: { product } });
  } catch (error) {
    res.status(500).json({ message: "Error in creating product" });
  }
};
