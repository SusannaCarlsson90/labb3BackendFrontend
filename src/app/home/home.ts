
import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
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


  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      const res = await fetch("http://localhost:3000/workexperiences");
      if (res.ok) {
        this.workExperiences = await res.json();
        
       
        this.cdr.detectChanges(); 
        
        console.log("Data har landat i variabeln:", this.workExperiences);
      }
    } catch (error) {
      console.error("Kunde inte hämta data", error);
    }
  }
  async deleteExperience(id: string) {
    if (confirm("Är du säker på att du vill radera denna erfarenhet?")) {
      try {
        const res = await fetch(`http://localhost:3000/workexperiences/${id}`, {
          method: "DELETE"
        });

        if (res.ok) {
          // Efter att vi raderat i databasen, anropar vi getData() 
          // igen för att hämta den uppdaterade listan till skärmen
          this.getData();
        }
      } catch (error) {
        console.error("Kunde inte radera", error);
      }
}
  }
}