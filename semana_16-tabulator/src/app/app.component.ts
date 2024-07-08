import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CellComponent } from 'tabulator-tables';
import { TabulatorTasksComponent } from "./components/tabulator-task/tabulator-task.component";
enum Estado {
  SIN_INICIAR = 'Sin Iniciar',
  EN_PROCESO = 'En Proceso',
  TERMINADA = 'Terminada',
  CANCELADA = 'Cancelada',
  ABANDONADA = 'Abandonada sin Terminar',
}

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet , TabulatorTasksComponent]
})

export class AppComponent {
  title = 'Tabla de Tareas';
  editRowButton(): string {
    // @ts-ignore
    return `<button id="edit-row" title="Editar">${icons.edit}</button>`;
  }

  editRowClick(e: Event, cell: CellComponent): void {
    console.log('Fila editada > ', cell.getRow().getData());
  }

  deleteRowButton(): string {
    // @ts-ignore
    return `<button id="delete-row" title="Eliminar">${icons.delete}</button>`;
  }

  deleteRowClick(e: Event, cell: CellComponent): void {
    console.log('Fila eliminada > ', cell.getRow().getData());
  }

  columnsDefinition = [
    {
      field: 'fechaHora',
      title: 'Fecha y Hora',
      formatter: 'datetime',
      formatterParams: {
        inputFormat: 'iso',
        outputFormat: 'yyyy-MM-dd hh:mm a',
        invalidPlaceholder: '(Fecha y Hora inválida)',
      },
      width: 150,
      hozAlign: 'center',
    },
    { field: 'descripcion', title: 'Tarea programada' },
    { field: 'estado', title: 'Estado', width: 150 },
    { 
      formatter: this.editRowButton, 
      width: 40, 
      hozAlign: 'center', 
      cellClick: this.editRowClick 
    },
    { 
      formatter: this.deleteRowButton, 
      width: 40, 
      hozAlign: 'center', 
      cellClick: this.deleteRowClick 
    },
  ];

  tableData = [
    { fechaHora: '2024-04-08T09:30', descripcion: 'Talleres de Diseño de Interfaces', estado: Estado.EN_PROCESO },
    { fechaHora: '2024-04-08T09:30', descripcion: 'Proyecto de Diseño de Interfaces', estado: Estado.EN_PROCESO },
  
  ];

  addTask = () => {
    console.log('Pronto podré agregar tareas');
  };

}

type Tarea = {
  fechaHora: Date | string;
  descripcion: string;
  estado: Estado;
};