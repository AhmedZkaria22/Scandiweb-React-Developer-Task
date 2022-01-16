import { ProductsCart } from "./graphqls";

// navbar
export const handelGender = (e, propSetState, propState) => {
    propSetState({...propState, prodsGender: `${e.target.name}`});
    const genderBtn = document.querySelectorAll('.navbar__gender-filter button');
    for (let i = 0; i < genderBtn.length; i++) {
        if( genderBtn[i] === e.target ){ 
            e.target.classList.add('activeGender');
        }else{ genderBtn[i].classList.remove('activeGender'); }
    }
}

export const handelCategory = (e, propSetState, propState) => {
    propSetState({...propState, prodsCatg: `${e.target.name}`});
    const genderBtn = document.querySelectorAll('.category-list button');
    for (let i = 0; i < genderBtn.length; i++) {
        if( genderBtn[i] === e.target ){ 
            e.target.classList.add('activeGender');
        }else{ genderBtn[i].classList.remove('activeGender'); }
    }
}

export const ShowCategoriesList = (elem, actionElem, actionElemSib, actionStart) => {
    actionElem.style.display = 'none';
    actionElemSib.style.display = 'inline-block';
    if( actionElem === actionStart ){ elem.style.display = 'flex';
    }else{ elem.style.display = 'none'; }
}

export const handelResetFilter = () => {
    const filterBtns = [
        ...document.querySelectorAll('.navbar__gender-filter button'),
        ...document.querySelectorAll('.category-list button')
    ];
    for (let FBtn of filterBtns) {
        FBtn.classList.remove('activeGender'); 
    }
}


export const handelTotal = (Array, Number) => {
    let total = 0;
    for( let i = 0; i < Array.length; i++ ){
        total += (Array[i].prices[Number].amount * Array[i].amount);
    }
    const str = total.toString();
    return str.substring(0, str.indexOf('.')+3)
}

export const handelCurrency = (string, propSetState) => {
    propSetState(string)
}



// product attributes
export const handelColors = (e, wrapper) => {
    const curBtn = e.target;
    const availBtns = document.querySelectorAll(`.${wrapper} button`);
    for(let i = 0; i< availBtns.length; i++){
        availBtns[i].classList.remove('activeColor');        
        if( availBtns[i] === curBtn ){ 
            availBtns[i].classList.add('activeColor'); 
        }
    }
    // handelProductAttrSize(attrValue, propSetState, propState);
}



// cart page
export const handelFige = (wrapper, wrapperIndex, actionListener) => {
    const currentImg = document.querySelector(`.${wrapper}:nth-of-type(${wrapperIndex}) .cartItem-figures img.activeImg`);
    const Images = document.querySelectorAll(`.${wrapper}:nth-of-type(${wrapperIndex}) .cartItem-figures img`);
    let nextImgIndex = wrapperIndex + 1;
    let prevImgIndex = wrapperIndex - 1;

    if( actionListener === 'next' ){
        for( let i = 0; i<Images.length; i++ ){
            if( Images[i] === currentImg ){ nextImgIndex = i + 1; }
        }

        if( nextImgIndex >= Images.length - 2 ){ nextImgIndex = 0; }

        for( let i = 0; i<Images.length; i++ ){
            Images[i].classList.add('disable-img');
            Images[i].classList.remove('activeImg');         
            if( i === nextImgIndex ){ 
                Images[i].classList.remove('disable-img');
                Images[i].classList.add('activeImg');         
                console.log(i);
            }
        }    
    }

    if( actionListener === 'prev' ){
        for( let i = 0; i<Images.length; i++ ){
            if( Images[i] === currentImg ){ prevImgIndex = i - 1; }
        }

        if( prevImgIndex <= -1 ){ prevImgIndex = Images.length - 3; }

        for( let i = 0; i<Images.length; i++ ){
            Images[i].classList.add('disable-img');
            Images[i].classList.remove('activeImg');         
            if( i === prevImgIndex ){ 
                Images[i].classList.remove('disable-img');
                Images[i].classList.add('activeImg');     
                console.log(i);    
            }
        }
    }
}

export const handelProductAttrSize = (stateListn, setStateListn, attrValue) => {
    setStateListn({ ...stateListn, sizeListener: attrValue });
}      

export const handelProductAttrColor = (stateListn, setStateListn, attrValue) => {
    setStateListn({ ...stateListn, colorListener: attrValue });
}        

export const handelClickFige = (string, stateListn, setStateListn) => {
    setStateListn({ ...stateListn, figeValue: string, figeListener: true });
}   

export  const handel_Add_Cart = (prd, muteFun, stateListn) => {
    const clorObj = prd.attributes.find( atr => atr.id === 'Color' ),
        sizeObj = prd.attributes.find( atr => atr.id === 'Size' ),
        cpacObj = prd.attributes.find( atr => atr.id === 'Capacity' ),
        stateSize = stateListn.sizeListener,
        stateColor = stateListn.colorListener;

    if( ( typeof(clorObj) === 'object' && sizeObj === undefined && cpacObj === undefined && stateColor !== '' )
        ||  ( (typeof(sizeObj) === 'object' || typeof(cpacObj) === 'object') && clorObj === undefined && stateSize !== '' )
        ||  ( (typeof(sizeObj) === 'object' || typeof(cpacObj) === 'object') && typeof(clorObj) === 'object' && stateSize !== '' && stateColor !== '' )
        ||  ( (sizeObj === undefined && cpacObj === undefined && clorObj === undefined && stateSize === '' && stateColor === '' ) )
    ){
        muteFun({ 
            variables: { id: `${prd.id}` },
            refetchQueries: [{ query: ProductsCart }]    
        });
    }
}
