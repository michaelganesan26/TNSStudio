/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Parser } from './parser';
import { getXmlTagDefinition } from './xml_tags';
export { ParseTreeResult, TreeError } from './parser';
var XmlParser = /** @class */ (function (_super) {
    tslib_1.__extends(XmlParser, _super);
    function XmlParser() {
        return _super.call(this, getXmlTagDefinition) || this;
    }
    XmlParser.prototype.parse = function (source, url, parseExpansionForms) {
        if (parseExpansionForms === void 0) { parseExpansionForms = false; }
        return _super.prototype.parse.call(this, source, url, parseExpansionForms);
    };
    return XmlParser;
}(Parser));
export { XmlParser };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1sX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9tbF9wYXJzZXIveG1sX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFrQixNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDakQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sWUFBWSxDQUFDO0FBRS9DLE9BQU8sRUFBQyxlQUFlLEVBQUUsU0FBUyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBRXBEO0lBQStCLHFDQUFNO0lBQ25DO2VBQWdCLGtCQUFNLG1CQUFtQixDQUFDO0lBQUUsQ0FBQztJQUU3Qyx5QkFBSyxHQUFMLFVBQU0sTUFBYyxFQUFFLEdBQVcsRUFBRSxtQkFBb0M7UUFBcEMsb0NBQUEsRUFBQSwyQkFBb0M7UUFDckUsT0FBTyxpQkFBTSxLQUFLLFlBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUFORCxDQUErQixNQUFNLEdBTXBDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1BhcnNlVHJlZVJlc3VsdCwgUGFyc2VyfSBmcm9tICcuL3BhcnNlcic7XG5pbXBvcnQge2dldFhtbFRhZ0RlZmluaXRpb259IGZyb20gJy4veG1sX3RhZ3MnO1xuXG5leHBvcnQge1BhcnNlVHJlZVJlc3VsdCwgVHJlZUVycm9yfSBmcm9tICcuL3BhcnNlcic7XG5cbmV4cG9ydCBjbGFzcyBYbWxQYXJzZXIgZXh0ZW5kcyBQYXJzZXIge1xuICBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoZ2V0WG1sVGFnRGVmaW5pdGlvbik7IH1cblxuICBwYXJzZShzb3VyY2U6IHN0cmluZywgdXJsOiBzdHJpbmcsIHBhcnNlRXhwYW5zaW9uRm9ybXM6IGJvb2xlYW4gPSBmYWxzZSk6IFBhcnNlVHJlZVJlc3VsdCB7XG4gICAgcmV0dXJuIHN1cGVyLnBhcnNlKHNvdXJjZSwgdXJsLCBwYXJzZUV4cGFuc2lvbkZvcm1zKTtcbiAgfVxufVxuIl19