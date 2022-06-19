![](https://i.imgur.com/VLw3Bra.png)

# RiemannAI
*Developed by: Ganning Xu, Melody Lee, Eric Liu, Cooper Xie.*

**Desired Features:**

- [x] Transcribe from spoken text to a mutable data structure
- [x] Take the transcribed text and feed it through a text summarization ML model once the user clicks a button
- [x] Allow users to specify input (spoken) and output (summarized) languages
- [ ] Abstractive simplification
- [x] Saving the summaried document (can be any language)
- [ ] API endpoints for Developers:
  - [ ] Summarize text using extractive summarization
  - [ ] Summarize text using abstractive summarization
  - [ ] Summarize text from different languages as input and output


# Write-Up
## Inspiration
In the United States alone, over 10.4% of all enrolled students are English Language Learning (ELL) students – or individuals who face challenges in learning and communicating fluently in the English language [1]. Yet, many of these students – a number close to almost 5.1 million nationwide – are enrolled in institutions that lack the resources to help them overcome this language barrier.

As English as a Second Language (ESL) students ourselves, we have experienced such inconveniences in American schools firsthand, especially in the first few months immediately after moving to the United States. “I remember when I first moved to the United States in 8th grade. I could not understand any word in science class. I struggled a lot with my grade,” says Cooper Xie, one of our group members. Thus, when allowed to create something that we “believe will be useful to society”, the thought of tackling this challenge our very own team members have faced came to mind.

Problems like these inspired us to create and program RiemannAI, a service that translates and summarizes course content for students worldwide. 

## Our Solution
RiemannAI is a simplistic language process interface. It can take inputs from audio recorded in [number of languages] languages (like [insert some language names]), translate them into English, summarize the information with natural language processing (NLP) and machine learning (ML), and translate the summarized information back to a language of the user’s choosing. 