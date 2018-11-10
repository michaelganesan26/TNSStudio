"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var core_1 = require("@angular/core");
var services_1 = require("./services");
var PlayerModule = /** @class */ (function () {
    function PlayerModule() {
    }
    PlayerModule = __decorate([
        core_1.NgModule({
            imports: [nativescript_module_1.NativeScriptModule],
            providers: services_1.PROVIDERS.slice(),
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], PlayerModule);
    return PlayerModule;
}());
exports.PlayerModule = PlayerModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBsYXllci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnRkFBOEU7QUFDOUUsc0NBQTJEO0FBQzNELHVDQUF1QztBQVF2QztJQUFBO0lBQTRCLENBQUM7SUFBaEIsWUFBWTtRQU54QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBRSx3Q0FBa0IsQ0FBRTtZQUMvQixTQUFTLEVBQU8sb0JBQVMsUUFBRTtZQUMzQixPQUFPLEVBQUUsQ0FBRSx1QkFBZ0IsQ0FBRTtTQUNoQyxDQUFDO09BRVcsWUFBWSxDQUFJO0lBQUQsbUJBQUM7Q0FBQSxBQUE3QixJQUE2QjtBQUFoQixvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQUk9WSURFUlMgfSBmcm9tIFwiLi9zZXJ2aWNlc1wiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFsgTmF0aXZlU2NyaXB0TW9kdWxlIF0sXG4gICAgcHJvdmlkZXJzOiBbIC4uLlBST1ZJREVSUyBdLFxuICAgIHNjaGVtYXM6IFsgTk9fRVJST1JTX1NDSEVNQSBdXG59KVxuXG5leHBvcnQgY2xhc3MgUGxheWVyTW9kdWxlIHsgfVxuXG5cblxuIl19