/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { ParseError } from '../parse_util';
import * as html from './ast';
// http://cldr.unicode.org/index/cldr-spec/plural-rules
var PLURAL_CASES = ['zero', 'one', 'two', 'few', 'many', 'other'];
/**
 * Expands special forms into elements.
 *
 * For example,
 *
 * ```
 * { messages.length, plural,
 *   =0 {zero}
 *   =1 {one}
 *   other {more than one}
 * }
 * ```
 *
 * will be expanded into
 *
 * ```
 * <ng-container [ngPlural]="messages.length">
 *   <ng-template ngPluralCase="=0">zero</ng-template>
 *   <ng-template ngPluralCase="=1">one</ng-template>
 *   <ng-template ngPluralCase="other">more than one</ng-template>
 * </ng-container>
 * ```
 */
export function expandNodes(nodes) {
    var expander = new _Expander();
    return new ExpansionResult(html.visitAll(expander, nodes), expander.isExpanded, expander.errors);
}
var ExpansionResult = /** @class */ (function () {
    function ExpansionResult(nodes, expanded, errors) {
        this.nodes = nodes;
        this.expanded = expanded;
        this.errors = errors;
    }
    return ExpansionResult;
}());
export { ExpansionResult };
var ExpansionError = /** @class */ (function (_super) {
    tslib_1.__extends(ExpansionError, _super);
    function ExpansionError(span, errorMsg) {
        return _super.call(this, span, errorMsg) || this;
    }
    return ExpansionError;
}(ParseError));
export { ExpansionError };
/**
 * Expand expansion forms (plural, select) to directives
 *
 * @internal
 */
var _Expander = /** @class */ (function () {
    function _Expander() {
        this.isExpanded = false;
        this.errors = [];
    }
    _Expander.prototype.visitElement = function (element, context) {
        return new html.Element(element.name, element.attrs, html.visitAll(this, element.children), element.sourceSpan, element.startSourceSpan, element.endSourceSpan);
    };
    _Expander.prototype.visitAttribute = function (attribute, context) { return attribute; };
    _Expander.prototype.visitText = function (text, context) { return text; };
    _Expander.prototype.visitComment = function (comment, context) { return comment; };
    _Expander.prototype.visitExpansion = function (icu, context) {
        this.isExpanded = true;
        return icu.type == 'plural' ? _expandPluralForm(icu, this.errors) :
            _expandDefaultForm(icu, this.errors);
    };
    _Expander.prototype.visitExpansionCase = function (icuCase, context) {
        throw new Error('Should not be reached');
    };
    return _Expander;
}());
// Plural forms are expanded to `NgPlural` and `NgPluralCase`s
function _expandPluralForm(ast, errors) {
    var children = ast.cases.map(function (c) {
        if (PLURAL_CASES.indexOf(c.value) == -1 && !c.value.match(/^=\d+$/)) {
            errors.push(new ExpansionError(c.valueSourceSpan, "Plural cases should be \"=<number>\" or one of " + PLURAL_CASES.join(", ")));
        }
        var expansionResult = expandNodes(c.expression);
        errors.push.apply(errors, tslib_1.__spread(expansionResult.errors));
        return new html.Element("ng-template", [new html.Attribute('ngPluralCase', "" + c.value, c.valueSourceSpan)], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    var switchAttr = new html.Attribute('[ngPlural]', ast.switchValue, ast.switchValueSourceSpan);
    return new html.Element('ng-container', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
// ICU messages (excluding plural form) are expanded to `NgSwitch`  and `NgSwitchCase`s
function _expandDefaultForm(ast, errors) {
    var children = ast.cases.map(function (c) {
        var expansionResult = expandNodes(c.expression);
        errors.push.apply(errors, tslib_1.__spread(expansionResult.errors));
        if (c.value === 'other') {
            // other is the default case when no values match
            return new html.Element("ng-template", [new html.Attribute('ngSwitchDefault', '', c.valueSourceSpan)], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
        }
        return new html.Element("ng-template", [new html.Attribute('ngSwitchCase', "" + c.value, c.valueSourceSpan)], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    var switchAttr = new html.Attribute('[ngSwitch]', ast.switchValue, ast.switchValueSourceSpan);
    return new html.Element('ng-container', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWN1X2FzdF9leHBhbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9tbF9wYXJzZXIvaWN1X2FzdF9leHBhbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBa0IsTUFBTSxlQUFlLENBQUM7QUFFMUQsT0FBTyxLQUFLLElBQUksTUFBTSxPQUFPLENBQUM7QUFFOUIsdURBQXVEO0FBQ3ZELElBQU0sWUFBWSxHQUFhLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUU5RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sc0JBQXNCLEtBQWtCO0lBQzVDLElBQU0sUUFBUSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7SUFDakMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRyxDQUFDO0FBRUQ7SUFDRSx5QkFBbUIsS0FBa0IsRUFBUyxRQUFpQixFQUFTLE1BQW9CO1FBQXpFLFVBQUssR0FBTCxLQUFLLENBQWE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBYztJQUFHLENBQUM7SUFDbEcsc0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQzs7QUFFRDtJQUFvQywwQ0FBVTtJQUM1Qyx3QkFBWSxJQUFxQixFQUFFLFFBQWdCO2VBQUksa0JBQU0sSUFBSSxFQUFFLFFBQVEsQ0FBQztJQUFFLENBQUM7SUFDakYscUJBQUM7QUFBRCxDQUFDLEFBRkQsQ0FBb0MsVUFBVSxHQUU3Qzs7QUFFRDs7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SUFDaEcsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQ25CLGNBQWMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzlGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7UGFyc2VFcnJvciwgUGFyc2VTb3VyY2VTcGFufSBmcm9tICcuLi9wYXJzZV91dGlsJztcblxuaW1wb3J0ICogYXMgaHRtbCBmcm9tICcuL2FzdCc7XG5cbi8vIGh0dHA6Ly9jbGRyLnVuaWNvZGUub3JnL2luZGV4L2NsZHItc3BlYy9wbHVyYWwtcnVsZXNcbmNvbnN0IFBMVVJBTF9DQVNFUzogc3RyaW5nW10gPSBbJ3plcm8nLCAnb25lJywgJ3R3bycsICdmZXcnLCAnbWFueScsICdvdGhlciddO1xuXG4vKipcbiAqIEV4cGFuZHMgc3BlY2lhbCBmb3JtcyBpbnRvIGVsZW1lbnRzLlxuICpcbiAqIEZvciBleGFtcGxlLFxuICpcbiAqIGBgYFxuICogeyBtZXNzYWdlcy5sZW5ndGgsIHBsdXJhbCxcbiAqICAgPTAge3plcm99XG4gKiAgID0xIHtvbmV9XG4gKiAgIG90aGVyIHttb3JlIHRoYW4gb25lfVxuICogfVxuICogYGBgXG4gKlxuICogd2lsbCBiZSBleHBhbmRlZCBpbnRvXG4gKlxuICogYGBgXG4gKiA8bmctY29udGFpbmVyIFtuZ1BsdXJhbF09XCJtZXNzYWdlcy5sZW5ndGhcIj5cbiAqICAgPG5nLXRlbXBsYXRlIG5nUGx1cmFsQ2FzZT1cIj0wXCI+emVybzwvbmctdGVtcGxhdGU+XG4gKiAgIDxuZy10ZW1wbGF0ZSBuZ1BsdXJhbENhc2U9XCI9MVwiPm9uZTwvbmctdGVtcGxhdGU+XG4gKiAgIDxuZy10ZW1wbGF0ZSBuZ1BsdXJhbENhc2U9XCJvdGhlclwiPm1vcmUgdGhhbiBvbmU8L25nLXRlbXBsYXRlPlxuICogPC9uZy1jb250YWluZXI+XG4gKiBgYGBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cGFuZE5vZGVzKG5vZGVzOiBodG1sLk5vZGVbXSk6IEV4cGFuc2lvblJlc3VsdCB7XG4gIGNvbnN0IGV4cGFuZGVyID0gbmV3IF9FeHBhbmRlcigpO1xuICByZXR1cm4gbmV3IEV4cGFuc2lvblJlc3VsdChodG1sLnZpc2l0QWxsKGV4cGFuZGVyLCBub2RlcyksIGV4cGFuZGVyLmlzRXhwYW5kZWQsIGV4cGFuZGVyLmVycm9ycyk7XG59XG5cbmV4cG9ydCBjbGFzcyBFeHBhbnNpb25SZXN1bHQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbm9kZXM6IGh0bWwuTm9kZVtdLCBwdWJsaWMgZXhwYW5kZWQ6IGJvb2xlYW4sIHB1YmxpYyBlcnJvcnM6IFBhcnNlRXJyb3JbXSkge31cbn1cblxuZXhwb3J0IGNsYXNzIEV4cGFuc2lvbkVycm9yIGV4dGVuZHMgUGFyc2VFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHNwYW46IFBhcnNlU291cmNlU3BhbiwgZXJyb3JNc2c6IHN0cmluZykgeyBzdXBlcihzcGFuLCBlcnJvck1zZyk7IH1cbn1cblxuLyoqXG4gKiBFeHBhbmQgZXhwYW5zaW9uIGZvcm1zIChwbHVyYWwsIHNlbGVjdCkgdG8gZGlyZWN0aXZlc1xuICpcbiAqIEBpbnRlcm5hbFxuICovXG5jbGFzcyBfRXhwYW5kZXIgaW1wbGVtZW50cyBodG1sLlZpc2l0b3Ige1xuICBpc0V4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGVycm9yczogUGFyc2VFcnJvcltdID0gW107XG5cbiAgdmlzaXRFbGVtZW50KGVsZW1lbnQ6IGh0bWwuRWxlbWVudCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICByZXR1cm4gbmV3IGh0bWwuRWxlbWVudChcbiAgICAgICAgZWxlbWVudC5uYW1lLCBlbGVtZW50LmF0dHJzLCBodG1sLnZpc2l0QWxsKHRoaXMsIGVsZW1lbnQuY2hpbGRyZW4pLCBlbGVtZW50LnNvdXJjZVNwYW4sXG4gICAgICAgIGVsZW1lbnQuc3RhcnRTb3VyY2VTcGFuLCBlbGVtZW50LmVuZFNvdXJjZVNwYW4pO1xuICB9XG5cbiAgdmlzaXRBdHRyaWJ1dGUoYXR0cmlidXRlOiBodG1sLkF0dHJpYnV0ZSwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGF0dHJpYnV0ZTsgfVxuXG4gIHZpc2l0VGV4dCh0ZXh0OiBodG1sLlRleHQsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiB0ZXh0OyB9XG5cbiAgdmlzaXRDb21tZW50KGNvbW1lbnQ6IGh0bWwuQ29tbWVudCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIGNvbW1lbnQ7IH1cblxuICB2aXNpdEV4cGFuc2lvbihpY3U6IGh0bWwuRXhwYW5zaW9uLCBjb250ZXh0OiBhbnkpOiBhbnkge1xuICAgIHRoaXMuaXNFeHBhbmRlZCA9IHRydWU7XG4gICAgcmV0dXJuIGljdS50eXBlID09ICdwbHVyYWwnID8gX2V4cGFuZFBsdXJhbEZvcm0oaWN1LCB0aGlzLmVycm9ycykgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9leHBhbmREZWZhdWx0Rm9ybShpY3UsIHRoaXMuZXJyb3JzKTtcbiAgfVxuXG4gIHZpc2l0RXhwYW5zaW9uQ2FzZShpY3VDYXNlOiBodG1sLkV4cGFuc2lvbkNhc2UsIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTaG91bGQgbm90IGJlIHJlYWNoZWQnKTtcbiAgfVxufVxuXG4vLyBQbHVyYWwgZm9ybXMgYXJlIGV4cGFuZGVkIHRvIGBOZ1BsdXJhbGAgYW5kIGBOZ1BsdXJhbENhc2Vgc1xuZnVuY3Rpb24gX2V4cGFuZFBsdXJhbEZvcm0oYXN0OiBodG1sLkV4cGFuc2lvbiwgZXJyb3JzOiBQYXJzZUVycm9yW10pOiBodG1sLkVsZW1lbnQge1xuICBjb25zdCBjaGlsZHJlbiA9IGFzdC5jYXNlcy5tYXAoYyA9PiB7XG4gICAgaWYgKFBMVVJBTF9DQVNFUy5pbmRleE9mKGMudmFsdWUpID09IC0xICYmICFjLnZhbHVlLm1hdGNoKC9ePVxcZCskLykpIHtcbiAgICAgIGVycm9ycy5wdXNoKG5ldyBFeHBhbnNpb25FcnJvcihcbiAgICAgICAgICBjLnZhbHVlU291cmNlU3BhbixcbiAgICAgICAgICBgUGx1cmFsIGNhc2VzIHNob3VsZCBiZSBcIj08bnVtYmVyPlwiIG9yIG9uZSBvZiAke1BMVVJBTF9DQVNFUy5qb2luKFwiLCBcIil9YCkpO1xuICAgIH1cblxuICAgIGNvbnN0IGV4cGFuc2lvblJlc3VsdCA9IGV4cGFuZE5vZGVzKGMuZXhwcmVzc2lvbik7XG4gICAgZXJyb3JzLnB1c2goLi4uZXhwYW5zaW9uUmVzdWx0LmVycm9ycyk7XG5cbiAgICByZXR1cm4gbmV3IGh0bWwuRWxlbWVudChcbiAgICAgICAgYG5nLXRlbXBsYXRlYCwgW25ldyBodG1sLkF0dHJpYnV0ZSgnbmdQbHVyYWxDYXNlJywgYCR7Yy52YWx1ZX1gLCBjLnZhbHVlU291cmNlU3BhbildLFxuICAgICAgICBleHBhbnNpb25SZXN1bHQubm9kZXMsIGMuc291cmNlU3BhbiwgYy5zb3VyY2VTcGFuLCBjLnNvdXJjZVNwYW4pO1xuICB9KTtcbiAgY29uc3Qgc3dpdGNoQXR0ciA9IG5ldyBodG1sLkF0dHJpYnV0ZSgnW25nUGx1cmFsXScsIGFzdC5zd2l0Y2hWYWx1ZSwgYXN0LnN3aXRjaFZhbHVlU291cmNlU3Bhbik7XG4gIHJldHVybiBuZXcgaHRtbC5FbGVtZW50KFxuICAgICAgJ25nLWNvbnRhaW5lcicsIFtzd2l0Y2hBdHRyXSwgY2hpbGRyZW4sIGFzdC5zb3VyY2VTcGFuLCBhc3Quc291cmNlU3BhbiwgYXN0LnNvdXJjZVNwYW4pO1xufVxuXG4vLyBJQ1UgbWVzc2FnZXMgKGV4Y2x1ZGluZyBwbHVyYWwgZm9ybSkgYXJlIGV4cGFuZGVkIHRvIGBOZ1N3aXRjaGAgIGFuZCBgTmdTd2l0Y2hDYXNlYHNcbmZ1bmN0aW9uIF9leHBhbmREZWZhdWx0Rm9ybShhc3Q6IGh0bWwuRXhwYW5zaW9uLCBlcnJvcnM6IFBhcnNlRXJyb3JbXSk6IGh0bWwuRWxlbWVudCB7XG4gIGNvbnN0IGNoaWxkcmVuID0gYXN0LmNhc2VzLm1hcChjID0+IHtcbiAgICBjb25zdCBleHBhbnNpb25SZXN1bHQgPSBleHBhbmROb2RlcyhjLmV4cHJlc3Npb24pO1xuICAgIGVycm9ycy5wdXNoKC4uLmV4cGFuc2lvblJlc3VsdC5lcnJvcnMpO1xuXG4gICAgaWYgKGMudmFsdWUgPT09ICdvdGhlcicpIHtcbiAgICAgIC8vIG90aGVyIGlzIHRoZSBkZWZhdWx0IGNhc2Ugd2hlbiBubyB2YWx1ZXMgbWF0Y2hcbiAgICAgIHJldHVybiBuZXcgaHRtbC5FbGVtZW50KFxuICAgICAgICAgIGBuZy10ZW1wbGF0ZWAsIFtuZXcgaHRtbC5BdHRyaWJ1dGUoJ25nU3dpdGNoRGVmYXVsdCcsICcnLCBjLnZhbHVlU291cmNlU3BhbildLFxuICAgICAgICAgIGV4cGFuc2lvblJlc3VsdC5ub2RlcywgYy5zb3VyY2VTcGFuLCBjLnNvdXJjZVNwYW4sIGMuc291cmNlU3Bhbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBodG1sLkVsZW1lbnQoXG4gICAgICAgIGBuZy10ZW1wbGF0ZWAsIFtuZXcgaHRtbC5BdHRyaWJ1dGUoJ25nU3dpdGNoQ2FzZScsIGAke2MudmFsdWV9YCwgYy52YWx1ZVNvdXJjZVNwYW4pXSxcbiAgICAgICAgZXhwYW5zaW9uUmVzdWx0Lm5vZGVzLCBjLnNvdXJjZVNwYW4sIGMuc291cmNlU3BhbiwgYy5zb3VyY2VTcGFuKTtcbiAgfSk7XG4gIGNvbnN0IHN3aXRjaEF0dHIgPSBuZXcgaHRtbC5BdHRyaWJ1dGUoJ1tuZ1N3aXRjaF0nLCBhc3Quc3dpdGNoVmFsdWUsIGFzdC5zd2l0Y2hWYWx1ZVNvdXJjZVNwYW4pO1xuICByZXR1cm4gbmV3IGh0bWwuRWxlbWVudChcbiAgICAgICduZy1jb250YWluZXInLCBbc3dpdGNoQXR0cl0sIGNoaWxkcmVuLCBhc3Quc291cmNlU3BhbiwgYXN0LnNvdXJjZVNwYW4sIGFzdC5zb3VyY2VTcGFuKTtcbn1cbiJdfQ==