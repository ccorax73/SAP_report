import { Component, OnInit, ViewChild } from '@angular/core';
import { ListerService } from '../lister.service';
import { Invoice } from '../db_interface';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface penznemgby{
  Penznem:string;
  NettoErtek: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  dataSource = new MatTableDataSource<Invoice>;
  public loading: boolean=true;
  
  public penznem_groupby:penznemgby[] = [];

  constructor(private listservice: ListerService) {
  }

  displayedColumns: string[] = ['Datum', 'Megrendelo_nev', 'Szamla','Szfajta', 'NettoErtek', 'Penznem','Szoveg','Mennyiseg', 'BME'];

  @ViewChild(MatSort) sort !: MatSort;

  sum_refresh():void{
    this.penznem_groupby = [];
    this.dataSource.filteredData.forEach( (a:Invoice) => {
      if (this[a.Penznem as keyof typeof this]===undefined ) {
        (this[a.Penznem as keyof typeof this] as penznemgby) = { Penznem: a.Penznem, NettoErtek: Number(a.NettoErtek) };
        this.penznem_groupby.push(this[a.Penznem as keyof typeof this] as penznemgby);
      }
      else{
        (this[a.Penznem as keyof typeof this] as penznemgby).NettoErtek += (a.Szfajta=='RE')?-1*Number(a.NettoErtek):Number(a.NettoErtek);}
    }, this.penznem_groupby);
  }

  table_refresh():void{
    this.listservice.getInvoice().subscribe(
       (result:any) => {        
        this.dataSource = new MatTableDataSource<Invoice>(result.data);
        this.dataSource.data.splice(this.dataSource.data.length-1, 1);
        this.dataSource.sort = this.sort;
        this.loading =false;
        this.sum_refresh();
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
        this.sum_refresh();
      }
    )
 //https://stackoverflow.com/questions/31131490/how-to-subscribe-to-an-event-on-a-service-in-angular2
    this.listservice.aDatumvalt.subscribe( // ide már nem jön adat
      (d : Date) =>{
        this.dataSource = new MatTableDataSource<Invoice>([]);
        this.textSearch = "";
        this.loading =true;
        this.table_refresh();
      }
    )

  }
  adate:any;
  textSearch: string="";

  wo_zero( szam: string){
    return szam.replace(/^0+/, '');
  }

  datumpont( datum: string){
    return(datum.length ==8)?  datum.substring(0,4)+'.'+datum.substring(4,6)+'.'+datum.substring(6,8): datum;
    }


}
