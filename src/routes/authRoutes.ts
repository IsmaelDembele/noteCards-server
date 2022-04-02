import { Router } from "express";
import { getIsLogged, postCreateAccount, postSignIn } from "../controllers/authControllers";
import { pathAuthRoutes } from "../controllers/constantes";
import { decodeToken } from "../controllers/middleware";

const authRoute = Router();

authRoute.get(pathAuthRoutes.IS_LOGGED, decodeToken, getIsLogged);

authRoute.post(pathAuthRoutes.SIGN_IN, postSignIn);

authRoute.post(pathAuthRoutes.CREATE_ACCOUNT, postCreateAccount);

export default authRoute;
