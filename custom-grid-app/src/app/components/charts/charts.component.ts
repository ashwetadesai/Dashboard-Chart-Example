import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  NgApexchartsModule,
  ChartComponent as ApexChartComponent,
} from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries, ApexPlotOptions, ApexChart, ApexAxisChartSeries,
  ApexXAxis, ApexDataLabels, ApexFill, ApexStroke, ApexTitleSubtitle, ApexLegend
} from 'ng-apexcharts';
// export type ChartOptions = ApexOptions;
@Component({
  selector: 'app-charts',
  imports: [NgApexchartsModule,CommonModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {
  public barSeries: ApexAxisChartSeries = [
    {
      name: 'Vendor A',
      data: [40, 55, 30, 40, 50, 80, 60, 60, 70, 75, 68, 50]
    },
    {
      name: 'Vendor B',
      data: [30, 20, 25, 30, 35, 40, 50, 55, 60, 65, 50, 40]
    }
  ];

  public barChart: ApexChart = {
    type: 'bar',
    stacked: true,
    height: 250
  };

  public barXAxis: ApexXAxis = {
    title: {
      text: 'Month'
    },
    
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  };
  public barYAxis: ApexYAxis = {
    title: {
      text: 'Security rating'
    },
    
    
  };
  public donutSeries: ApexNonAxisChartSeries = [80];
  public donutChart: ApexChart = {
    type: 'radialBar',
    height: 250
  };

  public donutLabels = {
    labels: ['Used']
  };
}
