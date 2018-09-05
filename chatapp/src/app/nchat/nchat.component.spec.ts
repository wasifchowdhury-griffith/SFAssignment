import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NchatComponent } from './nchat.component';

describe('NchatComponent', () => {
  let component: NchatComponent;
  let fixture: ComponentFixture<NchatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
