//подключаем модуль express
const express = require("express");
//чтение токена
const auth_token = require('./auth_token');
//запись чтение файла
const csv = require('./csv_set_get');
// инициализация порта из переменной окружения
const port_default = 3080;
//создаем объект приложения
const app = express();
//создаем обработчик маршрута "/"

// парсер формы
const urlencodedParser = express.urlencoded({extended: false});

// маршрут формы
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

// отправка данных формы
app.post("/", urlencodedParser, function (request, response) {
    auth_res = auth_token.authenticateToken(request, response);
    // проверка токена
    if(auth_res){
        if(!request.body) return response.sendStatus(400);
        //получаем имя с формы
        let name = request.body.userName;
        //получаем возраст с формы
        let age = request.body.userAge;
        csv.writefile(name, age);
    // отсутствие токена
    }else{
        response.sendStatus(401);
    }
});

// маршрут /get-name
app.get("/get-name", (request, response) => {

    auth_res = auth_token.authenticateToken(request, response);

    // проверка токена
    if(auth_res){
        // отправляем ответ
        // значения присутствуют ?name<name>
        if(request.query.name !== undefined && request.query.name !== null){
            // получаем имя
            let name = request.query.name;
            let age = csv.readfile(name);
            if(age){
                response.send(`Возраст: ${age}`);
            }
        }
    // отсутствие значений ?name
        else if(request.query.name === undefined || request.query.name === null){
            response.send("Задайте имя в Get параметре /get-name?name=\"имя\"");
        }
    }
    // отсутствие токена
    else{
        response.sendStatus(401);
    }
});

//запуск сервера и прослушка порта
//проверка на наличие парта в окружении
if (process.env.APP_PORT !== undefined && process.env.APP_PORT !== null){
    //проверка вхождения в диапазон допуступных для пользователей портов
    if(process.env.APP_PORT >= 1024 && process.env.APP_PORT <= 49151){
        app.listen(process.env.APP_PORT);       
    }
//запуск на порту по умолчанию
}else{
    app.listen(port_default);
}