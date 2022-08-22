import { Router } from "express";
import { body } from "express-validator";
import {
  changePassword,
  deleteAccount,
  getIsLogged,
  postCreateAccount,
  postSignIn,
  signOut,
} from "../controllers/authControllers";
import { pathAuthRoutes, validation } from "../controllers/constantes";
import { decodeToken, verifyPassword } from "../controllers/middleware";

const authRoute = Router();

authRoute.get(pathAuthRoutes.IS_LOGGED, decodeToken, getIsLogged);

authRoute.post(
  pathAuthRoutes.SIGN_IN,
  body("email").isEmail(),
  body("password").isLength({ min: validation.PASSWORD_LENGTH }),
  postSignIn
);

authRoute.post(
  pathAuthRoutes.CREATE_ACCOUNT,
  body("firstname").isLength({ min: validation.MIN_LENGTH_FIRSTNAME }),
  body("lastname").isLength({ min: validation.MIN_LENGTH_LASTNAME }),
  body("email").isEmail(),
  body("password").isLength({ min: validation.PASSWORD_LENGTH }),
  body("passwordConfirm").isLength({ min: validation.PASSWORD_LENGTH }),
  postCreateAccount
);

authRoute.post(pathAuthRoutes.CHANGE_PASSWORD, decodeToken, verifyPassword, changePassword);

authRoute.post(pathAuthRoutes.SIGN_OUT, decodeToken, signOut);

authRoute.post(pathAuthRoutes.DELETE_ACCOUNT, decodeToken, verifyPassword, deleteAccount);


export default authRoute;
