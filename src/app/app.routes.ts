import { Routes } from '@angular/router';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventFormComponent } from './event-form/event-form.component';
import { EventListComponent } from './event-list/event-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'events', component: EventListComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'add-event', component: EventFormComponent },
  { path: 'edit-event/:id', component: EventFormComponent },
  { path: '**', redirectTo: '/events' }
];
