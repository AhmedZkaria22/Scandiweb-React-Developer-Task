const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLFloat } = require("graphql");
const products = require("./schemaData");

const Currency = new GraphQLObjectType({
    name: 'ProductsDataCurrency',
    fields: {
        label: { type: GraphQLString },
        symbol: { type: GraphQLString }
    }
});

const Price = new GraphQLObjectType({
    name: 'ProductsDataPrice',
    fields: {
        currency: { type: Currency },
        amount: { type: GraphQLFloat }
    }
});

const Attribute = new GraphQLObjectType({
    name: 'ProductsDataAttribute',
    fields: {
        id: { type: GraphQLString },
        value: { type: GraphQLString },
        displayValue: { type: GraphQLString }        
    }
});

const AttributeSet = new GraphQLObjectType({
    name: 'ProductsDataAttributeSet',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        items: { type: GraphQLList(Attribute) }
    }
});
 
const ProductType = new GraphQLObjectType({
    name: 'ProductsData',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        inStock: { type: GraphQLBoolean },
        gallery: { type: GraphQLList(GraphQLString) },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        attributes: { type: GraphQLList(AttributeSet) },
        prices: { type: GraphQLList(Price) },
        brand: { type: GraphQLString },
        selected: { type: GraphQLBoolean },
        amount: { type: GraphQLInt },
        gender: { type: GraphQLString },
        selectedSize: { type: GraphQLString }
    }
});


const rootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        
        ProductsData: { 
            type: GraphQLList(ProductType), 
            resolve: () => {
                console.log(products);
                return products;
            }
        },

        UserProductsCart: {
            type: GraphQLList(ProductType),
            resolve: () => {
                // let CartData = ProductsData.filter( prod => prod.selected === true );
                // return CartData;
                console.log( products.filter( prod => prod.selected === true ) );
                return products.filter( prod => prod.selected === true );
            }
        },
        
        ProductsDataById: {
            type: ProductType,
            args:{ id: { type: GraphQLString } },
            resolve: (_, {id}) => {
                return products.find( prod => prod.id === id );
            }
        },

        
        ProductsDataByGender: {
            type: GraphQLList(ProductType),
            args:{ gender: {type: GraphQLString} },
            resolve: (_, {gender}) => {
                return products.filter( prod => prod.gender === gender );
            }
        },
        
        ProductsDataByCategory: {
            type: GraphQLList(ProductType),
            args:{ categ: {type: GraphQLString} },
            resolve: (_, {categ}) => {
                if( categ === 'all' ){ return products; }
                return products.filter( prod => prod.category === categ );
            }
        },
        
        ProductsDataByGender_Category: {
            type: GraphQLList(ProductType),
            args:{ gender: {type: GraphQLString},   categ: {type: GraphQLString} },
            resolve: (_, {gender, categ}) => {
                if( categ === 'all' ){ return products.filter( prod => prod.gender === gender ); }
                return products.filter( prod => (prod.category === categ && prod.gender === gender) );
            }
        }        

    }
});

const rootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'This is the rootMutation',
    fields: {
        
        AddProductCart: {
            type: ProductType,
            args:{ 
                id: { type: GraphQLString }, 
            },
            resolve: (_, {id}) => {
                products.find( item => item.id === id ).selected = true;
                return products.find( item => item.id === id );
            }
        },

        IncreProductAmount: {
            type: ProductType,
            args:{ 
                id: { type: GraphQLString }, 
            },
            resolve: (_, {id}) => {
                products.find( item => item.id === id ).amount += 1;
                return products.find( item => item.id === id );
            }
        },
        
        DecreProductAmount: {
            type: ProductType,
            args:{ 
                id: { type: GraphQLString }, 
            },
            resolve: (_, {id}) => {
                products.find( item => item.id === id ).amount -= 1;
                return products.find( item => item.id === id );
            }
        },

        ResetProductAmount: {
            type: ProductType,
            args:{ 
                id: { type: GraphQLString }, 
            },
            resolve: (_, {id}) => {
                products.find( item => item.id === id ).amount = 1;
                return products.find( item => item.id === id );
            }
        },

        DeleteCartItem: {
            type: ProductType,
            args:{ 
                id: { type: GraphQLString }, 
            },
            resolve: (_, {id}) => {
                products.find( item => item.id === id ).selected = false;
                return products.find( item => item.id === id );
            }
        },

        UpdateSelectedSize: {
            type: ProductType,
            args:{
                id: { type: GraphQLString },
                btnVal: { type: GraphQLString }
            },
            resolve: (_, {id, btnVal}) => {
                products.find( item => item.id === id ).selectedSize = btnVal;
                return products.find( item => item.id === id );
            }
        }
    }
});

module.exports = new GraphQLSchema({query: rootQuery, mutation: rootMutation});   