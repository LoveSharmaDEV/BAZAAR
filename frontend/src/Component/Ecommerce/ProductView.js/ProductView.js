import React, { useEffect,useRef,useState } from 'react'
import ProductViewCss from './ProductView.module.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { FetchStockByStoreNameAPI } from '../../../Redux/Reducers/fetchAvailableStockByStorename_reducer';

function ProductView(props) {
    const params = useParams();
    const dispatch = useDispatch();
    const [index,setIndex] = useState(0);
    const slider = useRef();
    const product = useSelector((state)=>{
        return state.stockByStore.stock.find((product)=>product._id===params.productID);
    })


    useEffect(()=>{
        props.setrightNavBarVisibility(false);
        props.setleftNavBarVisibility(false);
        props.settopNavBarVisibility(false);
        props.setEcomNavBarVisibility(true);
        dispatch(FetchStockByStoreNameAPI(params.storeName));
    },[dispatch,params.storeName,props])

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

    const ChangeImage = (e)=>{
        setIndex(e.target.dataset.index);
    }

  return (
    <div className={ProductViewCss.Outer}>
        
        <div className={ProductViewCss.Outer__ProductViewCard}>

            <div className={ProductViewCss.ProductViewCard__ImagePanel}>

                <div className={ProductViewCss.ImagePanel__DisplayImage}>
                    <img src={product?.ProductImage[index].path} alt=''/>
                </div>

                <div className={ProductViewCss.ImagePanel__ImageSlider}>

                    <img onClick={ScrollLeft} className={ProductViewCss.ImageSlider__LeftBtn} src='http://localhost:8000/right.png' alt=''/>

                    <div ref={slider}>
                        {product?.ProductImage.map((image, key)=> <img onClick={ChangeImage} className={ProductViewCss.ImageSlider_Thumbnail} data-index={key} src={image.path} alt='' key={key}/>)}
                    </div>

                    <img onClick={ScrollRight} className={ProductViewCss.ImageSlider__RightBtn} src='http://localhost:8000/right.png' alt=''/>

                </div>

            </div>


            <div className={ProductViewCss.ProductViewCard__DetailPanel}>

                <div className={ProductViewCss.DetailPanel__ProductName}>
                
                    <h1>{product?.ProductName}</h1>
                
                </div>

                <div className={ProductViewCss.DetailPanel__ProductDescription}>

                    <p rows='20' cols='50'>{product?.ProductDescription}</p>
                
                </div>

                <div className={ProductViewCss.DetailPanel__ColorAvailable}>

                    <h3>Color Available</h3>

                    {
                        product?.ProductImage.map((product,key)=>{
                            return <div onClick={ChangeImage}  data-index={key} style={{backgroundColor:product.color}} key={key}> </div>
                        })
                    }

                </div>

                <div className={ProductViewCss.DetailPanel__Price}>

                    <img src='http://localhost:8000/rupee.png' alt=''/>
                    <span>{product?.ProductPrice}</span>

                </div>

                <div className={ProductViewCss.DetailPanel__Action}>
                    <div>ADD TO CART</div>
                    <div>REVIEWS</div>
                </div>

            </div>

        </div>

    </div>
  )
}

export default ProductView