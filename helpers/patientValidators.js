exports.validatePhone = (phone) => {
    const pattern = /^\+[0-9]{3,15}$/
    return pattern.test(phone)
}

exports.validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return pattern.test(email)
}