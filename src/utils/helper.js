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

export const formatCurrency = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const returnStatus = (status) => {
    switch (status) {
        case 1:
            return "Comfirmation";
        case 2:
            return "Delivering";
        case 3:
            return "Delivered"
        case 4:
            return "Cancel"
        default:
            break;
    }
}