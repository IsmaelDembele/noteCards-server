import { Router } from "express";
import { pathRoutes } from "../controllers/constantes";
import { decodeToken } from "../controllers/middleware";
import {
  addCard,
  getCard,
  getCards,
  getSubTopic,
  getTopic,
  postDeleteCard,
  postDeleteCards,
  postDeleteSubTopics,
  postDeleteTopics,
  postSubTopic,
  postTopic,
  postUpdateCard,
} from "../controllers/routeControllers";

const route = Router();

route.use(decodeToken);

route.get(pathRoutes.GET_TOPIC, getTopic);

route.post(pathRoutes.POST_TOPIC, postTopic);

route.post(pathRoutes.POST_SUB_TOPIC, postSubTopic);

route.get(pathRoutes.GET_SUB_TOPIC, getSubTopic);

route.get(pathRoutes.GET_CARDS, getCards);

route.post(pathRoutes.ADD_CARDS, addCard);

route.get(pathRoutes.GET_CARD, getCard);

route.post(pathRoutes.UPDATE_CARD, postUpdateCard);

route.post(pathRoutes.DELETE_CARD, postDeleteCard);

route.post(pathRoutes.DELETE_TOPICS, postDeleteTopics);

route.post(pathRoutes.DELETE_SUB_TOPICS, postDeleteSubTopics);

route.post(pathRoutes.DELETE_CARDS, postDeleteCards);

export default route;
