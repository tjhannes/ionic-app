import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiaryNewPage } from './diary-new.page';

describe('DiaryNewPage', () => {
  let component: DiaryNewPage;
  let fixture: ComponentFixture<DiaryNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaryNewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiaryNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
