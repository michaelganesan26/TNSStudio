"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var core_1 = require("@angular/core");
var services_1 = require("./services");
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule
            ],
            providers: services_1.PROVIDERS.slice(),
            exports: [
                nativescript_module_1.NativeScriptModule
            ]
        })
    ], CoreModule);
    return CoreModule;
}());
exports.CoreModule = CoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGdGQUE4RTtBQUM5RSxzQ0FBeUM7QUFDekMsdUNBQXVDO0FBYXZDO0lBQUE7SUFBMEIsQ0FBQztJQUFkLFVBQVU7UUFWdEIsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFDO2dCQUNKLHdDQUFrQjthQUNyQjtZQUNELFNBQVMsRUFBSyxvQkFBUyxRQUFDO1lBQ3hCLE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7YUFDckI7U0FFRixDQUFDO09BQ1csVUFBVSxDQUFJO0lBQUQsaUJBQUM7Q0FBQSxBQUEzQixJQUEyQjtBQUFkLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQUk9WSURFUlMgfSBmcm9tICcuL3NlcnZpY2VzJztcblxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOltcbiAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6Wy4uLlBST1ZJREVSU10sXG4gIGV4cG9ydHM6IFtcbiAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZVxuICBdXG5cbn0pXG5leHBvcnQgY2xhc3MgQ29yZU1vZHVsZSB7IH0iXX0=