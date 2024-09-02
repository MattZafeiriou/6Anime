global.passwords = {"nigga": "matuaioszafeiriou@gmail.com"};

function createToken(email, length = 20) {
    const token = makecode(length);

    passwords[token] = email;

    setTimeout(() => {
        delete passwords[token];
      }, 10 * 60 * 1000); // 10 minutes

      return token;
}

function makecode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

function getEmail(token) {
    return passwords[token];
}

function validateToken(token) {
    return passwords[token] !== undefined;
}

module.exports = {createToken, validateToken, getEmail};