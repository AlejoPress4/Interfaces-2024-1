import Popup from './popup.js';

export default class Alert extends Popup {
    constructor({ modal, image, style, title, content, button }) {
        super({
            modal, image, style, title, content, buttons: [{ text: button.caption, callback: button.action }]
        });
        this.show()
    }
}