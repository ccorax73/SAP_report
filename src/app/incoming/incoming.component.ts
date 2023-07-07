import { Component, OnInit, ViewChild } from '@angular/core';
import { ListerService } from '../lister.service';
import { Invoice } from '../db_interface';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent {
  dataSource = new MatTableDataSource<Invoice>;
  public loading: boolean=true;
  public penznem_groupby = [];

  constructor(public listservice: ListerService) {
  }

  //displayedColumns: string[] = ['Anyagbiz', 'Konyveles_ideje', 'Anyagszam','Acsoport', 'Megnev', 'Menny','ME','Rendeles', 'Szallitokod','Szallitonev','Ertek', 'Penznem'];
 displayedColumns: string[] = [ 'Konyveles_ideje','Anyagszam','Acsoport', 'Megnev', 'Menny','ME','Rendeles', 'Szallitokod','Szallitonev','Ertek', 'Penznem'];
  @ViewChild(MatSort) sort !: MatSort;

  table_refresh():void{
    this.listservice.getIncoming().subscribe(
       (result:any) => {
        this.dataSource = new MatTableDataSource<Invoice>(result.data);
        this.dataSource.data.splice(this.dataSource.data.length-1, 1);
        this.dataSource.sort = this.sort;
        this.loading =false;
      }
    )
  }

  ngOnInit(): void {

    this.table_refresh();


    this.listservice.aFilterEvent.subscribe(
      (event : Event) =>{
        const filterValue = (event.target as HTMLInputElement).value;
        this.textSearch = filterValue;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
    )
 //https://stackoverflow.com/questions/31131490/how-to-subscribe-to-an-event-on-a-service-in-angular2
    this.listservice.aDatumvalt.subscribe( // ide már nem jön adat
      (d : Date) =>{
        this.dataSource = new MatTableDataSource<Invoice>(null);
        this.textSearch = "";
        this.loading =true;
        this.table_refresh();
      }
    )

  }
  adate:any;
  textSearch: string="";

}
