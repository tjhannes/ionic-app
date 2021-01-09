import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../entry.service';
import { Entry } from '../../entry';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-diary-new',
  templateUrl: './diary-new.page.html',
  styleUrls: ['./diary-new.page.scss'],
})
export class DiaryNewPage implements OnInit {

  title: string;
  content: string;  
  
  constructor(public entryService: EntryService, private router: Router) { }

  goBack() {
    this.router.navigate(['/home/tabs/diary'])
  }

  ngOnInit() {

    // default Titel ist aktuelles Datum 
    this.title = formatDate(new Date(), 'dd.MM.yyyy', 'en');
    
  }

  public startCreateEntry(){
    this.createEntry(this.title,this.content);

  }


  public async createEntry(title,content){
    //let key = await this.entryService.generateKey();
    let key = `entry${ formatDate(new Date(), 'yyyyMMddHHmm', 'en') }`;
    let entry = {
      key: `${key}`,
      title: title,
      content: content
    };
    await this.entryService.create(key,entry);

    this.goBack();
    
  }

}
