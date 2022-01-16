import { gql } from "@apollo/client";

export const Product_Query = gql`
query ProductsQuery{
    ProductsData{
        id, name, category, 
        prices{currency{label, symbol}, amount}, 
        attributes{id, name, items{id, value, displayValue}}, 
        description, gallery, inStock, brand, amount, gender, selected, category
    }
}`;

export const ProductsCart = gql`
query UserProductsCart{
    UserProductsCart{
        id, name, category, 
        prices{currency{label, symbol}, amount}, 
        attributes{id, name, items{id, value, displayValue}}, 
        description, gallery, inStock, brand, amount, gender, selected, category, selectedSize
    }
}`; 

export const handel_Id_Query = (id) => gql`
query Id_Query{
    ProductsDataById(id: "${id}"){
        id, name, category, 
        prices{currency{label, symbol}, amount}, 
        attributes{id, name, items{id, value, displayValue}}, 
        description, gallery, inStock, brand, amount, gender, selected, category, selectedSize
    }
}`;


export const handel_Gender_Categ_Query = (str1, str2) => {
    return  gql`query Gender_Categ_Query{
        ProductsDataByGender_Category(gender: "${str1}", categ: "${str2}"){
            id, name, category, 
            prices{currency{label, symbol}, amount}, 
            attributes{id, name, items{id, value, displayValue}}, 
            description, gallery, inStock, brand, amount, gender, selected, category
        }
    }`;            
}

export const handel_Gender_Query = (str) => gql`query Gender_Query{
    ProductsDataByGender(gender: "${str}"){
        id, name, category, 
        prices{currency{label, symbol}, amount}, 
        attributes{id, name, items{id, value, displayValue}}, 
        description, gallery, inStock, brand, amount, gender, selected, category
    }
}`;

export const handel_Categ_Query = (str) => gql`query Categ_Query{
    ProductsDataByCategory(categ: "${str}"){
        id, name, category, 
        prices{currency{label, symbol}, amount}, 
        attributes{id, name, items{id, value, displayValue}}, 
        description, gallery, inStock, brand, amount, gender, selected, category
    }
}`;



export const AppCart = gql`
mutation AddProductCart($id: String!){
    AddProductCart(id: $id) {
        id, name, category, 
        prices{currency{label, symbol}, amount}, 
        attributes{id, name, items{id, value, displayValue}}, 
        description, gallery, inStock, brand, amount, gender, selected, category
    }
}
`; 

export const IncreAmount = gql`
mutation IncreProductAmount($id: String!){
    IncreProductAmount(id: $id) {
        id, name, category, 
        prices{currency{label, symbol}, amount}, 
        attributes{id, name, items{id, value, displayValue}}, 
        description, gallery, inStock, brand, amount, gender, selected, category
    }
}`;

export const DecreAmount = gql`
mutation DecreProductAmount($id: String!){
    DecreProductAmount(id: $id) {
        id, name, category, 
        prices{currency{label, symbol}, amount}, 
        attributes{id, name, items{id, value, displayValue}}, 
        description, gallery, inStock, brand, amount, gender, selected, category
    }
}`;

export const DltCartItm = gql`
mutation DeleteCartItem($id: String!){
    DeleteCartItem(id: $id) {
        id, name, category, 
        prices{currency{label, symbol}, amount}, 
        attributes{id, name, items{id, value, displayValue}}, 
        description, gallery, inStock, brand, amount, gender, selected, category
    }
}`;


export const RstCartItm = gql`
mutation ResetProductAmount($id: String!){
    ResetProductAmount(id: $id) {
        id, name, category, 
        prices{currency{label, symbol}, amount}, 
        attributes{id, name, items{id, value, displayValue}}, 
        description, gallery, inStock, brand, amount, gender, selected, category
    }
}`;

export const UpdateProdSelectedSize = gql`
mutation UpdateSelectedSize($id: String!, $btnVal: String!){
    UpdateSelectedSize(id: $id, btnVal: $btnVal) {
        id, name, category, 
        prices{currency{label, symbol}, amount}, 
        attributes{id, name, items{id, value, displayValue}}, 
        description, gallery, inStock, brand, amount, gender, selected, category
    }
}`;

