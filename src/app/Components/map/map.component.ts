import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import { Mountain } from '../../Models/Mountain';
import { MapService } from '../../Services/Map.service';
import { MountainMarkerService } from '../../Services/MountainMarker.service';

@Component({
    selector: 'map',
    template: '<div id="map"></div>',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnDestroy {

  @Input()mountains: Mountain[] = [];
  
  map?: L.Map | undefined;

  private markers = this.mapService.createLayerGroup();

  constructor(
    private mapService: MapService,
    private mountainMarkerService: MountainMarkerService,
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.map = this.mapService.createMap('map', this.markers);
    this.addMountainsToMap();
  }

  ngOnDestroy() {
    this.mapService.destroyMap(this.map, this.elementRef.nativeElement.innerHTML);
  }

  private addMountainsToMap() {
    this.removeMountainsFromMap();
    if (this.map) {
      const group = /*mountains.length > 300 ? this.clusteredMarkers :*/ this.markers;
      this.mountains.forEach((m, i) => group.addLayer(this.mountainMarkerService.getMarker(m, -i)));
      this.map.flyToBounds(this.mapService.getBounds(this.mountains));
    }
  }

  private removeMountainsFromMap() {
    this.markers.clearLayers();
    //this.clusteredMarkers.clearLayers();
  }
}
