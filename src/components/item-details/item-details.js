import React, { Component } from 'react';

import './item-details.css';
import '../item-list/item-list.css'

import SwapiService from '../../services/swapi-services';
import Spinner from '../spinner';

const Record = ({ item, field, label}) => {
    return (<li className='list-group-item'>
    <span className="term">{label}</span>
    <span>{ item[field] }</span>
</li>);
}

export {
    Record
};

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
        loading: true
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if(this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData) {
            this.updateItem();
        }
    }

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if(!itemId) {
            return;
        }

        this.setState(()=> {return {loading:true}})
        getData(itemId).then((item) => {
            console.log('url', item );
            this.setState({ 
                item: item,
                image: getImageUrl(item),
                loading: false});
        })

        
    }

    render() {
        const {item, image, loading} = this.state;
        if(!item ) {
            return <span>Select a person from a list</span>;
        }
        if (loading) {
            return <Spinner/>
        }

        const { name } = this.state.item;

        return (
            <div className = 'item-details card'>
                <img className = 'item-image' alt = 'person'
                src = {image} />
                
                <div className='card-body'>
                    <h4>{name}</h4>
                    <ul className='list-group list-group-flush'>
                        {
                            React.Children.map(this.props.children, (child) => {
                                return React.cloneElement(child, {item});
                            })
                            }
                    </ul>
                </div>
                
            </div>
        )
    }
}