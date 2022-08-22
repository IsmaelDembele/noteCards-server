import { Response } from "express";
import { isProdMod } from "..";

export const signingOut = (res: Response) => {
  //some browsers do not clear the cookie for some reason
  //we will set a wrong token for those one in order to signout
  res.cookie("token", "token", {
    maxAge: 60 * 24,
    httpOnly: true,
    secure: isProdMod,
    sameSite: isProdMod ? "none" : "lax",
  });

  res.clearCookie("token");

  res.send("ok");
};
