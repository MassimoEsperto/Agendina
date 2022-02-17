import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'my-toast',
  templateUrl: './my-toast.component.html',
  styleUrls: ['./my-toast.component.scss']
})
export class MyToastComponent implements OnInit {

  @Input() testo: string = '';

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.testo != '') {
      setTimeout(() => {
        this.testo = ''
      }, 3000);
    }
  }

}
