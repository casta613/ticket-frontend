import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TicketRegistro } from '../../interface/ticket-registro';
import { Ticket } from '../../interface/ticket';
import { TicketService } from '../../services/ticket.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dialogRegistro',
  templateUrl: './dialogRegistro.component.html',
  styleUrls: ['./dialogRegistro.component.css'],
})
export class DialogRegistroComponent implements OnInit {
  form: FormGroup;
  panelOpenState = false;
  listaTicketRegistro:TicketRegistro[]=[];
  dataSourceTicketRegistro = new MatTableDataSource<TicketRegistro>(this.listaTicketRegistro);
  disableButton =false;
  constructor(
    private dialogoReferencia: MatDialogRef<DialogRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public Agregar: Ticket,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ticketServicio: TicketService,
   
    
  ) {
    this.form = this.fb.group({
      IDTicket: [null, Validators.required],
      Accion:['', Validators.required],      
      Descripcion:['', Validators.required],

    }) 
    

  }

  ngOnInit(): void {

    if(this.Agregar.Estado === 'CERRADO' || this.Agregar.Estado === 'CANCELADO'){
      this.form.get('Accion')?.disable();
      this.form.get('Descripcion')?.disable();
      this.disableButton = true;
    }
    this.listarTicketRegistros();

  }

    
  agregar() {
    const _ticketRegistro: TicketRegistro = {
      IDTicket:  this.Agregar.ID,
      Descripcion: this.form.value.Descripcion,
      Accion: this.form.value.Accion,
      
    }
    
      console.log(_ticketRegistro);
      this._ticketServicio.saveLog(_ticketRegistro).subscribe({
          next: (data) => {
  
            
              console.log(data);
              this.dialogoReferencia.close('editado')           
  
          },
          error: (e) => {
          },
          complete: () => {
          }
      })    
          
    }
    listarTicketRegistros() {
      this._ticketServicio.getLog(this.Agregar.ID).subscribe({
      next: (data) => {
        this.listaTicketRegistro = data;
        this.dataSourceTicketRegistro.data = this.listaTicketRegistro;
      },
      error: (e) => {
        // Manejar errores aquí
      }
    });
  }
  cerrarDialogo() {
    this.dialogoReferencia.close(); 
  }



}
