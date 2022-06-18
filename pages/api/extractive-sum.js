const text =
    `At the February 2010 Singapore Air Show, Airbus said its decision to launch was scheduled for the July 2010 Farnborough Air Show.[8] The decision had still not been taken by August, but the engine choice included the CFM International LEAP-1A and the Pratt & Whitney PW1000G, with 20% lower maintenance cost than current A320 engines. The new engines burn 16% less fuel, though the actual gain is slightly less as 1–2% is typically lost when installed on an existing aircraft.[9]

	On 1 December 2010, Airbus launched the A320neo "New Engine Option" with 500 nmi (930 km) more range or 2 t (4,400 lb) more payload, and planned to deliver 4,000 over 15 years.[10] Development costs were predicted to be "slightly more than €1 billion [$1.3 billion]". The neo list price would be $6 million more than the ceo, including $3.5 million for airframe modifications and around $0.9 million for the sharklets. The A320neo was slated for service entry in spring 2016, the A321neo six months later and the A319neo six months after that.[11]
	
	The 2010 order for 40 Bombardier CS300s (now known as Airbus A220-300) and 40 options from Republic Airways Holdings – then owner of exclusive A319/320 operator Frontier Airlines – pushed Airbus into the re-engine. Airbus COO-customers John Leahy decided against ignoring the CSeries and allowing it to grow, as Boeing had previously done with Airbus, and instead aggressively competed against Bombardier Aerospace.[12]
	
	Introduction was then advanced to October 2015.[13] Airbus claims a 15% fuel saving and "over 95 percent airframe commonality with the current A320".[14] Its commonality helped to reduce delays associated with large changes.[15] In March 2013, airlines' choices between the two engines were almost equal.[16]
	
	The new "Space-Flex" optional cabin configuration increases space-efficiency with a new rear galley configuration and a "Smart-Lav" modular lavatory design – allowing an in-flight change of two lavatories into one accessible toilet.[17] The rearranged cabin allows up to 20 more passengers for the A321neo without "putting more sardines in the can" with the larger "Cabin-Flex" modified exits described below.[18] Total fuel consumption per seat is reduced by over 20%, while the rearranged cabin allows up to nine more passengers for the A320neo.[19]
	
	The first Airbus A320neo rolled out of the Toulouse factory on 1 July 2014 and first flight was scheduled for September 2014.[20]`;

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
    .slice(0, Math.floor(sentence_scores.length * 0.3));

// combine top sentences into one summary string and print it out
const summary = sentence_tokens
    .filter((sentence, i) => top_sentences.includes(sentence_scores[i]))
    .join(".");

console.log(summary);
