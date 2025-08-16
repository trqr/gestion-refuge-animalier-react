import type {LoaderFunction} from "react-router-dom";
import {getAnimalBox, getAnimalById} from "../api/AnimalRequests";
import {getAllBoxes} from "../api/BoxRequests";
import {getAnimalFood} from "../api/FoodRequests";
import {getAnimalHealthCares, getAnimalNextHealthCare} from "../api/HealthCareRequests";

export const animalDetailsLoader: LoaderFunction = async ({params}) => {
    const idParam = params.id;
    if (!idParam) {
        throw new Error("No animal ID provided");
    }

    const id = Number(idParam);
    if (isNaN(id)) {
        throw new Error("Animal ID is not a number");
    }

    const animal = await getAnimalById(id.toString());
    const boxes = await getAllBoxes();
    const animalBox = await getAnimalBox(id);
    const animalFood = await getAnimalFood(id);
    const animalHealthCares = await getAnimalHealthCares(id);
    const nextHealthCare = await getAnimalNextHealthCare(id);

    return {animal, boxes, animalBox, animalFood, animalHealthCares, nextHealthCare};
};

