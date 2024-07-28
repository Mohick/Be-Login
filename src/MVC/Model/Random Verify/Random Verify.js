



const randomVerify = () => {
    const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const random1 = Math.floor(Math.random() * array.length)
    const random2 = Math.floor(Math.random() * array.length)
    const random3 = Math.floor(Math.random() * array.length)
    const random4 = Math.floor(Math.random() * array.length)
    const random5 = Math.floor(Math.random() * array.length)
    const random6 = Math.floor(Math.random() * array.length)
    const verificationCode = array[random1] + "" + array[random2] + "" + array[random3] + "" + array[random4] + "" + array[random5] + "" + array[random6]
    return verificationCode
}

module.exports = randomVerify