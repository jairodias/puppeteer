
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.instagram.com/name-perfil/');

    const imgList = await page.evaluate(() => {

        const nodeList = document.querySelectorAll('article img');

        const imgArray = [...nodeList];

        const listImgArray = imgArray.map( img => ({ src: img.src }));

        return listImgArray;

    })

    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
        if(err) throw new Error('Falha ao escrever no arquivo!');
    });
    

    await browser.close();
})();