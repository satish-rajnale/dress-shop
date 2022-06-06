import { Request, Response } from "express";
import { Category } from "../models";

export const index = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      data: [
        {
          _id: "5e3e897d1c9d440000d0f603",
          imageURL:
            "https://res.cloudinary.com/djlbfjouc/image/upload/v1582274252/categ-02_pqpnm7.jpg",
          name: "Men",
        },
        {
          _id: "5e3e89e71c9d440000d0f604",
          name: "Women",
          imageURL:
            "https://res.cloudinary.com/djlbfjouc/image/upload/v1582274091/ezgif.com-webp-to-jpg_l9flc0.jpg",
        },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: "Error in getting categories" });
  }
};
