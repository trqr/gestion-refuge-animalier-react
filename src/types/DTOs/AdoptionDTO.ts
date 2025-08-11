export type AdoptionDTO = {
    animalId: number;
    name: string;
    address: string;
    phone: string;
    email: string;
}

export const emptyAdoptionDTO = {
    animalId: 0,
    name: '',
    address: '',
    phone: '',
    email: '',
}