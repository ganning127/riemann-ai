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
In the United States alone, over 10.4% of all enrolled students are English Language Learning (ELL) students, or individuals who face challenges in learning and communicating fluently in the English language [1]. Yet, many of these students – a number close to 5.1 million nationwide – are enrolled in institutions that lack the resources to help them overcome this language barrier.

These ELL students across the country (and arguably the world) struggle to keep up in class due to fast-paced, non-Native language-based classes. Schools may not have access to the necessary human resources and funds needed to accommodate these students, hindering ELL students’ opportunities to learn. 

As English as a Second Language (ESL) students ourselves, we have experienced such inconveniences in American schools firsthand, especially in the first few months immediately after moving to the United States. “I remember when I first moved to the United States in 8th grade. I could not understand any word in science class. I struggled a lot with my grade,” says Cooper Xie, one of our group members. Thus, when prompted to create something that we “believe will be useful to society”, the thought of tackling this challenge, which our own team members have faced, came to mind.

We were inspired to create RiemannAI, a service that translates and summarizes course content for students worldwide, the very solution many of our team members wished we had access to years ago.

## Our Solution
RiemannAI is a simplistic language process interface. The key feature of our solution allows students to use RiemannAI to transcribe and translate audio recordings of lectures, discussions, or speeches from most languages into the student’s chosen language. To make review of the material easier for these students, our solution also incorporates a text summarization capability that returns the main points from this audio recording for the student’s use. 

Yet RiemannAI is more than merely just a single tool. The interactive interface also introduces methods for extractive and abstractive summarization from text (expanding its functionality to more than just audio input). The extractive summarization functionality allows for students to shorten long, difficult texts to an approachable length. On the other hand, the abstractive summarization function aids in the summarization and finding of answers to certain questions students may have. This, in turn, will allow for students to approach work completion and studying more efficiently.

### Sources
[1] https://nces.ed.gov/programs/coe/indicator/cgf