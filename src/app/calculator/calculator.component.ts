import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculator',
  imports: [MatToolbarModule,NgFor],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

buttons: {button: number}[] = []

  
  constructor(private router: Router){}
  navigateBackToHome(){
    this.router.navigate(['/dashboard'])

  }
 

  onButtonClick(value: string){}

  onCalculate(){
    
  }


}
