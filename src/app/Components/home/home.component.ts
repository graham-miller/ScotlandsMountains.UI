import { Component, OnInit } from "@angular/core";
import { Classification } from "src/app/Models/Classification";
import { MountainDataService } from "src/app/Services/MountainDataService";

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    classifications: Classification[] = [];
    selectedClassification: Classification | null = null;

    constructor(private mountainDataService: MountainDataService) {

    }

    ngOnInit(): void {
        this.mountainDataService.getInitialData().subscribe((response) => {
            this.classifications = response.classifications;
            this.selectedClassification = response.classification;
        })
    }
}