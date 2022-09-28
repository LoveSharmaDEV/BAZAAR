import React, { useEffect,useRef,useState } from 'react'
import CSS from './ProductView.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { FetchStockByStoreNameAPI } from '../../../REDUX/REDUCERS/FETCH_STOCK_BY_STORENAME__REDUCER';
import { ADD_PRODUCT_TO_CART } from '../../../REDUX/REDUCERS/CART__REDUCER';
import AUTHORIZED_REQ from '../../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { useAuth } from '../../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import { BACKEND_BASE, URL as API } from '../../../MasterData/GlobalData';
import { ECOMM_API } from '../../../MasterData/GlobalData';

function ProductView(props) {
    const params = useParams();
    const auth = useAuth();
    const dispatch = useDispatch();
    const [index,setIndex] = useState(0);
    const slider = useRef();
    const navigate = useNavigate();
    const product = useSelector((state)=>{
        return state.stockByStore.stock.find((product)=>product._id===params.productID);
    })

    const [chosenProduct,setChosenProduct] = useState({
        user:auth.user?auth.user._id:null,
        product:product,
        productImage:[product?product.ProductImage[index].path:null],
        color: null,
        size:null,
        Quantity:1
    })


    const ScrollLeft = ()=>{
       slider.current.scrollBy({
        top: 0,
        left: +60,
        behavior: 'smooth'
       })
    }

    const ScrollRight=()=>{
        slider.current.scrollBy({
            top: 0,
            left: -60,
            behavior: 'smooth'
        })
    }

    const SelectSize = (e)=>{
     const sizeContainers = Array.from(document.getElementsByClassName(CSS.SizeAvailable__size));
     sizeContainers.forEach((element)=>{
        element.classList.remove(CSS.SizeAvailable__SelectedSize);
     })
     e.target.classList.toggle(CSS.SizeAvailable__SelectedSize);
     setChosenProduct({
        ...chosenProduct,
        size:e.target.dataset.size
     })
    }

    const ToggleSelection = (e)=>{
        const ColorContainers = Array.from(document.getElementsByClassName(CSS.ColorAvailable__color));
        const Images = Array.from(document.getElementsByClassName(CSS.ImageSlider_Thumbnail));
        
        ColorContainers.forEach((element)=>{
           element.classList.remove(CSS.ColorAvailable__SelectedColor);
        })
        Images.forEach((element)=>{
            element.classList.remove(CSS.ColorAvailable__SelectedImage);
        })

        ColorContainers[e.target.dataset.index].classList.toggle(CSS.ColorAvailable__SelectedColor);
        Images[e.target.dataset.index].classList.toggle(CSS.ColorAvailable__SelectedImage);

        return {
            image:product.ProductImage[e.target.dataset.index].path,
            color:product.ProductImage[e.target.dataset.index].color
        }
    }

    const SelectItem = (e)=>{

        const {image,color} = ToggleSelection(e);
        setIndex(e.target.dataset.index);
        setChosenProduct({
           ...chosenProduct,
           productImage:image,
           color:color
        })
        
    }

    const AddToCart = async(e)=>{
        if(!auth.user) navigate('../login');
        const response = await AUTHORIZED_REQ(ECOMM_API.STORE_PRODUCT_ADD_TO_CART_API,{...chosenProduct,Quantity:1},{},'POST');
        if(response.data.errCode==='SUCCESS') dispatch(ADD_PRODUCT_TO_CART({...chosenProduct,Quantity:1}));
    }


    useEffect(()=>{
        if(product && auth.user) {
            setChosenProduct({
                user:auth.user._id,
                product:product,
                productImage:product.ProductImage[0].path,
                color: product.ProductImage[0].color,
                size:product.ProductSize[0],
                Quantity:1
            })
        }
    },[product,auth])

    useEffect(()=>{
        props.setBarVisibility({
            rightNavBarVisibility:false,
            leftNavBarVisibility:false,
            topNavBarVisibility:false,
            EcomNavBarVisibility:true
          })
        dispatch(FetchStockByStoreNameAPI(params.storeName));
    },[dispatch,params.storeName])


  return (
        <div className={CSS.Outer__ProductViewCard}>
            <div className={CSS.ProductViewCard__ImagePanel}>

                <div className={CSS.ImagePanel__DisplayImage}>
                    <img 
                    src={`${BACKEND_BASE}/${product?.ProductImage[index].path}`} 
                    alt=''
                    />
                </div>

                <div className={CSS.ImagePanel__ImageSlider}>

                    <img 
                    onClick={ScrollLeft} 
                    className={CSS.ImageSlider__LeftBtn} 
                    src={`${BACKEND_BASE}/right.png`} 
                    alt=''
                    />

                    <div ref={slider}>
                        {
                        product?.ProductImage.map((image, key) => 
                        <img 
                        onClick={SelectItem} 
                        className={`${CSS.ImageSlider_Thumbnail} ${key===0?CSS.ColorAvailable__SelectedImage:null}`} 
                        data-index={key} 
                        data-image={image.path} 
                        src={`${BACKEND_BASE}/${image.path}`} 
                        alt='' 
                        key={key}
                        />)
                        }
                    </div>

                    <img 
                    onClick={ScrollRight} 
                    className={CSS.ImageSlider__RightBtn} 
                    src={`${BACKEND_BASE}/right.png`}
                    alt=''
                    />

                </div>

            </div>


            <div className={CSS.ProductViewCard__DetailPanel}>

                <div className={CSS.DetailPanel__ProductName}>
                
                    <h1>{product?.ProductName}</h1>
                
                </div>

                <div className={CSS.DetailPanel__ProductDescription}>

                    <p rows='20' cols='50'>{product?.ProductDescription}</p>
                
                </div>

                {
                    product?.isColorAvailable
                    ?
                    <div className={CSS.DetailPanel__ColorAvailable}>

                        <h3>COLORS</h3>

                        <div className={CSS.ColorAvailable__ColorDiv}>
                            {
                                product?.ProductImage.map((product,key)=>{
                                    return <div className={`${CSS.ColorAvailable__color} ${key===0?CSS.ColorAvailable__SelectedColor:null}`} onClick={SelectItem}  data-index={key} data-color={product.color} style={{backgroundColor:product.color}} key={key}> </div>
                                })
                            }
                        </div>

                    </div>
                    :
                    null
                }


                {
                    product?.isSizeAvailable
                    ?
                    <div className={CSS.DetailPanel__SizeAvailable}>
                        <h3>SIZES</h3>
                        
                        <div className={CSS.SizeAvailable__SizeDiv}>
                            {
                                product?.ProductSize.map((size,key)=>{
                                    return <div className={`${CSS.SizeAvailable__size} ${key===0?CSS.SizeAvailable__SelectedSize:null}`}  onClick={SelectSize} data-size={size} key={key}> {size} </div>
                                })
                            }
                        </div>


                    </div>
                    :  
                    null
                }



                <div className={CSS.DetailPanel__Footer}>

                    <div className={CSS.DetailPanel__Price}>
                        <img src={`${BACKEND_BASE}/rupee.png`} alt=''/>
                        <span>{product?.ProductPrice}</span>
                    </div>

                    <div className={CSS.Footer__AddToCart} onClick={AddToCart}>ADD TO CART</div>
                </div>

            </div>

        </div>
  )
}

export default ProductView