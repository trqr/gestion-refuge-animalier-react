import type {AnimalType} from "./Animal.type.ts";

export type BoxDetailsType = {
    id?: number;
    name: string;
    type: string;
    capacity: number;
    address: string;
    animals?: AnimalType[];
}

export const emptyBoxDetails: BoxDetailsType = {
    name: "",
    type: "",
    capacity: 0,
    address: "",
    animals: []
};