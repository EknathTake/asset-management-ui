import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {
  constructor() {
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {data: worksheet}, SheetNames: ['Allocation']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array', Props: {Author: 'IDEMIA', Company: 'IDEMIA'}});
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  toFile(general: any[], json: any[], json2: any[], json3: any[], json1: any[], fileName: string) {
    const workbook = XLSX.utils.book_new();

    const gws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(general);
    XLSX.utils.book_append_sheet(workbook, gws, 'General');

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Allocation');

    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json2);
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'Inventory');

    const worksheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json3);
    XLSX.utils.book_append_sheet(workbook, worksheet3, 'Inventory - Not Working');

    const worksheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json1);
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'Sumary');

    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array', Props: {Author: 'IDEMIA', Company: 'IDEMIA'}});
    this.saveAsExcelFile(excelBuffer, fileName);

  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
