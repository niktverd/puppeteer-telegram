"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.openPuppeteer = void 0;
const prepare_1 = require("./helpers/prepare");
function openPuppeteer() {
    return __awaiter(this, void 0, void 0, function* () {
        const { page } = yield (0, prepare_1.prepare)({ headless: false });
        yield page.goto('https://web.telegram.org/k/');
    });
}
exports.openPuppeteer = openPuppeteer;
function sendMessage(chat, message) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(message);
        const messages = message.split(',');
        const { page, browser } = yield (0, prepare_1.prepare)({ headless: false });
        yield page.goto(`https://web.telegram.org/k/#@${chat}`, { waitUntil: 'networkidle2' });
        yield page.waitForTimeout(5000);
        const messageField = yield page.$('div.input-message-container');
        if (!messageField) {
            return false;
        }
        yield messageField.click({ clickCount: 3 });
        for (const m of messages) {
            yield messageField.type(m.trim(), { delay: 60 });
            const sendBtn = yield page.$('div.btn-send-container');
            if (!sendBtn) {
                return false;
            }
            yield sendBtn.click({ clickCount: 1 });
            yield page.waitForTimeout(3000);
        }
        yield browser.close();
        return true;
    });
}
exports.sendMessage = sendMessage;
