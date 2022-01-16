import { Mutation } from '@apollo/client/react/components/Mutation';
import { Query } from '@apollo/client/react/components/Query';
import React, { PureComponent } from 'react';
import { AppCart, handel_Id_Query, ProductsCart, UpdateProdSelectedSize } from '../graphql/graphqls';
import { handelClickFige, handelColors, handelProductAttrColor, handelProductAttrSize, handel_Add_Cart } from '../graphql/handelFunctionality';

export class ProductView extends PureComponent {
    constructor(props){
        super(props);
        this.state = { figeValue : "", figeListener: false, colorListener: '', sizeListener: '' };
    }

    render() {
        const ProdUrl = window.location.href; 
        const ProdId = ProdUrl.slice( ProdUrl.indexOf('?')+1, ProdUrl.length );
        let prd = {};
        const {curnIndex} = this.props;

        return (
            <Query query={handel_Id_Query(ProdId)}>{
                ({loading, error, data}) => {
                    if(loading) return <h4>loading ...</h4>
                    if(error) console.log(error);
                    console.log(data);
                    prd = data.ProductsDataById;
                    return(
                        <section className='ProductView'>
                            <div className="productView__gallery">{
                                prd.gallery.map( (feg, i) => {
                                    return(                        
                                        <button key={i} style={{ backgroundImage: 'url('+feg+')' }} onClick={
                                            () => handelClickFige(feg, this.state, this.setState.bind(this))
                                        }></button>
                                    )
                                } )
                            }</div>
                            <div className="productView__fig">{
                                (! this.state.figeListener) 
                                ? <img src={ prd.gallery[0] } alt="" />
                                : <img src={ this.state.figeValue } alt="" />
                            }</div>
                            <div className="productView__content">
                                <p>{prd.name}</p>
                                {
                                    prd.attributes.map( (atr, i) => { return(
                                        (atr.id === 'Size' || atr.id === 'Capacity') ?
                                        <div className="productView__content__sizes-capacity" key={i}>
                                            <span>{`${atr.id}:`}</span>
                                            <Mutation mutation={UpdateProdSelectedSize}>{   
                                                (UpdateSelectedSize, {data}) => {   return(
                                                <>{
                                                    atr.items.map( (sz, i) => { return(
                                                        <button key={i} 
                                                        className={ (prd.selectedSize === sz.value) ? 'activeSize' : 'available-size' }
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            UpdateSelectedSize({ 
                                                                variables: { id: prd.id, btnVal: sz.value } ,
                                                                refetchQueries: [{ query: ProductsCart }, { query: handel_Id_Query(ProdId) }]
                                                            });     
                                                            handelProductAttrSize( this.state, this.setState.bind(this), sz.value );                                                           
                                                        }}>{sz.value}</button>
                                                    ) } )
                                                }</>
                                            )}}</Mutation>

                                        </div>                                
                                        : (atr.id === 'Color') ?
                                        <div className="productView__content__color" key={i}>
                                        <span>{`${atr.id}:`}</span>
                                            {
                                                atr.items.map( (sz, i) => { return(
                                                    <button key={i} onClick={(e) => {
                                                        handelProductAttrColor( this.state, this.setState.bind(this), sz.value );
                                                        handelColors(e, 'productView__content__color');
                                                    }
                                                    } style={{ backgroundColor: `${sz.value}` }}></button>
                                                ) } )
                                            }
                                        </div>
                                        : null
                                    ) } )
                                }
                                <div className="productView__content__price">
                                    <span>price:</span>
                                    <p>{`${prd.prices[curnIndex].currency.symbol}${prd.prices[curnIndex].amount}`}</p>
                                </div>
                                <Mutation mutation={AppCart}>
                                    {(AddProductCart, {data}) => (                
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        handel_Add_Cart(prd, AddProductCart, this.state);
                                    }}>
                                        add to card
                                    </button>
                                    )}
                                </Mutation>

                                <div className='description-wrapper' dangerouslySetInnerHTML={{ __html: prd.description }} />                 
                            </div>                                
                        </section>
                    )                    
                }
            }</Query>            
        )
    }
}

export default ProductView
