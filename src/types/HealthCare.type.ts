import type {AnimalType} from "./Animal.type.ts";
import type {VeterinarianType} from "./Veterinarian.type.ts";

export type HealthCareType = {
    id: number;
    type: string;
    veterinarian: VeterinarianType;
    date: string;
    description: string;
    animal: AnimalType;
}