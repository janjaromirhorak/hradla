/** @module Messages */

/**
 * a generic message that can be displayed in the {@link Messages} box
 */
class Message {
    /**
     * @param {string} text               text of the message
     * @param {Function} [onHide] a function that will be called when the `hide()` method is called
     */
    constructor(text, onHide) {
        this.$el = $("<div>").addClass("message").text(text);

        /**
         * callback function that will be called when the `hide()` method is called
         * @type {Function}
         */
        this.onHide = onHide;
    }

    /**
     * hide the message (and call the onHide callback if there is any)
     */
    hide() {
        this.$el.remove();

        if(this.onHide) {
            this.onHide();
        }
    }
}

/**
 * a loading message that can be displayed in the {@link Messages} box
 * @extends Message
 */
class LoadingMessage extends Message {
    constructor(text, onHide = undefined) {
        super(text, onHide);

        this.$el.addClass("loading");
    }
}

/**
 * a message that has a close button and that can be displayed in the {@link Messages} box
 * @extends Message
 */
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

/**
 * an error message that can be displayed in the {@link Messages} box
 * @extends ClosableMessage
 */
class ErrorMessage extends ClosableMessage {
    constructor(text, onHide = undefined) {
        super(text, onHide);

        this.$el.addClass("error");
    }
}

/**
 * a warning message that can be displayed in the {@link Messages} box
 * @extends ClosableMessage
 */
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
        /**
         * jQuery element that represents the message interface. This element contains all the currently displayed messages.
         * @type {jQuery.element}
         */
        this.$el = $("<div>").addClass('messages');

        /**
         * number of currently displayed messages, has a specified setter and getter
         * @type {number}
         */
        this.count = 0;

        // place the progress info element
        $('body').append(this.$el);
    }

    /**
     * get the number of currently displayed messages
     * @return {number} [description]
     */
    get count() {
        return this.messageCount;
    }

    /**
     * Set the number of currently displayed messages. Should be called only through functions that add messages.
     *
     * If the message count is >= 1, the jQuery element for the UI is displayed, if the message count is <1, the UI is hidden.
     * @param  {number} value [description]
     * @return {number}       [description]
     */
    set count(value) {
        this.messageCount = value;

        if(this.messageCount < 1) {
            this.hide();
        } else {
            this.display();
        }
    }

    /**
     * hide the message box by adding a `hidden` class to the element
     */
    hide() {
        this.$el.addClass('hidden');
    }

    /**
     * display the message box by removing the `hidden` class to the element
     */
    display() {
        this.$el.removeClass('hidden');
    }

    /**
     * add a new message to the message box
     * @param  {string} text             text of the message
     * @param  {Message} [constr=Message] constructor of the message, must be a derivate of the {@link Message} class
     * @return {Message}                  the newly constructed message (instance made by the specified constructor)
     */
    newMessage(text, constr = Message) {
        // Create the message by calling the constructor,
        // provide it with text and a callback function that will be called when hiding the message.
        // This callback subtracts 1 from the
        let message = new constr(text, () => {
            this.count--;
        });

        this.$el.append(message.$el);
        this.count++;

        return message;
    }

    /**
     * create a new loading message and add it to the message box
     * @param  {string} text text of the message
     * @return {LoadingMessage} the newly constructed {@link LoadingMessage}
     */
    newLoadingMessage(text) {
        return this.newMessage(text, LoadingMessage);
    }

    /**
     * create a new error message and add it to the message box
     * @param  {string} text text of the message
     * @return {ErrorMessage} the newly constructed {@link ErrorMessage}
     */
    newErrorMessage(text) {
        return this.newMessage(text, ErrorMessage);
    }

    /**
     * create a new warning message and add it to the message box
     * @param  {string} text text of the message
     * @return {WarningMessage} the newly constructed {@link WarningMessage}
     */
    newWarningMessage(text) {
        return this.newMessage(text, WarningMessage);
    }
}
