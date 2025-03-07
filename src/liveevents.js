export default class LiveEvents {

    constructor() {
        this.messageHandlers = {
            '*': []
        };
    }

    emitSingle(msgName, data) {
        this.messageHandlers[msgName].forEach(handler => {
            handler(JSON.parse(data));
        });
    }

    emitWildcard(data) {
        this.messageHandlers['*'].forEach(handler => {
            handler(JSON.parse(data));
        });
    }

    emit(msgName, data) {

        if (!this.messageHandlers[msgName]) return;

        this.emitSingle(msgName, data);
        this.emitWildcard(data);
    }

    on(msgName, callback) {

        if (!this.messageHandlers[msgName]) this.messageHandlers[msgName] = [];

        this.messageHandlers[msgName].push(callback);
    }
}

export const instance = new LiveEvents();
