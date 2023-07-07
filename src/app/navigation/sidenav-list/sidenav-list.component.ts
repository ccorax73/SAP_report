import { Component, Output,EventEmitter } from '@angular/core';
import { ListerService } from '../../lister.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {

 @Output() public sidenavClose = new EventEmitter();

 constructor(private latogatasservice: ListerService) {
 }


 public onsidenavClose = () => {
   this.sidenavClose.emit();
 }

}
