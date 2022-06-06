import { Request, Response } from "express";
import { Cart, User } from "../models";
import { User as UserTypes } from "../types";
import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

export const index = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const cart = await Cart.findOne({ user: user._id })
      .populate("items.product")
      .sort("-createdAt");
    res.status(200).json({
      data: {
        _id: "629b977e9905320009b1087d",
        user: "629b977a9905320009b1087c",
        items: [
          {
            quantity: 1,
            _id: "629b977e9905320009b1087e",
            product: {
              _id: "5e3e86e9f4a19c0417b8daf1",
              name: "Only Check Trouser",
              price: 800,
              description:
                "Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat.",
              imageURL:
                "https://res.cloudinary.com/djlbfjouc/image/upload/v1581156071/o4rfktvywje4qbks9lkl.jpg",
              category: "men",
              createdAt: "2020-02-08T10:01:13.626Z",
              updatedAt: "2020-02-08T10:01:13.626Z",
              __v: 0,
            },
          },
        ],
        createdAt: "2022-06-04T17:33:50.593Z",
        updatedAt: "2022-06-04T17:33:50.593Z",
        __v: 0,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error in getting cart" });
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: user._id });

    if (cart) {
      // make sure user is the owner of the cart
      if (user._id.toString() !== cart.user.toString()) {
        return res.status(405).json({
          message: "You cannot perform this operation",
        });
      }

      const isProductExist = cart?.items.some((item) =>
        ObjectId(productId).equals(item.product)
      );

      if (isProductExist) {
        cart = await Cart.findOneAndUpdate(
          { _id: cart._id, "items.product": productId },
          { $inc: { "items.$.quantity": quantity } },
          { new: true }
        );
      } else {
        cart = await Cart.findOneAndUpdate(
          { _id: cart._id },
          { $addToSet: { items: { quantity, product: productId } } },
          { new: true }
        );
      }
    } else {
      cart = await Cart.create({
        user: user._id,
        items: [{ quantity, product: productId }],
      });
    }

    const cartItem = cart?.items.find((item) =>
      ObjectId(productId).equals(item.product)
    );

    res.status(200).json({ data: cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error in creating cart" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;

    const { productId } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { user: user._id },
      { $pull: { items: { product: productId } } },
      { new: true }
    ).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart Item not found" });
    }

    res.status(200).json({ data: cart?.items });
  } catch (error) {
    res.status(500).json({ message: "Error in removing cart" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const user = req.user as UserTypes;

    const { productId, quantity } = req.body;

    let cart = await Cart.findOneAndUpdate(
      { user: user._id, "items.product": productId },
      { $set: { "items.$.quantity": quantity } },
      { new: true }
    );
    if (!cart) return res.status(404).json({ message: "Cart Item not found" });

    // make sure viewer is the owner of the cart
    if (user._id.toString() !== cart.user.toString()) {
      return res.status(405).json({
        message: "You cannot perform this operation",
      });
    }

    const cartItem = cart?.items.find((item) =>
      ObjectId(productId).equals(item.product)
    );

    return res.status(200).json({ data: cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error in getting product" });
  }
};
