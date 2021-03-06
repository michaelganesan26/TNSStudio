/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { InjectionToken } from '@angular/core';
/**
 * \@description
 * Defines an interface that acts as a bridge between the Angular forms API and a
 * native element in the DOM.
 *
 * Implement this interface to create a custom form control directive
 * that integrates with Angular forms.
 *
 * @see DefaultValueAccessor
 * @record
 */
export function ControlValueAccessor() { }
/**
 * \@description
 * Writes a new value to the element.
 *
 * This method is called by the forms API to write to the view when programmatic
 * changes from model to view are requested.
 *
 * \@usageNotes
 * ### Write a value to the element
 *
 * The following example writes a value to the native DOM element.
 *
 * ```ts
 * writeValue(value: any): void {
 *   this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);
 * }
 * ```
 *
 * \@param obj The new value for the element
 * @type {?}
 */
ControlValueAccessor.prototype.writeValue;
/**
 * \@description
 * Registers a callback function that is called when the control's value
 * changes in the UI.
 *
 * This method is called by the forms API on initialization to update the form
 * model when values propagate from the view to the model.
 *
 * When implementing the `registerOnChange` method in your own value accessor,
 * save the given function so your class calls it at the appropriate time.
 *
 * \@usageNotes
 * ### Store the change function
 *
 * The following example stores the provided function as an internal method.
 *
 * ```ts
 * registerOnChange(fn: (_: any) => void): void {
 *   this._onChange = fn;
 * }
 * ```
 *
 * When the value changes in the UI, call the registered
 * function to allow the forms API to update itself:
 *
 * ```ts
 * host: {
 *    (change): '_onChange($event.target.value)'
 * }
 * ```
 *
 * \@param fn The callback function to register
 * @type {?}
 */
ControlValueAccessor.prototype.registerOnChange;
/**
 * \@description
 * Registers a callback function is called by the forms API on initialization
 * to update the form model on blur.
 *
 * When implementing `registerOnTouched` in your own value accessor, save the given
 * function so your class calls it when the control should be considered
 * blurred or "touched".
 *
 * \@usageNotes
 * ### Store the callback function
 *
 * The following example stores the provided function as an internal method.
 *
 * ```ts
 * registerOnTouched(fn: any): void {
 *   this._onTouched = fn;
 * }
 * ```
 *
 * On blur (or equivalent), your class should call the registered function to allow
 * the forms API to update itself:
 *
 * ```ts
 * host: {
 *    '(blur)': '_onTouched()'
 * }
 * ```
 *
 * \@param fn The callback function to register
 * @type {?}
 */
ControlValueAccessor.prototype.registerOnTouched;
/**
 * \@description
 * Function that is called by the forms API when the control status changes to
 * or from 'DISABLED'. Depending on the status, it enables or disables the
 * appropriate DOM element.
 *
 * \@usageNotes
 * The following is an example of writing the disabled property to a native DOM element:
 *
 * ```ts
 * setDisabledState(isDisabled: boolean): void {
 *   this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
 * }
 * ```
 *
 * \@param isDisabled The disabled status to set on the element
 * @type {?|undefined}
 */
ControlValueAccessor.prototype.setDisabledState;
/** *
 * Used to provide a `ControlValueAccessor` for form controls.
 *
 * See `DefaultValueAccessor` for how to implement one.
 *
  @type {?} */
export const NG_VALUE_ACCESSOR = new InjectionToken('NgValueAccessor');

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbF92YWx1ZV9hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlJN0MsYUFBYSxpQkFBaUIsR0FBRyxJQUFJLGNBQWMsQ0FBdUIsaUJBQWlCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3Rpb25Ub2tlbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBEZWZpbmVzIGFuIGludGVyZmFjZSB0aGF0IGFjdHMgYXMgYSBicmlkZ2UgYmV0d2VlbiB0aGUgQW5ndWxhciBmb3JtcyBBUEkgYW5kIGFcbiAqIG5hdGl2ZSBlbGVtZW50IGluIHRoZSBET00uXG4gKlxuICogSW1wbGVtZW50IHRoaXMgaW50ZXJmYWNlIHRvIGNyZWF0ZSBhIGN1c3RvbSBmb3JtIGNvbnRyb2wgZGlyZWN0aXZlXG4gKiB0aGF0IGludGVncmF0ZXMgd2l0aCBBbmd1bGFyIGZvcm1zLlxuICpcbiAqIEBzZWUgRGVmYXVsdFZhbHVlQWNjZXNzb3JcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogV3JpdGVzIGEgbmV3IHZhbHVlIHRvIHRoZSBlbGVtZW50LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSB0byB3cml0ZSB0byB0aGUgdmlldyB3aGVuIHByb2dyYW1tYXRpY1xuICAgKiBjaGFuZ2VzIGZyb20gbW9kZWwgdG8gdmlldyBhcmUgcmVxdWVzdGVkLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgV3JpdGUgYSB2YWx1ZSB0byB0aGUgZWxlbWVudFxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgd3JpdGVzIGEgdmFsdWUgdG8gdGhlIG5hdGl2ZSBET00gZWxlbWVudC5cbiAgICpcbiAgICogYGBgdHNcbiAgICogd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAqICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndmFsdWUnLCB2YWx1ZSk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBvYmogVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIGVsZW1lbnRcbiAgICovXG4gIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgY29udHJvbCdzIHZhbHVlXG4gICAqIGNoYW5nZXMgaW4gdGhlIFVJLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSBvbiBpbml0aWFsaXphdGlvbiB0byB1cGRhdGUgdGhlIGZvcm1cbiAgICogbW9kZWwgd2hlbiB2YWx1ZXMgcHJvcGFnYXRlIGZyb20gdGhlIHZpZXcgdG8gdGhlIG1vZGVsLlxuICAgKlxuICAgKiBXaGVuIGltcGxlbWVudGluZyB0aGUgYHJlZ2lzdGVyT25DaGFuZ2VgIG1ldGhvZCBpbiB5b3VyIG93biB2YWx1ZSBhY2Nlc3NvcixcbiAgICogc2F2ZSB0aGUgZ2l2ZW4gZnVuY3Rpb24gc28geW91ciBjbGFzcyBjYWxscyBpdCBhdCB0aGUgYXBwcm9wcmlhdGUgdGltZS5cbiAgICpcbiAgICogQHVzYWdlTm90ZXNcbiAgICogIyMjIFN0b3JlIHRoZSBjaGFuZ2UgZnVuY3Rpb25cbiAgICpcbiAgICogVGhlIGZvbGxvd2luZyBleGFtcGxlIHN0b3JlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gYXMgYW4gaW50ZXJuYWwgbWV0aG9kLlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAqICAgdGhpcy5fb25DaGFuZ2UgPSBmbjtcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogV2hlbiB0aGUgdmFsdWUgY2hhbmdlcyBpbiB0aGUgVUksIGNhbGwgdGhlIHJlZ2lzdGVyZWRcbiAgICogZnVuY3Rpb24gdG8gYWxsb3cgdGhlIGZvcm1zIEFQSSB0byB1cGRhdGUgaXRzZWxmOlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiBob3N0OiB7XG4gICAqICAgIChjaGFuZ2UpOiAnX29uQ2hhbmdlKCRldmVudC50YXJnZXQudmFsdWUpJ1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gZm4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIHJlZ2lzdGVyXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgZnVuY3Rpb24gaXMgY2FsbGVkIGJ5IHRoZSBmb3JtcyBBUEkgb24gaW5pdGlhbGl6YXRpb25cbiAgICogdG8gdXBkYXRlIHRoZSBmb3JtIG1vZGVsIG9uIGJsdXIuXG4gICAqXG4gICAqIFdoZW4gaW1wbGVtZW50aW5nIGByZWdpc3Rlck9uVG91Y2hlZGAgaW4geW91ciBvd24gdmFsdWUgYWNjZXNzb3IsIHNhdmUgdGhlIGdpdmVuXG4gICAqIGZ1bmN0aW9uIHNvIHlvdXIgY2xhc3MgY2FsbHMgaXQgd2hlbiB0aGUgY29udHJvbCBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgKiBibHVycmVkIG9yIFwidG91Y2hlZFwiLlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgU3RvcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzdG9yZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIGFzIGFuIGludGVybmFsIG1ldGhvZC5cbiAgICpcbiAgICogYGBgdHNcbiAgICogcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgKiAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBPbiBibHVyIChvciBlcXVpdmFsZW50KSwgeW91ciBjbGFzcyBzaG91bGQgY2FsbCB0aGUgcmVnaXN0ZXJlZCBmdW5jdGlvbiB0byBhbGxvd1xuICAgKiB0aGUgZm9ybXMgQVBJIHRvIHVwZGF0ZSBpdHNlbGY6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIGhvc3Q6IHtcbiAgICogICAgJyhibHVyKSc6ICdfb25Ub3VjaGVkKCknXG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBmbiBUaGUgY2FsbGJhY2sgZnVuY3Rpb24gdG8gcmVnaXN0ZXJcbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogRnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgYnkgdGhlIGZvcm1zIEFQSSB3aGVuIHRoZSBjb250cm9sIHN0YXR1cyBjaGFuZ2VzIHRvXG4gICAqIG9yIGZyb20gJ0RJU0FCTEVEJy4gRGVwZW5kaW5nIG9uIHRoZSBzdGF0dXMsIGl0IGVuYWJsZXMgb3IgZGlzYWJsZXMgdGhlXG4gICAqIGFwcHJvcHJpYXRlIERPTSBlbGVtZW50LlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiBUaGUgZm9sbG93aW5nIGlzIGFuIGV4YW1wbGUgb2Ygd3JpdGluZyB0aGUgZGlzYWJsZWQgcHJvcGVydHkgdG8gYSBuYXRpdmUgRE9NIGVsZW1lbnQ6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgKiAgIHRoaXMuX3JlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2Rpc2FibGVkJywgaXNEaXNhYmxlZCk7XG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkIFRoZSBkaXNhYmxlZCBzdGF0dXMgdG8gc2V0IG9uIHRoZSBlbGVtZW50XG4gICAqL1xuICBzZXREaXNhYmxlZFN0YXRlPyhpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZDtcbn1cblxuLyoqXG4gKiBVc2VkIHRvIHByb3ZpZGUgYSBgQ29udHJvbFZhbHVlQWNjZXNzb3JgIGZvciBmb3JtIGNvbnRyb2xzLlxuICpcbiAqIFNlZSBgRGVmYXVsdFZhbHVlQWNjZXNzb3JgIGZvciBob3cgdG8gaW1wbGVtZW50IG9uZS5cbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBOR19WQUxVRV9BQ0NFU1NPUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb250cm9sVmFsdWVBY2Nlc3Nvcj4oJ05nVmFsdWVBY2Nlc3NvcicpO1xuIl19