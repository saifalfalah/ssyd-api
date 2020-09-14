const ytdl = require("ytdl-core");

exports.handler = async function http(req) {
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
