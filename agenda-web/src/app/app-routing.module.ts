import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { CalendarComponent } from './calendar/calendar.component';
import { Resolver } from './resolver';


const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'calendar', component: CalendarComponent, resolve : { schedules : Resolver } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
