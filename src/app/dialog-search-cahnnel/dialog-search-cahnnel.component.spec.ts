import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchCahnnelComponent } from './dialog-search-cahnnel.component';

describe('DialogSearchCahnnelComponent', () => {
  let component: DialogSearchCahnnelComponent;
  let fixture: ComponentFixture<DialogSearchCahnnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSearchCahnnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSearchCahnnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
