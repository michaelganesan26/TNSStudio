/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NumberFormatStyle } from '../../i18n/locale_data_api';
export class NumberFormatter {
    /**
     * @param {?} num
     * @param {?} locale
     * @param {?} style
     * @param {?=} opts
     * @return {?}
     */
    static format(num, locale, style, opts = {}) {
        const { minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, currency, currencyAsSymbol = false } = opts;
        /** @type {?} */
        const options = {
            minimumIntegerDigits,
            minimumFractionDigits,
            maximumFractionDigits,
            style: NumberFormatStyle[style].toLowerCase()
        };
        if (style == NumberFormatStyle.Currency) {
            options.currency = typeof currency == 'string' ? currency : undefined;
            options.currencyDisplay = currencyAsSymbol ? 'symbol' : 'code';
        }
        return new Intl.NumberFormat(locale, options).format(num);
    }
}
/** @typedef {?} */
var DateFormatterFn;
/** @type {?} */
const DATE_FORMATS_SPLIT = /((?:[^yMLdHhmsazZEwGjJ']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|J+|j+|m+|s+|a|z|Z|G+|w+))(.*)/;
/** @type {?} */
const PATTERN_ALIASES = {
    // Keys are quoted so they do not get renamed during closure compilation.
    'yMMMdjms': datePartGetterFactory(combine([
        digitCondition('year', 1),
        nameCondition('month', 3),
        digitCondition('day', 1),
        digitCondition('hour', 1),
        digitCondition('minute', 1),
        digitCondition('second', 1),
    ])),
    'yMdjm': datePartGetterFactory(combine([
        digitCondition('year', 1), digitCondition('month', 1), digitCondition('day', 1),
        digitCondition('hour', 1), digitCondition('minute', 1)
    ])),
    'yMMMMEEEEd': datePartGetterFactory(combine([
        digitCondition('year', 1), nameCondition('month', 4), nameCondition('weekday', 4),
        digitCondition('day', 1)
    ])),
    'yMMMMd': datePartGetterFactory(combine([digitCondition('year', 1), nameCondition('month', 4), digitCondition('day', 1)])),
    'yMMMd': datePartGetterFactory(combine([digitCondition('year', 1), nameCondition('month', 3), digitCondition('day', 1)])),
    'yMd': datePartGetterFactory(combine([digitCondition('year', 1), digitCondition('month', 1), digitCondition('day', 1)])),
    'jms': datePartGetterFactory(combine([digitCondition('hour', 1), digitCondition('second', 1), digitCondition('minute', 1)])),
    'jm': datePartGetterFactory(combine([digitCondition('hour', 1), digitCondition('minute', 1)]))
};
/** @type {?} */
const DATE_FORMATS = {
    // Keys are quoted so they do not get renamed.
    'yyyy': datePartGetterFactory(digitCondition('year', 4)),
    'yy': datePartGetterFactory(digitCondition('year', 2)),
    'y': datePartGetterFactory(digitCondition('year', 1)),
    'MMMM': datePartGetterFactory(nameCondition('month', 4)),
    'MMM': datePartGetterFactory(nameCondition('month', 3)),
    'MM': datePartGetterFactory(digitCondition('month', 2)),
    'M': datePartGetterFactory(digitCondition('month', 1)),
    'LLLL': datePartGetterFactory(nameCondition('month', 4)),
    'L': datePartGetterFactory(nameCondition('month', 1)),
    'dd': datePartGetterFactory(digitCondition('day', 2)),
    'd': datePartGetterFactory(digitCondition('day', 1)),
    'HH': digitModifier(hourExtractor(datePartGetterFactory(hour12Modify(digitCondition('hour', 2), false)))),
    'H': hourExtractor(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), false))),
    'hh': digitModifier(hourExtractor(datePartGetterFactory(hour12Modify(digitCondition('hour', 2), true)))),
    'h': hourExtractor(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), true))),
    'jj': datePartGetterFactory(digitCondition('hour', 2)),
    'j': datePartGetterFactory(digitCondition('hour', 1)),
    'mm': digitModifier(datePartGetterFactory(digitCondition('minute', 2))),
    'm': datePartGetterFactory(digitCondition('minute', 1)),
    'ss': digitModifier(datePartGetterFactory(digitCondition('second', 2))),
    's': datePartGetterFactory(digitCondition('second', 1)),
    // while ISO 8601 requires fractions to be prefixed with `.` or `,`
    // we can be just safely rely on using `sss` since we currently don't support single or two digit
    // fractions
    'sss': datePartGetterFactory(digitCondition('second', 3)),
    'EEEE': datePartGetterFactory(nameCondition('weekday', 4)),
    'EEE': datePartGetterFactory(nameCondition('weekday', 3)),
    'EE': datePartGetterFactory(nameCondition('weekday', 2)),
    'E': datePartGetterFactory(nameCondition('weekday', 1)),
    'a': hourClockExtractor(datePartGetterFactory(hour12Modify(digitCondition('hour', 1), true))),
    'Z': timeZoneGetter('short'),
    'z': timeZoneGetter('long'),
    'ww': datePartGetterFactory({}),
    // Week of year, padded (00-53). Week 01 is the week with the
    // first Thursday of the year. not support ?
    'w': datePartGetterFactory({}),
    // Week of year (0-53). Week 1 is the week with the first Thursday
    // of the year not support ?
    'G': datePartGetterFactory(nameCondition('era', 1)),
    'GG': datePartGetterFactory(nameCondition('era', 2)),
    'GGG': datePartGetterFactory(nameCondition('era', 3)),
    'GGGG': datePartGetterFactory(nameCondition('era', 4))
};
/**
 * @param {?} inner
 * @return {?}
 */
function digitModifier(inner) {
    return function (date, locale) {
        /** @type {?} */
        const result = inner(date, locale);
        return result.length == 1 ? '0' + result : result;
    };
}
/**
 * @param {?} inner
 * @return {?}
 */
function hourClockExtractor(inner) {
    return function (date, locale) { return inner(date, locale).split(' ')[1]; };
}
/**
 * @param {?} inner
 * @return {?}
 */
function hourExtractor(inner) {
    return function (date, locale) { return inner(date, locale).split(' ')[0]; };
}
/**
 * @param {?} date
 * @param {?} locale
 * @param {?} options
 * @return {?}
 */
function intlDateFormat(date, locale, options) {
    return new Intl.DateTimeFormat(locale, options).format(date).replace(/[\u200e\u200f]/g, '');
}
/**
 * @param {?} timezone
 * @return {?}
 */
function timeZoneGetter(timezone) {
    /** @type {?} */
    const options = { hour: '2-digit', hour12: false, timeZoneName: timezone };
    return function (date, locale) {
        /** @type {?} */
        const result = intlDateFormat(date, locale, options);
        // Then extract first 3 letters that related to hours
        return result ? result.substring(3) : '';
    };
}
/**
 * @param {?} options
 * @param {?} value
 * @return {?}
 */
function hour12Modify(options, value) {
    options.hour12 = value;
    return options;
}
/**
 * @param {?} prop
 * @param {?} len
 * @return {?}
 */
function digitCondition(prop, len) {
    /** @type {?} */
    const result = {};
    result[prop] = len === 2 ? '2-digit' : 'numeric';
    return result;
}
/**
 * @param {?} prop
 * @param {?} len
 * @return {?}
 */
function nameCondition(prop, len) {
    /** @type {?} */
    const result = {};
    if (len < 4) {
        result[prop] = len > 1 ? 'short' : 'narrow';
    }
    else {
        result[prop] = 'long';
    }
    return result;
}
/**
 * @param {?} options
 * @return {?}
 */
function combine(options) {
    return options.reduce((merged, opt) => (Object.assign({}, merged, opt)), {});
}
/**
 * @param {?} ret
 * @return {?}
 */
function datePartGetterFactory(ret) {
    return (date, locale) => intlDateFormat(date, locale, ret);
}
/** @type {?} */
const DATE_FORMATTER_CACHE = new Map();
/**
 * @param {?} format
 * @param {?} date
 * @param {?} locale
 * @return {?}
 */
function dateFormatter(format, date, locale) {
    /** @type {?} */
    const fn = PATTERN_ALIASES[format];
    if (fn)
        return fn(date, locale);
    /** @type {?} */
    const cacheKey = format;
    /** @type {?} */
    let parts = DATE_FORMATTER_CACHE.get(cacheKey);
    if (!parts) {
        parts = [];
        /** @type {?} */
        let match;
        DATE_FORMATS_SPLIT.exec(format);
        /** @type {?} */
        let _format = format;
        while (_format) {
            match = DATE_FORMATS_SPLIT.exec(_format);
            if (match) {
                parts = parts.concat(match.slice(1));
                _format = /** @type {?} */ ((parts.pop()));
            }
            else {
                parts.push(_format);
                _format = null;
            }
        }
        DATE_FORMATTER_CACHE.set(cacheKey, parts);
    }
    return parts.reduce((text, part) => {
        /** @type {?} */
        const fn = DATE_FORMATS[part];
        return text + (fn ? fn(date, locale) : partToTime(part));
    }, '');
}
/**
 * @param {?} part
 * @return {?}
 */
function partToTime(part) {
    return part === '\'\'' ? '\'' : part.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
}
export class DateFormatter {
    /**
     * @param {?} date
     * @param {?} locale
     * @param {?} pattern
     * @return {?}
     */
    static format(date, locale, pattern) {
        return dateFormatter(pattern, date, locale);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50bC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbW1vbi9zcmMvcGlwZXMvZGVwcmVjYXRlZC9pbnRsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFPQSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RCxNQUFNOzs7Ozs7OztJQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBVyxFQUFFLE1BQWMsRUFBRSxLQUF3QixFQUFFLE9BTWpFLEVBQUU7UUFDSixNQUFNLEVBQUMsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUM1RSxnQkFBZ0IsR0FBRyxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUM7O1FBQ3hDLE1BQU0sT0FBTyxHQUE2QjtZQUN4QyxvQkFBb0I7WUFDcEIscUJBQXFCO1lBQ3JCLHFCQUFxQjtZQUNyQixLQUFLLEVBQUUsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFO1NBQzlDLENBQUM7UUFFRixJQUFJLEtBQUssSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7WUFDdkMsT0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ3RFLE9BQU8sQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQ2hFO1FBQ0QsT0FBTyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMzRDtDQUNGOzs7O0FBSUQsTUFBTSxrQkFBa0IsR0FDcEIscUdBQXFHLENBQUM7O0FBRTFHLE1BQU0sZUFBZSxHQUF3Qzs7SUFFM0QsVUFBVSxFQUFF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QWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckQsSUFBSSxFQUFFLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsR0FBRyxFQUFFLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkQsSUFBSSxFQUFFLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsR0FBRyxFQUFFLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7SUFJdkQsS0FBSyxFQUFFLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsTUFBTSxFQUFFLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUQsS0FBSyxFQUFFLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsSUFBSSxFQUFFLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEQsR0FBRyxFQUFFLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkQsR0FBRyxFQUFFLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0YsR0FBRyxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUM7SUFDNUIsR0FBRyxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUM7SUFDM0IsSUFBSSxFQUFFLHFCQUFxQixDQUFDLEVBQUUsQ0FBQzs7O0lBRS9CLEdBQUcsRUFDQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUM7OztJQUU3QixHQUFHLEVBQUUscUJBQXFCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRCxJQUFJLEVBQUUscUJBQXFCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRCxLQUFLLEVBQUUscUJBQXFCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRCxNQUFNLEVBQUUscUJBQXFCLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztDQUN2RCxDQUFDOzs7OztBQUdGLHVCQUF1QixLQUFzQjtJQUMzQyxPQUFPLFVBQVMsSUFBVSxFQUFFLE1BQWM7O1FBQ3hDLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbkMsT0FBTyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0tBQ25ELENBQUM7Q0FDSDs7Ozs7QUFFRCw0QkFBNEIsS0FBc0I7SUFDaEQsT0FBTyxVQUFTLElBQVUsRUFBRSxNQUFjLElBQVksT0FBTyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Q0FDbkc7Ozs7O0FBRUQsdUJBQXVCLEtBQXNCO0lBQzNDLE9BQU8sVUFBUyxJQUFVLEVBQUUsTUFBYyxJQUFZLE9BQU8sS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0NBQ25HOzs7Ozs7O0FBRUQsd0JBQXdCLElBQVUsRUFBRSxNQUFjLEVBQUUsT0FBbUM7SUFDckYsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7Q0FDN0Y7Ozs7O0FBRUQsd0JBQXdCLFFBQWdCOztJQUV0QyxNQUFNLE9BQU8sR0FBRyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFDLENBQUM7SUFDekUsT0FBTyxVQUFTLElBQVUsRUFBRSxNQUFjOztRQUN4QyxNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzs7UUFFckQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUMxQyxDQUFDO0NBQ0g7Ozs7OztBQUVELHNCQUNJLE9BQW1DLEVBQUUsS0FBYztJQUNyRCxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN2QixPQUFPLE9BQU8sQ0FBQztDQUNoQjs7Ozs7O0FBRUQsd0JBQXdCLElBQVksRUFBRSxHQUFXOztJQUMvQyxNQUFNLE1BQU0sR0FBMEIsRUFBRSxDQUFDO0lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNqRCxPQUFPLE1BQU0sQ0FBQztDQUNmOzs7Ozs7QUFFRCx1QkFBdUIsSUFBWSxFQUFFLEdBQVc7O0lBQzlDLE1BQU0sTUFBTSxHQUEwQixFQUFFLENBQUM7SUFDekMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBQzdDO1NBQU07UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO0tBQ3ZCO0lBRUQsT0FBTyxNQUFNLENBQUM7Q0FDZjs7Ozs7QUFFRCxpQkFBaUIsT0FBcUM7SUFDcEQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsbUJBQUssTUFBTSxFQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ25FOzs7OztBQUVELCtCQUErQixHQUErQjtJQUM1RCxPQUFPLENBQUMsSUFBVSxFQUFFLE1BQWMsRUFBVSxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDbEY7O0FBRUQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQzs7Ozs7OztBQUV6RCx1QkFBdUIsTUFBYyxFQUFFLElBQVUsRUFBRSxNQUFjOztJQUMvRCxNQUFNLEVBQUUsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFbkMsSUFBSSxFQUFFO1FBQUUsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztJQUVoQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUM7O0lBQ3hCLElBQUksS0FBSyxHQUFHLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUUvQyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsS0FBSyxHQUFHLEVBQUUsQ0FBQzs7UUFDWCxJQUFJLEtBQUssQ0FBdUI7UUFDaEMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUVoQyxJQUFJLE9BQU8sR0FBZ0IsTUFBTSxDQUFDO1FBQ2xDLE9BQU8sT0FBTyxFQUFFO1lBQ2QsS0FBSyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QyxJQUFJLEtBQUssRUFBRTtnQkFDVCxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE9BQU8sc0JBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxHQUFHLElBQUksQ0FBQzthQUNoQjtTQUNGO1FBRUQsb0JBQW9CLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMzQztJQUVELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTs7UUFDakMsTUFBTSxFQUFFLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUMxRCxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ1I7Ozs7O0FBRUQsb0JBQW9CLElBQVk7SUFDOUIsT0FBTyxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDbkY7QUFFRCxNQUFNOzs7Ozs7O0lBQ0osTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLE9BQWU7UUFDdkQsT0FBTyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztLQUM3QztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtOdW1iZXJGb3JtYXRTdHlsZX0gZnJvbSAnLi4vLi4vaTE4bi9sb2NhbGVfZGF0YV9hcGknO1xuXG5leHBvcnQgY2xhc3MgTnVtYmVyRm9ybWF0dGVyIHtcbiAgc3RhdGljIGZvcm1hdChudW06IG51bWJlciwgbG9jYWxlOiBzdHJpbmcsIHN0eWxlOiBOdW1iZXJGb3JtYXRTdHlsZSwgb3B0czoge1xuICAgIG1pbmltdW1JbnRlZ2VyRGlnaXRzPzogbnVtYmVyLFxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0cz86IG51bWJlcixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM/OiBudW1iZXIsXG4gICAgY3VycmVuY3k/OiBzdHJpbmd8bnVsbCxcbiAgICBjdXJyZW5jeUFzU3ltYm9sPzogYm9vbGVhblxuICB9ID0ge30pOiBzdHJpbmcge1xuICAgIGNvbnN0IHttaW5pbXVtSW50ZWdlckRpZ2l0cywgbWluaW11bUZyYWN0aW9uRGlnaXRzLCBtYXhpbXVtRnJhY3Rpb25EaWdpdHMsIGN1cnJlbmN5LFxuICAgICAgICAgICBjdXJyZW5jeUFzU3ltYm9sID0gZmFsc2V9ID0gb3B0cztcbiAgICBjb25zdCBvcHRpb25zOiBJbnRsLk51bWJlckZvcm1hdE9wdGlvbnMgPSB7XG4gICAgICBtaW5pbXVtSW50ZWdlckRpZ2l0cyxcbiAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0cyxcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0cyxcbiAgICAgIHN0eWxlOiBOdW1iZXJGb3JtYXRTdHlsZVtzdHlsZV0udG9Mb3dlckNhc2UoKVxuICAgIH07XG5cbiAgICBpZiAoc3R5bGUgPT0gTnVtYmVyRm9ybWF0U3R5bGUuQ3VycmVuY3kpIHtcbiAgICAgIG9wdGlvbnMuY3VycmVuY3kgPSB0eXBlb2YgY3VycmVuY3kgPT0gJ3N0cmluZycgPyBjdXJyZW5jeSA6IHVuZGVmaW5lZDtcbiAgICAgIG9wdGlvbnMuY3VycmVuY3lEaXNwbGF5ID0gY3VycmVuY3lBc1N5bWJvbCA/ICdzeW1ib2wnIDogJ2NvZGUnO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucykuZm9ybWF0KG51bSk7XG4gIH1cbn1cblxudHlwZSBEYXRlRm9ybWF0dGVyRm4gPSAoZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpID0+IHN0cmluZztcblxuY29uc3QgREFURV9GT1JNQVRTX1NQTElUID1cbiAgICAvKCg/OlteeU1MZEhobXNhelpFd0dqSiddKyl8KD86Jyg/OlteJ118JycpKicpfCg/OkUrfHkrfE0rfEwrfGQrfEgrfGgrfEorfGorfG0rfHMrfGF8enxafEcrfHcrKSkoLiopLztcblxuY29uc3QgUEFUVEVSTl9BTElBU0VTOiB7W2Zvcm1hdDogc3RyaW5nXTogRGF0ZUZvcm1hdHRlckZufSA9IHtcbiAgLy8gS2V5cyBhcmUgcXVvdGVkIHNvIHRoZXkgZG8gbm90IGdldCByZW5hbWVkIGR1cmluZyBjbG9zdXJlIGNvbXBpbGF0aW9uLlxuICAneU1NTWRqbXMnOiBkYXRlUGFydEdldHRlckZhY3RvcnkoY29tYmluZShbXG4gICAgZGlnaXRDb25kaXRpb24oJ3llYXInLCAxKSxcbiAgICBuYW1lQ29uZGl0aW9uKCdtb250aCcsIDMpLFxuICAgIGRpZ2l0Q29uZGl0aW9uKCdkYXknLCAxKSxcbiAgICBkaWdpdENvbmRpdGlvbignaG91cicsIDEpLFxuICAgIGRpZ2l0Q29uZGl0aW9uKCdtaW51dGUnLCAxKSxcbiAgICBkaWdpdENvbmRpdGlvbignc2Vjb25kJywgMSksXG4gIF0pKSxcbiAgJ3lNZGptJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGNvbWJpbmUoW1xuICAgIGRpZ2l0Q29uZGl0aW9uKCd5ZWFyJywgMSksIGRpZ2l0Q29uZGl0aW9uKCdtb250aCcsIDEpLCBkaWdpdENvbmRpdGlvbignZGF5JywgMSksXG4gICAgZGlnaXRDb25kaXRpb24oJ2hvdXInLCAxKSwgZGlnaXRDb25kaXRpb24oJ21pbnV0ZScsIDEpXG4gIF0pKSxcbiAgJ3lNTU1NRUVFRWQnOiBkYXRlUGFydEdldHRlckZhY3RvcnkoY29tYmluZShbXG4gICAgZGlnaXRDb25kaXRpb24oJ3llYXInLCAxKSwgbmFtZUNvbmRpdGlvbignbW9udGgnLCA0KSwgbmFtZUNvbmRpdGlvbignd2Vla2RheScsIDQpLFxuICAgIGRpZ2l0Q29uZGl0aW9uKCdkYXknLCAxKVxuICBdKSksXG4gICd5TU1NTWQnOiBkYXRlUGFydEdldHRlckZhY3RvcnkoXG4gICAgICBjb21iaW5lKFtkaWdpdENvbmRpdGlvbigneWVhcicsIDEpLCBuYW1lQ29uZGl0aW9uKCdtb250aCcsIDQpLCBkaWdpdENvbmRpdGlvbignZGF5JywgMSldKSksXG4gICd5TU1NZCc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShcbiAgICAgIGNvbWJpbmUoW2RpZ2l0Q29uZGl0aW9uKCd5ZWFyJywgMSksIG5hbWVDb25kaXRpb24oJ21vbnRoJywgMyksIGRpZ2l0Q29uZGl0aW9uKCdkYXknLCAxKV0pKSxcbiAgJ3lNZCc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShcbiAgICAgIGNvbWJpbmUoW2RpZ2l0Q29uZGl0aW9uKCd5ZWFyJywgMSksIGRpZ2l0Q29uZGl0aW9uKCdtb250aCcsIDEpLCBkaWdpdENvbmRpdGlvbignZGF5JywgMSldKSksXG4gICdqbXMnOiBkYXRlUGFydEdldHRlckZhY3RvcnkoY29tYmluZShcbiAgICAgIFtkaWdpdENvbmRpdGlvbignaG91cicsIDEpLCBkaWdpdENvbmRpdGlvbignc2Vjb25kJywgMSksIGRpZ2l0Q29uZGl0aW9uKCdtaW51dGUnLCAxKV0pKSxcbiAgJ2ptJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGNvbWJpbmUoW2RpZ2l0Q29uZGl0aW9uKCdob3VyJywgMSksIGRpZ2l0Q29uZGl0aW9uKCdtaW51dGUnLCAxKV0pKVxufTtcblxuY29uc3QgREFURV9GT1JNQVRTOiB7W2Zvcm1hdDogc3RyaW5nXTogRGF0ZUZvcm1hdHRlckZufSA9IHtcbiAgLy8gS2V5cyBhcmUgcXVvdGVkIHNvIHRoZXkgZG8gbm90IGdldCByZW5hbWVkLlxuICAneXl5eSc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShkaWdpdENvbmRpdGlvbigneWVhcicsIDQpKSxcbiAgJ3l5JzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGRpZ2l0Q29uZGl0aW9uKCd5ZWFyJywgMikpLFxuICAneSc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShkaWdpdENvbmRpdGlvbigneWVhcicsIDEpKSxcbiAgJ01NTU0nOiBkYXRlUGFydEdldHRlckZhY3RvcnkobmFtZUNvbmRpdGlvbignbW9udGgnLCA0KSksXG4gICdNTU0nOiBkYXRlUGFydEdldHRlckZhY3RvcnkobmFtZUNvbmRpdGlvbignbW9udGgnLCAzKSksXG4gICdNTSc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShkaWdpdENvbmRpdGlvbignbW9udGgnLCAyKSksXG4gICdNJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGRpZ2l0Q29uZGl0aW9uKCdtb250aCcsIDEpKSxcbiAgJ0xMTEwnOiBkYXRlUGFydEdldHRlckZhY3RvcnkobmFtZUNvbmRpdGlvbignbW9udGgnLCA0KSksXG4gICdMJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KG5hbWVDb25kaXRpb24oJ21vbnRoJywgMSkpLFxuICAnZGQnOiBkYXRlUGFydEdldHRlckZhY3RvcnkoZGlnaXRDb25kaXRpb24oJ2RheScsIDIpKSxcbiAgJ2QnOiBkYXRlUGFydEdldHRlckZhY3RvcnkoZGlnaXRDb25kaXRpb24oJ2RheScsIDEpKSxcbiAgJ0hIJzogZGlnaXRNb2RpZmllcihcbiAgICAgIGhvdXJFeHRyYWN0b3IoZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGhvdXIxMk1vZGlmeShkaWdpdENvbmRpdGlvbignaG91cicsIDIpLCBmYWxzZSkpKSksXG4gICdIJzogaG91ckV4dHJhY3RvcihkYXRlUGFydEdldHRlckZhY3RvcnkoaG91cjEyTW9kaWZ5KGRpZ2l0Q29uZGl0aW9uKCdob3VyJywgMSksIGZhbHNlKSkpLFxuICAnaGgnOiBkaWdpdE1vZGlmaWVyKFxuICAgICAgaG91ckV4dHJhY3RvcihkYXRlUGFydEdldHRlckZhY3RvcnkoaG91cjEyTW9kaWZ5KGRpZ2l0Q29uZGl0aW9uKCdob3VyJywgMiksIHRydWUpKSkpLFxuICAnaCc6IGhvdXJFeHRyYWN0b3IoZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGhvdXIxMk1vZGlmeShkaWdpdENvbmRpdGlvbignaG91cicsIDEpLCB0cnVlKSkpLFxuICAnamonOiBkYXRlUGFydEdldHRlckZhY3RvcnkoZGlnaXRDb25kaXRpb24oJ2hvdXInLCAyKSksXG4gICdqJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGRpZ2l0Q29uZGl0aW9uKCdob3VyJywgMSkpLFxuICAnbW0nOiBkaWdpdE1vZGlmaWVyKGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShkaWdpdENvbmRpdGlvbignbWludXRlJywgMikpKSxcbiAgJ20nOiBkYXRlUGFydEdldHRlckZhY3RvcnkoZGlnaXRDb25kaXRpb24oJ21pbnV0ZScsIDEpKSxcbiAgJ3NzJzogZGlnaXRNb2RpZmllcihkYXRlUGFydEdldHRlckZhY3RvcnkoZGlnaXRDb25kaXRpb24oJ3NlY29uZCcsIDIpKSksXG4gICdzJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KGRpZ2l0Q29uZGl0aW9uKCdzZWNvbmQnLCAxKSksXG4gIC8vIHdoaWxlIElTTyA4NjAxIHJlcXVpcmVzIGZyYWN0aW9ucyB0byBiZSBwcmVmaXhlZCB3aXRoIGAuYCBvciBgLGBcbiAgLy8gd2UgY2FuIGJlIGp1c3Qgc2FmZWx5IHJlbHkgb24gdXNpbmcgYHNzc2Agc2luY2Ugd2UgY3VycmVudGx5IGRvbid0IHN1cHBvcnQgc2luZ2xlIG9yIHR3byBkaWdpdFxuICAvLyBmcmFjdGlvbnNcbiAgJ3Nzcyc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShkaWdpdENvbmRpdGlvbignc2Vjb25kJywgMykpLFxuICAnRUVFRSc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShuYW1lQ29uZGl0aW9uKCd3ZWVrZGF5JywgNCkpLFxuICAnRUVFJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KG5hbWVDb25kaXRpb24oJ3dlZWtkYXknLCAzKSksXG4gICdFRSc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShuYW1lQ29uZGl0aW9uKCd3ZWVrZGF5JywgMikpLFxuICAnRSc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShuYW1lQ29uZGl0aW9uKCd3ZWVrZGF5JywgMSkpLFxuICAnYSc6IGhvdXJDbG9ja0V4dHJhY3RvcihkYXRlUGFydEdldHRlckZhY3RvcnkoaG91cjEyTW9kaWZ5KGRpZ2l0Q29uZGl0aW9uKCdob3VyJywgMSksIHRydWUpKSksXG4gICdaJzogdGltZVpvbmVHZXR0ZXIoJ3Nob3J0JyksXG4gICd6JzogdGltZVpvbmVHZXR0ZXIoJ2xvbmcnKSxcbiAgJ3d3JzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KHt9KSwgIC8vIFdlZWsgb2YgeWVhciwgcGFkZGVkICgwMC01MykuIFdlZWsgMDEgaXMgdGhlIHdlZWsgd2l0aCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpcnN0IFRodXJzZGF5IG9mIHRoZSB5ZWFyLiBub3Qgc3VwcG9ydCA/XG4gICd3JzpcbiAgICAgIGRhdGVQYXJ0R2V0dGVyRmFjdG9yeSh7fSksICAvLyBXZWVrIG9mIHllYXIgKDAtNTMpLiBXZWVrIDEgaXMgdGhlIHdlZWsgd2l0aCB0aGUgZmlyc3QgVGh1cnNkYXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvZiB0aGUgeWVhciBub3Qgc3VwcG9ydCA/XG4gICdHJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KG5hbWVDb25kaXRpb24oJ2VyYScsIDEpKSxcbiAgJ0dHJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KG5hbWVDb25kaXRpb24oJ2VyYScsIDIpKSxcbiAgJ0dHRyc6IGRhdGVQYXJ0R2V0dGVyRmFjdG9yeShuYW1lQ29uZGl0aW9uKCdlcmEnLCAzKSksXG4gICdHR0dHJzogZGF0ZVBhcnRHZXR0ZXJGYWN0b3J5KG5hbWVDb25kaXRpb24oJ2VyYScsIDQpKVxufTtcblxuXG5mdW5jdGlvbiBkaWdpdE1vZGlmaWVyKGlubmVyOiBEYXRlRm9ybWF0dGVyRm4pOiBEYXRlRm9ybWF0dGVyRm4ge1xuICByZXR1cm4gZnVuY3Rpb24oZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHJlc3VsdCA9IGlubmVyKGRhdGUsIGxvY2FsZSk7XG4gICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT0gMSA/ICcwJyArIHJlc3VsdCA6IHJlc3VsdDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gaG91ckNsb2NrRXh0cmFjdG9yKGlubmVyOiBEYXRlRm9ybWF0dGVyRm4pOiBEYXRlRm9ybWF0dGVyRm4ge1xuICByZXR1cm4gZnVuY3Rpb24oZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gaW5uZXIoZGF0ZSwgbG9jYWxlKS5zcGxpdCgnICcpWzFdOyB9O1xufVxuXG5mdW5jdGlvbiBob3VyRXh0cmFjdG9yKGlubmVyOiBEYXRlRm9ybWF0dGVyRm4pOiBEYXRlRm9ybWF0dGVyRm4ge1xuICByZXR1cm4gZnVuY3Rpb24oZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgeyByZXR1cm4gaW5uZXIoZGF0ZSwgbG9jYWxlKS5zcGxpdCgnICcpWzBdOyB9O1xufVxuXG5mdW5jdGlvbiBpbnRsRGF0ZUZvcm1hdChkYXRlOiBEYXRlLCBsb2NhbGU6IHN0cmluZywgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMpOiBzdHJpbmcge1xuICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBvcHRpb25zKS5mb3JtYXQoZGF0ZSkucmVwbGFjZSgvW1xcdTIwMGVcXHUyMDBmXS9nLCAnJyk7XG59XG5cbmZ1bmN0aW9uIHRpbWVab25lR2V0dGVyKHRpbWV6b25lOiBzdHJpbmcpOiBEYXRlRm9ybWF0dGVyRm4ge1xuICAvLyBUbyB3b3JrYXJvdW5kIGBJbnRsYCBBUEkgcmVzdHJpY3Rpb24gZm9yIHNpbmdsZSB0aW1lem9uZSBsZXQgZm9ybWF0IHdpdGggMjQgaG91cnNcbiAgY29uc3Qgb3B0aW9ucyA9IHtob3VyOiAnMi1kaWdpdCcsIGhvdXIxMjogZmFsc2UsIHRpbWVab25lTmFtZTogdGltZXpvbmV9O1xuICByZXR1cm4gZnVuY3Rpb24oZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IHJlc3VsdCA9IGludGxEYXRlRm9ybWF0KGRhdGUsIGxvY2FsZSwgb3B0aW9ucyk7XG4gICAgLy8gVGhlbiBleHRyYWN0IGZpcnN0IDMgbGV0dGVycyB0aGF0IHJlbGF0ZWQgdG8gaG91cnNcbiAgICByZXR1cm4gcmVzdWx0ID8gcmVzdWx0LnN1YnN0cmluZygzKSA6ICcnO1xuICB9O1xufVxuXG5mdW5jdGlvbiBob3VyMTJNb2RpZnkoXG4gICAgb3B0aW9uczogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMsIHZhbHVlOiBib29sZWFuKTogSW50bC5EYXRlVGltZUZvcm1hdE9wdGlvbnMge1xuICBvcHRpb25zLmhvdXIxMiA9IHZhbHVlO1xuICByZXR1cm4gb3B0aW9ucztcbn1cblxuZnVuY3Rpb24gZGlnaXRDb25kaXRpb24ocHJvcDogc3RyaW5nLCBsZW46IG51bWJlcik6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zIHtcbiAgY29uc3QgcmVzdWx0OiB7W2s6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgcmVzdWx0W3Byb3BdID0gbGVuID09PSAyID8gJzItZGlnaXQnIDogJ251bWVyaWMnO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBuYW1lQ29uZGl0aW9uKHByb3A6IHN0cmluZywgbGVuOiBudW1iZXIpOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyB7XG4gIGNvbnN0IHJlc3VsdDoge1trOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGlmIChsZW4gPCA0KSB7XG4gICAgcmVzdWx0W3Byb3BdID0gbGVuID4gMSA/ICdzaG9ydCcgOiAnbmFycm93JztcbiAgfSBlbHNlIHtcbiAgICByZXN1bHRbcHJvcF0gPSAnbG9uZyc7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBjb21iaW5lKG9wdGlvbnM6IEludGwuRGF0ZVRpbWVGb3JtYXRPcHRpb25zW10pOiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyB7XG4gIHJldHVybiBvcHRpb25zLnJlZHVjZSgobWVyZ2VkLCBvcHQpID0+ICh7Li4ubWVyZ2VkLCAuLi5vcHR9KSwge30pO1xufVxuXG5mdW5jdGlvbiBkYXRlUGFydEdldHRlckZhY3RvcnkocmV0OiBJbnRsLkRhdGVUaW1lRm9ybWF0T3B0aW9ucyk6IERhdGVGb3JtYXR0ZXJGbiB7XG4gIHJldHVybiAoZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4gaW50bERhdGVGb3JtYXQoZGF0ZSwgbG9jYWxlLCByZXQpO1xufVxuXG5jb25zdCBEQVRFX0ZPUk1BVFRFUl9DQUNIRSA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcblxuZnVuY3Rpb24gZGF0ZUZvcm1hdHRlcihmb3JtYXQ6IHN0cmluZywgZGF0ZTogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBmbiA9IFBBVFRFUk5fQUxJQVNFU1tmb3JtYXRdO1xuXG4gIGlmIChmbikgcmV0dXJuIGZuKGRhdGUsIGxvY2FsZSk7XG5cbiAgY29uc3QgY2FjaGVLZXkgPSBmb3JtYXQ7XG4gIGxldCBwYXJ0cyA9IERBVEVfRk9STUFUVEVSX0NBQ0hFLmdldChjYWNoZUtleSk7XG5cbiAgaWYgKCFwYXJ0cykge1xuICAgIHBhcnRzID0gW107XG4gICAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXl8bnVsbDtcbiAgICBEQVRFX0ZPUk1BVFNfU1BMSVQuZXhlYyhmb3JtYXQpO1xuXG4gICAgbGV0IF9mb3JtYXQ6IHN0cmluZ3xudWxsID0gZm9ybWF0O1xuICAgIHdoaWxlIChfZm9ybWF0KSB7XG4gICAgICBtYXRjaCA9IERBVEVfRk9STUFUU19TUExJVC5leGVjKF9mb3JtYXQpO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHBhcnRzID0gcGFydHMuY29uY2F0KG1hdGNoLnNsaWNlKDEpKTtcbiAgICAgICAgX2Zvcm1hdCA9IHBhcnRzLnBvcCgpICE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0cy5wdXNoKF9mb3JtYXQpO1xuICAgICAgICBfZm9ybWF0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBEQVRFX0ZPUk1BVFRFUl9DQUNIRS5zZXQoY2FjaGVLZXksIHBhcnRzKTtcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5yZWR1Y2UoKHRleHQsIHBhcnQpID0+IHtcbiAgICBjb25zdCBmbiA9IERBVEVfRk9STUFUU1twYXJ0XTtcbiAgICByZXR1cm4gdGV4dCArIChmbiA/IGZuKGRhdGUsIGxvY2FsZSkgOiBwYXJ0VG9UaW1lKHBhcnQpKTtcbiAgfSwgJycpO1xufVxuXG5mdW5jdGlvbiBwYXJ0VG9UaW1lKHBhcnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwYXJ0ID09PSAnXFwnXFwnJyA/ICdcXCcnIDogcGFydC5yZXBsYWNlKC8oXid8JyQpL2csICcnKS5yZXBsYWNlKC8nJy9nLCAnXFwnJyk7XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRlRm9ybWF0dGVyIHtcbiAgc3RhdGljIGZvcm1hdChkYXRlOiBEYXRlLCBsb2NhbGU6IHN0cmluZywgcGF0dGVybjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0ZUZvcm1hdHRlcihwYXR0ZXJuLCBkYXRlLCBsb2NhbGUpO1xuICB9XG59XG4iXX0=