import React, { PureComponent } from 'react';
import {Mutation} from '@apollo/client/react/components/Mutation';
import { Link } from 'react-router-dom';
import AddShopping from '../assets/images/AddShopping.png';
import { AppCart, ProductsCart, Product_Query } from '../graphql/graphqls';

class Product extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {prd, curnIndex} = this.props;
        return (
            <>{
                ( prd.inStock ) ?
                <div className='product'>
                <Link to={`/product-view?${prd.id}`} target={'_blank'}>
                    <img src={prd.gallery[0]} alt="" />
                </Link>
                <div className="product__content">
                    <p>{prd.name}</p>
                    <p>{`${prd.prices[curnIndex].currency.symbol}${prd.prices[curnIndex].amount}`}</p>
                </div>
                <Mutation mutation={AppCart}>
                    {(AddProductCart, {data}) => (                
                    <button onClick={(e) => {
                        e.preventDefault();
                        AddProductCart({ 
                            variables: { id: prd.id },
                            refetchQueries: [{ query: ProductsCart } ,{ query: Product_Query }]    
                        });
                        // console.log(prd, data, ProductsCart);
                    }}>
                        <img src={AddShopping} alt='img' />
                    </button>
                    )}
                </Mutation>
                </div>      
                :
                <div className='product disable-product'>
                    <img src={prd.gallery[0]} alt="" />
                    <div className="product__content">
                        <p>{prd.name}</p>
                        <p>{`${prd.prices[curnIndex].currency.symbol}${prd.prices[curnIndex].amount}`}</p>
                    </div>
                </div>      
            }</>
        )
    }
}

export default Product
