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
  userName;

  mascotas = [
    { id: 1, tipo: "PERRO" },
    { id: 2, tipo: "GATO" },
    { id: 3, tipo: "HURON" },
  ];

  clientes: any = [];
  listMascotas: any = [];

  tipoMascota;
  raza;
  nombre;
  edad;
  propietario;

  //variable para modificar
  isUpdate: boolean = false;
  id;

  constructor(private userService: UserService, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
    this.userName = JSON.parse(localStorage.getItem('user')).name;
    this.getCustomers();
    this.getMascotas();
  }

  nuevaMascota() {
    let dueño = this.isAdmin ? this.propietario : this.userName;
    this.userService.guardarMascota(this.tipoMascota, this.raza, this.nombre, this.edad, dueño);
    this.getMascotas();
    this.limpiarInputs();
  }

  actualizarMascota() {
    this.userService.actualizarMascota(this.edad, this.propietario, this.id);
    this.getMascotas();
    this.limpiarInputs();
    this.isUpdate = false;
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

  getMascotas() {
    const doc1 = this.afs.collection('mascotas');
    doc1.valueChanges()
      .subscribe(data => {
        this.listMascotas = data;
      });
  }

  mascotaModif(idMascota) {
    this.isUpdate = true;
    this.listMascotas.forEach(item => {
      if (item.id == idMascota) {
        debugger;
        this.id = item.id;
        this.tipoMascota = item.tipo;
        this.raza = item.raza;
        this.nombre = item.nombre;
        this.edad = item.edad;
        this.propietario = item.propietario;
      }
    });
  }

  limpiarInputs() {
    this.id = null;
    this.tipoMascota = null;
    this.raza = null;
    this.nombre = null;
    this.edad = null;
    this.propietario = null;
  }


}
