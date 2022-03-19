import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerImagesComponent } from './player-images.component';

describe('PlayerImagesComponent', () => {
  let component: PlayerImagesComponent;
  let fixture: ComponentFixture<PlayerImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
