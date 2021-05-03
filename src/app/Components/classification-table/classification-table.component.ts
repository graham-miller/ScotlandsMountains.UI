import { AfterViewInit } from '@angular/core';
import { Component, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassificationMountain } from 'src/app/Models/Classification';

@Component({
  selector: 'classification-table',
  templateUrl: './classification-table.component.html',
  styleUrls: ['./classification-table.component.css']
})
export class ClassificationTableComponent implements AfterViewInit {
  columns: string[] = ['position', 'name', 'height'];
  dataSource: MatTableDataSource<ClassificationMountain> = new MatTableDataSource<ClassificationMountain>([]);

  @ViewChild(MatPaginator) paginator?: MatPaginator = undefined;
  @ViewChild(MatSort) sort?: MatSort = undefined;

  @Input() mountains: ClassificationMountain[] = [];

  ngAfterViewInit(): void {
    if (this.mountains) {
      this.dataSource = new MatTableDataSource<ClassificationMountain>(this.mountains);

      if (this.paginator && this.sort){
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = this.getSortingDataAccessor;        
        this.dataSource.sort = this.sort;
      }
    }
  }

  getSortingDataAccessor(mountain: ClassificationMountain, property: string) {
    switch(property) {
      case 'position': return mountain.position;
      case 'height': return mountain.height.metres;
      case 'name': return mountain.name;
      default: return 0;
    }
  }
}
