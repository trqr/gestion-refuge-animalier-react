export type AnimalType = {
    id?: number;
    name: string;
    type: string;
    race: string;
    sex: string;
    birthDate: string;
    arrivalDate?: string;
    behaviour: string;
    health: string;
    picture: string;
    boxId: number;
    adopted: boolean;
}

export const emptyAnimal: AnimalType = {
    name: "",
    type: "",
    race: "",
    sex: "",
    birthDate: "",
    behaviour: "",
    health: "",
    picture: "",
    boxId: 0,
    adopted: false,
};