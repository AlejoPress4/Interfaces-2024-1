//paso8
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import { DateTime } from 'luxon';
import { icons } from '../../../assets/icons';
@Component({
  selector: 'app-tabulator-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabulator-task.component.html',
  styleUrl: './tabulator-task.component.css'
})

//Task or Tasks?
export class TabulatorTasksComponent implements OnInit {  
  private table: Tabulator | undefined;
  private tableDiv = document.createElement('div');

  @ViewChild('tabulatorWrapper', { static: true }) wrapperDiv!: ElementRef<HTMLDivElement>;
  @Input() tableData: any[] = [];
  @Input() columnsDefinition: any[] = [];
  @Input() height: string = 'calc(100vh *.5 - 190px)';

  @Input() handleClick = () => {
    console.log('Nada por hacer');
};

  constructor() {
    // @ts-ignore
    if (!window.DateTime) {
      // @ts-ignore
      window.DateTime = DateTime;
    }

    // @ts-ignore
    if (!window.luxon) {
      // @ts-ignore
      window.luxon = DateTime;
    }

    // @ts-ignore
    if (!window.icons) {
      // @ts-ignore
      window.icons = icons;
    }
  }

  ngOnInit() {
    this.drawTable();
  }

 
  drawTable() {
    this.wrapperDiv.nativeElement.appendChild(this.tableDiv);
  
    this.table = new Tabulator(this.tableDiv, {
      height: this.height,
      data: this.tableData,
      reactiveData: true, 
      columns: this.columnsDefinition,
      layout: 'fitColumns',
      headerVisible: true,
      movableRows: true,
      movableColumns: true,
      footerElement: `
          <div class="inline-flex justify-end w-full">
            <button type="button" id="add" class="…">
                ${icons.plusSquare}&nbsp;&nbsp;Agregar tarea
            </button>
          </div>`.trim(),
    });

    this.table.on('tableBuilt', () => {
      const button = document.querySelector('#add') as HTMLButtonElement;
      button.addEventListener('click', this.handleClick);
    });

  }


}


