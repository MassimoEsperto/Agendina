import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'my-spinner',
  templateUrl: './my-spinner.component.html',
  styleUrls: ['./my-spinner.component.scss']
})
export class MySpinnerComponent implements OnInit {

  @Input() view: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

}
