const fs = require('fs');
const readme = require('./readme.js');

const currentlyLearning = "Burp Suite";
const currentlyLearningLink = "https://portswigger.net/burp";
const nextStep = "Docker";
const nextStepLink = "https://www.docker.com/";

function getDaysBeforeNextBirthday() {
    var myBirthday, today, bday, diff, days;
    myBirthday = [13,1];
    today = new Date();
    bday = new Date(today.getFullYear(),myBirthday[1]-1,myBirthday[0]);
    if( today.getTime() > bday.getTime()) {
        bday.setFullYear(bday.getFullYear()+1);
    }
    diff = bday.getTime()-today.getTime();
    days = Math.floor(diff/(1000*60*60*24));
    console.log(days+" days until my next birthday!");
    return days;
}

async function getTryHackMeRank() {
    try{
        const response = await fetch('https://tryhackme.com/api/user/rank/Ellzee');
        const data = await response.json();
        console.log("TryHackMe rank :",data.userRank);
        return data.userRank;
    }catch(e){
        console.log(e);
        return 'error';
    }
}

const main = async () => {
    const daysBeforeBirthday = getDaysBeforeNextBirthday();
    const tryHackMeRank = await getTryHackMeRank();

    const newReadme = readme
    .replace('<#daysBeforeBirthdday>', daysBeforeBirthday)
    .replace('<#tryhackmeRank>', tryHackMeRank)
    .replace('<#CurrentlyLearning>', currentlyLearning)
    .replace('<#CurrentlyLearningLink>', currentlyLearningLink)
    .replace('<#NextStep>', nextStep)
    .replace('<#NextStepLink>', nextStepLink);

    fs.writeFileSync('README.md', newReadme);
}

main();
