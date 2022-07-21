import React, { useState } from 'react';
import ProductCardCss from './ProductCard.module.css'
import { Link } from 'react-router-dom';

function ProductCard(props) {
    const [imageIndex, setImageIndex] = useState(0);

    const changePicForward = ()=>{
        setImageIndex((prev)=>{
            return (((prev+1)%props.product.ProductImage.length))
        })
    }

    const changePicBackward = ()=>{
        setImageIndex((prev)=>{
            return (prev-1)>0?((prev-1)%props.product.ProductImage.length):0;
        })
    }

  return (
    <div className={ProductCardCss.ProductCard}>
        <div className={ProductCardCss.ProductCardImageCarousal}>
            <img onClick={changePicBackward} src='http://localhost:8000/right.png' className={ProductCardCss.ProductCardBackward} alt='changePic'/>

            <div className={ProductCardCss.ProductCardImage}>
                <img src={`${props.product.ProductImage[imageIndex].path}`} alt='StockImage'/>
            </div>

            <img onClick={changePicForward} src='http://localhost:8000/right.png' className={ProductCardCss.ProductCardForward} alt='changePic'/>
        </div>

        <div className={ProductCardCss.ProductCardName}>
            <span>{props.product.ProductName}</span>
        </div>

        {props.product.ProductImage.length!==0?
        <div className={ProductCardCss.ProductCardColor}>
            {props.product.ProductImage.map((Image,key)=>{
                return <div style={{backgroundColor:Image.color}} key={key}></div>
            })}
        </div>
        :
        null
        }

        <div className={ProductCardCss.ProductCardPrice}>
            <img src='http://localhost:8000/rupee.png' alt='Ruppee'/>
            <span> {props.product.ProductPrice}</span>
        </div>

        <div className={ProductCardCss.ProductCardActions}>
            <Link to={`/product/${props.storeName}/${props.product._id}`}><button className={ProductCardCss.button9}>VIEW</button></Link>
            <button className={ProductCardCss.button9}>ADD TO CART</button>
        </div>  

    </div>
  )
}

export default ProductCard