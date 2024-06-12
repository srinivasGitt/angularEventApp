import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EventListComponent, EventDetailComponent, EventFormComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'event-management-app';
}
