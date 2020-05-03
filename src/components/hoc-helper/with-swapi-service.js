import React from 'react';

import { SwapiServiceConsumer } from '../swapi-service-context';

const withSwapiService = (mapTethodsToProps)=>(Wrapped) =>{
    return (props) =>{
        return(
            <SwapiServiceConsumer>{
                (swapiService) => {
                    const serviceProps = mapTethodsToProps(swapiService)
                    return(
                        <Wrapped {...props} {...serviceProps}/>
                    )
                }
            }
            </SwapiServiceConsumer>
        );
    }
};

export default withSwapiService;