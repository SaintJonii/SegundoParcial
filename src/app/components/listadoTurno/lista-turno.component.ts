import { AfterViewInit, Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-lista-turno',
  templateUrl: './lista-turno.component.html',
  styleUrls: ['./lista-turno.component.scss']
})
export class ListadoTurnoComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['alumno', 'nota', 'fecha'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() listAlumnos;
  showTable: boolean;

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.listAlumnos);
    this.dataSource.paginator = this.paginator;

  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<any>(this.listAlumnos);

  }

  hideTable() {
    if (this.listAlumnos.lenght == 0) {
      this.showTable = false;
    }
    else {
      this.showTable = true;
    }
  }

}

