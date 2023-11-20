module.exports.dateToString = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() 

    return `${year}-${month}-${day}`
}