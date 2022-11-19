import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
puppeteer.use(StealthPlugin())
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

export const openBrowser = async (check) => {
    const browser = await puppeteer.launch({
        // in DOCKER
        //executablePath: '/usr/bin/chromium',
        headless: check,
        ignoreHTTPSErrors: true,
        args: [
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
            '--use-gl=egl',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            `--window-size=1920,1080`,
            // '--remote-debugging-port=9222',
            // "--remote-debugging-address=0.0.0.0",
            // '--disable-gpu',
            // "--disable-features=IsolateOrigins, site-per-process",
            // '--blink-settings=imagesEnabled=true',
            // '--disable-infobars',
            // '--window-position=0,0',
            // '--ignore-certifcate-errors',
            // '--ignore-certifcate-errors-spki-list',
        ],
        defaultViewport: {
            width:1920,
            height:1080
        }
    })
    return browser
}

export const newPage = async(browser) =>  await browser.newPage()

export const closePage = async(page) => await page.close()

export const closeBrowser = (browser) => browser.close()

