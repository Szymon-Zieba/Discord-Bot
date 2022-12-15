const getCookies = async(page) => {
    const client = await page.target().createCDPSession();
    const cookies = (await client.send('Network.getAllCookies')).cookies;
    console.log(cookies)
}

export const changeRegion = async(page) => {
    page.on('dialog', async dialog => {
        await dialog.accept()
    })
    console.log("PUPPETER TO CWEL")
    await page.evaluate(() => {
        let el = document.querySelector('#regionoRU > div')
        el.dispatchEvent(new MouseEvent('mousedown'))
        el.dispatchEvent(new MouseEvent('mouseup'))
        document.querySelector('form').submit()
    })
    console.log("O juz nie")
}
