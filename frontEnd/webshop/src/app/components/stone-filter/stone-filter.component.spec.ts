import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoneFilterComponent } from './stone-filter.component';

describe('StoneFilterComponent', () => {
  let component: StoneFilterComponent;
  let fixture: ComponentFixture<StoneFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoneFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoneFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
