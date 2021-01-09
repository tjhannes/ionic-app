import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntryService } from '../../entry.service';
import { Entry } from '../../entry';

@Component({
  selector: 'app-diary-detail',
  templateUrl: './diary-detail.page.html',
  styleUrls: ['./diary-detail.page.scss'],
})
export class DiaryDetailPage implements OnInit {

  public id: string;
  public entries: Array<Entry> = [];  
  public title: String;
  public content: String;

  constructor(private activatedRoute: ActivatedRoute, public entryService: EntryService) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.entries = await this.entryService.readById(this.id);

    this.title = this.entries[0].title;
    this.content = this.entries[0].content;
  }

}
