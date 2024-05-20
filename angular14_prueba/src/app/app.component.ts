import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inscripcion } from './inscripcion';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
        // … otras pruebas …
      });
  }
}
