import bcrypt from 'bcryptjs';

export const hashPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePass = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

//a payload can be an object containing user info like id, email, etc.
export const generateToken = (payload) => {
    const jwt = require('jsonwebtoken'); 
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE }); //signing means creating a token using the payload and secret
};

export const verifyToken = (token) => {
    try {
        const jwt = require('jsonwebtoken');
        return jwt.verify(token, process.env.JWT_SECRET); //verifying means checking if the token is valid using the secret
    } catch (error) {
        return null;
    }
}

//this is just for testing the hash functionality. 
//run this as PS C:\Vs Program\zontaNaples\ZontaNaplesWebsite\backend> node src/utils/hashPassword.js password123

const password = process.argv[2];

if (process.argv[1]?.endsWith('hashPassword.js')) {
    const password = process.argv[2];

    if(!password) {
        console.log("Please provide a password to hash.");
        console.log("Usage: node hashPassword.js <password>");
        process.exit(1);
    }

    hashPass(password).then(hashed => {
        console.log("Hashed Password:", hashed);
        console.log("You can add this hash to your .env file as ADMIN_PASSWORD_HASH");
        process.exit(0);
    });
}
