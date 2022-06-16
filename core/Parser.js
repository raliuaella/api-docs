"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
const postman_collection_1 = require("postman-collection");
const String_Helper_1 = require("./Helper/String.Helper");
const Parser = (inputs, baseOptions) => {
    const collection = new postman_collection_1.Collection({
        name: baseOptions === null || baseOptions === void 0 ? void 0 : baseOptions.AppTitle,
        info: {
            version: baseOptions === null || baseOptions === void 0 ? void 0 : baseOptions.version,
            "name": baseOptions === null || baseOptions === void 0 ? void 0 : baseOptions.AppTitle
        }
    });
    inputs.forEach((value) => {
        const currentControllers = inputs.filter(x => x.ControllerPath.toLowerCase() == value.ControllerPath.toLowerCase());
        currentControllers.forEach((v) => {
            const methodNameUrl = typeof (v.KeyValue) == "object" ? v.KeyValue["path"] : v.KeyValue;
            const fullUrl = (0, String_Helper_1.JoinWith)('/', baseOptions === null || baseOptions === void 0 ? void 0 : baseOptions.BaseUrl, v.ControllerPath, methodNameUrl).replace(/[\']+/, '').replace(/[\']+/, '');
            console.log("full url ", v);
            const request = new postman_collection_1.Item({
            // name
            });
        });
    });
    return {};
};
exports.Parser = Parser;
