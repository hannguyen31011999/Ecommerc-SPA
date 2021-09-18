export const makeid = (length, id) => {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result += id;
}

export const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
}

