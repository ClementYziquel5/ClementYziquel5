/* 
 * I want this file to update daily with the number of days before my birthday on my github profile
 * To do so, i will use readme.js as input content and replace the <#daysBeforeBirthdday> tag with the number of days before my birthday
 * Then i will write the new content to readme.md
*/

const fs = require('fs');
const readme = require('./readme.js');

function getDaysBeforeNextBirthday() {
    const today = new Date();
    const birthday = new Date(today.getFullYear(), 1, 13);
    if (today.getMonth() > 1 || (today.getMonth() == 1 && today.getDate() > 13)) {
        birthday.setFullYear(birthday.getFullYear() + 1);
    }
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.ceil((birthday.getTime() - today.getTime()) / oneDay);
}

const main = async () => {
    const daysBeforeBirthday = getDaysBeforeNextBirthday();
    const newReadme = readme.replace('<#daysBeforeBirthdday>', daysBeforeBirthday);
    fs.writeFileSync('readme.md', newReadme);
}

main();
