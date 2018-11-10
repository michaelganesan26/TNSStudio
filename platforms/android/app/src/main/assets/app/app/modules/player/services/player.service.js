"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PlayerService = /** @class */ (function () {
    function PlayerService() {
        this.tracks = [];
    }
    PlayerService.prototype.play = function (index) {
        this.playing = true;
    };
    PlayerService.prototype.pause = function (index) {
        this.playing = false;
    };
    PlayerService.prototype.addTrack = function (track) {
        this.tracks.push(track);
    };
    PlayerService.prototype.removeTrack = function (track) {
        var index = this.getTrack(track);
        if (index > -1) {
            this.tracks.splice(index, 1);
        }
    };
    PlayerService.prototype.reorderTrack = function (track, newIndex) {
        var index = this.getTrack(track);
        if (index > -1) {
            this.tracks.splice(newIndex, 0, this.tracks.splice(index, 1)[0]);
        }
    };
    PlayerService.prototype.getTrack = function (track) {
        var index = -1;
        for (var i = 0; i < this.tracks.length; i++) {
            if (track.filepath === this.tracks[i].filepath) {
                index = i;
                break;
            }
        }
        return index;
    };
    PlayerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], PlayerService);
    return PlayerService;
}());
exports.PlayerService = PlayerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwbGF5ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUszQztJQUtJO1FBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLDRCQUFJLEdBQVgsVUFBWSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFTSw2QkFBSyxHQUFaLFVBQWEsS0FBYTtRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRU0sZ0NBQVEsR0FBZixVQUFnQixLQUFhO1FBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSxtQ0FBVyxHQUFsQixVQUFtQixLQUFhO1FBQzVCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxDQUFDO0lBRUwsQ0FBQztJQUVNLG9DQUFZLEdBQW5CLFVBQW9CLEtBQWEsRUFBRSxRQUFnQjtRQUMvQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7SUFDTCxDQUFDO0lBRU0sZ0NBQVEsR0FBZixVQUFnQixLQUFhO1FBQ3pCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2YsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUNWLEtBQUssQ0FBQztZQUNWLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBN0NRLGFBQWE7UUFEekIsaUJBQVUsRUFBRTs7T0FDQSxhQUFhLENBbUR6QjtJQUFELG9CQUFDO0NBQUEsQUFuREQsSUFtREM7QUFuRFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IElUcmFjayB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWxzL3RyYWNrLm1vZGVsJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGxheWVyU2VydmljZSB7XG5cbiAgICBwdWJsaWMgcGxheWluZzogYm9vbGVhbjtcbiAgICBwdWJsaWMgdHJhY2tzOiBBcnJheTxJVHJhY2s+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudHJhY2tzID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIHBsYXkoaW5kZXg6IG51bWJlcikge1xuICAgICAgICB0aGlzLnBsYXlpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBwYXVzZShpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHB1YmxpYyBhZGRUcmFjayh0cmFjazogSVRyYWNrKSB7XG4gICAgICAgIHRoaXMudHJhY2tzLnB1c2godHJhY2spO1xuICAgIH1cblxuICAgIHB1YmxpYyByZW1vdmVUcmFjayh0cmFjazogSVRyYWNrKTogdm9pZCB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0VHJhY2sodHJhY2spO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy50cmFja3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHVibGljIHJlb3JkZXJUcmFjayh0cmFjazogSVRyYWNrLCBuZXdJbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0VHJhY2sodHJhY2spO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy50cmFja3Muc3BsaWNlKG5ld0luZGV4LCAwLCB0aGlzLnRyYWNrcy5zcGxpY2UoaW5kZXgsIDEpWzBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUcmFjayh0cmFjazogSVRyYWNrKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50cmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0cmFjay5maWxlcGF0aCA9PT0gdGhpcy50cmFja3NbaV0uZmlsZXBhdGgpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cblxuXG5cblxuXG59Il19