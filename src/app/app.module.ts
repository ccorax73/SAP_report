import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HighlightDirective } from './highlight.directive';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './navigation/header/header.component';
import { MatListModule } from '@angular/material/list';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { MatButtonModule} from '@angular/material/button'
import { MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { OpenpoComponent } from './openpo/openpo.component';
import { CustomPipe } from './custom.pipe';
import { InvoiceComponent } from './invoice/invoice.component';
import { MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { IncomingComponent } from './incoming/incoming.component';
import { MatTooltipModule} from '@angular/material/tooltip';
import { OpensalesoComponent } from './opensaleso/opensaleso.component';
import { StockComponent } from './stock/stock.component';


@NgModule({
  declarations: [
    AppComponent,

   HighlightDirective,
   HomeComponent,
   HeaderComponent,
   SidenavListComponent,
   OpenpoComponent,
   CustomPipe,
   InvoiceComponent,
   IncomingComponent,
   OpensalesoComponent,
   StockComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule

  ],
  exports:[
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
