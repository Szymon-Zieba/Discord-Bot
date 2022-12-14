export const changeRegion = async(page) => {
    await page.click("#regionanchormore")
    await page.waitForSelector("#regionoPL")
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'pl'
    });
    await page.click('#regionoPL > div')
}