import { Request, Response } from "express";

export function handleDemo(req: Request, res: Response) {
  res.json({
    message: "Demo endpoint working!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
}
