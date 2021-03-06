import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { DialogTemplateComponent } from './shared/components/dialog/dialog-template.component';
import { EmployeeComponent } from './shared/components/employee/employee.component';
import { KeyValuePipe } from './shared/pipes/key-value.pipe';

const appRoutes: Routes = [
  { path: 'landing-page', component: LandingComponent },
  { path: 'employee/:id/user/:userId', component: EmployeeComponent },
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
    KeyValuePipe,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
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
