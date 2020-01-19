import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AssetHistory} from '../shared/model/asset-history';

@Injectable({
  providedIn: 'root'
})
export class AssetHistoryService {

  baseUrl$ = 'http://localhost:8999/api/asset';

  header = new HttpHeaders()
    .append('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  createAsset(assetHistory: AssetHistory) {
    return this.http.post(this.baseUrl$ + '/history', assetHistory, {headers: this.header});
  }
}
