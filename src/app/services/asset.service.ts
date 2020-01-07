import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Asset} from '../shared/model/asset';
import {AssetResponse} from '../shared/model/asset-response';
import {AssetSummary} from '../shared/model/asset-summary';
import { catchError } from 'rxjs/operators';

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

  getSummary(): Observable<AssetSummary[]> {
    return this.http.get<AssetSummary[]>(this.baseUrl$ + '/asset/summary', {
      headers: this.header
    });
  }

  removeAssetWithId(sequenceNumber: any) {
    return this.http.delete<any>(this.baseUrl$ + '/asset/' + sequenceNumber, {
      headers: this.header
    }).pipe(
      catchError((error: any) => {
        console.error(error);
        return of();
      }),
    );;
  }

  updateAsset(element: Asset) {
    return this.http.put(this.baseUrl$ + '/asset', element, { headers: this.header});
  }
}
