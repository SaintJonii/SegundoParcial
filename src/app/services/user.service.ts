import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  isAdmin(): boolean {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.userType == "1") {
      return true;
    }
    else {
      return false;
    }
  }

  guardarMascota(tipo: string, raza: string, nombre: string, edad: number, dueño: string) { }

  actualizarMascota(edad: number, dueño: string) { }

}
