import { Component } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event.model';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [RouterModule, NgxPaginationModule, CommonModule,FormsModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  events: Event[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  filteredEvents: Event[] = [];
  searchQuery: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = [...this.events];
    });
  }

  filterEvents(): void {
    if (!this.searchQuery) {
      this.filteredEvents = [...this.events]; // If search query is empty, show all events
      return;
    }

    const query = this.searchQuery.toLowerCase().trim();
    this.filteredEvents = this.events.filter(event =>
      event.title.toLowerCase().includes(query) || event.location.toLowerCase().includes(query)
    );
  }

}
