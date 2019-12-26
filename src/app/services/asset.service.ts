import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Asset} from '../shared/model/asset';
import {AssetResponse} from '../shared/model/asset-response';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  baseUrl$ = 'http://localhost:8999/api';

  header = new HttpHeaders()
    .append('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
  }

  getAllAsset(): Observable<AssetResponse> {
    return this.http.get<AssetResponse>(this.baseUrl$ + '/asset', {
      headers: this.header
    });
  }

  createAsset(asset: Asset) {
    return this.http.post(this.baseUrl$ + '/asset', asset, {headers: this.header});
  }
}
