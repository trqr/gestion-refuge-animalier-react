import type {AnimalType} from "./Animal.type.ts";

export type BoxDetailsType = {
    id?: number;
    name: string;
    type: string;
    capacity: number;
    address: string;
    animals?: AnimalType[];
}