import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data } = req.body;
  const result = await prisma.activity.create({
    data,
  });
  return res.status(201).json(result);
}

export { handler as POST };
