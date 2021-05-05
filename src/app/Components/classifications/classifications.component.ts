import { Component, OnInit } from "@angular/core";
import { Classification } from "src/app/Models/Classification";
import { Mountain } from "src/app/Models/Mountain";
import { MountainDataService } from "src/app/Services/MountainDataService";

@Component({
    selector: 'classifications',
    templateUrl: './classifications.component.html',
    styleUrls: ['./classifications.component.scss']
})
export class ClassificationsComponent implements OnInit {
    classifications: Classification[] = [];
    selectedClassificationId: string | undefined;
    description: string = '';
    mountains: Mountain[] = [];
    
    constructor(
        private mountainDataService: MountainDataService
    ) { }

    ngOnInit(): void {
        this.mountainDataService.getInitialData().subscribe((response) => {
            this.classifications = response.classifications;
            this.selectedClassificationId = response.classification.id;
            this.description = response.classification.description;
            this.mountains = response.classification.mountains;
        })
    }

    onSelectedClassificationChange() {
        if (this.selectedClassificationId) {
            this.mountainDataService.getClassification(this.selectedClassificationId).subscribe((response) => {
                this.selectedClassificationId = response.id;
                this.description = response.description;
                this.mountains = response.mountains;
            });
        }
    }
}