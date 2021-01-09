import { Component, OnInit } from '@angular/core';
import { EntryService } from '../../entry.service';
import { Entry } from '../../entry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
})
export class DiaryPage implements OnInit {

  mockEntry = [{title:"6.12.2020",content:"Sonntag Englischer Garten"},
                {title:"19.11.1993",content:"Ubahn zur Arbeit"}];

  public entries: Array<Entry> = [];               

  constructor(public entryService: EntryService, public router: Router) { }

  async ngOnInit() {

    //this.createEntry(this.mockEntry[0].title,this.mockEntry[0].content);
    //this.createEntry(this.mockEntry[1].title,this.mockEntry[2].content);
    //this.entryService.clear();

  }

  async ionViewWillEnter() {
    // This method will be called every time the component is navigated to
    // On initialization, both ngOnInit and this method will be called

    this.entries = await this.entryService.read();
  }

  getIcon(entry){
    if(entry.completed) return 'checkmark-circle';
    else return 'stopwatch';
  }

  public async createEntry(title,content){
    let key = await this.entryService.generateKey();
    let entry = {
      key: `${key}`,
      title: title,
      content: content
    };
    await this.entryService.create(key,entry);
    this.entries = await this.entryService.read();
  }

  public async deleteEntry(entry){
    await this.entryService.delete(entry.key);
    //re-initialise the page
    this.ionViewWillEnter();
  }

  


  


}
