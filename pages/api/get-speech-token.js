// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const KEY = process.env.COG_KEY;

  const options = {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": KEY,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  const speechRegion = "eastus";

  try {
    const tokenResponse = await fetch(
      `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      options
    );

    const data = await tokenResponse.text();

    return res.status(200).json({ token: data, region: speechRegion });
  } catch (err) {
    return res.status(401).json({ error: "Error with getting token." });
  }
}
