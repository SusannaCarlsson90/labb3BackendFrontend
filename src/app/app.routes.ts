import { Routes } from '@angular/router';
import { Home } from './home/home';        
import { About } from './about/about';       
import { Add } from './add/add';             
import { Notfound } from './notfound/notfound'; 

export const routes: Routes = [
  { path: "home", component: Home },         
  { path: "about", component: About },     
  { path: "add", component: Add },           
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "404", component: Notfound },      
  { path: "**", redirectTo: "404", pathMatch: "full" }
];