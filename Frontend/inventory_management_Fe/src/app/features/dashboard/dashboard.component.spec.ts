import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Chart, registerables } from 'chart.js';

// Register the necessary controllers
Chart.register(...registerables);

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, BaseChartDirective, DashboardComponent], // Import the standalone component here
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have bar chart data', () => {
    expect(component.barChartData).toBeDefined();
    expect(component.barChartData.labels?.length).toBe(7);
    expect(component.barChartData.datasets.length).toBe(2);
  });

  it('should render the bar chart', () => {
    const canvasElement = fixture.debugElement.query(By.css('canvas'));
    expect(canvasElement).toBeTruthy();
  });
});
