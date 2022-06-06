import { Request, Response } from "express";
import { Banner } from "../models";

export const index = async (req: Request, res: Response) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({
      data: [
        {
          _id: "5e3e88581c9d440000d0f600",
          name: "women",
          imageURL:
            "https://res.cloudinary.com/djlbfjouc/image/upload/v1582518195/banner-2_htripb.jpg",
        },
        {
          _id: "5e3e88ca1c9d440000d0f601",
          imageURL:
            "https://res.cloudinary.com/djlbfjouc/image/upload/v1582518190/banner-1_sysmlz.jpg",
          name: "Men",
        },
        {
          _id: "5e3e89061c9d440000d0f602",
          imageURL:
            "https://res.cloudinary.com/djlbfjouc/image/upload/v1582518206/banner-3_mczlxb.jpg",
          name: "women",
        },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: "Error in getting banners" });
  }
};
