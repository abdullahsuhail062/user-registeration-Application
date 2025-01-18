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
export class CalculatorComponent implements OnInit {
  button: number =0
  buttons: [button: number] = [this.button]

  
  constructor(private router: Router){}
  navigateBackToHome(){
    this.router.navigate(['/dashboard'])

  }

  ngOnInit(): void {
    this.buttons.push(this.button)
  }

}
