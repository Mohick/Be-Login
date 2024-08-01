

const randomPassword = () => {
    const keyLowerCase = ['j', 'b', 'v', 'k', 'l', 'o', 'a', 'i', 'y', 'x', 'z', 's', 'r', 'n', 'w', 'd']
    const keyUpperCase = ['J', 'B', 'V', 'K', 'L', 'O', 'A', 'I', 'Y', 'X', 'Z', 'S', 'R', 'N', 'W', 'D']
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    const specialChar = ["@", "$", "!", "%", "*", "&", "?"]
    const randomLowerCase1 = Math.floor(Math.random() * keyLowerCase.length)
    const randomLowerCase2 = Math.floor(Math.random() * keyLowerCase.length)
    const randomLowerCase3 = Math.floor(Math.random() * keyLowerCase.length)
    const randomUpperCase1 = Math.floor(Math.random() * keyUpperCase.length)
    const randomUpperCase2 = Math.floor(Math.random() * keyUpperCase.length)
    const randomUpperCase3 = Math.floor(Math.random() * keyUpperCase.length)
    const randomNumber1 = Math.floor(Math.random() * number.length)
    const randomNumber2 = Math.floor(Math.random() * number.length)
    const randomNumber3 = Math.floor(Math.random() * number.length)
    const randomSpecialChar1 = Math.floor(Math.random() * specialChar.length)
    const randomSpecialChar2 = Math.floor(Math.random() * specialChar.length)
    const randomSpecialChar3 = Math.floor(Math.random() * specialChar.length)

    let password = keyLowerCase[randomLowerCase1] + keyLowerCase[randomLowerCase2] + keyLowerCase[randomLowerCase3] +
        keyUpperCase[randomUpperCase1] + keyUpperCase[randomUpperCase2] + keyUpperCase[randomUpperCase3] +
        number[randomNumber1] + number[randomNumber2] + number[randomNumber3] +
        specialChar[randomSpecialChar1] + specialChar[randomSpecialChar2] + specialChar[randomSpecialChar3]
    return password
}

module.exports = randomPassword