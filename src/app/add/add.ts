import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add implements OnInit {
  // Behållaren för listan
  workExperiences: any[] = [];

  // Behållaren för det nya som skrivs in
  newExperience = {
    companyname: '',
    jobtitle: '',
    location: '',
    description: ''
  };

  ngOnInit() {
    this.getData();
  }

  // Hämta data
  async getData() {
    try {
      const res = await fetch("http://localhost:5001/workexperience");
      if (res.ok) {
        this.workExperiences = await res.json();
      }
    } catch (error) {
      console.error("Kunde inte hämta", error);
    }
  }

  // SPARA DATA 
  async addExperience() {
    try {
      const res = await fetch("http://localhost:5001/workexperience", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.newExperience)
      });

      if (res.ok) {
        // Töm formuläret
        this.newExperience = { companyname: '', jobtitle: '', location: '', description: '' };
        // Uppdatera listan
        this.getData();
      }
    } catch (error) {
      console.error("Kunde inte spara", error);
    }
  }
} 