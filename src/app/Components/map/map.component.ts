import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { formatNumber } from '@angular/common';
import { ClassificationMountain } from 'src/app/Models/Classification';
import { MetresToFeetPipe } from 'src/app/Pipes/metres-to-feet.pipe';
import { LeafletService } from 'src/app/Services/leaflet.service';

@Component({
    selector: 'map',
    template: '<div id="map"></div>',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @Input()mountains: ClassificationMountain[] = [];
  
  map?: L.Map | undefined;

  private markers = this.leafletService.layerGroup();

  constructor(
    private leafletService: LeafletService,
    private metresToFeet: MetresToFeetPipe,
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.map = this.leafletService.map('map', {
      center: [56.659406, -4.011214],
      zoom: 7,
      gestureHandling: true
    } as L.MapOptions);

    this.addBaseLayers();
    this.addMapControls();

    this.addMountainsToMap();
  }

  ngOnDestroy() {
    this.destroyMap();
  }

  private addBaseLayers() {
    const outdoors = this.createThunderforestTileLayer('outdoors');
    const landscape = this.createThunderforestTileLayer('landscape');
    const transport = this.createThunderforestTileLayer('transport');
    const cycle = this.createThunderforestTileLayer('cycle');

    const baseLayers = {
      'Outdoors': outdoors,
      'Landscape': landscape,
      'Transport': transport,
      'Cycle': cycle
    };

    const markers = this.leafletService.layerGroup([this.markers]);

    if (this.map) {
      this.leafletService.control.layers(baseLayers, {'Markers': markers}).addTo(this.map);
      outdoors.addTo(this.map);
      markers.addTo(this.map);
    }
  }

  private createThunderforestTileLayer(moniker: string): L.TileLayer {
    return this.leafletService.tileLayer(
      `https://tile.thunderforest.com/${moniker}/{z}/{x}/{y}.png?apikey=231e70bf20b64d8ca94199922441d3f7`,
      { maxZoom: 18 });
  }

  private addMapControls() {
    if (this.map) {
      this.map.attributionControl.setPrefix('');

      this.leafletService.control.scale({
        maxWidth: 200,
        metric: true,
        imperial: true,
        updateWhenIdle: false,
        position: 'bottomright'
      }).addTo(this.map);
    }
  }

  private addMountainsToMap() {
    this.removeMountainsFromMap();
    if (this.map) {
      const group = /*mountains.length > 300 ? this.clusteredMarkers :*/ this.markers;
      this.mountains.forEach((m, i) => group.addLayer(this.getMarker(m, -i)));
      this.map.flyToBounds(this.getBounds(this.mountains));
    }
  }

  private removeMountainsFromMap() {
    this.markers.clearLayers();
    //this.clusteredMarkers.clearLayers();
  }

  private getMarker(mountain: ClassificationMountain, zIndex: number): L.Marker {
    let marker = this.leafletService.marker([mountain.location.coordinates[1], mountain.location.coordinates[0]], { zIndexOffset: zIndex });
    marker.on('mouseover', e => this.showPopup(e, mountain));
    marker.on('mouseout', e => this.hidePopup(e));
    marker.on('click', e => this.togglePopup(e, mountain));

    return marker;
  }

  private togglePopup(event: L.LeafletEvent, mountain: ClassificationMountain) {
    if (event.target.getPopup()) {
      this.hidePopup(event);
    } else {
      this.showPopup(event, mountain);
    }
  }

  private showPopup(event: L.LeafletEvent, mountain: ClassificationMountain) {
    event.target.bindPopup(this.getPopupText(mountain)).openPopup();
  }

  private hidePopup(event: L.LeafletEvent) {
    event.target.closePopup();
    event.target.unbindPopup();
  }

  private getPopupText(mountain: ClassificationMountain): string {
    const meters = formatNumber(mountain.height.metres, 'en-GB', '1.0-0');
    const feet = formatNumber(this.metresToFeet.transform(mountain.height.metres), 'en-GB', '1.0-0');
    return `<span>${mountain.name}<br/>${meters}m (${feet}ft)</span>`    
  }

  private getBounds(mountains: ClassificationMountain[]): L.LatLngBoundsExpression {
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

  private destroyMap() {
    if (this.map) {
      this.map.off();
      this.map.remove();
      this.map.getContainer().replaceWith(this.elementRef.nativeElement.innerHTML);
    }
  }
}
