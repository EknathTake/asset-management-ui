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
  spans = [];
  DATA: any[];

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
      this.DATA = summary;
      this.dataSource = new MatTableDataSource<any>(this.DATA);
      this.cacheSpan('status', d => d.assetDetails.status);
    });
  }

  /**
   * Evaluated and store an evaluation of the rowspan for each row.
   * The key determines the column it affects, and the accessor determines the
   * value that should be checked for spanning.
   */
  cacheSpan(key, accessor) {
    for (let i = 0; i < this.DATA.length;) {
      const currentValue = accessor(this.DATA[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < this.DATA.length; j++) {
        if (currentValue != accessor(this.DATA[j])) {
          break;
        }
        count++;
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }

  getRowSpan(col, index) {
    return this.spans[index] && this.spans[index][col];
  }

}
