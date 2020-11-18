import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  idMascota: string;

  constructor(private afs: AngularFirestore) {
    this.getNextId();
  }

  isAdmin(): boolean {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.userType == "1") {
      return true;
    }
    else {
      return false;
    }
  }

  guardarMascota(tipo: string, raza: string, nombre: string, edad: number, propietario: string) {

    this.afs.collection('mascotas').doc(this.idMascota).set(
      {
        id: this.idMascota,
        tipo: tipo,
        raza: raza,
        nombre: nombre,
        edad: edad,
        propietario: propietario
      }
    );

    this.getNextId();
  }

  actualizarMascota(edad: number, dueño: string, id: string) {

    this.afs.collection('mascotas').doc(id).update({
      edad: edad,
      propietario: dueño
    });

    this.getNextId();
  }





  getNextId() {
    const doc1 = this.afs.collection('mascotas',
      ref => ref.orderBy('id', 'asc')
    );

    doc1.valueChanges()
      .subscribe(data => {
        let lastItem: any = data.pop();
        this.idMascota = (parseInt(lastItem.id) + 1).toString();
      });
  }

}
