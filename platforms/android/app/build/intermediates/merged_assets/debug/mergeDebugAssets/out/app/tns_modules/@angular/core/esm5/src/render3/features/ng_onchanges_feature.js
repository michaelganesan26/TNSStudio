/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { SimpleChange } from '../../change_detection/change_detection_util';
var PRIVATE_PREFIX = '__ngOnChanges_';
/**
 * The NgOnChangesFeature decorates a component with support for the ngOnChanges
 * lifecycle hook, so it should be included in any component that implements
 * that hook.
 *
 * If the component or directive uses inheritance, the NgOnChangesFeature MUST
 * be included as a feature AFTER {@link InheritDefinitionFeature}, otherwise
 * inherited properties will not be propagated to the ngOnChanges lifecycle
 * hook.
 *
 * Example usage:
 *
 * ```
 * static ngComponentDef = defineComponent({
 *   ...
 *   inputs: {name: 'publicName'},
 *   features: [NgOnChangesFeature]
 * });
 * ```
 */
export function NgOnChangesFeature(definition) {
    var declaredToMinifiedInputs = definition.declaredInputs;
    var proto = definition.type.prototype;
    var _loop_1 = function (declaredName) {
        if (declaredToMinifiedInputs.hasOwnProperty(declaredName)) {
            var minifiedKey = declaredToMinifiedInputs[declaredName];
            var privateMinKey_1 = PRIVATE_PREFIX + minifiedKey;
            // Walk the prototype chain to see if we find a property descriptor
            // That way we can honor setters and getters that were inherited.
            var originalProperty = undefined;
            var checkProto = proto;
            while (!originalProperty && checkProto &&
                Object.getPrototypeOf(checkProto) !== Object.getPrototypeOf(Object.prototype)) {
                originalProperty = Object.getOwnPropertyDescriptor(checkProto, minifiedKey);
                checkProto = Object.getPrototypeOf(checkProto);
            }
            var getter = originalProperty && originalProperty.get;
            var setter_1 = originalProperty && originalProperty.set;
            // create a getter and setter for property
            Object.defineProperty(proto, minifiedKey, {
                get: getter ||
                    (setter_1 ? undefined : function () { return this[privateMinKey_1]; }),
                set: function (value) {
                    var simpleChanges = this[PRIVATE_PREFIX];
                    if (!simpleChanges) {
                        simpleChanges = {};
                        // Place where we will store SimpleChanges if there is a change
                        Object.defineProperty(this, PRIVATE_PREFIX, { value: simpleChanges, writable: true });
                    }
                    var isFirstChange = !this.hasOwnProperty(privateMinKey_1);
                    var currentChange = simpleChanges[declaredName];
                    if (currentChange) {
                        currentChange.currentValue = value;
                    }
                    else {
                        simpleChanges[declaredName] =
                            new SimpleChange(this[privateMinKey_1], value, isFirstChange);
                    }
                    if (isFirstChange) {
                        // Create a place where the actual value will be stored and make it non-enumerable
                        Object.defineProperty(this, privateMinKey_1, { value: value, writable: true });
                    }
                    else {
                        this[privateMinKey_1] = value;
                    }
                    if (setter_1)
                        setter_1.call(this, value);
                }
            });
        }
    };
    for (var declaredName in declaredToMinifiedInputs) {
        _loop_1(declaredName);
    }
    // If an onInit hook is defined, it will need to wrap the ngOnChanges call
    // so the call order is changes-init-check in creation mode. In subsequent
    // change detection runs, only the check wrapper will be called.
    if (definition.onInit != null) {
        definition.onInit = onChangesWrapper(definition.onInit);
    }
    definition.doCheck = onChangesWrapper(definition.doCheck);
}
function onChangesWrapper(delegateHook) {
    return function () {
        var simpleChanges = this[PRIVATE_PREFIX];
        if (simpleChanges != null) {
            this.ngOnChanges(simpleChanges);
            this[PRIVATE_PREFIX] = null;
        }
        if (delegateHook)
            delegateHook.apply(this);
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfb25jaGFuZ2VzX2ZlYXR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ZlYXR1cmVzL25nX29uY2hhbmdlc19mZWF0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUkxRSxJQUFNLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztBQVF4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILE1BQU0sNkJBQWdDLFVBQW1DO0lBQ3ZFLElBQU0sd0JBQXdCLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQztJQUMzRCxJQUFNLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzs0QkFDN0IsWUFBWTtRQUNyQixJQUFJLHdCQUF3QixDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN6RCxJQUFNLFdBQVcsR0FBRyx3QkFBd0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRCxJQUFNLGVBQWEsR0FBRyxjQUFjLEdBQUcsV0FBVyxDQUFDO1lBRW5ELG1FQUFtRTtZQUNuRSxpRUFBaUU7WUFDakUsSUFBSSxnQkFBZ0IsR0FBaUMsU0FBUyxDQUFDO1lBQy9ELElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN2QixPQUFPLENBQUMsZ0JBQWdCLElBQUksVUFBVTtnQkFDL0IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDcEYsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDNUUsVUFBVSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEQ7WUFFRCxJQUFNLE1BQU0sR0FBRyxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUM7WUFDeEQsSUFBTSxRQUFNLEdBQUcsZ0JBQWdCLElBQUksZ0JBQWdCLENBQUMsR0FBRyxDQUFDO1lBRXhELDBDQUEwQztZQUMxQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUU7Z0JBQ3hDLEdBQUcsRUFBRSxNQUFNO29CQUNQLENBQUMsUUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGNBQW1DLE9BQU8sSUFBSSxDQUFDLGVBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixHQUFHLEVBQUgsVUFBK0IsS0FBUTtvQkFDckMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsYUFBYSxFQUFFO3dCQUNsQixhQUFhLEdBQUcsRUFBRSxDQUFDO3dCQUNuQiwrREFBK0Q7d0JBQy9ELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxFQUFDLEtBQUssRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7cUJBQ3JGO29CQUVELElBQU0sYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFhLENBQUMsQ0FBQztvQkFDMUQsSUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUVsRCxJQUFJLGFBQWEsRUFBRTt3QkFDakIsYUFBYSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7cUJBQ3BDO3lCQUFNO3dCQUNMLGFBQWEsQ0FBQyxZQUFZLENBQUM7NEJBQ3ZCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7cUJBQ2pFO29CQUVELElBQUksYUFBYSxFQUFFO3dCQUNqQixrRkFBa0Y7d0JBQ2xGLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLGVBQWEsRUFBRSxFQUFDLEtBQUssT0FBQSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO3FCQUNyRTt5QkFBTTt3QkFDTCxJQUFJLENBQUMsZUFBYSxDQUFDLEdBQUcsS0FBSyxDQUFDO3FCQUM3QjtvQkFFRCxJQUFJLFFBQU07d0JBQUUsUUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7YUFDRixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFuREQsS0FBSyxJQUFNLFlBQVksSUFBSSx3QkFBd0I7Z0JBQXhDLFlBQVk7S0FtRHRCO0lBRUQsMEVBQTBFO0lBQzFFLDBFQUEwRTtJQUMxRSxnRUFBZ0U7SUFDaEUsSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtRQUM3QixVQUFVLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN6RDtJQUVELFVBQVUsQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRCwwQkFBMEIsWUFBaUM7SUFDekQsT0FBTztRQUNMLElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzQyxJQUFJLGFBQWEsSUFBSSxJQUFJLEVBQUU7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzdCO1FBQ0QsSUFBSSxZQUFZO1lBQUUsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1NpbXBsZUNoYW5nZX0gZnJvbSAnLi4vLi4vY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0aW9uX3V0aWwnO1xuaW1wb3J0IHtPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXN9IGZyb20gJy4uLy4uL21ldGFkYXRhL2xpZmVjeWNsZV9ob29rcyc7XG5pbXBvcnQge0RpcmVjdGl2ZURlZkludGVybmFsfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuXG5jb25zdCBQUklWQVRFX1BSRUZJWCA9ICdfX25nT25DaGFuZ2VzXyc7XG5cbnR5cGUgT25DaGFuZ2VzRXhwYW5kbyA9IE9uQ2hhbmdlcyAmIHtcbiAgX19uZ09uQ2hhbmdlc186IFNpbXBsZUNoYW5nZXN8bnVsbHx1bmRlZmluZWQ7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgQ2FuIGhvbGQgYW55IHZhbHVlXG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn07XG5cbi8qKlxuICogVGhlIE5nT25DaGFuZ2VzRmVhdHVyZSBkZWNvcmF0ZXMgYSBjb21wb25lbnQgd2l0aCBzdXBwb3J0IGZvciB0aGUgbmdPbkNoYW5nZXNcbiAqIGxpZmVjeWNsZSBob29rLCBzbyBpdCBzaG91bGQgYmUgaW5jbHVkZWQgaW4gYW55IGNvbXBvbmVudCB0aGF0IGltcGxlbWVudHNcbiAqIHRoYXQgaG9vay5cbiAqXG4gKiBJZiB0aGUgY29tcG9uZW50IG9yIGRpcmVjdGl2ZSB1c2VzIGluaGVyaXRhbmNlLCB0aGUgTmdPbkNoYW5nZXNGZWF0dXJlIE1VU1RcbiAqIGJlIGluY2x1ZGVkIGFzIGEgZmVhdHVyZSBBRlRFUiB7QGxpbmsgSW5oZXJpdERlZmluaXRpb25GZWF0dXJlfSwgb3RoZXJ3aXNlXG4gKiBpbmhlcml0ZWQgcHJvcGVydGllcyB3aWxsIG5vdCBiZSBwcm9wYWdhdGVkIHRvIHRoZSBuZ09uQ2hhbmdlcyBsaWZlY3ljbGVcbiAqIGhvb2suXG4gKlxuICogRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBgYGBcbiAqIHN0YXRpYyBuZ0NvbXBvbmVudERlZiA9IGRlZmluZUNvbXBvbmVudCh7XG4gKiAgIC4uLlxuICogICBpbnB1dHM6IHtuYW1lOiAncHVibGljTmFtZSd9LFxuICogICBmZWF0dXJlczogW05nT25DaGFuZ2VzRmVhdHVyZV1cbiAqIH0pO1xuICogYGBgXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBOZ09uQ2hhbmdlc0ZlYXR1cmU8VD4oZGVmaW5pdGlvbjogRGlyZWN0aXZlRGVmSW50ZXJuYWw8VD4pOiB2b2lkIHtcbiAgY29uc3QgZGVjbGFyZWRUb01pbmlmaWVkSW5wdXRzID0gZGVmaW5pdGlvbi5kZWNsYXJlZElucHV0cztcbiAgY29uc3QgcHJvdG8gPSBkZWZpbml0aW9uLnR5cGUucHJvdG90eXBlO1xuICBmb3IgKGNvbnN0IGRlY2xhcmVkTmFtZSBpbiBkZWNsYXJlZFRvTWluaWZpZWRJbnB1dHMpIHtcbiAgICBpZiAoZGVjbGFyZWRUb01pbmlmaWVkSW5wdXRzLmhhc093blByb3BlcnR5KGRlY2xhcmVkTmFtZSkpIHtcbiAgICAgIGNvbnN0IG1pbmlmaWVkS2V5ID0gZGVjbGFyZWRUb01pbmlmaWVkSW5wdXRzW2RlY2xhcmVkTmFtZV07XG4gICAgICBjb25zdCBwcml2YXRlTWluS2V5ID0gUFJJVkFURV9QUkVGSVggKyBtaW5pZmllZEtleTtcblxuICAgICAgLy8gV2FsayB0aGUgcHJvdG90eXBlIGNoYWluIHRvIHNlZSBpZiB3ZSBmaW5kIGEgcHJvcGVydHkgZGVzY3JpcHRvclxuICAgICAgLy8gVGhhdCB3YXkgd2UgY2FuIGhvbm9yIHNldHRlcnMgYW5kIGdldHRlcnMgdGhhdCB3ZXJlIGluaGVyaXRlZC5cbiAgICAgIGxldCBvcmlnaW5hbFByb3BlcnR5OiBQcm9wZXJ0eURlc2NyaXB0b3J8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgbGV0IGNoZWNrUHJvdG8gPSBwcm90bztcbiAgICAgIHdoaWxlICghb3JpZ2luYWxQcm9wZXJ0eSAmJiBjaGVja1Byb3RvICYmXG4gICAgICAgICAgICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKGNoZWNrUHJvdG8pICE9PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoT2JqZWN0LnByb3RvdHlwZSkpIHtcbiAgICAgICAgb3JpZ2luYWxQcm9wZXJ0eSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY2hlY2tQcm90bywgbWluaWZpZWRLZXkpO1xuICAgICAgICBjaGVja1Byb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGNoZWNrUHJvdG8pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBnZXR0ZXIgPSBvcmlnaW5hbFByb3BlcnR5ICYmIG9yaWdpbmFsUHJvcGVydHkuZ2V0O1xuICAgICAgY29uc3Qgc2V0dGVyID0gb3JpZ2luYWxQcm9wZXJ0eSAmJiBvcmlnaW5hbFByb3BlcnR5LnNldDtcblxuICAgICAgLy8gY3JlYXRlIGEgZ2V0dGVyIGFuZCBzZXR0ZXIgZm9yIHByb3BlcnR5XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sIG1pbmlmaWVkS2V5LCB7XG4gICAgICAgIGdldDogZ2V0dGVyIHx8XG4gICAgICAgICAgICAoc2V0dGVyID8gdW5kZWZpbmVkIDogZnVuY3Rpb24odGhpczogT25DaGFuZ2VzRXhwYW5kbykgeyByZXR1cm4gdGhpc1twcml2YXRlTWluS2V5XTsgfSksXG4gICAgICAgIHNldDxUPih0aGlzOiBPbkNoYW5nZXNFeHBhbmRvLCB2YWx1ZTogVCkge1xuICAgICAgICAgIGxldCBzaW1wbGVDaGFuZ2VzID0gdGhpc1tQUklWQVRFX1BSRUZJWF07XG4gICAgICAgICAgaWYgKCFzaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgICAgICBzaW1wbGVDaGFuZ2VzID0ge307XG4gICAgICAgICAgICAvLyBQbGFjZSB3aGVyZSB3ZSB3aWxsIHN0b3JlIFNpbXBsZUNoYW5nZXMgaWYgdGhlcmUgaXMgYSBjaGFuZ2VcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBQUklWQVRFX1BSRUZJWCwge3ZhbHVlOiBzaW1wbGVDaGFuZ2VzLCB3cml0YWJsZTogdHJ1ZX0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGlzRmlyc3RDaGFuZ2UgPSAhdGhpcy5oYXNPd25Qcm9wZXJ0eShwcml2YXRlTWluS2V5KTtcbiAgICAgICAgICBjb25zdCBjdXJyZW50Q2hhbmdlID0gc2ltcGxlQ2hhbmdlc1tkZWNsYXJlZE5hbWVdO1xuXG4gICAgICAgICAgaWYgKGN1cnJlbnRDaGFuZ2UpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDaGFuZ2UuY3VycmVudFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNpbXBsZUNoYW5nZXNbZGVjbGFyZWROYW1lXSA9XG4gICAgICAgICAgICAgICAgbmV3IFNpbXBsZUNoYW5nZSh0aGlzW3ByaXZhdGVNaW5LZXldLCB2YWx1ZSwgaXNGaXJzdENoYW5nZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzRmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIHBsYWNlIHdoZXJlIHRoZSBhY3R1YWwgdmFsdWUgd2lsbCBiZSBzdG9yZWQgYW5kIG1ha2UgaXQgbm9uLWVudW1lcmFibGVcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcml2YXRlTWluS2V5LCB7dmFsdWUsIHdyaXRhYmxlOiB0cnVlfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXNbcHJpdmF0ZU1pbktleV0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2V0dGVyKSBzZXR0ZXIuY2FsbCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIElmIGFuIG9uSW5pdCBob29rIGlzIGRlZmluZWQsIGl0IHdpbGwgbmVlZCB0byB3cmFwIHRoZSBuZ09uQ2hhbmdlcyBjYWxsXG4gIC8vIHNvIHRoZSBjYWxsIG9yZGVyIGlzIGNoYW5nZXMtaW5pdC1jaGVjayBpbiBjcmVhdGlvbiBtb2RlLiBJbiBzdWJzZXF1ZW50XG4gIC8vIGNoYW5nZSBkZXRlY3Rpb24gcnVucywgb25seSB0aGUgY2hlY2sgd3JhcHBlciB3aWxsIGJlIGNhbGxlZC5cbiAgaWYgKGRlZmluaXRpb24ub25Jbml0ICE9IG51bGwpIHtcbiAgICBkZWZpbml0aW9uLm9uSW5pdCA9IG9uQ2hhbmdlc1dyYXBwZXIoZGVmaW5pdGlvbi5vbkluaXQpO1xuICB9XG5cbiAgZGVmaW5pdGlvbi5kb0NoZWNrID0gb25DaGFuZ2VzV3JhcHBlcihkZWZpbml0aW9uLmRvQ2hlY2spO1xufVxuXG5mdW5jdGlvbiBvbkNoYW5nZXNXcmFwcGVyKGRlbGVnYXRlSG9vazogKCgpID0+IHZvaWQpIHwgbnVsbCkge1xuICByZXR1cm4gZnVuY3Rpb24odGhpczogT25DaGFuZ2VzRXhwYW5kbykge1xuICAgIGNvbnN0IHNpbXBsZUNoYW5nZXMgPSB0aGlzW1BSSVZBVEVfUFJFRklYXTtcbiAgICBpZiAoc2ltcGxlQ2hhbmdlcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLm5nT25DaGFuZ2VzKHNpbXBsZUNoYW5nZXMpO1xuICAgICAgdGhpc1tQUklWQVRFX1BSRUZJWF0gPSBudWxsO1xuICAgIH1cbiAgICBpZiAoZGVsZWdhdGVIb29rKSBkZWxlZ2F0ZUhvb2suYXBwbHkodGhpcyk7XG4gIH07XG59XG4iXX0=