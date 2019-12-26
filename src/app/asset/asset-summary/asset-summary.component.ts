import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {AssetService} from '../../services/asset.service';
import {AssetSummary} from '../../shared/model/asset-summary';
import {AssetDetails} from '../../shared/model/asset-details';

@Component({
  selector: 'app-asset-summary',
  templateUrl: './asset-summary.component.html',
  styleUrls: ['./asset-summary.component.scss']
})
export class AssetSummaryComponent implements OnInit {

  total = 0;
  total4GB = 0;
  total8GB = 0;
  total16GB = 0;

  displayedColumns = ['status', 'model', 'ram4GB', 'ram8GB', 'ram16GB', 'total'];
  dataSource: MatTableDataSource<any>;

  constructor(private assetService: AssetService) {
  }

  ngOnInit() {
    this.assetService.getSummary().subscribe(summary => {

      summary.forEach(ss => {
        this.total += ss.assetDetails.total;
        this.total4GB += ss.assetDetails.ram4GB;
        this.total8GB += ss.assetDetails.ram8GB;
        this.total16GB += ss.assetDetails.ram16GB;
      });

      const  asm = new AssetSummary();
      asm.assetDetails = new AssetDetails('Total', '', this.total4GB, this.total8GB, this.total16GB, this.total);
      summary.push(asm);
      this.dataSource = new MatTableDataSource<any>(summary);
    });
  }

}
