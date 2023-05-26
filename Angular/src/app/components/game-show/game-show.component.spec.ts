import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameShowComponent } from './game-show.component';

describe('GameShowComponent', () => {
  let component: GameShowComponent;
  let fixture: ComponentFixture<GameShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameShowComponent]
    });
    fixture = TestBed.createComponent(GameShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
