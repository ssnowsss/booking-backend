const errorHandle = (status, message) => {
    let error = new Error()
    error.message = message
    error.status = status
    return error
}

module.exports = errorHandle