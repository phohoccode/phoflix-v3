import crypto from "crypto";

export const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const getVietnamTime = () => {
  const date = new Date();
  const vietnamOffset = 7 * 60 * 60 * 1000; // GMT+7
  const vietnamTime = new Date(date.getTime() + vietnamOffset);
  return vietnamTime.toISOString().slice(0, 19).replace("T", " ");
};


