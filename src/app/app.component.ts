//app.component.ts
import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

export interface Movies {
  title: string;
  id: number;
  episode: number;
  info: string;
  watch: string;
}

const ELEMENT_DATA: Movies[] = [
  {id: 1560608769632, title: 'Shingeki no Kyojin: The Final Season', episode: 16,info:'https://myanimelist.net/anime/40028/Shingeki_no_Kyojin__The_Final_Season', watch: 'https://www12.9anime.to/watch/attack-on-titan-final-season.k524/ep-1'},
  {id: 1560608796014, title: 'Kimetsu no Yaiba Movie: Mugen Ressha-hen', episode: 1,info:'https://myanimelist.net/anime/40456/Kimetsu_no_Yaiba_Movie__Mugen_Ressha-hen', watch: 'https://demonslayer-anime.com/risshihen/streaming/'},
  {id: 1560608787815, title: 'Startup', episode: 16,info:'https://asianwiki.com/Start-Up_(Korean_Drama)', watch: 'https://kissasians.org/detail/start-up-2020/'},
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'title', 'episode', 'info', 'watch', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      title:row_obj.title,
      episode:row_obj.episode,
      info: row_obj.info,
      watch: row_obj.watch
    });
    this.table.renderRows();

  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.title = row_obj.title;
        value.episode = row_obj.episode;
        value.info = row_obj.info;
        value.watch = row_obj.watch;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}
