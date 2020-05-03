import React from 'react';
import ItemList from '../item-list';
import { withData, 
            withSwapiService, 
            withChildFunction, 
            compose} from '../hoc-helper';

const renderName = ({name})=> <span>{name}</span>; 

const mapPersonMethodsToProps = (swapiServise) =>{
    return { getData: swapiServise.getAllPeople };
};

const mapPlanetMethodsToProps = (swapiServise) =>{
    return { getData: swapiServise.getAllPlanets};
};

const mapStarshipMethodsToProps = (swapiServise) =>{
    return { getData: swapiServise.getAllStarships };
};

const PersonList = compose( 
                            withSwapiService(mapPersonMethodsToProps),
                            withData,
                            withChildFunction(renderName)
                            )(ItemList);

const PlanetList = compose(
                            withSwapiService(mapPlanetMethodsToProps),
                            withData,
                            withChildFunction(renderName)
                            )(ItemList);

const StarshipList = compose(
                            withSwapiService(mapStarshipMethodsToProps),
                            withData,
                            withChildFunction(renderName) 
                            )(ItemList);

export {
    PersonList,
    PlanetList,
    StarshipList   
};