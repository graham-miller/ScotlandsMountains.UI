import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mountain } from 'src/app/Models/Mountain';
import { MountainDataService } from 'src/app/Services/MountainDataService';

@Component({
  selector: 'app-mountain',
  templateUrl: './mountain.component.html',
  styleUrls: ['./mountain.component.scss']
})
export class MountainComponent implements OnInit {
  mountain?: Mountain = undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mountainDataService: MountainDataService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(route => {
      this.getMountain(route.id);
    });
  }

  getMountain(id: string) {
    this.mountainDataService.getMountain(id).subscribe((response) => {
      if (response) {
        this.mountain = response;
        console.log(response);
      } else {
        this.router.navigate(['/404'], { skipLocationChange: true });
      }
    });
  }
}
