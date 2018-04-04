export function setCookie(name, value, daysToLive) {
    let date = new Date();
    date.setTime(date.getTime() + (daysToLive*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();

    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name) {
    name += "=";
    let cookieStrings = decodeURIComponent(document.cookie).split(";");
    for (let cookieString of cookieStrings) {
        if (cookieString.charAt(0) === ' ') {
            cookieString = cookieString.substring(1)
        }
        if(cookieString.substring(0, name.length) === name) {
            return cookieString.substring(name.length);
        }
    }

    return undefined;
}

export function cookieExists(name) {
    name += "=";
    let cookieStrings = decodeURIComponent(document.cookie).split(";");
    for (let cookieString of cookieStrings) {
        if (cookieString.charAt(0) === ' ') {
            cookieString = cookieString.substring(1)
        }
        if(cookieString.substring(0, name.length) === name) {
            return true;
        }
    }
    return false;
}
