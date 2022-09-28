import React, { useState } from 'react';
import CSS from './ProductCard.module.css'
import { Link } from 'react-router-dom';
import { BACKEND_BASE } from '../../../MasterData/GlobalData';

function ProductCard(props) {
    const [imageIndex, setImageIndex] = useState(0);
    console.log(props.product)
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
    <div className={CSS.ProductCard}>
        <div className={CSS.ProductCardImageCarousal}>

            <img 
            onClick={changePicBackward} 
            src={`${BACKEND_BASE}/right.png`} 
            className={CSS.ProductCardBackward} 
            alt='changePic'
            />

            <div className={CSS.ProductCardImage}>
                <img 
                src={`${BACKEND_BASE}/${props.product.ProductImage[imageIndex].path}`} 
                alt=''
                className={CSS.ProductCardImage__img}
                />
            </div>

            <img 
            onClick={changePicForward} 
            src={`${BACKEND_BASE}/right.png`} 
            className={CSS.ProductCardForward} 
            alt='changePic'
            />

        </div>

        <div className={CSS.ProductCardName}>
            <span>{props.product.ProductName}</span>
        </div>

        {
        props.product.ProductImage.length!==0?
            <div className={CSS.ProductCardColor}>
                {props.product.ProductImage.map((Image,key)=>{
                    return <div style={{backgroundColor:Image.color}} key={key}></div>
                })}
            </div>
            :
            null
        }
        {
        props.product.isSizeAvailable?
            <div className={CSS.ProductCard__Size}>
                {props.product.ProductSize.map((size,key)=>{
                    return <div>{
                        size==='XLARGE'?'XL':size==='LARGE'?'L':size==='MEDIUM'?'M':size==='SMALL'?'S':null
                        }</div>
                })}
            </div>
            :
            null
        }
        

        <div className={CSS.ProductCardPrice}>
            <img src={`${BACKEND_BASE}/rupee.png`} alt='Ruppee'/>
            <span> {props.product.ProductPrice}</span>
        </div>

        <div className={CSS.ProductCardActions}>
            <Link to={`/product/${props.storeName}/${props.product._id}`}><button className={CSS.button9}>VIEW</button></Link>
        </div>  

    </div>
  )
}

export default ProductCard