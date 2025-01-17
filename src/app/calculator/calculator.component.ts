import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculator',
  imports: [MatToolbarModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  constructor(private router: Router){}
  navigateBackToHome(){
    this.router.navigate(['/dashboard'])

  }

}
