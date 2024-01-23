var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HttpClient_url;
export class HttpClient {
    constructor(url) {
        _HttpClient_url.set(this, void 0);
        __classPrivateFieldSet(this, _HttpClient_url, url, "f");
    }
    request(method, id = '', data = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: data ? JSON.stringify(data) : null,
            };
            try {
                const response = yield fetch(`${__classPrivateFieldGet(this, _HttpClient_url, "f")}/${id}`, options);
                if (!response.ok)
                    throw new Error(`${response.status} ${response.statusText}`);
                return yield response.json();
            }
            catch (error) {
                throw new Error(`An error occurred in the ${method} method: ${error}`);
            }
        });
    }
    get(id = '') {
        return this.request('GET', id);
    }
    add(data) {
        return this.request('POST', '', data);
    }
    update(id, data) {
        return this.request('PUT', id, data);
    }
    delete(id) {
        return this.request('DELETE', id);
    }
}
_HttpClient_url = new WeakMap();
