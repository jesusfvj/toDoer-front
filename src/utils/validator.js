const ageValidator = (value) => {
    return value >= 0;
}

const samePasswordValidator = (password1, password2) => {
    return password1 === password2;
}

export { ageValidator, samePasswordValidator}