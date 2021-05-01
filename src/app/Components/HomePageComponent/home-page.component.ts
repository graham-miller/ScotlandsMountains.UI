import { Component, OnInit } from "@angular/core";
import { MountainDataService } from "src/app/Services/MountainDataService";

@Component({
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
    classifications: any;
    mountains: any;

    constructor(private mountainDataService: MountainDataService) {

    }

    ngOnInit(): void {
        this.mountainDataService.getInitialData().subscribe((response) => {
            this.classifications = response.classifications;
            this.mountains = response.mountains;
        })
    }



}