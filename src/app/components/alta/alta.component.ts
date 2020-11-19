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
  isAlumno: boolean;
  userName;

  listCuatri = [
    { id: 1, name: "1ER CUATRIMESTRE" },
    { id: 2, name: "2DO CUATRIMESTRE" },
    { id: 3, name: "INGRESO" },
  ];

  listCurso = [
    { id: 1, name: "1ER AÑO" },
    { id: 2, name: "2DO AÑO" },
    { id: 3, name: "3ER AÑO" },
    { id: 3, name: "4TO AÑO" },
  ];

  listProfes: any = [];
  listMaterias: any = [];
  listAlumnos: any = [];

  curso;
  cupo;
  materia;
  cuatri;
  profesor;


  //variable para modificar
  showAlta: boolean = true;
  isUpdate: boolean = false;
  materiaId;
  alumno;
  alumnoId;
  nuevoCupo;

  constructor(private userService: UserService, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
    this.isAlumno = this.userService.isAlumno();
    this.showAlta = !this.isAlumno;

    this.userName = JSON.parse(localStorage.getItem('user')).name;
    this.userService.getNextId();
    this.getProfes();
    this.getMaterias();
    this.getAlumnos();

  }

  nuevaMateria() {
    debugger;
    this.userService.guardarMateria(this.materia, this.cuatri, this.cupo, this.curso, this.profesor);

    this.limpiarInputs();
    this.getMaterias();
  }


  getProfes(): any {
    const doc1 = this.afs.collection('userType',
      ref => ref.where('type', '==', "2")
    );
    doc1.valueChanges()
      .subscribe(data => {
        this.listProfes = data;
      });
  }

  getAlumnos(): any {
    const doc1 = this.afs.collection('userType',
      ref => ref.where('type', '==', "3")
    );
    doc1.valueChanges()
      .subscribe(data => {
        this.listAlumnos = data;
      });
  }

  getMaterias(): any {
    const doc1 = this.afs.collection('materias');
    doc1.valueChanges()
      .subscribe(data => {
        this.listMaterias = data;
      });
  }

  materiaModif(e) {
    console.log(e);
    if (this.isAlumno) {
      this.showAlta = true;
    }
    this.materia = e.nombre;
    this.cuatri = e.cuatri;
    this.materiaId = e.id;
    this.nuevoCupo = e.cupo;
    this.isUpdate = true;
  }

  agregarAlumno() {
    let cupoAdd = (parseInt(this.nuevoCupo) - 1).toString();
    this.userService.guardarMateriaAlumno(this.materiaId, this.alumno.name, this.alumno.id, cupoAdd);
    this.limpiarInputs();
    this.getAlumnos();
    this.getMaterias();
    this.isUpdate = false;
  }


  limpiarInputs() {
    this.materiaId = null;
    this.cuatri = null;
    this.cupo = null;
    this.curso = null;
    this.profesor = null;
    this.materia = null;
  }


}
