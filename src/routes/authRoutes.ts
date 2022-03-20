import { NextFunction, Request, Response, Router } from "express";
import { getIsLogged, postCreateAccount, postSignIn } from "../controllers/authControllers";

const authRoute = Router();

const pathRoutes = {
  IS_LOGGED: "/islogged",
  SIGN_IN: "/signin",
  CREATE_ACCOUNT: "/createAccount",
};

//middeware quandidate
authRoute.get(pathRoutes.IS_LOGGED, getIsLogged);

authRoute.post(pathRoutes.SIGN_IN, postSignIn);

authRoute.post(pathRoutes.CREATE_ACCOUNT, postCreateAccount);

export default authRoute;
