import type {AnimalType} from "./Animal.type.ts";
import type {AdopterType} from "./Adopter.type.ts";

export type AdoptionType = {
    id: number;
    status: string;
    date: string;
    animal: AnimalType;
    adopter: AdopterType;
}