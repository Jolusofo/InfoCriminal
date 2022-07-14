import { Component, OnInit, ViewChild } from "@angular/core";
import { DashboardService } from "../dashboard.service";



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  constructor(private dashboardService: DashboardService) { }
  dataSource: any
  displayedColumns: string[] = [];
  valoresDelitoAno: Array<any> = [];
  indexOpcao: number = 0;


  AnoSelecionado = 2021
  Anos: Array<any> = [
    { value: 2022, viewValue: '2022' },
    { value: 2021, viewValue: '2021' },
    { value: 2020, viewValue: '2020' },
    { value: 2019, viewValue: '2019' },
    { value: 2018, viewValue: '2018' },
    { value: 2017, viewValue: '2017' },
  ]
  VizualizacaoSelecionado = 'Anual';
  TipoVizualizacao: Array<any> = [
    { value: 'Anual', viewValue: 'Anual' },
    { value: 'Semestral', viewValue: 'Semestre' },
    { value: 'Trimestral', viewValue: 'Trimestre' },
    { value: 'Mensal', viewValue: 'Mensal' },

  ]
  opcaoVizualizacao: Array<any> = [
    {
      tipo: 'Anual', opcao: [
        { value: 'Anual', viewValue: 'Anual' },
        { value: 'Semestral', viewValue: 'Semestral' },
        { value: 'Trimestral', viewValue: 'Trimestral' },
        { value: 'Mensal', viewValue: 'Mensal' },
      ]
    },
    {
      tipo: 'Semestral', opcao: [
        { value: '1semestre', viewValue: '1º Semestre' },
        { value: '2semestre', viewValue: '2º Semestre' },
      ]
    },
    {
      tipo: 'Trimestral', opcao: [
        { value: '1Trimestre', viewValue: '1º Trimestre' },
        { value: '2Trimestre', viewValue: '2º Trimestre' },
        { value: '3Trimestre', viewValue: '3º Trimestre' },
        { value: '4Trimestre', viewValue: '4º Trimestre' },
      ]
    },
    {
      tipo: 'Mensal', opcao: [
        { value: 'Jan', viewValue: 'Janeiro' },
        { value: 'Fev', viewValue: 'Fevereiro' },
        { value: 'Mar', viewValue: 'Março' },
        { value: 'Abr', viewValue: 'Abril' },
        { value: 'Mai', viewValue: 'Maio' },
        { value: 'Jun', viewValue: 'Junho' },
        { value: 'Jul', viewValue: 'Julho' },
        { value: 'Ago', viewValue: 'Agosto' },
        { value: 'Set', viewValue: 'Setembro' },
        { value: 'Out', viewValue: 'Outubro' },
        { value: 'Nov', viewValue: 'Novembro' },
        { value: 'Dez', viewValue: 'Dezembro' },
      ]
    }

  ]
  SelecionadoVizualizacao = 'Anual'


  ngOnInit() {
    this.getTable()
  }



  getTable() {
    /* descomentar abaixo para rodar local */
    /*     this.dashboardService.GetDataCharts(this.AnoSelecionado).subscribe(response =>{
        
        this.valoresDelitoAno = response.graficoGrande;
        this.changesTable();
      }); */

    this.dashboardService.getAWSLambdaTabela(this.AnoSelecionado).subscribe(response => {

      this.valoresDelitoAno = response.Item.graficoGrande;
      this.changesTable();
    });
  }


  changesSelect() {
    this.opcaoVizualizacao.forEach((opcoes, index) => {
      if (opcoes.tipo == this.VizualizacaoSelecionado) {
        return this.indexOpcao = index;
      }
    })
  }

  changesTable() {
    let valoresano = [];
    let valoresColunas = [];

    this.valoresDelitoAno.forEach(value => {
      // por ano
      if (this.VizualizacaoSelecionado == "Anual") {
        if (value.Ano == this.AnoSelecionado) //popula pelo ano
        {
          valoresano.push({
            "posicao": "0",
            "delito": value.Ocorrencia,
            "Total": `${value.Total}`.replace(/[^\d]+/g, '')
          });
        }
        valoresano.sort((a, b) => { //ordenamos
          return b.Total - a.Total;
        });
        valoresano.forEach((ano, index) => { //aqui colocamos as posições
          ano.posicao = `${index + 1}º`;
          this.displayedColumns = Object.keys(ano);
        })
        this.dataSource = valoresano;
      }
      //por semestre
      if (this.VizualizacaoSelecionado == "Semestral") {

        if (this.SelecionadoVizualizacao == "1semestre") {

          if (value.Ano == this.AnoSelecionado) //popula pelo ano
          {
            let resultado = 0;
            let semestre1 = [value.Jan, value.Fev, value.Mar, value.Abr, value.Mai, value.Jun]
            let buscar = '...'
            let index = semestre1.indexOf(buscar);
            while (index >= 0) {
              semestre1.splice(index, 1);
              index = semestre1.indexOf(buscar);
            }

            semestre1.forEach(elemento => {
              let converter = elemento.toString().replace(/[^0-9]/g, '')


              return resultado = parseFloat(converter) + resultado

            })
            valoresano.push({
              "posicao": "0",
              "delito": value.Ocorrencia,
              "Total": `${resultado}`.replace(/[^\d]+/g, '')
            });

          }

          valoresano.sort((a, b) => { //ordenamos
            return b.Total - a.Total;
          });
          valoresano.forEach((ano, index) => { //aqui colocamos as posições
            ano.posicao = `${index + 1}º`;
            this.displayedColumns = Object.keys(ano);
          })
          this.dataSource = valoresano;

        }
        if (this.SelecionadoVizualizacao == "2semestre") {
          if (value.Ano == this.AnoSelecionado) //popula pelo ano
          {
            let resultado = 0;
            let semestre2 = [value.Jul, value.Ago, value.Set, value.Out, value.Nov, value.Dez]
            let buscar = '...'
            let index = semestre2.indexOf(buscar);
            while (index >= 0) {
              semestre2.splice(index, 1);
              index = semestre2.indexOf(buscar);
            }

            semestre2.forEach(elemento => {
              let converter = elemento.toString().replace(/[^0-9]/g, '')


              return resultado = parseFloat(converter) + resultado

            })
            valoresano.push({
              "posicao": "0",
              "delito": value.Ocorrencia,
              "Total": `${resultado}`.replace(/[^\d]+/g, '')
            });

          }
          valoresano.sort((a, b) => { //ordenamos
            return b.Total - a.Total;
          });
          valoresano.forEach((ano, index) => { //aqui colocamos as posições
            ano.posicao = `${index + 1}º`;
            this.displayedColumns = Object.keys(ano);
          })
          this.dataSource = valoresano;
        }

      }
      //por trimeste
      if (this.VizualizacaoSelecionado == "Trimestral") {

        if (this.SelecionadoVizualizacao == "1Trimestre") {

          if (value.Ano == this.AnoSelecionado) //popula pelo ano
          {
            let resultado = 0;
            let trimestre1 = [value.Jan, value.Fev, value.Mar]
            let buscar = '...'
            let index = trimestre1.indexOf(buscar);
            while (index >= 0) {
              trimestre1.splice(index, 1);
              index = trimestre1.indexOf(buscar);
            }

            trimestre1.forEach(elemento => {
              let converter = elemento.toString().replace(/[^0-9]/g, '')


              return resultado = parseFloat(converter) + resultado

            })
            valoresano.push({
              "posicao": "0",
              "delito": value.Ocorrencia,
              "Total": `${resultado}`.replace(/[^\d]+/g, '')
            });

          }

          valoresano.sort((a, b) => { //ordenamos
            return b.Total - a.Total;
          });
          valoresano.forEach((ano, index) => { //aqui colocamos as posições
            ano.posicao = `${index + 1}º`;
            this.displayedColumns = Object.keys(ano);
          })
          this.dataSource = valoresano;

        }
        if (this.SelecionadoVizualizacao == "2Trimestre") {
          if (value.Ano == this.AnoSelecionado) //popula pelo ano
          {
            let resultado = 0;
            let trimestre2 = [value.Abr, value.Mai, value.Jun]
            let buscar = '...'
            let index = trimestre2.indexOf(buscar);
            while (index >= 0) {
              trimestre2.splice(index, 1);
              index = trimestre2.indexOf(buscar);
            }

            trimestre2.forEach(elemento => {
              let converter = elemento.toString().replace(/[^0-9]/g, '')


              return resultado = parseFloat(converter) + resultado

            })
            valoresano.push({
              "posicao": "0",
              "delito": value.Ocorrencia,
              "Total": `${resultado}`.replace(/[^\d]+/g, '')
            });

          }
          valoresano.sort((a, b) => { //ordenamos
            return b.Total - a.Total;
          });
          valoresano.forEach((ano, index) => { //aqui colocamos as posições
            ano.posicao = `${index + 1}º`;
            this.displayedColumns = Object.keys(ano);
          })
          this.dataSource = valoresano;
        }
        if (this.SelecionadoVizualizacao == "3Trimestre") {
          if (value.Ano == this.AnoSelecionado) //popula pelo ano
          {
            let resultado = 0;
            let trimestre3 = [value.Jul, value.Ago, value.Set]
            let buscar = '...'
            let index = trimestre3.indexOf(buscar);
            while (index >= 0) {
              trimestre3.splice(index, 1);
              index = trimestre3.indexOf(buscar);
            }

            trimestre3.forEach(elemento => {
              let converter = elemento.toString().replace(/[^0-9]/g, '')


              return resultado = parseFloat(converter) + resultado

            })
            valoresano.push({
              "posicao": "0",
              "delito": value.Ocorrencia,
              "Total": `${resultado}`.replace(/[^\d]+/g, '')
            });

          }
          valoresano.sort((a, b) => { //ordenamos
            return b.Total - a.Total;
          });
          valoresano.forEach((ano, index) => { //aqui colocamos as posições
            ano.posicao = `${index + 1}º`;
            this.displayedColumns = Object.keys(ano);
          })
          this.dataSource = valoresano;
        }
        if (this.SelecionadoVizualizacao == "4Trimestre") {
          if (value.Ano == this.AnoSelecionado) //popula pelo ano
          {
            let resultado = 0;
            let trimestre4 = [value.Out, value.Nov, value.Dez]
            let buscar = '...'
            let index = trimestre4.indexOf(buscar);
            while (index >= 0) {
              trimestre4.splice(index, 1);
              index = trimestre4.indexOf(buscar);
            }

            trimestre4.forEach(elemento => {
              let converter = elemento.toString().replace(/[^0-9]/g, '')


              return resultado = parseFloat(converter) + resultado

            })
            valoresano.push({
              "posicao": "0",
              "delito": value.Ocorrencia,
              "Total": `${resultado}`.replace(/[^\d]+/g, '')
            });

          }
          valoresano.sort((a, b) => { //ordenamos
            return b.Total - a.Total;
          });
          valoresano.forEach((ano, index) => { //aqui colocamos as posições
            ano.posicao = `${index + 1}º`;
            this.displayedColumns = Object.keys(ano);
          })
          this.dataSource = valoresano;

        }
      }//valores mensal
      if (this.VizualizacaoSelecionado == "Mensal") {
        let chaves: Array<any> = Object.keys(value)

        if (value.Ano == this.AnoSelecionado) {
          chaves.forEach(chave => {
            if (chave == this.SelecionadoVizualizacao) {
              let resultado = value[chave] == "..." ? 0 : value[chave];
              valoresano.push({
                "posicao": "0",
                "delito": value.Ocorrencia,
                "Total": `${resultado}`.replace(/[^\d]+/g, '')
              });
            }

          })
          valoresano.sort((a, b) => { //ordenamos
            return b.Total - a.Total;
          });
          valoresano.forEach((ano, index) => { //aqui colocamos as posições
            ano.posicao = `${index + 1}º`;
            this.displayedColumns = Object.keys(ano);
          })
          this.dataSource = valoresano;
        }


      }

    });


  }


}
