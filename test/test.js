const refresh = async () => {
    let cos
    try{
        cos = await fetch("https://sklep.pgg.pl")
        if(cos){
            document.documentElement.innerHTML = await cos.text()
        }
    
    
        const button = document.querySelector("#main > div > div:nth-child(35) > div.col-12.col-md-3.col-lg-2.pt-3.text-sm-center > form > button")
    
        if(button && !button.disabled){
            button.click()
        }
        console.log("tak")
    }
    catch(err){

    }

    setTimeout(refresh, 1000 * 5)
}