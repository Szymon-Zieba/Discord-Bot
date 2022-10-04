
const link = "https://www.olx.pl/api/v1/offers/?offset=0&limit=40&query=tytani%20gra%20planszowa&filter_refiners=spell_checker&facets=%5B%7B%22field%22%3A%22region%22%2C%22fetchLabel%22%3Atrue%2C%22fetchUrl%22%3Atrue%2C%22limit%22%3A30%7D%2C%7B%22field%22%3A%22category_without_exclusions%22%2C%22fetchLabel%22%3Atrue%2C%22fetchUrl%22%3Atrue%2C%22limit%22%3A20%7D%5D&sl=182226650d6x160517ae"

const refresh = async () => {
    let cos
    try{
        cos = await fetch(link)
        console.log(cos)
    }
    catch(err){
        console.log(err)
    }

   // setTimeout(refresh, 1000 * 5)
}

refresh()