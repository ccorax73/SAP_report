import { Component, OnInit, ViewChild } from '@angular/core';
import { ListerService } from '../lister.service';
import { Open_po } from '../db_interface';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-openpo',
  templateUrl: './openpo.component.html',
  styleUrls: ['./openpo.component.css']
})
export class OpenpoComponent implements OnInit{

  dataSource = new MatTableDataSource<Open_po>;
  public loading: boolean=true;

  constructor(private listservice: ListerService) {
  }

  displayedColumns: string[] = ['Acsoport','Lerakodohely', 'Rendeles_szama', 'Inditas', 'Vege', 'Aszam','Megnev','RendeltM','VisszaJelM', 'NyitottM', 'BME'];

  @ViewChild(MatSort) sort !: MatSort;

  ngOnInit(): void {
    this.listservice.getOpenPO().subscribe(
      (result: any) => {
        //console.log(result);
        //this.dataSource = new MatTableDataSource<Open_po>(result.data);
        this.dataSource = new MatTableDataSource<Open_po>(result);
        this.dataSource.data.splice(this.dataSource.data.length-1, 1);
        this.dataSource.sort = this.sort;
        this.loading =false;
      }
      ,err => console.log(err)
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
    return(datum.length ==8)?  datum.substring(0,4)+'.'+datum.substring(4,6)+'.'+datum.substring(6,8): datum;
    }



}
