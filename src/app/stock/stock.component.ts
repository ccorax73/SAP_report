import { Component,  ViewChild } from '@angular/core';
import { ListerService } from '../lister.service';
import { Stock, pivotStock } from '../db_interface';
import { MatSort,Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css','../../styles.css']
})
export class StockComponent {
  dataSource = new MatTableDataSource<Stock>;
  pivotdataSource = new MatTableDataSource<pivotStock>;
  //filteredpivotdataSource : { KulsoACS : string, Ertek: number }[];
  public loading: boolean = true;
  public showsum: boolean = false;

  constructor(public listservice: ListerService) {  }

  displayedColumns: string[] = ['KulsoACS','Aszam', 'Megnev', 'Acsoport', 'Csnev','SzabadFelhk', 'ZaroltK','BermunkaK', 'BME','SzabadE','ZaroltE','BermunkaE', 'HUF'];
  displayedpivotColumns: string[] = ['KulsoACS','Ertek','HUF'];

  @ViewChild('firstTableSort') public firstTableSort !: MatSort;
  @ViewChild('pivotTableSort') public pivotTableSort !: MatSort;

  public pivot():void{
    this.showsum= !this.showsum;
  }

  public szabadTotal(){
    return this.dataSource.filteredData.reduce((accum, curr) => accum + Number(curr.SzabadE), 0);
  }

  public zaroltTotal(){
    return this.dataSource.filteredData.reduce((accum, curr) => accum + Number(curr.ZaroltE), 0);
  }

  public bermunkaTotal(){
    return this.dataSource.filteredData.reduce((accum, curr) => accum + Number(curr.BermunkaE), 0);
  }

  public pivotTotal(){
    return this.pivotdataSource.filteredData.reduce((accum, curr) => accum + Number(curr.Ertek), 0);
  }

  table_refresh():void{
    this.listservice.getStock().subscribe(
       (result:any) => {
        this.dataSource = new MatTableDataSource<Stock>(result.data);
        this.dataSource.data.splice(this.dataSource.data.length-1, 1);
        this.dataSource.sort = this.firstTableSort;
        var mapdataSource = this.dataSource.data.map(row =>({KulsoACS: row.KulsoACS , Ertek: +row.SzabadE + +row.ZaroltE + +row.BermunkaE}));
        var pivotSource :pivotStock[]  = [];
        mapdataSource.reduce( (total , currentobject ) => {
          if (!total[currentobject.KulsoACS as keyof typeof total]) {
            (total[currentobject.KulsoACS as keyof typeof total] as pivotStock) = { KulsoACS: currentobject.KulsoACS, Ertek: 0 };
            pivotSource.push(total[currentobject.KulsoACS as keyof typeof total])
          }
          (total[currentobject.KulsoACS as keyof typeof total] as pivotStock).Ertek += currentobject.Ertek;
          return total;
        },{});
        pivotSource.sort((a,b) => (a.KulsoACS > b.KulsoACS) ? 1 : ((b.KulsoACS > a.KulsoACS) ? -1 : 0))
        this.pivotdataSource =  new MatTableDataSource<pivotStock>(pivotSource);
        this.pivotdataSource.sort = this.pivotTableSort;
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
        this.pivotdataSource.filter = filterValue.trim().toLowerCase();
      }
    )

  }
  adate:any;
  textSearch: string="";

}
