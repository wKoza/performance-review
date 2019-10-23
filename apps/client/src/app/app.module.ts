import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DialogTemplateComponent } from './shared/components/dialog/dialog-template.component';
import { KeyValuePipe } from './shared/pipes/key-value.pipe';

const appRoutes: Routes = [
  { path: 'landing-page', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', pathMatch: 'full', redirectTo: 'landing-page' },
  { path: '*', pathMatch: 'full', redirectTo: 'landing-page' }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    DialogTemplateComponent,
    KeyValuePipe
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [],
  entryComponents: [DialogTemplateComponent, DashboardComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
