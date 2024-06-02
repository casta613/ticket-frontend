import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ticket } from '../../interface/ticket';
import { TicketService } from '../../services/ticket.service';
import { Estado } from '../../interface/estado';
import { PlantillaTicket } from '../../interface/plantilla-ticket';
import { PlantillaTicketService } from '../../services/plantilla-ticket.service';
import { Prioridad } from '../../interface/prioridad';
import { AtributosService } from '../../services/atributos.service';
import { Usuario } from '../../interface/usuario';
import { UsuarioService } from '../../services/usuario.service';

import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  form: FormGroup;

  listaEstado:Estado[]=[];
  dataSource = new MatTableDataSource<Estado>(this.listaEstado);
  listaPrioridad:Prioridad[]=[];
  dataSourcePrioridad = new MatTableDataSource<Prioridad>(this.listaPrioridad);
  listaUsuario:Usuario[]=[];
  dataSourceUsuario = new MatTableDataSource<Usuario>(this.listaUsuario);
  
  listaPlantilla:PlantillaTicket[]=[];
  dataSourcePlantilla = new MatTableDataSource<PlantillaTicket>(this.listaPlantilla);

  constructor(
    private dialogoReferencia: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public Editar: Ticket,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _ticketServicio: TicketService,
    private _servicioAtriutos: AtributosService,
    private _servicioPlantilla: PlantillaTicketService,
    private _servicioUsuario: UsuarioService,
    
  ) {
    this.form = this.fb.group({
      ID: [null, Validators.required],
      IDEncargado: [null, Validators.required],
      IDPlantilla: [null, Validators.required],
      IDEstado: [null, Validators.required],
      IDPrioridad: [null, Validators.required],
      IDCreador: [null, Validators.required],
      Descripcion:['', Validators.required],

    }) 
    

  }

  ngOnInit(): void {

    if (this.Editar) {
      this.form.patchValue({
        ID: this.Editar.ID,
        IDEncargado: this.Editar.IDEncargado,
        IDPlantilla: Number(this.Editar.IDPlantilla),
      IDEstado:Number(this.Editar.IDEstado),
      Descripcion: this.Editar.Descripcion,
      IDPrioridad: Number(this.Editar.IDPrioridad),
      IDCreador: Number(this.Editar.IDCreador),
     
        
        
      })

      this.form.get('IDEncargado')?.disable();
      this.form.get('IDPlantilla')?.disable();
      this.form.get('Descripcion')?.disable();
      this.form.get('IDCreador')?.disable();
    }else{
      this.form.get('IDEstado')?.disable();
    };
    this.listarEstados();
    this.listarPrioridad();
    this.listarUsuario();
    this.listarPlantilla();
   
  }

  

  listarEstados() {
    this._servicioAtriutos.getEstado().subscribe({
    next: (data) => {
      console.log('listarEstado');
      console.log(data);
      this.listaEstado = data;
      this.dataSource.data = this.listaEstado;
    },
    error: (e) => {
      // Manejar errores aquí
    }
  });

}

listarPrioridad() {
  this._servicioAtriutos.getPrioridad().subscribe({
  next: (data) => {
    console.log('listaPrioridad');
    console.log(data);
    this.listaPrioridad = data;
    this.dataSourcePrioridad.data = this.listaPrioridad;
  },
  error: (e) => {
    // Manejar errores aquí
  }
});

}

listarUsuario() {
  this._servicioUsuario.get().subscribe({
  next: (data) => {
    console.log('listaUsuario');
    console.log(data);
    this.listaUsuario = data;
    this.dataSourceUsuario.data = this.listaUsuario;
  },
  error: (e) => {
    // Manejar errores aquí
  }
});
}
listarPlantilla() {
  this._servicioPlantilla.get().subscribe({
  next: (data) => {
    console.log('listaPlantilla');
    console.log(data);
    this.listaPlantilla = data;
    this.dataSourcePlantilla.data = this.listaPlantilla;
  },
  error: (e) => {
    // Manejar errores aquí
  }
});
}


  
  agregar() {
    
    
    if (this.Editar) {
      const _ticket: Ticket = {
        ID:  this.form.value.ID == null ? 0 : this.form.value.ID,
        IDEncargado: Number(this.Editar.IDEncargado),
        IDPlantilla: Number(this.Editar.IDPlantilla),
        IDEstado:Number(this.form.value.IDEstado),
        Descripcion: this.Editar.Descripcion,
        IDPrioridad: Number(this.form.value.IDPrioridad),
        IDCreador: Number(this.Editar.IDCreador),
      }
      console.log(_ticket);
      this._ticketServicio.edit(_ticket).subscribe({
          next: (data) => {
  
            
              console.log(data);
              this.dialogoReferencia.close('editado')           
  
          },
          error: (e) => {
          },
          complete: () => {
          }
      }) 
      
      

    }else {
      
      const _ticket: Ticket = {
        ID:  this.form.value.ID == null ? 0 : this.form.value.ID,
        IDEncargado: Number(this.form.value.IDEncargado),
        IDPlantilla: Number(this.form.value.IDPlantilla),
        IDEstado:Number(this.form.value.IDEstado),
        Descripcion: this.form.value.Descripcion,
        IDPrioridad: Number(this.form.value.IDPrioridad),
        IDCreador: Number(this.form.value.IDCreador),
      }

      this._ticketServicio.save(_ticket).subscribe({
        next: (data) => {

          
            console.log(data);
            
            this.dialogoReferencia.close('agregado')           

        },
        error: (e) => {
        },
        complete: () => {
        }
    }) 


    }
  }
  cerrarDialogo() {
    this.dialogoReferencia.close(); 
  }



}
