import React, {useState} from "react"
import PropTypes from 'prop-types'
import { render } from "react-dom"
import restaurants from  '../sample-restaurants.js'

const Landing =(props)=>{

  // state={
  //   display:false,
  //   title:'',
  //   url:''
  // }  

    const [display,toogleDisplay]=useState(false)
    const [title,setTitle]=useState('')
    const [url,setUrl]=useState('')


  const displayList= ()=>{
    
    toogleDisplay(!display)
   
  }


 const getTitle= (restaurant)=>{
   console.log(restaurant.title)
   const {title,url}=restaurant
   setTitle(title)
   setUrl(url)
   toogleDisplay(false)
 }

 const goToRestaurant=()=>{
  
  props.history.push(`/restaurant/${url}`)
 }
  return(
  <div className="restaurant_select">
        <div className="restaurant_select_top">
          <div onClick={displayList} className="restaurant_select_top_header font-effect-outline">
            {title ? title : 'Choose the restaurant'}
            <div className="arrow_picker">
              <div className="arrow_picker-up"></div>
              <div className="arrow_picker-down"></div>
            </div>
          </div>
        </div>
        {display ? <div className="restaurant_select_bottom">
          <ul>
           {
    restaurants.map(restaurant=>{
        return <li key={restaurant.id} onClick={()=>getTitle(restaurant)}>{restaurant.title}</li>
      
    })}
          </ul>
        </div> : null}
        { title && !display?<button onClick={goToRestaurant}>Go to restaurant</button> : null}
      </div>
)
}

Landing.propTypes={
  history: PropTypes.object
}



export default Landing
