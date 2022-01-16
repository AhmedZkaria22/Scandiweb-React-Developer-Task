import React, { PureComponent } from 'react';
import { Mutation } from '@apollo/client/react/components/Mutation';
import { Query } from '@apollo/client/react/components/Query';
import { DecreAmount, DltCartItm, IncreAmount, ProductsCart, RstCartItm, UpdateProdSelectedSize } from '../graphql/graphqls';
import { handelFige } from '../graphql/handelFunctionality';
import nextIc from '../assets/images/next.png';
import prevIc from '../assets/images/prev.png';

class CartPage extends PureComponent {
    constructor(props){
        super(props);
    }


    render() {
        const {curnIndex} = this.props;
        
        return (
            <section className='cartPage'>
                <h1> cart </h1>
                <Query query={ProductsCart}>{
                    ({loading, error, data}) => {
                        if(loading) return <h4>loading ...</h4>
                        if(error) console.log(error);
                        console.log(data);
                        return <>{  data.UserProductsCart.map( (prd, i) => {
                            return(
                                <div className="cart-container__item" key={i}>
                                    <div className="cart-container__item__col1">
                                        <p>{prd.name}</p>
                                        <p>{`${prd.prices[curnIndex].currency.symbol}${prd.prices[curnIndex].amount}`}</p>                                        
                                        <div className="cartItem-sizes">
                                            <Mutation mutation={UpdateProdSelectedSize}>{   
                                                (UpdateSelectedSize, {data}) => {return(
                                                <>{
                                                    prd.attributes.map( (atr, i) => { return(
                                                    (atr.id === 'Size' || atr.id === 'Capacity') &&
                                                        atr.items.map( (sz, i) => { return(
                                                            <button key={i} 
                                                            className={ (prd.selectedSize === sz.value) ? 'activeSize' : 'available-size' }
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                UpdateSelectedSize({ 
                                                                    variables: { id: prd.id, btnVal: sz.value } ,
                                                                    refetchQueries: [{ query: ProductsCart }]
                                                                });                                                                
                                                            }}>{sz.value}</button>
                                                        ) } )
                                                    ) } )
                                                }</>
                                            )}}</Mutation>

                                            <Mutation mutation={DltCartItm}>   
                                            {(DeleteCartItem, {data}) => {return(
                                                <Mutation mutation={RstCartItm}>   
                                                {(ResetProductAmount, {data}) => {return(
                                                    <button className='cartItem-sizes__remove' onClick={(e) => {
                                                        e.preventDefault();
                                                        DeleteCartItem({ variables: { id: prd.id } });
                                                        ResetProductAmount({ variables: { id: prd.id },
                                                            refetchQueries: [{ query: ProductsCart }]
                                                        });
                                                    }}>Remove</button>
                                                )}}</Mutation>
                                            )}}</Mutation>                                        
                                        </div>
                                    </div>
                                    <div className="cart-container__item__col2">
                                        <div className="cartItem-amount">
                                            <Mutation mutation={IncreAmount}>   
                                            {(IncreProductAmount, {data}) => {return(
                                                <button onClick={(e) => {
                                                    e.preventDefault();
                                                    IncreProductAmount({ 
                                                        variables: { id: prd.id },
                                                        refetchQueries: [{ query: ProductsCart }]
                                                    });
                                                }}></button>
                                            )}}</Mutation>
                                            <p>{prd.amount}</p>
                                            {
                                                (prd.amount === 1)
                                                ? <button className='disable-decre'></button>
                                                : <Mutation mutation={DecreAmount}>   
                                                {(DecreProductAmount, {data}) => {return(
                                                    <button onClick={(e) => {
                                                        e.preventDefault();
                                                        DecreProductAmount({ 
                                                            variables: { id: prd.id },
                                                            refetchQueries: [{ query: ProductsCart }]
                                                        });
                                                        
                                                    }}></button>
                                                )}}</Mutation>    
                                            }
                                        </div>
                                        <div className="cartItem-figures">
                                            {
                                                prd.gallery.map( (fige, f) => {  return(
                                                    ( f === 0 ) ?
                                                    <img key={f} src={ fige } className='activeImg' alt="" />
                                                    : <img key={f} src={ fige } className='disable-img' alt="" />
                                                ) } )
                                            }
                                            <button onClick={() => handelFige('cart-container__item', (i+1), 'next')}> 
                                                <img src={ nextIc } alt="" />
                                            </button>
                                            <button onClick={() => handelFige('cart-container__item', (i+1), 'prev')}> 
                                                <img src={ prevIc } alt="" />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            )
                        } ) }</>
                    }
                }</Query>
            </section>
        )
    }
}

export default CartPage
