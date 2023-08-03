/* 
 * I want this file to update daily with the number of days before my birthday on my github profile
 * To do so, i will use readme.js as input content and replace the <#daysBeforeBirthdday> tag with the number of days before my birthday
 * Then i will write the new content to readme.md
*/

const fs = require('fs');
const readme = require('./readme.js');
const { getDaysBeforeBirthday } = require('./utils.js');

const main = async () => {
    const daysBeforeBirthday = await getDaysBeforeBirthday();
    const newReadme = readme.replace('<#daysBeforeBirthdday>', daysBeforeBirthday);
    fs.writeFileSync('readme.md', newReadme);
}

main();
