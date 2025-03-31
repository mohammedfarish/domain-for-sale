import axios from "axios";

const ntfy = async ({
  topic,
  title,
  body,
  url,
  image,
  priority = 5,
}: {
  topic: {
    topic: string;
    ntfyURL: string;
  };
  title: string;
  body: string;
  url?: string;
  image?: string;
  priority?: number;
}) => {
  const topicID = [topic.ntfyURL, topic.topic].join("/");

  await axios.post(topicID, body, {
    headers: {
      Title: title,
      Attach: image,
      Click: url,
      Priority: priority,
    },
  });

  return true;
};

export default ntfy;
