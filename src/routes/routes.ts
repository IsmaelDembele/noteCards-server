import { Router, Request, Response } from "express";
import {
  addCards,
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
};

route.post(pathRoutes.POST_TOPIC, postTopic);

route.get(pathRoutes.GET_TOPIC, getTopic);

route.post(pathRoutes.POST_SUB_TOPIC, postSubTopic);

route.get(pathRoutes.GET_SUB_TOPIC, getSubTopic);

route.get(pathRoutes.GET_CARDS, getCards);

route.post(pathRoutes.ADD_CARDS, addCards);

export default route;
