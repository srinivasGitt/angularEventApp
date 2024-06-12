import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from './event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Event[] = this.getEventsFromLocalStorage();
  private eventsSubject = new BehaviorSubject<Event[]>(this.events);

  constructor() {}

  private getEventsFromLocalStorage(): Event[] {
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
  }

  private saveEventsToLocalStorage(events: Event[]): void {
    localStorage.setItem('events', JSON.stringify(events));
  }

  getEvents(): Observable<Event[]> {
    return this.eventsSubject.asObservable();
  }

  getEvent(id: number): Observable<Event | undefined> {
    return new Observable<Event | undefined>(observer => {
      const event = this.events.find(event => event.id === id);
      observer.next(event);
      observer.complete();
    });
  }

  addEvent(event: Event): Observable<void> {
    return new Observable<void>(observer => {
      event.id = this.events.length > 0 ? Math.max(...this.events.map(e => e.id)) + 1 : 1;
      this.events.push(event);
      this.saveEventsToLocalStorage(this.events);
      this.eventsSubject.next(this.events);
      observer.next();
      observer.complete();
    });
  }

  updateEvent(updatedEvent: Event): Observable<void> {
    return new Observable<void>(observer => {
      const index = this.events.findIndex(event => event.id === updatedEvent.id);
      if (index !== -1) {
        this.events[index] = updatedEvent;
        this.saveEventsToLocalStorage(this.events);
        this.eventsSubject.next(this.events);
      }
      observer.next();
      observer.complete();
    });
  }

  deleteEvent(id: number): Observable<void> {
    return new Observable<void>(observer => {
      this.events = this.events.filter(event => event.id !== id);
      this.saveEventsToLocalStorage(this.events);
      this.eventsSubject.next(this.events);
      observer.next();
      observer.complete();
    });
  }
}
