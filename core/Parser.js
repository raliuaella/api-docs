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
            // construct url (append controller path with method path)
            // <string>baseOptions?.BaseUrl,
            let fullUrl = (0, String_Helper_1.JoinWith)('/', v.ControllerPath, methodNameUrl).replace(/\'\'+/g, '').replace(/[\']+/g, '').replace('(', '').replace(')', '');
            const query = v.KeyDataType.toLowerCase() == 'object' ? v.KeyValue["query"] : null;
            const params = v.KeyDataType.toLowerCase() == 'object' ? v.KeyValue["params"] : null;
            const paramsIsNull = (0, String_Helper_1.StringIsNullOrEmpty)(params);
            const queryIsNull = (0, String_Helper_1.StringIsNullOrEmpty)(query);
            if (!paramsIsNull && !queryIsNull)
                fullUrl += ((0, String_Helper_1.parseParams)(params) + (0, String_Helper_1.parseQuery)(query));
            if (!paramsIsNull && queryIsNull)
                fullUrl += (0, String_Helper_1.parseParams)(params);
            if (!queryIsNull && paramsIsNull)
                fullUrl += (0, String_Helper_1.parseQuery)(query);
            console.log("full url ", fullUrl);
            v.FullUrl = fullUrl;
            const header = (v.Headers ?
                v.Headers.replace('{', '').replace('}', '').replace(/[\']+?/, '') : null);
            console.log("headers ", header);
            //     const headers: HeaderDefinition[] = Header.parse(header)
            //     const method = v.KeyDataType.toLowerCase() == 'object' ? v.KeyValue["httpMethod"]:''
            //     const rawBody = v.Headers ? 
            //                         (v.Headers as string).replace(/[\']+?/, ''): {}
            //    const request = {
            //        header: headers,
            //        url: fullUrl,
            //        method,
            //        body: {
            //            mode: 'raw',
            //            raw: JSON.stringify(rawBody)
            //        },
            //        query:{},
            //    }
            //    const item = new Item({
            //       name: v.RequestName as string,
            //       request,
            //       "description": <string>v.RequestName
            //    })
        });
    });
    return {};
};
exports.Parser = Parser;
