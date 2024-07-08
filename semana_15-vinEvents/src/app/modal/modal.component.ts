import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { InfoInscripcion } from '../inscripcion';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() titulo: string; // @Input() indica que recibe datos de componente padre
  @Input() contenido: string;
  @ViewChild('dialog') private dialog!: ElementRef<HTMLDialogElement>;
  dataEstudiante: InfoInscripcion[];

  constructor() {
    this.titulo = 'Componente Dialog';
    this.contenido = 'Lorem ipsum dolor sit amet consectetur adipisicing, ...';
    this.dataEstudiante = [];
  }

  getElement(): HTMLDialogElement {
    return this.dialog ? this.dialog.nativeElement: null!;
  }

  show(): void {
    if (this.dialog) {
      try {
        this.dataEstudiante = JSON.parse(this.contenido);
        console.log('Data:', this.dataEstudiante);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
       this.dialog.nativeElement.showModal();
    }
  }

  close(): void {
    if (this.dialog) {
      this.dialog.nativeElement.close();
    }
  }

  typeoff(value: any): string {
    return typeof value;
  }
}
