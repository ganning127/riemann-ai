// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const origText = body.origText;
  const question = body.question;
  const numBullets = body.numBullets;

  try {
    const resp = await fetch(process.env.ABS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        data: [origText, question, parseInt(numBullets)],
      }),
      headers: { "Content-Type": "application/json" },
    });

    const respData = await resp.json();

    const data = respData.data;
    const summary = data[0];
    const bullets = eval(data[1]);
    const answer = data[2];

    res.status(200).json({ summary, bullets, answer });
  } catch (err) {
    res.status(500).json({ error: "err" });
  }
}
