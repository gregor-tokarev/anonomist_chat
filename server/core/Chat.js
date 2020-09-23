const { v4: uuid } = require('uuid');
class Chat {
    constructor(you, opponent) {
        this.id = uuid();
        this.you = you;
        this.opponent = opponent;
        this.history = [];
    }
    
    addMessage({ message, author }) {
        this.history.push({
            message,
            author
        })
    }
    
    startChat(io) {
        io.to()
    }
}

module.exports = Chat;
