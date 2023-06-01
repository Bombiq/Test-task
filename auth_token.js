module.exports.authenticateToken = function (request, response) {

    let key_token = null;

    if(process.env.APP_TOKEN !== null && process.env.APP_TOKEN !== undefined){
        key_token = process.env.APP_TOKEN;
    }

    const authHeader = request.headers['authorization'];
    // токен окружения найден и соответствует заголовку
    if(authHeader === key_token){
        return true;
    // токен не соответствует заголовку
    }else if(authHeader !== key_token){
        response.sendStatus(401);
    // токен не задан
    }else if(key_token === null || key_token === undefined){
        response.sendStatus(401);
    }
}
