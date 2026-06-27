import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']   // ✅ fixed
})
export class ContactComponent {
  contactData = {
    name: '',
    email: '',
    message: ''
  };

  private apiUrl = 'https://localhost:7219/api/ContactForm';

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log('Form Data:', this.contactData);

    this.http.post(this.apiUrl, this.contactData).subscribe({
      next: (res) => {
        console.log('Response from API:', res);
        alert(`Thank you ${this.contactData.name}, your message has been sent!`);
        this.contactData = { name: '', email: '', message: '' }; // reset form
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Something went wrong while sending your message.');
      }
    });
  }
}
