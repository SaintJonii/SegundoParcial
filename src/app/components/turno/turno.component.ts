import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.scss']
})
export class TurnoComponent implements OnInit {

  adminType: string = "1";
  isAdmin: boolean;
  nombre;
  email;

  password;

  listAdmins: any = [];

  constructor(private authService: AuthService, private userService: UserService, private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();

  }

  nuevoAdmin() {
    this.authService.registerUser(this.email, this.password, this.adminType, this.nombre);
    this.limpiarInputs();
  }

  limpiarInputs() {
    this.nombre = null;
    this.email = null;
    this.password = null;
  }

}
