import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMessageAddComponent } from './direct-message-add.component';

describe('DirectMessageAddComponent', () => {
  let component: DirectMessageAddComponent;
  let fixture: ComponentFixture<DirectMessageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectMessageAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectMessageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
