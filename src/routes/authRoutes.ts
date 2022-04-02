import { Router } from "express";
import { getIsLogged, postCreateAccount, postSignIn } from "../controllers/authControllers";

const pathRoutes = {
  IS_LOGGED: "/islogged",
  SIGN_IN: "/signin",
  CREATE_ACCOUNT: "/createAccount",
};

const authRoute = Router();

//middeware quandidate
authRoute.get(pathRoutes.IS_LOGGED, getIsLogged);

authRoute.post(pathRoutes.SIGN_IN, postSignIn);

authRoute.post(pathRoutes.CREATE_ACCOUNT, postCreateAccount);

export default authRoute;
