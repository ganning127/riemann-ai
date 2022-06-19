/*
    POST: params;
    req.body.origText: text you want to simplify
*/

export default function handler(req, res) {
  const body = JSON.parse(req.body);
  const pkeep = req.headers.pkeep;
  console.log("pKeep", pkeep);
  const text = body.origText;

  const stopwords = [
    "i",
    "me",
    "my",
    "myself",
    "we",
    "our",
    "ours",
    "ourselves",
    "you",
    "your",
    "yours",
    "yourself",
    "yourselves",
    "he",
    "him",
    "his",
    "himself",
    "she",
    "her",
    "hers",
    "herself",
    "it",
    "its",
    "itself",
    "they",
    "them",
    "their",
    "theirs",
    "themselves",
    "what",
    "which",
    "who",
    "whom",
    "this",
    "that",
    "these",
    "those",
    "am",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "having",
    "do",
    "does",
    "did",
    "doing",
    "a",
    "an",
    "the",
    "and",
    "but",
    "if",
    "or",
    "because",
    "as",
    "until",
    "while",
    "of",
    "at",
    "by",
    "for",
    "with",
    "about",
    "against",
    "between",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "to",
    "from",
    "up",
    "down",
    "in",
    "out",
    "on",
    "off",
    "over",
    "under",
    "again",
    "further",
    "then",
    "once",
    "here",
    "there",
    "when",
    "where",
    "why",
    "how",
    "all",
    "any",
    "both",
    "each",
    "few",
    "more",
    "most",
    "other",
    "some",
    "such",
    "no",
    "nor",
    "not",
    "only",
    "own",
    "same",
    "so",
    "than",
    "too",
    "very",
    "s",
    "t",
    "can",
    "will",
    "just",
    "don",
    "should",
    "now",
  ];

  // split text into words
  const tokens = text.split(/\W+/);

  // remove stop words from words
  const cleaned = tokens.filter((word) => !stopwords.includes(word));

  // make a frequency map out of words
  const freq = cleaned.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  // notmalize frequencies
  const normalized = Object.keys(freq).reduce((acc, cur) => {
    acc[cur] = freq[cur] / cleaned.length;
    return acc;
  }, {});

  // split text into sentences
  const sentence_tokens = text.split(/[.!?]+/);

  // give each sentence a score based on its words
  const sentence_scores = sentence_tokens.map((sentence) => {
    const words = sentence.split(/\W+/);
    const word_scores = words.map((word) => normalized[word] || 0);
    return word_scores.reduce((acc, cur) => acc + cur, 0);
  });

  // pick the highet 30% of sentences
  const top_sentences = sentence_scores
    .sort((a, b) => b - a)
    .slice(0, Math.floor(sentence_scores.length * pkeep));

  // combine top sentences into one summary string and print it out
  const summary = sentence_tokens
    .filter((sentence, i) => top_sentences.includes(sentence_scores[i]))
    .join(".");

  res.status(200).json({ summary });
}
