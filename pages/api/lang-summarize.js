// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const {
  TextAnalyticsClient,
  AzureKeyCredential,
} = require("@azure/ai-text-analytics");
export default async function handler(req, res) {
  // console.log(req.body);
  // const { lang } = JSON.parse(req.headers);
  // const { origText } = JSON.parse(req.body);
  const body = JSON.parse(req.body);
  // const headers = JSON.parse(req.headers);

  // const lang = headers.lang;
  const origText = body.origText;
  let finalSummary = "";

  const client = new TextAnalyticsClient(
    process.env.COG_ENDPOINT,
    new AzureKeyCredential(process.env.COG_KEY),
    {
      defaultLanguage: req.headers.lang,
    }
  );
  const documents = [origText];

  const numSentences = origText.split(/[.!?]+\s/).filter(Boolean).length;

  const maxSentences = Math.ceil(numSentences ** 0.65);

  const actions = {
    extractSummaryActions: [
      {
        modelVersion: "latest",
        orderBy: "Rank",
        maxSentenceCount: maxSentences,
      },
    ],
  };
  const poller = await client.beginAnalyzeActions(documents, actions, "en");

  const resultPages = await poller.pollUntilDone();

  for await (const page of resultPages) {
    const extractSummaryAction = page.extractSummaryResults[0];
    if (!extractSummaryAction.error) {
      for (const doc of extractSummaryAction.results) {
        if (!doc.error) {
          for (const sentence of doc.sentences) {
            finalSummary += sentence.text + " ";
          }
        } else {
          console.error("\tError:", doc.error);
        }
      }
    }
  }

  res.status(200).json({ finalSummary });
}
