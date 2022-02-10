import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchChannelComponent } from './dialog-search-channel.component';

describe('DialogSearchChannelComponent', () => {
  let component: DialogSearchChannelComponent;
  let fixture: ComponentFixture<DialogSearchChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSearchChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSearchChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
