import { Component, OnInit, ViewChild } from '@angular/core';
import { ListerService } from '../lister.service';
import { Open_so } from '../db_interface';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-opensaleso',
  templateUrl: './opensaleso.component.html',
  styleUrls: ['./opensaleso.component.css']
})
export class OpensalesoComponent {
  dataSource = new MatTableDataSource<Open_so>;
  public loading: boolean=true;

  constructor(private listservice: ListerService) {
  }

  displayedColumns: string[] = [ 'Megrendelo','Rendeles','Tetel', 'Datum','Mkod', 'Rogzitette', 'Anyagszam','Megnev','RendeltM','KiszallM', 'NyitottM',  'Ertek', 'Penznem'];

  @ViewChild(MatSort) sort !: MatSort;

  ngOnInit(): void {
    this.listservice.getOpenSO().subscribe(
      (result: any) => {
        this.dataSource = new MatTableDataSource<Open_so>(result);
        this.dataSource.data.splice(this.dataSource.data.length-1, 1);
        this.dataSource.sort = this.sort;
        this.loading =false;
      }
    )

    this.listservice.aFilterEvent.subscribe(
      (event : Event) =>{
        const filterValue = (event.target as HTMLInputElement).value;
        this.textSearch = filterValue;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
    )
  }

  textSearch: string="";

  wo_zero( szam: string){
    return szam.replace(/^0+/, '');
  }

  datumpont( datum: string){
    if ( typeof datum === 'string') {
    return(datum.length ==8)?  datum.substring(0,4)+'.'+datum.substring(4,6)+'.'+datum.substring(6,8): datum;}
    else { return datum;}
    }




}
