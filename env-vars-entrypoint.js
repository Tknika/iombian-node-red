const settings = require('/data/settings.js');
const fs = require('fs');
const util = require('util');
const bcrypt = require('bcrypt');

console.log("Updating 'settings.js' file with environment variables");

if (process.env.LISTENER_PORT) {
    settings.uiPort = process.env.LISTENER_PORT;
} else {
    settings.uiPort = 1880;
}

if (process.env.AUTH_ENABLED === "true") {
    username = "iompi";
    password = "iompi";
    permissions = "*";

    if (process.env.AUTH_USER_USERNAME) {
        username = process.env.AUTH_USER_USERNAME;
    }

    if (process.env.AUTH_USER_PASSWORD) {
        if (process.env.AUTH_USER_PASSWORD.startsWith("$2a$") || process.env.AUTH_USER_PASSWORD.startsWith("$2b$")) {
            console.log("Password is already hashed")
            password = process.env.AUTH_USER_PASSWORD;
        } else {
            password = bcrypt.hashSync(process.env.AUTH_USER_PASSWORD, 8);
        }
    }

    if (process.env.AUTH_USER_PERMISSIONS) {
        permissions = process.env.AUTH_USER_PERMISSIONS;
    }

    settings.adminAuth = {
        "type": "credentials", "users": [{
            "username": username,
            "password": password,
            "permissions": permissions
        }]
    }
} else {
    if (settings.hasOwnProperty('adminAuth')) {
        delete settings.adminAuth;
    }
}

fs.writeFileSync('/data/settings.js', "module.exports = " + util.inspect(settings, compact = false, depth = 50), 'utf8');

console.log("'settings.js' file updated with environment variables");