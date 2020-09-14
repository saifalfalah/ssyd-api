const ytdl = require("ytdl-core");
const arc = require("@architect/functions");
const parseBody = arc.http.helpers.bodyParser;

exports.handler = async function http(req) {
  let body = parseBody(req);
  console.log(body);

  let info = await ytdl.getInfo("wILAAYhKQnY");
  info = info.formats;
  let containsAudio;
  containsAudio = info.filter((key) => key.container === "mp4");

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json; charset=utf8",
    },
    body: JSON.stringify(containsAudio),
  };
};
