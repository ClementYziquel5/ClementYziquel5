const fs = require('fs');
const readme = require('./readme.js');

function getDaysBeforeNextBirthday() {
    const today = new Date();
    const birthday = new Date(today.getFullYear(), 0, 14);
    if (today.getMonth() > 1 || (today.getMonth() == 1 && today.getDate() > 13)) {
        birthday.setFullYear(birthday.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    const daysBeforeBirthday = Math.ceil((birthday.getTime() - today.getTime()) / oneDay);
    console.log("Days before birthday :",daysBeforeBirthday);
    return daysBeforeBirthday;
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

    let newReadme = readme.replace('<#daysBeforeBirthdday>', daysBeforeBirthday);
    newReadme = newReadme.replace('<#tryhackmeRank>', tryHackMeRank);

    fs.writeFileSync('README.md', newReadme);
}

main();
