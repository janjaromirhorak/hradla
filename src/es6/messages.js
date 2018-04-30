
class Message {
    constructor(text, onHide = undefined) {
        this.$el = $("<div>").addClass("message").text(text);

        this.onHide = onHide;
    }

    hide() {
        this.$el.remove();

        if(this.onHide) {
            this.onHide();
        }
    }
}

class LoadingMessage extends Message {
    constructor(text, onHide = undefined) {
        super(text, onHide);

        this.$el.addClass("loading");
    }
}

class ClosableMessage extends Message {
    constructor(text, onHide = undefined) {
        super(text, onHide);

        this.$el.append(
            $("<span>").addClass("close").click(() => {
                this.hide();
            })
        )
    }
}

class ErrorMessage extends ClosableMessage {
    constructor(text, onHide = undefined) {
        super(text, onHide);

        this.$el.addClass("error");
    }
}

class WarningMessage extends ClosableMessage {
    constructor(text, onHide = undefined) {
        super(text, onHide);

        this.$el.addClass("warning");
    }
}

/**
 * display messages to the user in a nice UI
 */
export default class Messages {
    constructor() {
        this.$el = $("<div>").addClass('messages');

        this.count = 0;

        // place the progress info element
        $('body').append(this.$el);
    }

    get count() {
        return this.messageCount;
    }

    set count(value) {
        this.messageCount = value;

        if(this.messageCount < 1) {
            this.hide();
        } else {
            this.display();
        }
    }

    hide() {
        this.$el.addClass('hidden');
    }

    display() {
        this.$el.removeClass('hidden');
    }

    newMessage(text, constr = Message) {
        let message = new constr(text, () => {
            this.count--;
        });

        this.$el.append(message.$el);
        this.count++;

        return message;
    }

    newLoadingMessage(text) {
        return this.newMessage(text, LoadingMessage);
    }

    newErrorMessage(text) {
        return this.newMessage(text, ErrorMessage);
    }

    newWarningMessage(text) {
        return this.newMessage(text, WarningMessage);
    }
}
