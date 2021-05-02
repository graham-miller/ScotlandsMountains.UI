import { Component, OnInit } from "@angular/core";
import { MountainDataService } from "src/app/Services/MountainDataService";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    classifications: any;
    selectedClassification: any;

    constructor(private mountainDataService: MountainDataService) {

    }

    ngOnInit(): void {
        this.mountainDataService.getInitialData().subscribe((response) => {
            this.classifications = response.classifications;
            this.selectedClassification = response.classification;
        })
    }
}