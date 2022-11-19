
import { startFollow, getDateForChooseProduct } from "./startFollow.js"



const dateToChooseProduct = await getDateForChooseProduct("ryzen 3")
const data = await startFollow(dateToChooseProduct[0])
