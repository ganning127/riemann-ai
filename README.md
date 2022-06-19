![](https://i.imgur.com/VLw3Bra.png)

# RiemannAI
*Developed by: Ganning Xu, Melody Lee, Eric Liu, Cooper Xie.*

**Desired Features:**

- [x] Transcribe from spoken text to a mutable data structure
- [x] Take the transcribed text and feed it through a text summarization ML model once the user clicks a button
- [x] Allow users to specify input (spoken) and output (summarized) languages
- [x] Abstractive simplification
- [x] Saving the summaried document (can be any language)
- [x] API endpoints for Developers:
  - [x] Summarize text using extractive summarization
  - [x] Summarize text using abstractive summarization
  - [x] Summarize text from different languages as input and output


# Write-Up
## Inspiration
In the United States alone, over 10.4% of all enrolled students are English Language Learning (ELL) students, or individuals who face challenges in learning and communicating fluently in the English language [1]. Yet, many of these students – a number close to 5.1 million nationwide – are enrolled in institutions that lack the resources to help them overcome this language barrier.

These ELL students across the country (and arguably the world) struggle to keep up in class due to fast-paced, non-Native language-based classes. Schools may not have access to the necessary human resources and funds needed to accommodate these students, hindering ELL students’ opportunities to learn. 

As English as a Second Language (ESL) students ourselves, we have experienced such inconveniences in American schools firsthand, especially in the first few months immediately after moving to the United States. “I remember when I first moved to the United States in 8th grade. I could not understand any word in science class. I struggled a lot with my grade,” says Cooper Xie, one of our group members. Thus, when prompted to create something that we “believe will be useful to society”, the thought of tackling this challenge, which our own team members have faced, came to mind.

We were inspired to create RiemannAI, a service that translates and summarizes course content for students worldwide, the very solution many of our team members wished we had access to years ago.

## Our Solution
RiemannAI is a simplistic language process interface. The key feature of our solution allows students to use RiemannAI to transcribe and translate audio recordings of lectures, discussions, or speeches from most languages into the student’s chosen language. To make the review of the material easier for these students, our solution also incorporates a text summarization capability that returns the main points from this audio recording for the student’s use. The summarized text can be condensed even further into keywords to provide clearer insights to the user.

Yet RiemannAI is more than merely just a single tool. The interactive interface also introduces methods for extractive and abstractive summarization from the text (expanding its functionality to more than just audio input). The extractive summarization functionality allows for students to shorten long, difficult texts to an approachable length. On the other hand, the abstractive summarization function aids in the summarization and finding of answers to certain questions students may have. This, in turn, will allow students to approach work completion and studying more efficiently.

## Challenges we ran into
During this project, we discovered that it is difficult to interface with a variety of languages in their written and spoken forms. An example of this is with the website’s speech recognition function: originally depending on React.js’s speech recognition tools to record and transcribe audio, users would have had to manually dictate punctuation for the summarization features to function correctly. This task was switched over to Microsoft Azure’s speech recognition instead, which resolved the aforementioned issue and gave us greater uniformity behind the scenes on the website.

Additionally, testing the accuracy and usability of RiemannAI proved challenging outside of the languages that our team’s members are proficient in. Aside from relying on the performance of the API, we also validated this using outside tools as a benchmark to help us gauge the reliability of the website.

## Accomplishments that we're proud of
We successfully designed a simplistic and functional user interface that would significantly help students who seek foreign academic resources. On top of that, our team came up with an algorithm that makes use of skills in topics such as machine learning and natural language processing. We were able to understand and implement concepts like extractive and abstractive summary. 

## What we learned
We learned useful technical skills including utilizing Microsoft Azure’s APIs to translate texts and summarize them. Additionally, through LingHacks, we were challenged to approach design and idea implementation creatively, growing our ability to think critically and outside the box.

## What's next for RiemannAI? 
Our team envisions expanding RiemannAI for applications not only in the classroom but as a tool in the workplace, at conferences, and more. In these locations, additional attention to filtering out background noise or non-primary speakers may be needed to fit these settings. As a result, our team hopes to fine-tune the model to contain added functionality on this front.

While the current interface is dependent on having Internet access, we believe it is plausible to introduce a mobile form of this application to increase ease of access. However, all these expansions will require extensive development (and, in some cases, funds) for implementation and deployment. 

## About the Team
Our team (Ganning Xu, Eric Liu, Qizheng “Cooper” Xie, and Melody Lee) is based in North Carolina. Our members are passionate about linguistics, computer science, and creating tools useful to society. 


### Sources
[1] https://nces.ed.gov/programs/coe/indicator/cgf
