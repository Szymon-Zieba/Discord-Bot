
import { startFollow, getDateForChooseProduct } from "./startFollow.js"



const dateToChooseProduct = await getDateForChooseProduct("traktor")
const data = await startFollow(dateToChooseProduct[0])

console.log(data)