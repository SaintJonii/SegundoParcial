import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styles: ['./alta.component.scss']
})
export class AltaComponent implements OnInit {

  mascotas = [
    { id: 1, tipo: "PERRO" },
    { id: 2, tipo: "GATO" },
    { id: 3, tipo: "HURON" },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
