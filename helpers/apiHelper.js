function apiResponse (res, status, type, title, message) {
    return res.status(status).json({
        type: type,
        title: title,
        message: message,
    })
}

module.exports = {
    apiResponse,
}