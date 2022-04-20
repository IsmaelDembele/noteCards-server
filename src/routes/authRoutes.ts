import { Router } from "express";
import {
  changePassword,
  getIsLogged,
  postCreateAccount,
  postSignIn,
} from "../controllers/authControllers";
import { pathAuthRoutes } from "../controllers/constantes";
import { decodeToken, verifyPassword } from "../controllers/middleware";

const authRoute = Router();

authRoute.get(pathAuthRoutes.IS_LOGGED, decodeToken, getIsLogged);

authRoute.post(pathAuthRoutes.SIGN_IN, postSignIn);

authRoute.post(pathAuthRoutes.CREATE_ACCOUNT, postCreateAccount);

authRoute.post(pathAuthRoutes.CHANGE_PASSWORD, decodeToken, verifyPassword, changePassword);

export default authRoute;
