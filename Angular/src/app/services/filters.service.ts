// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class FiltersService {

//   constructor(private readonly myClient: HttpClient) { }

//   private readonly Base_URL = 'http://localhost:3000/api/products/';
//   FilterByOS(osFilters: string[]){
//     const osFilterString = osFilters.join(',');
//     const params = new HttpParams().set('os', osFilterString);
//     // console.log((this.Base_URL, { params }))
//     // return this.myClient.get<any>(this.Base_URL, { params });
//     return this.myClient.get(this.Base_URL + '?' + params)

//   }
// }
