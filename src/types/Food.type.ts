import type {AnimalType} from "./Animal.type.ts";

export type FoodType = {
    id: number;
    type: string;
    quantity: number;
    frequency: string;
    description: string;
    animal: AnimalType;
};