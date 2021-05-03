import { Injectable } from "@angular/core";
import * as L from 'leaflet';
import GestureHandling from 'leaflet-gesture-handling';

L.Marker.prototype.options.icon = L.divIcon({ className: 'mountain-marker' });
L.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

@Injectable()
export class LeafletService {

    map(element: string | HTMLElement, options?: L.MapOptions | undefined) {
        return L.map(element, options);
    }

    layerGroup(layers?: L.Layer[] | undefined, options?: L.LayerOptions | undefined): L.LayerGroup<any> {
        return L.layerGroup(layers, options);
    }


    tileLayer(urlTemplate: string, options?: L.TileLayerOptions | undefined): L.TileLayer {
        return L.tileLayer(urlTemplate, options);
    }

    get control() {
        return L.control;
    }

    marker(latlng: L.LatLngExpression, options?: L.MarkerOptions | undefined): L.Marker<any> {
        return L.marker(latlng, options);
    }
}