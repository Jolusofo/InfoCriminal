import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { DashboardService } from "../dashboard.service";
import { MatTableDataSource } from "@angular/material/table";
import {SelectDashboard} from '../../models/selectDasboard';


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  @Input('anosSelecionado') anosSelecionado = 2022;
  bigChart:any;
  cards:Array<any>;
  controleCards:boolean;
  pieChart:any;
  reponse:any;
  dataSource:any

  
  furtoVeliculos:Array<any>;
  rouboCarga:Array<any>;
  lesaoCorpora:Array<any>;
  outrosFurtos:Array<any>;

  anos: Array<SelectDashboard> = [
    {value: 2022, viewValue: 'delitos 2022'},
    {value: 2021, viewValue: 'delitos 2021'},
    {value: 2020, viewValue: 'delitos 2020'},
    {value: 2019, viewValue: 'delitos 2019'},
    {value: 2018, viewValue: 'delitos 2018'},
    {value: 2017, viewValue: 'delitos 2017'},  
  ];




  constructor(private dashboardService: DashboardService) { }

  

  ngOnInit() {
 
    this.GetCharts(this.anosSelecionado);
    setTimeout(() => {
      console.log(this.furtoVeliculos)
    }, 3000);
   
  }


  GetCharts(anos:any){
    this.bigChart = 0;
    this.pieChart = 0;
    this.cards = [];
    this.controleCards = false;

   /*  this.dashboardService.GetDataCharts(anos).subscribe(response =>{ */

      //para colocar na lambda descomente essa linha abaixo e comente bigChart e PieChart
      this.dashboardService.getAWSLambdaTabela(anos).subscribe(graficoGrande =>{
    /*    
    lembrar de descomentar e alterar o metodo do serviço
     console.log(graficoGrande, 'lambda!')
        this.bigChart = graficoGrande.Item.graficoGrande;
         this.pieChart = graficoGrande.Item.graficoGrande;
         this.cards = graficoGrande.Item.graficoGrande; 
         this.dataSource = new MatTableDataSource<any>(graficoGrande.Item.graficoGrande);*/

      this.bigChart = graficoGrande.Item.graficoGrande;
      this.pieChart = graficoGrande.Item.graficoGrande;
      this.cards = graficoGrande.Item.graficoGrande;
      this.dataSource = new MatTableDataSource<any>(graficoGrande.graficoGrande);

      this.cards.forEach(values =>{
       
        if(values.Ano == this.anosSelecionado && values.Ocorrencia == "FURTO DE VEÍCULO")
        {
   
          this.furtoVeliculos = [];
         
          
          this.furtoVeliculos.push({
            name:values.Ocorrencia,
            total:values.Total,
            data:[values.Jan,values.Fev,values.Mar,values.Abr,values.Mai,values.Jun,values.Jul,values.Ago,values.Set,values.Out,values.Nov,values.Dez]
          })
        }
        if(values.Ano == this.anosSelecionado && values.Ocorrencia == "ROUBO DE CARGA")
        {
          this.rouboCarga = [];
          this.rouboCarga.push({
            name:values.Ocorrencia,
            total:values.Total,
            data:[values.Jan,values.Fev,values.Mar,values.Abr,values.Mai,values.Jun,values.Jul,values.Ago,values.Set,values.Out,values.Nov,values.Dez]
          })
        }
        if(values.Ano == this.anosSelecionado && values.Ocorrencia == "LESÃO CORPORAL DOLOSA")
        {
          this.lesaoCorpora = [];
          this.lesaoCorpora.push({
            name:values.Ocorrencia,
            total:values.Total,
            data:[values.Jan,values.Fev,values.Mar,values.Abr,values.Mai,values.Jun,values.Jul,values.Ago,values.Set,values.Out,values.Nov,values.Dez]
          })
        }
        if(values.Ocorrencia == "FURTO - OUTROS")
        {
          if(values.Ano == this.anosSelecionado )
          { this.outrosFurtos = [];
            this.outrosFurtos.push({
              name:values.Ocorrencia,
              total:values.Total,
              data:[values.Jan,values.Fev,values.Mar,values.Abr,values.Mai,values.Jun,values.Jul,values.Ago,values.Set,values.Out,values.Nov,values.Dez]
            })
          }
        
        }
        
  
      });
  
   
    });
setTimeout(() => {
  this.controleCards = true;
}, 500);
    console.log( this.furtoVeliculos)
  

  }

}
