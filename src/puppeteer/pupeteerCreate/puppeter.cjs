const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

async function openBrowser(check) {
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/chromium',
        headless: check,
        args: [
            '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
            '--use-gl=egl',
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    })
    return browser
}

async function newPage(browser) {
    const page = await browser.newPage()
    return page
}

function closeBrowser(browser) {
    browser.close()
}

  module.exports = {
    newPage,
    openBrowser,
    closeBrowser
  };