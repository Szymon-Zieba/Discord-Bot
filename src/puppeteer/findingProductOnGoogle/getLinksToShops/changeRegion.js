export const changeRegion = async(page) => {
    await page.on('dialog', async dialog => {
        await dialog.accept()
    })
    await page.click("#regionanchormore")
    await page.waitForSelector("#regionoRU")
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'pl'
    });
    await page.click('#regionoRU > div')
    await page.waitForSelector("#form-buttons > div.goog-inline-block.jfk-button.jfk-button-action")
    await page.click("#form-buttons > div.goog-inline-block.jfk-button.jfk-button-action")
}