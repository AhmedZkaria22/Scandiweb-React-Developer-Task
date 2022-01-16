import React, { PureComponent } from 'react';
import { handel_Categ_Query, handel_Gender_Categ_Query, handel_Gender_Query, Product_Query } from '../graphql/graphqls';
import QueryComponent from './QueryComponent';

class PLP extends PureComponent {
    constructor(props){
        super(props);     
        this.state={ genderListener: '', categListener: '' }
    }

    componentDidUpdate(prevProps){
        if( this.props !== prevProps ){
            this.setState({ genderListener: this.props.ProdGender, categListener: this.props.ProdCatg });
        }
    }

    render() {
        const {ProdCatg, ProdGender, curnIndex} = this.props;
    
        return (
            <section className='plp'>
                <h2>{ ProdCatg }</h2>
                <div className='products-wrapper'>
                {
                    (this.state.genderListener === '' && this.state.categListener === '' )
                    && <QueryComponent     QueryProp={Product_Query}     TargetData={'ProductsData'}    curnIndex={curnIndex} />
                }
                
                {
                    ((this.state.genderListener === 'women' || this.state.genderListener === 'men' || this.state.genderListener === 'kids') && this.state.categListener === '')
                    && <QueryComponent     QueryProp={handel_Gender_Query(this.state.genderListener)}     TargetData={'ProductsDataByGender'}    curnIndex={curnIndex} />
                }
                
                {
                    ((this.state.categListener === 'all' || this.state.categListener === 'tech' || this.state.categListener === 'clothes') && this.state.genderListener === '')
                    && <QueryComponent     QueryProp={handel_Categ_Query(this.state.categListener)}     TargetData={'ProductsDataByCategory'}    curnIndex={curnIndex} />
                }

                {
                    ((this.state.categListener  === 'all' || this.state.categListener === 'tech' || this.state.categListener === 'clothes') 
                        && (this.state.genderListener === 'women' || this.state.genderListener === 'men' || this.state.genderListener === 'kids'))   
                    && <QueryComponent     QueryProp={handel_Gender_Categ_Query(this.state.genderListener, this.state.categListener)}     TargetData={'ProductsDataByGender_Category'}    curnIndex={curnIndex} />
                }
                </div>                
            </section>
        )
    }
}

export default PLP
