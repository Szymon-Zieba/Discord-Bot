import {websiteLanguage} from "../../../config.js";

export const changeRegion = async(page) => {
    page.on('dialog', async dialog => {
        await dialog.accept()
    })
    await page.click('div[data-pid="hl"]')
    await page.focus('input[jsaction="focus:daRB0b;blur:kDTLMd;keypress:kvnoXb"]')
    await page.keyboard.type(websiteLanguage.language)

   await page.evaluate(async() => {
       const elRegions = document.querySelectorAll('#lb > div > div.mcPPZ.nP0TDe.xg7rAe.ivkdbf > span > div > g-menu > g-menu-item:not([style="display: none;"])')
        if(elRegions.length > 0 && elRegions[0])  elRegions[0].click()
       await new Promise(r => setTimeout(r, 1000));
        const el = document.querySelector("#lb > div > div.mcPPZ.nP0TDe.xg7rAe.ivkdbf > span > div > div.JhVSze > span:nth-child(2)")
        if(el) el.click()

    })
    await new Promise(r => setTimeout(r, 1000));

    await page.click('div[data-pid="gl"]')
    await page.focus('input[jsaction="focus:daRB0b;blur:kDTLMd;keypress:kvnoXb"]')
    await page.keyboard.type(websiteLanguage.region)

    await page.evaluate(async() => {
        const elRegions = document.querySelectorAll('#lb > div > div.mcPPZ.nP0TDe.xg7rAe.ivkdbf > span > div > g-menu > g-menu-item:not([style="display: none;"])')
        if(elRegions.length > 0 && elRegions[1]) await elRegions[1].click()
        await new Promise(r => setTimeout(r, 1000));
        const el = document.querySelector("#lb > div > div.mcPPZ.nP0TDe.xg7rAe.ivkdbf > span > div > div.JhVSze > span:nth-child(2)")
        if(el) el.click()

    })
}

