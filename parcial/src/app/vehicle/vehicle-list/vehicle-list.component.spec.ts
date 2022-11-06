/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VehicleService } from '../vehicle.service';
import { Vehicle } from '../vehicle';
import { VehicleListComponent } from './vehicle-list.component';
import { faker } from '@faker-js/faker';

describe('VehicleListComponent', () => {
  let component: VehicleListComponent;
  let fixture: ComponentFixture<VehicleListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ VehicleListComponent ],
      providers: [VehicleService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleListComponent);
    component = fixture.componentInstance;

    for(let i = 0; i < 3; i++){
      const vehicle = new Vehicle(
        faker.datatype.number(),
        faker.lorem.word(),
        faker.lorem.word(),
        faker.lorem.sentence(),
        faker.datatype.number(),
        faker.datatype.number(),
        faker.color.human(),
        faker.image.imageUrl()
      )

      component.vehicles.push(vehicle);
    }

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 <tr> (1 header + 3 rows)elements', () => {
    expect(debug.queryAll(By.css('tr'))).toHaveSize(4);
  });

  it('should have 7 <th> elements (4 cols in header + 3 rows)', () => {
    expect(debug.queryAll(By.css('th'))).toHaveSize(7);
  });

  it('should have 9 <td> elements', () => {
    expect(debug.queryAll(By.css('td'))).toHaveSize(9);
  });

  it('should have td#marca tag with the vehicle.marca', () => {
    debug.queryAll(By.css('td#marca')).forEach((td, i) => {
      expect(td.nativeElement.textContent).toContain(
        component.vehicles[i].marca
      );
    });
  });

  it('should have td#linea tag with the vehicle.linea', () => {
    debug.queryAll(By.css('td#linea')).forEach((td, i) => {
      expect(td.nativeElement.textContent).toContain(
        component.vehicles[i].linea
      );
    });
  });

  it('should have td#modelo tag with the vehicle.modelo', () => {
    debug.queryAll(By.css('td#modelo')).forEach((td, i) => {
      expect(td.nativeElement.textContent).toContain(
        component.vehicles[i].modelo
      );
    });
  });
});
