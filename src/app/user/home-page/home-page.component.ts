import {Component, OnInit} from '@angular/core';
import {AssetService} from '../../services/asset.service';
import {Asset} from '../../shared/model/asset';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  constructor() {

  }

  ngOnInit(): void {
  }

}
