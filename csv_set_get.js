const fs = require("fs");
const readline = require('readline'); 

// поиск имени
function SearchName(array_name, name){
    result = [];
    // преобразование в двухмерный массив
    for(item of array_name){
        result.push(item.split(','));
    }
    // поиск имени в массиве
    for(item of result){
        // проверка на имя в любом регистре
        if(item[0].toLowerCase() === name.toLowerCase()){
            return item[1];
        }
    }
}

module.exports.writefile = function(name, age){
    fs.appendFileSync("data/names.csv", `${name},${age}\n`);
}

module.exports.readfile = function(name){
    //чтение файла в массив
    let readfile_to_array = fs.readFileSync("data/names.csv", "utf8").toString().split("\n");
    let age = SearchName(readfile_to_array, name);
    return age;
}
