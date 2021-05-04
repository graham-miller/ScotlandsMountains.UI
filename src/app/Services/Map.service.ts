import { Injectable } from "@angular/core";
import * as L from 'leaflet';
import GestureHandling from 'leaflet-gesture-handling';
import { Mountain } from "../Models/Mountain";

L.Marker.prototype.options.icon = L.divIcon({ className: 'mountain-marker' });
L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

@Injectable()
export class MapService {

    createMap(element: string | HTMLElement, markersLayer: L.LayerGroup<any>): L.Map {

        const map = L.map(element, this.mapOptions);
        map.attributionControl.setPrefix('');
        L.control.scale(this.scaleOptions).addTo(map);

        const markers = L.layerGroup([markersLayer]);

        L.control.layers(this.baseLayers, {'Markers': markers}).addTo(map);
        this.baseLayers['Outdoors'].addTo(map);
        markers.addTo(map);

        return map;
    }

    getBounds(mountains: Mountain[]): L.LatLngBoundsExpression {
        let minLat: number = 90;
        let maxLat: number = -90;
        let minLng: number = 180;
        let maxLng: number = -180;

        mountains.forEach(m => {
            minLat = m.location.coordinates[1] < minLat ? m.location.coordinates[1] : minLat;
            maxLat = m.location.coordinates[1] > maxLat ? m.location.coordinates[1] : maxLat;
            minLng = m.location.coordinates[0] < minLng ? m.location.coordinates[0] : minLng;
            maxLng = m.location.coordinates[0] > maxLng ? m.location.coordinates[0] : maxLng;
        })

        return [[minLat, minLng], [maxLat, maxLng]]
    }

    destroyMap(map: L.Map | undefined, replaceWith: string) {
        if (map) {
            map.off();
            map.remove();
            map.getContainer().replaceWith(replaceWith);
        }
    }

    createLayerGroup(layers?: L.Layer[] | undefined, options?: L.LayerOptions | undefined): L.LayerGroup<any> {
        return L.layerGroup(layers, options);
    }

    createMarker(latlng: L.LatLngExpression, options?: L.MarkerOptions | undefined): L.Marker<any> {
        return L.marker(latlng, options);
    }

    private mapOptions = {
        center: [56.659406, -4.011214],
        zoom: 7,
        gestureHandling: true,
    } as L.MapOptions;

    private scaleOptions = {
        maxWidth: 200,
        metric: true,
        imperial: true,
        updateWhenIdle: false,
        position: 'bottomright'
    } as L.Control.ScaleOptions;

    private baseLayers = {
        'Outdoors': this.createThunderforestTileLayer('outdoors'),
        'Landscape': this.createThunderforestTileLayer('landscape'),
        'Transport': this.createThunderforestTileLayer('transport'),
        'Cycle': this.createThunderforestTileLayer('cycle')
    };

    private createThunderforestTileLayer(moniker: string): L.TileLayer {
        return L.tileLayer(
            `https://tile.thunderforest.com/${moniker}/{z}/{x}/{y}.png?apikey=231e70bf20b64d8ca94199922441d3f7`,
            { maxZoom: 18 });
    }
}