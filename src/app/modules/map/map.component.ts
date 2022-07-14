import { Component, OnInit } from "@angular/core";
import { color } from "highcharts";
import { latLng, polygon, tileLayer } from "leaflet";
import { DashboardService } from "../dashboard.service";
declare let L;
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {

  teste:any;
  valores:Array<any> = [];
  apareceMapa:boolean = false;
  latElong:Array<any> = [];
  DadosdeBairros:Array<any> = [];
  bairroSelecionado:string = 'vila+belmiro';
  options:any;
  public map: any;
  Bairros: any[] = [
 
    {value: 'vila+belmiro', viewValue: 'Vila Belmiro', valueArray:0, bairro: "VILA BELMIRO", totalDelitos:0},
    {value: 'gonzaga', viewValue: 'Gonzaga', bairro: "GONZAGA", totalDelitos:0,valueArray:0},
    {value: 'jose+menino', viewValue: 'José Menino', valueArray:0 , bairro: "JOSE MENINO", totalDelitos:0},
    {value: 'aparecida', viewValue: 'Aparecida', valueArray:0, bairro: "APARECIDA", totalDelitos:0},
    {value: 'macuco', viewValue: 'Macuco', valueArray:0, totalDelitos:0},
    {value: 'boqueirão', viewValue: 'Boqueirão', valueArray:0,bairro: "BOQUEIRAO", totalDelitos:0},
    {value: 'embaré', viewValue: 'Embaré', valueArray:0, totalDelitos:0, bairro: "EMBARE"},
    {value: 'Monte+Serrat', viewValue: 'Monte Serrat', valueArray:1 ,  bairro: "MORRO MONTE SERRAT", totalDelitos:0},
    {value: 'ponta+da+praia', viewValue: 'Ponta da Praia', bairro:"PONTA DA PRAIA",valueArray:1, totalDelitos:0},
    {value: 'campo+grande', viewValue: 'Campo Grande', bairro:"CAMPO GRANDE",valueArray:0, totalDelitos:0},
    {value: 'marapé', viewValue: 'Marapé', bairro:"MARAPE",valueArray:0, totalDelitos:0},
    {value: 'caneleira', viewValue: 'Caneleira', bairro:"CANELEIRA",valueArray:0, totalDelitos:0},
    {value: 'Morro+São+Bento', viewValue: 'Morro São Bento', bairro:"MORRO SAO BENTO",valueArray:2, totalDelitos:0},
    {value: 'Morro+Chico+de+Paula', viewValue: 'Morro Chico de Paula', bairro:"Chico de Paula",valueArray:0, totalDelitos:0},
    {value: 'centro', viewValue: 'Centro', bairro:"CENTRO",valueArray:2, totalDelitos:0},
    {value: 'Vila+Alemoa', viewValue: 'Vila Alemoa', bairro:"ALEMOA",valueArray:0, totalDelitos:0},

    //sem propriedade bairro
    {value: 'estuario', viewValue: 'Estuário', valueArray:0, totalDelitos:0},
    
    {value: 'Morro+Santa+Maria', viewValue: 'Morro Santa Maria', valueArray:0, totalDelitos:0},
    
    
    
  ];
  delitoSelecionado:string = 'RouboVeiculo';
  delitos:Array<any> =[
    {value: 'RouboVeiculo', viewValue: 'Roubo de Veiculo'},
    {value: 'RouboCelular', viewValue: 'Roubo de Celular'},
   
  ]

  anoSelecionado:string = '2021';
 anos:Array<any> =[
  {value: '2021', viewValue: '2021'},
  {value: '2020', viewValue: '2020'},
 ]

 mesSelecionado:string = 'Janeiro';
 meses:Array<any> =[
  {value: 'Janeiro', viewValue: 'Janeiro'},
  {value: 'Fevereiro', viewValue: 'Fevereiro'},
  {value: 'Marco', viewValue: 'Março'},
  {value: 'Abril', viewValue: 'Abril'},
  {value: 'Maio', viewValue: 'Maio'},
  {value: 'Junho', viewValue: 'Junho'},
  {value: 'Julho', viewValue: 'Julho'},
  {value: 'Agosto', viewValue: 'Agosto'},
  {value: 'Setembro', viewValue: 'Setembro'},
  {value: 'Outubro', viewValue: 'Outubro'},
  {value: 'Novembro', viewValue: 'Novembro'},
  {value: 'Dezembro', viewValue: 'Dezembro'},
  
  
  
  
  
 ]


  constructor(public dashboardService: DashboardService) {
    
  

  }

  ngOnInit() {

    this.GetMapa(this.bairroSelecionado)
    this.getSelectDelitos(this.delitoSelecionado, this.mesSelecionado, this.anoSelecionado )
    setTimeout(x =>{
      this.grafico()
      
    } ,2000)
  }

  
  GetMapa(SelecaoBairro:string){
   
    let ValorDoArray = 0;
    //para colocar o array do nomination
    this.Bairros.forEach(values =>{ values.value == SelecaoBairro? ValorDoArray = values.valueArray : '';})
 
    this.valores = [];
    this.dashboardService.GetPolygonsMaps(SelecaoBairro).subscribe(response => {
      this.teste = response[ValorDoArray].geojson.coordinates[0]
      
      for(let i = 0; i < this.teste.length ; i++)
      {
        for(let x = 0; x < this.teste[i].length; x++)
        {
          this.valores.push([this.teste[i][1],this.teste[i][0]]);
        }
      }
   
   

    })
    this.apareceMapa = false;

    setTimeout(x =>{
      this.grafico()
      
    } ,1000)
  }

  grafico(){

    this.apareceMapa = true;
    this.options = {

   
      
      layers: [
        tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }),
        
        
        polygon( [this.valores],{
          color: this.LogicaDasCores(),
          opacity: 0.8,
          
          
        }).bindPopup(`<h4><b>Total de delitos</b></h4> <br> Esse foi o numero de delitos 
        <br> que ocorreu neste bairro = <b>${this.popupPolygon()} </b>.`,{
          zoomAnimation:true
        }).openPopup(),
        
        
      ],
      zoom: 13,
      center: latLng([-23.9671202, -46.3416944]),
     
      
    };

    

  }
  //caixa de mensagem do delito
   popupPolygon():string{
     let delito:string;
    this.Bairros.forEach(values =>{
     
      if(values.value == this.bairroSelecionado)
     {
      delito = values.totalDelitos ;
    
     }
    })
  return delito;
  }
  //cuidar das cores apresentadas por quantidade de delitos
   LogicaDasCores():string{
     let cor:string;
    this.Bairros.forEach(values =>{
     
      if(values.value == this.bairroSelecionado)
     {
      if(values.totalDelitos >= 5)
      {
        cor = "red"
      }else if(values.totalDelitos < 5 && values.totalDelitos >= 2)
      {
        cor = "yellow"
      }else{
        cor ="blue"
      }
     }
    })
  return cor;
  }
//pegar informações na tabela
public getSelectDelitos(delito, mes, ano){
console.log(delito,mes,ano)
//resetar valores
this.Bairros.forEach(values =>{
  values.totalDelitos = 0;
})



  this.DadosdeBairros = [];
  this.dashboardService.GetDataBairrosAWSLambda(delito, mes, ano).subscribe(response =>{
/* console.log(response.Item.dados) */
    let valores:Array<any> = response.Item.dados;
    valores.forEach( value =>{

      if(value.CIDADE == "SANTOS")
      {    
      this.DadosdeBairros.push(value)


      this.Bairros.forEach(Bairro => {
        if(Bairro.bairro == value.BAIRRO)
        {
   /*     console.log(Bairro.bairro) */
          Bairro.totalDelitos =  Bairro.totalDelitos + 1
        }
      })
     
      }
   
    });


  
  });
  this.apareceMapa = false;

  setTimeout(x =>{
    this.grafico()
    
  } ,1500)

}


}
