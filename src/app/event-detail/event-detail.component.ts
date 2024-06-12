import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.css'
})
export class EventDetailComponent {
  event: Event = { id: 0, title: '', date: '', location: '', description: '' };
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam === null) {
      this.errorMessage = 'Event ID is missing';
      return;
    }

    const id = +idParam;
    this.eventService.getEvent(id).subscribe({
      next: event => {
        if (event) {
          this.event = event;
        } else {
          console.error('Event not found');
        }
      },
      error: err => {
        this.errorMessage = 'Error fetching event';
        console.error(err);
      }
    });
  }
  deleteEvent(): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(this.event.id).subscribe({
        next: () => {
          alert('Event deleted successfully');
        },
        error: err => {
          this.errorMessage = 'Could not delete the event';
          console.error(err);
        }
      });
    }
  }
}
