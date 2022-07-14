import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(public http:HttpClient ) { }

  GetDataCharts(ano:any):any{
    return this.http.get<{
    Ocorrencia:string,
    Jan: number,
    Fev: number,
    Mar: number,
    Abr: number,
    Mai: number,
    Jun: number,
    Jul: number,
    Ago: number,
    Set: number,
    Out: number,
    Nov: number,
    Dez: number,
    Total: number;
    }>(`http://localhost:3000/${ano}`)
  }


  GetDataBairros(TipoDelito:string, mes:string, ano:string):any{
    return this.http.get<any>(`http://localhost:1001/${TipoDelito + mes + ano}`)
  }
  GetDataBairrosAWSLambda(TipoDelito:string, mes:string, ano:string):any{
    return this.http.get<any>(`https://"coloque seu endereco"/dev/maps/${TipoDelito + mes + ano}`)
   
  }


  getAWSLambdaTabela(ano){
    return this.http.get<any>(`https://"coloque seu endereco"/dev/dashboards/${ano}`)
  }

  GetPolygonsMaps(bairro:string):any{
    return this.http.get<any>(`https://nominatim.openstreetmap.org/search.php?q=${bairro}%2C+Santos%2C+Regi%C3%A3o+Imediata+de+Santos%2C+Regi%C3%A3o+Metropolitana+da+Baixada+Santista%2C+Regi%C3%A3o+Geogr%C3%A1fica+Intermedi%C3%A1ria+de+S%C3%A3o+Paulo%2C+S%C3%A3o+Paulo%2C+Regi%C3%A3o+Sudeste%2C+Brasil&&polygon_geojson=1&format=jsonv2`)
    
    
  }


}
