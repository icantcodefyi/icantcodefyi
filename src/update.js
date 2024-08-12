const path = require("path");
const fetch = require("node-fetch");
const fs = require("fs");

let stars = 0,
  page = 1;

let special;

const CountStars = async () => {
  let StarsData = await fetch(
    `https://api.github.com/users/icantcodefyi/starred?per_page=100&page=${page}`
  ).then((res) => res.json());
  stars += StarsData.length;
  page++;
  if (StarsData.length === 100) CountStars();
  else WriteReadMe();
};

const WriteReadMe = async () => {
  //Get ReadMe path
  const ReadMe = path.join(__dirname, "..", "README.md");
  const date = new Date();
  
  //Season Based Emoji
  let dd = date.getDate(), mm = date.getMonth() + 1
  
  if(mm === 12)special = ["⛄", "❄", "🎄"]
  else if(mm === 3 && dd === 29) special = ["🎉", "🎈", "🎊"]

  //Fetching Info From Github API
  let UserData = await fetch("https://api.github.com/users/icantcodefyi").then(
    (res) => res.json()
  );

  //Creating the text what we gonna save on ReadMe file
  const text = `I am a software developer. I build things for the web, mostly using [Next.js](https://nextjs.org). Sometimes I also contribute, especially when I get bitten hard by a bug in the framework (which has happened more occasionally than I'd like it to).

In free time, I usually either work on side projects or learn about new stuff related to web development. Or just randomly walk around in a quiet park, because I find them very peaceful. Or watch a *lot* of anime.

I almost always listen to music whenever I can. My taste ranges from beautiful classical masterpieces or movie soundtracks to catchy Japanese popular music. Combinations of the two, like pieces by [Yuki Kajiura](https://en.wikipedia.org/wiki/Yuki_Kajiura), are simply perfection ✨

Prev : [@anuplayz](https://github.com/anuplayz) *got compromised oof*
<!-- EXCLUDE -->

[![Aniruddh's GitHub stats](https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=icantcodefyi)](https://icantcode.fyi/)
  
<!-- Last updated on ${date.toString()} ;-;-->
<i>Last updated on ${date.getDate()}${
    date.getDate() === 1
      ? "st"
      : date.getDate() === 2
      ? "nd"
      : date.getDate() === 3
      ? "rd"
      : "th"
  } ${
    [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][date.getMonth()]
  } ${date.getFullYear()} using magic</i> ${special?special[2]:"✨"} ${(mm === 3 && dd === 29)?"and... today is my birthday":""}`;

  //Saving on readme.md
  fs.writeFileSync(ReadMe, text);
};

(() => {
    CountStars();
})()
