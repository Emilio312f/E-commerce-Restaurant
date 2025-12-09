import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class ContactComponent {
  onSubmit(event: Event): void {
    event.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
  }
}
