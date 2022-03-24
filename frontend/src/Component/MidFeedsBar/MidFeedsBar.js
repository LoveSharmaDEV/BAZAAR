import React from 'react'
import css from './MidFeedsBar.module.css'
import Posts from '../Posts/Posts';



export default function MidFeedsBar(props) {
    const {optionSelected} = props;
  return (
    <div className={css.main}>
      {optionSelected==="Home"?
      <Posts/>:
      optionSelected==="Customers"?
      "Customers Page":
      optionSelected==="Following"?
      "Following Page":
      optionSelected==="Favourites"?
      "Favourites":
      optionSelected==="Cart"?
      "Carts":
      optionSelected==="Store"?
      "Store":
      optionSelected==="Settings"?
      "Settings":
      optionSelected==="Support"?
      "Support":
      ""}
    </div>
  )
}
