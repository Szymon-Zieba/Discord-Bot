import puppeteer from 'puppeteer'
import fs from "fs-extra"

export const openBrowser = async (check, proxy) => {
    const browser = await puppeteer.launch({
        // executablePath: '/usr/bin/chromium',
        headless: check,
        args: [
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            `--window-size=1920,1080`,
            `--proxy-server=${proxy.protocol}=${proxy.ip}:${proxy.port}`,
        ],
        ignoreHTTPSErrors: true,
        defaultViewport: {
            "width":1920,
            "height":1080
        }
    })
    let chromeTmpDataDir = null;
    let chromeSpawnArgs = browser.process().spawnargs;
    for (let i = 0; i < chromeSpawnArgs.length; i++) {
        if (chromeSpawnArgs[i].indexOf("--user-data-dir=") === 0) {
            chromeTmpDataDir = chromeSpawnArgs[i].replace("--user-data-dir=", "");
        }
    }

    return {browser, chromeTmpDataDir}
}

export const newPage = async(browser) =>  await browser.newPage()

export const closeBrowser = (browser, chromeTmpDataDir) => {
    browser.close()
    if (chromeTmpDataDir !== null) {
        // fs.removeSync(chromeTmpDataDir);
    }
}

