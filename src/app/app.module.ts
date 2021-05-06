import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LegalComponent } from './Components/legal/legal.component';
import { ClassificationTableComponent } from './Components/classification-table/classification-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MetresToFeetPipe } from './Pipes/metres-to-feet.pipe';
import { MapComponent } from './Components/map/map.component';
import { MapService } from './Services/Map.service';
import { MapMarkerService } from './Services/MapMarker.service';
import { ClassificationsComponent } from './Components/classifications/classifications.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { GettyComponent } from './Components/getty/getty.component';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LegalComponent,
    MapComponent,
    MetresToFeetPipe,
    ClassificationsComponent,
    ClassificationTableComponent,
    PageNotFoundComponent,
    GettyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule, 
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatOptionModule
  ],
  providers: [
    MetresToFeetPipe,
    MapService,
    MapMarkerService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
