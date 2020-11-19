import { AfterViewInit, Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nombre', 'cuatri', 'anio', 'profe', 'cupo', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() listMaterias;
  @Input() isUpdate;
  @Input() isAlumno;
  @Output() materiaModif = new EventEmitter<any>();
  showTable: boolean;
  listAlumnos = [];


  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.listMaterias);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<any>(this.listMaterias);
  }

  editarMateria(id, nombre, cuatri, cupo) {
    let element = {
      id: id,
      nombre: nombre,
      cuatri: cuatri,
      cupo: cupo
    }
    this.materiaModif.emit(element);
  }

  verAlumnos(id) {

    const doc1 = this.afs.collection('materias').doc(id.toString()).collection('alumnos');

    doc1.valueChanges()
      .subscribe(data => {
        this.listAlumnos = data;
      });

  }


}

