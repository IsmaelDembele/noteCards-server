import { Router, Request, Response } from "express";
import { decodeToken } from "../controllers/middleware";
import {
  addCard,
  getCard,
  getCards,
  getSubTopic,
  getTopic,
  postSubTopic,
  postTopic,
} from "../controllers/routeControllers";

const route = Router();

const pathRoutes = {
  IS_LOGGED: "/islogged",
  SIGN_IN: "/signin",
  CREATE_ACCOUNT: "/createAccount",
  POST_TOPIC: "/postTopics",
  GET_TOPIC: "/getTopics",
  POST_SUB_TOPIC: "/postSubTopic",
  GET_SUB_TOPIC: "/getSubTopic",
  GET_CARDS: "/getCards",
  ADD_CARDS: "/addCards",
  GET_CARD: "/getCard",
};

route.get(pathRoutes.GET_TOPIC, decodeToken, getTopic);

route.post(pathRoutes.POST_TOPIC, decodeToken, postTopic);

route.post(pathRoutes.POST_SUB_TOPIC, decodeToken, postSubTopic);

route.get(pathRoutes.GET_SUB_TOPIC, decodeToken, getSubTopic);

route.get(pathRoutes.GET_CARDS, decodeToken, getCards);

route.post(pathRoutes.ADD_CARDS, decodeToken, addCard);

route.get(pathRoutes.GET_CARD, decodeToken, getCard);

export default route;
