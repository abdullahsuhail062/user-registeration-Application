import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { evaluate } from 'mathjs';

@Component({
  selector: 'app-calculator',
  imports: [MatToolbarModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

input: string = ''
  
  constructor(private router: Router){}
  navigateBackToHome(){
    this.router.navigate(['/dashboard'])

  }
 

  onButtonClick(value: string): void {
    this.input += value;
  }

  // Calculate the result
  onCalculate(): void {
    try {
      this.input = evaluate(this.input); // Evaluate the expression (use carefully)
    } catch (error) {
      this.input = 'Error'; // Handle invalid expressions
    }
  }

  // Clear the input field
  onClear(): void {
    this.input = '';
  }
  onDeleteLast(){
    this.input = this.input.slice(0,-1)
  }


}
