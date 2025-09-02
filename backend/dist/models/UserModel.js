"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name, passwordHash) {
        this.name = name;
        this.passwordHash = passwordHash;
        this.id = id;
    }
}
exports.default = User;
