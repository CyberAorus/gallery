exports.getErrorMessage = (err) => {
    let errorMessage = err.message;
    if (err.errors) {
        errorMessage = Object.values(err.errors).map(error => error.message);
    }

    return errorMessage;

}