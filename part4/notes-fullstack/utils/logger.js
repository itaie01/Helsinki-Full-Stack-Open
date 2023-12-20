// prints normal messages
const info = (...params) => {
    console.log(...params)
}

// prints errors
const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}
