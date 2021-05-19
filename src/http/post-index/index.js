const ytdl = require("ytdl-core");
const arc = require("@architect/functions");
const parseBody = arc.http.helpers.bodyParser;

exports.handler = async function http(req) {
  let body = parseBody(req);
  console.log("body", body);
  console.log(body.url);
  const vID = body.url;
  console.log(vID);

  try {
    if (!ytdl.validateID(vID)) throw new Error("invalid ID");
    // if (!body) throw new Error(600);
    // let info = await ytdl.getInfo(
    //   "https://www.pornhub.com/view_video.php?viewkey=ph5f43314708e7e"
    // );
    let info = await ytdl.getInfo(vID);
    info = info.formats;

    const v1080 = info.filter((key) => key.itag === 299)[0];
    const audio = info.filter((key) => key.itag === 140)[0];

    const formats = {};

    formats["v1080"] = v1080.url;
    formats["audio"] = audio.url;

    console.log(formats);
    // info = info.filter((key) => key.hasAudio === true);
    // info = info.filter((key) => key.hasVideo === true);

    // let containsAudio;
    // containsAudio = info.filter((key) => key.container === "mp4");
    return {
      cors: true,
      statusCode: 200,
      headers: {
        "content-type": "application/json; charset=utf8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(formats),
    };
  } catch (e) {
    console.error("error", e.message);
    let error = {
      error: "Something blew up. Sorry.",
    };
    return {
      cors: true,
      headers: {
        "content-type": "application/json; charset=utf8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(error),
      statusCode: 400,
    };
  } finally {
    // Save request data here
  }
};
