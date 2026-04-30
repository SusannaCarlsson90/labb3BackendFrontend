import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  workExperiences: any[] = [];

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      const res = await fetch("http://localhost:3000/workexperiences");
      if (res.ok) {
        this.workExperiences = await res.json();
      }
    } catch (error) {
      console.error("Kunde inte hämta data till startsidan", error);
    }
  }
}