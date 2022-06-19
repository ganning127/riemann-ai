import Cookie from "universal-cookie";

export default async function handler(req, res) {
  const cookie = new Cookie();
  const speechToken = cookie.get("speech-token");

  if (speechToken === undefined) {
    try {
      console.log("fetching...");
      const res = await fetch("/get-speech-token");
      console.log(res);
      const data = await res.json();
      const token = data.token;
      const region = data.region;
      cookie.set("speech-token", region + ":" + token, {
        maxAge: 540,
        path: "/",
      });

      console.log("Token fetched from back-end: " + token);
      return { authToken: token, region: region };
    } catch (err) {
      return { authToken: null, error: err };
    }
  } else {
    console.log("Token fetched from cookie: " + speechToken);
    const idx = speechToken.indexOf(":");
    return {
      authToken: speechToken.slice(idx + 1),
      region: speechToken.slice(0, idx),
    };
  }
}
