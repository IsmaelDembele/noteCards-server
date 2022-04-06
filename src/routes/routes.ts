import { Router } from "express";
import { pathRoutes } from "../controllers/constantes";
import { decodeToken, getTopicAndSubTopicID, getTopicID } from "../controllers/middleware";
import {
  addCard,
  getCard,
  getCards,
  getSubTopic,
  getTopic,
  postDeleteCard,
  postDeleteCards,
  postDeleteSubTopic,
  postDeleteSubTopics,
  postDeleteTopic,
  postDeleteTopics,
  postRenameSubTopic,
  postRenameTopic,
  postSubTopic,
  postTopic,
  postUpdateCard,
} from "../controllers/routeControllers";

const route = Router();

//gives access to req.user
route.use(decodeToken);

route.get(pathRoutes.GET_TOPIC, getTopic);

route.post(pathRoutes.POST_TOPIC, postTopic);

route.post(pathRoutes.POST_SUB_TOPIC, getTopicID, postSubTopic);

route.get(pathRoutes.GET_SUB_TOPIC, getTopicID, getSubTopic);

route.get(pathRoutes.GET_CARDS, getTopicAndSubTopicID, getCards);

route.post(pathRoutes.ADD_CARDS, getTopicAndSubTopicID, addCard);

route.get(pathRoutes.GET_CARD, getTopicAndSubTopicID, getCard);

route.post(pathRoutes.UPDATE_CARD, postUpdateCard);

route.post(pathRoutes.DELETE_CARD, postDeleteCard);

route.post(pathRoutes.DELETE_TOPICS, postDeleteTopics);

route.post(pathRoutes.DELETE_SUB_TOPICS, getTopicID, postDeleteSubTopics);

route.post(pathRoutes.DELETE_CARDS, getTopicAndSubTopicID, postDeleteCards);

route.post(pathRoutes.DELETE_TOPIC, getTopicID, postDeleteTopic);

route.post(pathRoutes.RENAME_TOPIC, getTopicID, postRenameTopic);

route.post(pathRoutes.DELETE_SUB_TOPIC, getTopicAndSubTopicID, postDeleteSubTopic);

route.post(pathRoutes.RENAME_SUB_TOPIC, getTopicAndSubTopicID, postRenameSubTopic);

export default route;
