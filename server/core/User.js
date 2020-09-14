const { v4: uniqueId } = require('uuid')
class User {
    constructor(age, gender, preferAge, preferGender, socketId, free = true) {
        this.id = uniqueId();
        this.socketId = socketId;
        this.age = age;
        this.gender = gender;
        this.preferAge = preferAge;
        this.preferGender = preferGender;
        this.free = free;
    }
}

module.exports = User;
