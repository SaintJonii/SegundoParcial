import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent implements OnInit {

  mascotas = [
    { id: 1, tipo: "PERRO" },
    { id: 2, tipo: "GATO" },
    { id: 3, tipo: "HURON" },
  ];

  isAdmin: boolean;

  tipoMascota;
  nombre;
  mailUser;
  fecha;
  listTurnos: any = [];

  constructor(private userService: UserService, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();

    let user: any = JSON.parse(localStorage.getItem('user'));
    this.nombre = user.name;
    this.mailUser = user.user;
    this.getTurnos();
  }

  nuevoTurno() {
    debugger;
    this.userService.guardarTurno(this.mailUser, this.nombre, this.tipoMascota, this.fecha);
    this.getTurnos();
    this.limpiarInputs();
  }

  getTurnos() {
    let doc1;

    if (this.isAdmin) {
      doc1 = this.afs.collection('turnos');
    }
    else {
      doc1 = this.afs.collection('turnos',
        ref => ref.where('user', '==', this.mailUser)
      );
    }

    doc1.valueChanges()
      .subscribe(data => {
        debugger;
        this.listTurnos = data;
      });
  }

  limpiarInputs() {
    this.nombre = null;
    this.fecha = null;
    this.tipoMascota = null;
  }

}
