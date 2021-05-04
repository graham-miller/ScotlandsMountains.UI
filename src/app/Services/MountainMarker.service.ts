import { formatNumber } from "@angular/common";
import { Injectable } from "@angular/core";
import { Mountain } from "../Models/Mountain";
import { MetresToFeetPipe } from "../Pipes/metres-to-feet.pipe";
import { MapService } from "./Map.service";

@Injectable()
export class MountainMarkerService {

    constructor(
        private mapService: MapService,
        private metresToFeet: MetresToFeetPipe,
    ) { }

    public getMarker(mountain: Mountain, zIndex: number): L.Marker {
        const marker = this.mapService.createMarker([mountain.location.coordinates[1], mountain.location.coordinates[0]], { zIndexOffset: zIndex });
        marker.on('mouseover', e => this.showPopup(e, mountain));
        marker.on('mouseout', e => this.hidePopup(e));
        marker.on('click', e => this.togglePopup(e, mountain));

        return marker;
    }

    private togglePopup(event: L.LeafletEvent, mountain: Mountain) {
        if (event.target.getPopup()) {
            this.hidePopup(event);
        } else {
            this.showPopup(event, mountain);
        }
    }

    private showPopup(event: L.LeafletEvent, mountain: Mountain) {
        event.target.bindPopup(this.getPopupText(mountain)).openPopup();
    }

    private hidePopup(event: L.LeafletEvent) {
        event.target.closePopup();
        event.target.unbindPopup();
    }

    private getPopupText(mountain: Mountain): string {
        const meters = formatNumber(mountain.height.metres, 'en-GB', '1.0-0');
        const feet = formatNumber(this.metresToFeet.transform(mountain.height.metres), 'en-GB', '1.0-0');
        return `<span>${mountain.name}<br/>${meters}m (${feet}ft)</span>`
    }
}