import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';

const appRoutes: Routes = [
  { path: 'landing-page', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', pathMatch: 'full', redirectTo: 'landing-page'},
  { path: '*', pathMatch: 'full', redirectTo: 'landing-page'}
];

@NgModule({
  declarations: [AppComponent, LandingComponent, DashboardComponent],
  imports: [
    BrowserModule,
    MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
