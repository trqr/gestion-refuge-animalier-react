import type {Animal} from "./Animal.ts";

export type Cage = {
    id: number;
    name: string;
    type: string;
    capacity: number;
    address: string;
    animals: Animal[];
}