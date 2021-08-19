const fs = require('fs');

/*
    given an interface of user (from above) make the following functions:
    add, delete, get, update
*/

function getUsers() {
    return require('../db/users.json');
}

function setUsers(users) {
    fs.writeFileSync("./db/users.json", JSON.stringify(users));
}

function add(user) {
    const foundUser = getUser(user.email);
    const users = getUsers();
    if (!foundUser) {
        const newUser = {
            name: user.name,
            email: user.email,
            password: user.password
        }
        users.push(newUser);
        setUsers(users);
        return true;
    }
    return false;
}

function getUser(email) {
    const users = getUsers();
    const foundUser = users.find(existingUser => existingUser.email === email);
    return foundUser;
}

function deleteUser(email) {
    const users = getUsers();
    const filteredUsers = users.filter(existingUser => existingUser.email !== email);
    setUsers(filteredUsers);
}

function update(email, data) {
    const users = getUsers();
    const foundUser = users.find(existingUser => existingUser.email === email);
    if (!foundUser) return false;
    Object.keys(foundUser).forEach(key => {
        if (data[key]) {
            foundUser[key] = data[key];
        }
    });
    setUsers(users);
    return foundUser;
}

function getAll() {
    return getUsers();
}

module.exports = {
    update,
    getAll,
    getUser,
    deleteUser,
    add
}









