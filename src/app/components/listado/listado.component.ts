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
  displayedColumns: string[] = ['nombre', 'tipo', 'raza', 'edad', 'propietario', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() listMascotas;
  @Input() isUpdate;
  @Output() mascotaModif = new EventEmitter<any>();

  constructor(private afs: AngularFirestore) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.listMascotas);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<any>(this.listMascotas);
  }

  editarMascota(e) {
    this.mascotaModif.emit(e);
  }


}

