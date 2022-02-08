import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainChatAreaComponent } from './main-chat-area.component';

describe('MainChatAreaComponent', () => {
  let component: MainChatAreaComponent;
  let fixture: ComponentFixture<MainChatAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainChatAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainChatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
