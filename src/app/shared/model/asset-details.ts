export class AssetDetails {

  status: string;

  model: string;

  ram16GB: number;

  ram8GB: number;

  ram4GB: number;

  total: number;

  constructor(status: string, model: string, ram4GB: number, ram8GB: number, ram16GB: number, total: number) {
    this.status = status;
    this.model = model;
    this.ram4GB = ram4GB;
    this.ram8GB = ram8GB;
    this.ram16GB = ram16GB;
    this.total = total;
  }
}
