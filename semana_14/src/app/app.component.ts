import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, getLocaleMonthNames } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inscripcion,Estudiante, Asignatura, Profesor, Grupo, InfoInscripcion, InfoEstudiante } from './inscripcion';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  data: Inscripcion[] = [];
  private http = inject(HttpClient);

  constructor() { }

  ngOnInit(): void {
    this.http
      .get<Inscripcion[]>('assets/inscripciones.json')
      .subscribe((response: Inscripcion[]) => {
        console.log(response);
        this.data = response;
        console.log(this.getEstudiantes());
        console.log(this.getInfoEstudiante('851255'));
        console.log(this.getInfoEstudiantes())



      });
  }
  getEstudiantes(): Estudiante[] {
    return [...new Map(
      this.data.map(item => [item.estudiante.nombre, item.estudiante])).values()].sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
  getInfoEstudiante(codigo: string): InfoEstudiante {

    const inscripciones: Inscripcion[] = this.data.filter(inscripcion => inscripcion.estudiante.codigo === codigo);


    const estudiante: Estudiante = inscripciones[0]?.estudiante;


    const info: InfoInscripcion[] = inscripciones.map(inscripcion => ({
      grupo: inscripcion.grupo,
      notas: inscripcion.notas,
      definitiva: inscripcion.definitiva,
      inasistencia: inscripcion.inasistencia
    }));

    // Calcular el promedio de las definitivas
    const promedio: number = this.getPromedio(info);

    // Obtener el rendimiento basado en el promedio
    const rendimiento: string = this.getRendimiento(promedio);

    // Retornar el objeto InfoEstudiante
    return { estudiante, info, promedio, rendimiento };
  }

  /* getPromedio(info: InfoInscripcion[]): number {
    const totalDefinitivas = info.reduce((sum, inscripcion) => sum + inscripcion.definitiva, 0);
    return totalDefinitivas / info.length;
  } */
  getPromedio(info: InfoInscripcion[]): number {
    let totalDefinitivas = 0;
    info.forEach(inscripcion => totalDefinitivas += inscripcion.definitiva);
    return totalDefinitivas / info.length;
  }

  getRendimiento(promedio: number): string {
    if (promedio >= 4.4) return 'sobresaliente';
    if (promedio >= 3.9) return 'bueno';
    if (promedio >= 3.4) return 'aceptable';
    if (promedio >= 3) return 'regular';
    return 'deficiente';
  }
  getInfoEstudiantes(): InfoEstudiante[] {
    return this.getEstudiantes().map(estudiante => this.getInfoEstudiante(estudiante.codigo));
  }

}


