import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginatorComponent: any;
  paginas!: number[];

  desde!: number;
  hasta!: number;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {

    let paginadorActualizado = changes['this.paginatorComponent'];

    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }

  }

  private initPaginator(): void {

    this.desde = Math.min(Math.max(1, this.paginatorComponent.number), this.paginatorComponent.totalPages - 5);
    this.hasta = Math.max(Math.min(this.paginatorComponent.totalPages, this.paginatorComponent.number + 4), 6);


    if (this.paginatorComponent.totalPages > 5) {

      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde)
      console.log("if:" + this.paginas);

    } else {

      this.paginas = new Array(this.paginatorComponent.totalPages).fill(0).map((_valor, indice) => indice + 1)
      console.log("else:" + this.paginas);

    }

  }


}
