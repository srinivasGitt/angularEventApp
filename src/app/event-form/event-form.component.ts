import { Component } from '@angular/core';
import { Event } from '../event.model';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { EventService } from '../event.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLink],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {
  eventForm!: FormGroup;
  event!: Event | undefined;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      id: [''],
      title: [''],
      date: [''],
      location: [''],
      description: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEvent(+id).subscribe(event => {
        if (event) {
          this.event = event;
          this.eventForm.patchValue(event);
        } else {
          console.error(`Event with ID ${id} not found`);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.event) {
      this.eventService.updateEvent(this.eventForm.value).subscribe(() => {
        this.router.navigate(['/events']).then(success => {
          if (success) {
            console.log('Navigation successful');
          } else {
            console.error('Navigation failed');
          }
        });;
        this.eventForm.reset();
      });
    } else {
      this.eventService.addEvent(this.eventForm.value).subscribe(() => {
        this.router.navigate(['/events']).then(success => {
          if (success) {
            console.log('Navigation successful');
          } else {
            console.error('Navigation failed');
          }
        });
        this.eventForm.reset();
      });
    }
  }

  deleteEvent(): void {
    if (this.event) {
      this.eventService.deleteEvent(this.event.id).subscribe(() => {
        this.router.navigate(['/events']);
      });
    }
  }
}
