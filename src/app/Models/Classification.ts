import { Height } from './Mountain';
import { Location } from './Mountain';

export interface Classification {
    id: string;

    name: string;

    displayOrder: number;

    description: string;

    mountains: ClassificationMountain[];
}

export interface ClassificationMountain {
    id: string;
    position: number;
    name: string;
    location: Location;
    height: Height;
}