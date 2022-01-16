import { Query } from '@apollo/client/react/components/Query';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import checkLogo from '../assets/images/checkout.png';
import homeLogo from '../assets/images/homeLogo.png';

import shoppingLogo from '../assets/images/shopping.png';
import CategoriesOpen from '../assets/images/Categories.png';
import CategoriesClose from '../assets/images/Close.png';
import { DecreAmount, IncreAmount, ProductsCart, UpdateProdSelectedSize } from '../graphql/graphqls';
import { handelCategory, handelGender, handelResetFilter, handelTotal, ShowCategoriesList } from '../graphql/handelFunctionality';
import { Mutation } from '@apollo/client/react/components/Mutation';

class Navbar extends PureComponent {

    constructor(props){
        super(props);
        this.state = { genderListener: '' }
    }
    
    catShowRef = React.createRef(null);
    catHideRef = React.createRef(null);

    render() {        
        const {prods, curnIndex, appState, appSetState} = this.props;
        const miniRef = React.createRef(null);
        const curMenRef = React.createRef(null);
        const curShowRef = React.createRef(null);
        const curHideRef = React.createRef(null);
        const catLstRef = React.createRef(null);    
        const currenciesSymbol = ['$', '£', 'A$', '¥', '₽'];
        const currenciesLabel = ['USD','GBP', 'AUD', 'JPY', 'RUB'];

        return (
            <div id='navbar'>  
                <div className='navbar__gender-filter'>
                    <Link to='/' onClick={() => {
                        appSetState({...appState, prodsCatg: '', prodsGender: ''});
                        handelResetFilter();
                    }} className='navbar__home'> <img src={homeLogo} alt='img' /> </Link>

                    <button ref={this.catShowRef} onClick={() => ShowCategoriesList(catLstRef.current, this.catShowRef.current, this.catHideRef.current, this.catShowRef.current)}>
                        <img src={CategoriesOpen} alt='img'/>
                    </button>
                    <button ref={this.catHideRef} onClick={() => ShowCategoriesList(catLstRef.current, this.catHideRef.current, this.catShowRef.current, this.catShowRef.current)}>
                        <img src={CategoriesClose} alt='img'/>
                    </button>
                    <button name='women' onClick={(e) => handelGender(e, appSetState, appState)}> women </button>
                    <button name='men' onClick={(e) => handelGender(e, appSetState, appState)}> men </button>
                    <button name='kids' onClick={(e) => handelGender(e, appSetState, appState)}> kids </button>
                </div>

                <button className='navbar__checkOut'>   <img src={checkLogo} alt='img' />   </button>

                <div className='navbar__controls'>
                    <div>
                    <span>{currenciesSymbol[curnIndex]}</span>
                        <button ref={curShowRef} onClick={() => {
                            curMenRef.current.style.display = 'flex';    
                            curHideRef.current.style.display = 'flex';
                            curShowRef.current.style.display = 'none';
                        }}></button>
                        <button ref={curHideRef} onClick={() => {
                            curMenRef.current.style.display = 'none';
                            curHideRef.current.style.display = 'none';
                            curShowRef.current.style.display = 'flex';       
                        }}></button>
                    </div>
                    <button onClick={() => {
                        miniRef.current.style.display = 'block';
                        document.querySelector('.miniCart-overlay').style.display = 'block';
                    }} >
                        <img src={shoppingLogo} alt='img' />
                        <Query query={ProductsCart}>{
                        ({loading, error, data}) => {
                            if(loading) return <h4>loading ...</h4>
                            if(error) console.log(error);
                            return <span>{ data.UserProductsCart.length }</span>;
                        }
                        }</Query>
                    </button>
                </div>

                <div className="miniCart-container" ref={miniRef}>
                    {
                        <Query query={ProductsCart}>{
                            ({loading, error, data}) => {
                                if(loading) return <h4>loading ...</h4>
                                if(error) console.log(error);
                                return(<>
                                    <h5>
                                    <p>My Bag<span>, {data.UserProductsCart.length} items</span></p>
                                    <button className="miniCart-close" onClick={() => {
                                        miniRef.current.style.display = 'none';
                                        document.querySelector('.miniCart-overlay').style.display = 'none';
                                    }}>x</button>
                                    </h5>            

                                    <>{data.UserProductsCart.map( (miniItem, i) => { return(
                                        <div className="miniCart-container__item" key={i}>
                                            <div className="miniCart-container__item__col1">
                                                <p>{miniItem.name}</p>
                                                <p>{`${miniItem.prices[curnIndex].currency.symbol}${miniItem.prices[curnIndex].amount}`}</p>
                                                    <Mutation mutation={UpdateProdSelectedSize}>   
                                                    {(UpdateSelectedSize, {data}) => {return(
                                                        <div className="cartItem-sizes">{
                                                            miniItem.attributes.map( (atr) => { return(
                                                            (atr.id === 'Size' || atr.id === 'Capacity') &&
                                                                atr.items.map( (sz, j) => { return(
                                                                    <button key={j} 
                                                                    className={ (miniItem.selectedSize === sz.value) ? 'activeSize' : 'available-size' }
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        UpdateSelectedSize({ 
                                                                            variables: { id: miniItem.id, btnVal: sz.value } ,
                                                                            refetchQueries: [{ query: ProductsCart }]
                                                                        });                                                                
                                                                    }}>{sz.value}</button>
                                                                ) } )
                                                            ) } )
                                                        }</div>
                                                    )}}</Mutation>

                                            </div>
                                            <div className="miniCart-container__item__col2">
                                                <div className="cartItem-amount">
                                                    <Mutation mutation={IncreAmount}>   
                                                    {(IncreProductAmount, {data}) => {return(
                                                        <button onClick={(e) => {
                                                            e.preventDefault();
                                                            IncreProductAmount({ 
                                                                variables: { id: miniItem.id } ,
                                                                refetchQueries: [{ query: ProductsCart }]
                                                            });                                                    
                                                            console.log(miniItem);
                                                        }}></button>
                                                    )}}</Mutation>
                                                    <p>{miniItem.amount}</p>
                                                    {
                                                        (miniItem.amount === 1)
                                                        ? <button className='disable-decre'></button>
                                                        : <Mutation mutation={DecreAmount}>   
                                                        {(DecreProductAmount, {data}) => {return(
                                                            <button onClick={(e) => {
                                                                e.preventDefault();
                                                                DecreProductAmount({ 
                                                                    variables: { id: miniItem.id },
                                                                    refetchQueries: [{ query: ProductsCart }]
                                                                });
                                                                
                                                            }}></button>
                                                        )}}</Mutation>    
                                                    }
                                                </div>
                                                <img src={miniItem.gallery[0]} alt="" />
                                            </div>
                                        </div>
                                    ) })}</>

                                    <div className="miniCart-container__total">
                                        <p>Total</p>
                                        {
                                            ( data.UserProductsCart[0] ) && 
                                            <p>{ `${data.UserProductsCart[0].prices[curnIndex].currency.symbol}${handelTotal(data.UserProductsCart, curnIndex)}` }</p>
                                        }
                                    </div>
                                </>)
                        }}</Query>
                    }

                    <div className="miniCart-container__btns">
                        <Link to='/cart' onClick={() => {
                            miniRef.current.style.display = 'none';
                            document.querySelector('.miniCart-overlay').style.display = 'none';                            
                        }}> view bag </Link>          
                        <button>check out</button>
                    </div>
                </div>

                <div className="currency-menu" ref={curMenRef}>
                    {
                        currenciesSymbol.map( (curn, i) => {return(
                            <button name={`${curn}`} key={i} onClick={() => appSetState({ ...appState, curnIndex: i })}> {`${curn} ${currenciesLabel[i]}`} </button>
                        )} )
                    }
                </div>

                <div className="category-list" ref={catLstRef}>
                    <button name='all' onClick={(e) => handelCategory(e, appSetState, appState)}> All </button>
                    <button name='tech' onClick={(e) => handelCategory(e, appSetState, appState)}> Tech </button>
                    <button name='clothes' onClick={(e) => handelCategory(e, appSetState, appState)}> Clothes </button>
                </div>
            </div>
        )
    }
}

export default Navbar