import {Asset} from './asset';
import {Employee} from './employee';

export class AssetHistory {
  asset: Asset;

  employee: Employee;

  status: string;

  dateOfAllocated: string;

  dateOfReturn: string;

  remark: string;
}
