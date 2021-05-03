import { AfterViewInit } from '@angular/core';
import { Component, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mountain } from '../../Models/Mountain';

@Component({
  selector: 'mountain-table',
  templateUrl: './mountain-table.component.html',
  styleUrls: ['./mountain-table.component.css']
})
export class MountainTableComponent implements AfterViewInit {
  columns: string[] = ['name', 'height'];
  dataSource: MatTableDataSource<DataItem> = new MatTableDataSource<DataItem>([]);

  @ViewChild(MatPaginator) paginator: any;//MatPaginator;
  @ViewChild(MatSort) sort: any;//MatSort;

  @Input() mountains: Mountain[] = [];

  ngAfterViewInit(): void {
    if (this.mountains) {
      let dataItems: DataItem[] = [];

      this.mountains.forEach(m => {
        dataItems.push({
          name: m.name,
          height: m.height.metres
        } as DataItem)
      });

      this.dataSource = new MatTableDataSource<DataItem>(dataItems);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}

class DataItem {
  name: string = '';
  height: number = 0;
}
