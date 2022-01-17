import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input() paginatorComponent:any;
  paginas!: number[];

  constructor() { }

  ngOnInit(): void {

    this.paginas = new Array(this.paginatorComponent.totalPages).fill(0).map((_valor, indice)=> indice + 1)
    console.log(this.paginas);
    
  }

}
