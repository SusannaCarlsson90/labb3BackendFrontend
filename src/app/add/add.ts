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
    companyname: "",
    jobtitle: "",
    location: "",
    description: ""
  };

  ngOnInit() {
    this.getData();
  }

  // Hämta data
  async getData() {
    try {
      const res = await fetch("http://localhost:3000/workexperiences");
      if (res.ok) {
        this.workExperiences = await res.json();
      }
    } catch (error) {
      console.error("Kunde inte hämta", error);
    }
  }

  // SPARA DATA 
  async addExperience() {

    //Validering, inga tomma fält
   if (!this.newExperience.companyname || !this.newExperience.jobtitle || 
    !this.newExperience.location || !this.newExperience.description){
      alert("Vänligen fyll i alla fält innan du sparar!");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:3000/workexperiences", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.newExperience) 
      });
  
      if (res.ok) {
        // Töm formuläret FÖRST NÄR VI VET att det lyckades (res.ok)
        this.newExperience = { 
          companyname: '', 
          jobtitle: '', 
          location: '', 
          description: '' 
        };
        this.getData();
      }
    } catch (error) {
      console.error("Kunde inte spara", error);
    }
  }

//Radera erfarenhet
async deleteExperience(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/workexperiences/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      //Om det gick bra på servern, hämta listan igen så den raderade posten försvinner från mitt CV
      this.getData();
    } else {
      alert("Gick inte att radera från servern.");
    }
  } catch (error) {
    console.error("Fel vid radering:", error)
  }
}
} 
