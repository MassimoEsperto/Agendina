import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'buon-giorno',
  templateUrl: './buon-giorno.component.html',
  styleUrls: ['./buon-giorno.component.scss']
})
export class BuonGiornoComponent implements OnInit {

  title: string = "BUON GIORNO";
  animazione: boolean = true

  constructor() { }

  ngOnInit() {
    this.changeAnimation()
  }

  changeAnimation() {
    setTimeout(() => {
      this.animazione = false
    }, 3000);
  }

}
