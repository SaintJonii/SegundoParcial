import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  idMateria: string;

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

  isAlumno(): boolean {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user.userType == "3") {
      return true;
    }
    else {
      return false;
    }
  }


  guardarMateria(nombre: string, cuatri: string, cupo: string, año: number, profe: string) {

    debugger;
    this.afs.collection('materias').doc(this.idMateria).set(
      {
        id: this.idMateria,
        cuatri: cuatri,
        cupo: cupo,
        nombre: nombre,
        anio: año,
        profe: profe
      }
    );

    this.getNextId();
  }

  guardarMateriaAlumno(id: string, alumno: string, alumnoId: string, cupo: string) {

    debugger;
    this.afs.collection('materias').doc(id).collection('alumnos').add({
      alumno: alumno,
      alumnoId: alumnoId,
      fecha: new Date()
    });

    this.actualizarCupo(id, cupo);
    this.getNextId();
  }

  actualizarCupo(id: String, cupo: String) {
    this.afs.collection('materias').doc(id.toString()).update({
      cupo: cupo
    });


  }



  guardarTurno(userMail: string, nombre: string, tipo: string, fecha: string) {

    this.afs.collection('turnos').add(
      {
        user: userMail,
        nombre: nombre,
        tipo: tipo,
        fecha: fecha
      }
    );

  }

  getNextId() {
    const doc1 = this.afs.collection('materias',
      ref => ref.orderBy('id', 'asc')
    );

    doc1.valueChanges()
      .subscribe(data => {
        //cuando la tabla esta vacia, cargo el primer ID por default
        if (data.length == 0) {
          this.idMateria = "1";
        }
        else {
          let lastItem: any = data.pop();
          this.idMateria = (parseInt(lastItem.id) + 1).toString();
        }


      });
  }

}
