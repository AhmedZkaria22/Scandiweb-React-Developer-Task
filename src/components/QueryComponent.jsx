import React, { PureComponent } from 'react'
import { Query } from '@apollo/client/react/components/Query';
import Product from './Product';

class QueryComponent extends PureComponent {
    render() {
        const {QueryProp, TargetData, curnIndex} = this.props;

        return (
            <Query query={QueryProp}>{
                ({data, loading, error}) => {
                    if(loading) return <h4>loading ...</h4>
                    if(error) console.log(error);
                    console.log(data);
                    return <>{  
                        data[TargetData].map( (prd, i) => { return(
                            <Product key={i} prd={prd} curnIndex={curnIndex} />
                        ) } ) 
                    }</>
                }
            }</Query>
        )
    }
}

export default QueryComponent
