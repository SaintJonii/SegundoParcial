import { AfterViewInit, Component, ViewChild, OnInit, Input, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nombre', 'tipo', 'raza', 'edad'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() listMascotas;

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

}

