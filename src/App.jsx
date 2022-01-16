// import { gql } from '@apollo/client';
import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CartPage from './components/CartPage';
import Navbar from './components/Navbar';
import PLP from './components/PLP';
import ProductView from './components/ProductView';
// import products from './data';
// import { products } from './data';
// import { addCartProduct, readCartProducts } from './redux/actions';
import './style/App.css';
import { Query } from '@apollo/client/react/components/Query';
import { Product_Query } from './graphql/graphqls';
import products from './schemaData';


class App extends PureComponent {

  constructor(props){
    super(props);
    this.state = { prods: products, curnIndex: 0, prodsCatg: '', prodsGender: '' };
  }
  
  render(){
    return ( 
      <Router>
      <div className="App">
        <div className='miniCart-overlay'></div>
        <Query query={Product_Query}>{
          ({data, loading, error}) => {
          if(loading) return <h4>loading ...</h4>
          if(error) console.log(error);
          this.setState({ ...this.state, prods: data.ProductsData });
          return(<>
            <Navbar prods={this.state.prods} curnIndex={this.state.curnIndex} appState={this.state} appSetState={this.setState.bind(this)} />
            <Routes>          
              <Route path='/'  element={<PLP ProdCatg={this.state.prodsCatg} ProdGender={this.state.prodsGender} curnIndex={this.state.curnIndex}/>} />
              <Route path='/cart'  element={<CartPage curnIndex={this.state.curnIndex} />} />
              <Route path='/product-view'  element={<ProductView curnIndex={this.state.curnIndex} />} />
            </Routes>  
            </>)
        }}</Query>
      </div>
      </Router>
    );
  }
}

export default App;