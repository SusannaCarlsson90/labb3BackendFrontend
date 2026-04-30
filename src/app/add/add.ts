import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  imports: [CommonModule],
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add implements OnInit {
  //Sparar jobben från databasen
  workExperiences: any [] = [];
  ngOnInit() {
    this.getData();

    //Hämta data från min databas
    async getLocaleDateFormat() {
      try {
        const res = await fetch("http://localhost:5001/workexperience")
        if (!res.ok) {
          throw new Error("Kunde inte hämta data");
        }
        this.workExperiences = await res.json();
      } catch (error) {
        console.error("Fel vid hämtning:", error);
      }
    }
  }
}
