import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LegalComponent } from './Components/legal/legal.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'search/:term', component: SearchComponent },
  // { path: 'search', component: SearchComponent },
  // { path: 'classifications/:id', component: ClassificationsComponent },
  // { path: 'classifications', component: ClassificationsComponent },
  // { path: 'mountain/:id', component: MountainComponent },
  { path: 'legal/:type', component: LegalComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
