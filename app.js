require('dotenv').config()
const puppeteer = require('puppeteer');
const colors = require('colors');
// La variable que va a sostener la cadena de texto
const tag = "jimihendrix";
const like = 50;
// Cuantas veces hicimos like
let counter = 0;

(async () => {
    try {
        console.log(`Initiating the Robot`.blue)
        // Open Chrome
        const browser = await puppeteer.launch({
            headless: false,
            devtools: true,
        });
        // Esto nos abre una nueva página
        const page = await browser.newPage();
        // Usamos goto() que es el método que nos sirve a ir a una página web
        await page.goto("https://instagram.com");

        await page.waitForSelector("input[name='username']", {
            visible: true,
            //   timeout: 5000,
        });

        // Este metodo me permite ejecutar javascript en la consola del navegador. Me pide que le pase un callback 
        // ! page.evaluate() y $() es LO MISMO
        const text = await page.evaluate(() => {
            const texto = document.querySelector('p[class="izU2O "]').textContent;
            return texto;
        });
        console.log(text);

        console.log(`Login`.blue);
        // Esperar que cargue selector de cookies
        await page.waitForSelector("div[class='mt3GC'] > button:nth-child(1)", {
            visible: true,
        });
        await page.click("div[class='mt3GC'] > button:nth-child(1)");
        await page.waitForSelector("input[name='username']", {
            visible: true,
            //   timeout: 5000,
        });
        await page.type("input[name='username']", "alfonsodelag", { delay: 200 });
        await page.type("input[name='password']", process.env.PASSWORD, { delay: 200 });
        // clickear en iniciar sesion
        await page.click("button[type='submit']");
        console.log(`Succesfully logged in`.bgGreen.black);
        // Quitando la alerta de guardar informacion de inicio de sesion
        await page.waitForSelector("div[class='cmbtv'] > button", {
            visible: true,
        });
        await page.click("div[class='cmbtv'] > button");

        // Quitando la alerta de mostrar notificaciones
        await page.waitForSelector("div[class='mt3GC'] > button:nth-child(2)", {
            visible: true,
        });

        await page.click("div[class='mt3GC'] > button:nth-child(2)");
        console.log(`Going to ${tag} ##hashtag##`.blue);
        await page.goto(`https://www.instagram.com/explore/tags/${tag}/`);

        // ! La primera imagen que aparece al buscar #dogs
        await page.waitForSelector("div[class='EZdmt']", {
            visible: true,
        });
        // ** Le hacemos click a la primera foto
        await page.click("div[class='EZdmt'] div > div > div:nth-child(1) > div:nth-child(1) > a");
        console.log(`Starting to like`.blue);
        // ! Damos like a las fotos
        for (let i = 0; i < like; i++) {

            await page.waitForSelector("div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button", {
                visible: true,
            });
            // Damos click en el boton de Like

            await page.click("div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > section.ltpMr.Slqrh > span.fr66n > button");
            await page.type("section.sH9wk._JgwE > div > form > textarea", "so cool!", { delay: 200 });
            await page.click("body > div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > section.sH9wk._JgwE > div > form > button.sqdOP.yWX7d.y3zKF");
            await page.click("a[class=' _65Bje  coreSpriteRightPaginationArrow']");
            counter++;
            console.log(`You gave ${i + 1} like`.green);
            await page.waitForTimeout(2000)
        }
        console.log(`You've liked ${tag} recent pictures ${counter} times`.green);
        await process.exit();
    } catch (error) {
        console.error(error);
    }
})()