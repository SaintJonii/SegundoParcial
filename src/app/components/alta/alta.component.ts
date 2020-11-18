import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from "@angular/fire/firestore";


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

  clientes: any = [];

  tipoMascota;
  raza;
  nombre;
  edad;
  propietario;

  constructor(private userService: UserService, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
    this.getCustomers();
  }

  nuevaMascota() {

  }

  getCustomers(): any {
    const doc1 = this.afs.collection('userType',
      ref => ref.where('type', '==', "2")
    );

    doc1.valueChanges()
      .subscribe(data => {
        this.clientes = data;
      });
  }

}
