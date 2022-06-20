![](https://i.imgur.com/VLw3Bra.png)

# RiemannAI
*Developed by: Ganning Xu, Melody Lee, Eric Liu, Cooper Xie.*

RiemannAI is a SaaS designed for text summarization through by using Machine Learning. We provide both users, developers, and students with all of their text summarization tools needed to succeed.

## Features
- **Transcribing spoken text in any of our supported languages** (English, Chinese, French, German, Japanese, Portuguese (Brazil), Spanish) from audio into text
- **Live translate spoken text in the languages above to any destination language** (English, Chinese, French, German, Italian, Japanese, Protuguese (Brazil)
- **Keyword extraction** from the piece of text in the destination language
- **Extractive summarization on multi-lingual texts** in any destination langauge.
- **Saving both transcribed texts, summaries, and keywords** in Riemann's DB (hosted in localStorage)
- Dual summarization models for text based input:
  - **Abstractive Summarization**: uses Google's AllenNLP model to generate new summarization sentences given a long piece of original text
  - **Extractive Summarization**: using node.js to perform determine and extract important sentences from a long piece of original text
- **API endpoints** for Developers:
  - Summarize text using extractive summarization (`/api/extractive-summarization`)
  - Summarize text using abstractive summarization (`/api/abstractive-summarization`)
  - Summarize text from different languages as input and output (`/api/lang-summarization`)

## To Run the Website Locally
1. Clone this GitHub repository
2. Install all necessary node modules from `package.json`
3. Create a `.env.local` file in the root directory and add in the following information:
```basic=
COG_KEY=<AZURE_COGNITIVE_SERVICES_ACCOUNT_KEY>
COG_ENDPOINT=<AZURE_COGNITIVE_SERVICES_ACCOUNT_ENDPOINT>
ABS_ENDPOINT=<ALLENNLP MODEL ENDPOINT>
NEXT_PUBLIC_COG_KEY=<AZURE_COGNITIVE_SERVICES_ACCOUNT_KEY>
NEXT_PUBLIC_COG_ENDPOINT=<AZURE_COGNITIVE_SERVICES_ACCOUNT_ENDPOINT>
```
4. Run `npm run dev` and head to `localhost:3000`


## Technologies Used
Node.js React.js, Next.js, Chakra UI, AllenNLP, Microsoft Azure
