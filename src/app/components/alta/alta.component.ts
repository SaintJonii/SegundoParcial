import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']

})
export class AltaComponent implements OnInit {

  isAdmin: boolean;

  mascotas = [
    { id: 1, tipo: "PERRO" },
    { id: 2, tipo: "GATO" },
    { id: 3, tipo: "HURON" },
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
  }

  nuevaMascota() {

  }

}
