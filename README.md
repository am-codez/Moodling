# P-Happy-Good-Habits-
A program that predicts cognitive performance based on lifestyle habits.

**The motivation:**
As students, we often find it challenging to balance our health with the rigorous demands of coursework. Neglecting our body’s signals, whether it’s skipping sleep, overloading on caffeine, or ignoring stress can backfire, ultimately impairing our ability to focus in class and perform at our full potential. By prioritizing our well-being, we can not only improve our academic performance but also foster a healthier, more sustainable lifestyle.

**How it works:**
The locally-run webapp begins by collecting basic demographic information, such as age, which is securely stored locally. Users then input their daily lifestyle habits—such as screen time, sleep duration, exercise, and caffeine consumption. Using this data, the program analyzes patterns and generates a personalized prediction of the user’s cognitive performance, mood, and stress levels. 
This insight helps users understand how their habits may be influencing their mental well-being and productivity.

**How we implemented this program:**
On the back end, we utilized Python to develop a Gemini API call, which processes a string input from localStorage. 
On the front end, we designed mock-ups for images and web pages using Photoshop and Figma. The page functionalities were coded in JavaScript, with HTML for structure and CSS for styling. User inputs are transmitted to Gemini, which generates a prediction of the user’s mental wellness based on the query received.