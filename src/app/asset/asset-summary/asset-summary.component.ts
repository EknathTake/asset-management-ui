import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-asset-summary',
  templateUrl: './asset-summary.component.html',
  styleUrls: ['./asset-summary.component.scss']
})
export class AssetSummaryComponent implements OnInit {

  displayedColumns = ['item', 'cost'];
  dataSource: MatTableDataSource<any>;
  transactions = [
    {item: 'Beach ball', cost: 4},
    {item: 'Towel', cost: 5},
    {item: 'Frisbee', cost: 2},
    {item: 'Sunscreen', cost: 4},
    {item: 'Cooler', cost: 25},
    {item: 'Swim suit', cost: 15},
  ];

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.transactions);
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

}
