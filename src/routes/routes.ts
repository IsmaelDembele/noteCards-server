import { Router, Request, Response } from "express";
import {
  getCards,
  getSubTopic,
  getTopic,
  postSubTopic,
  postTopic,
} from "../controllers/routeControllers";

const route = Router();

route.post("/postTopics", postTopic);

route.get("/getTopics", getTopic);

route.post("/postSubTopic", postSubTopic);

route.get("/getSubTopic", getSubTopic);

route.get("/getCards", getCards);

export default route;
