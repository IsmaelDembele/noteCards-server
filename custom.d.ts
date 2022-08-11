declare namespace Express {
  export interface Request {
    user?: any;
    topicID?: string;
    subTopicID?: string;
    verify?: boolean;
    token?: string;
  }
}
