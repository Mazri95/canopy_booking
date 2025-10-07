import { RequestHandler } from "express";
import { HealthResponse } from "@shared/api";

export const handleHealth: RequestHandler = (_req, res) => {
  const response: HealthResponse = {
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
  res.status(200).json(response);
};





