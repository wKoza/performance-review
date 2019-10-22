import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { KeyValuePipe } from './shared/pipes/key-value.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './shared/components/dialog/dialog.component';

const appRoutes: Routes = [
  { path: 'landing-page', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', pathMatch: 'full', redirectTo: 'landing-page' },
  { path: '*', pathMatch: 'full', redirectTo: 'landing-page' }
];

@NgModule({
  declarations: [AppComponent, LandingComponent, DashboardComponent, DialogComponent, KeyValuePipe],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
