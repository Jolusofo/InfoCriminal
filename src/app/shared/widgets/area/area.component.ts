import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  chartOptions: {};
  @Input() data: Array<any> = [];

  Highcharts = Highcharts;

  constructor() { }

  ngOnInit() {
  

  let dados:Array<any> = [];

  this.data.forEach(value => {
    
    dados.push( {
     
        name: value.Ocorrencia,
        data: [
          value.Jan == "..."? 0 :value.Jan
         ,value.Fev == "..."? 0 :value.Fev
         ,value.Mar == "..."? 0 :value.Mar
         ,value.Abr == "..."? 0 :value.Abr
         ,value.Mai == "..."? 0 :value.Mai
         ,value.Jun == "..."? 0 :value.Jun
         ,value.Jul == "..."? 0 :value.Jul
         ,value.Ago == "..."? 0 :value.Ago
         ,value.Set == "..."? 0 :value.Set
         ,value.Out == "..."? 0 :value.Out
         ,value.Nov == "..."? 0 :value.Nov
         ,value.Dez == "..."? 0 :value.Dez]
      
    })
  })
  

    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: 'Indice de criminalidade pela baixada santista'
      },
      tooltip: {
        split: false,
        valueSuffix: ' quantidade'
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true,
      },
      xAxis: {
        categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov','Dev']
    },
      series: dados
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  
  }

}
