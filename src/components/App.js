import React from "react"
import PropTypes from 'prop-types'
import Header from "./Header"
import Order from "./Order"
import MenuAdmin from "./MenuAdmin"
import sampleBurgers from '../sample-burgers'
import Burger from './Burger'
import base, { firebaseApp }  from "../base"
import SignIn from "./auth/SingIn"
import firebase from 'firebase/app'


export default class App extends React.Component {

  static propTypes={
    match:PropTypes.object
  }

  state = {
    burgers: {},
    order: {},
  } 

  componentDidMount(){
    const {params}=this.props.match
    const localStorageRef=localStorage.getItem(params.restaurantId)

    if(localStorageRef) { 
      this.setState({order: JSON.parse(localStorageRef)}) 
    } 

    this.ref=base.syncState(`${params.restaurantId}/burgers`,{
      context: this,
      state:'burgers'
    })
  }

  componentWillUnmount(){
    base.removeBinding(this.ref)
  }

  componentDidUpdate(){
    const {params}= this.props.match
    console.log('UPDATE')
    localStorage.setItem(params.restaurantId,JSON.stringify(this.state.order))
  }

  addBurger = (burger) => {
    console.log("addBurger", burger)
    //Делаем копию объекта state
    const burgers={...this.state.burgers}
    //Добавить новый бургер в переменную burgers
    burgers[`burger${Date.now()}`] =burger
    // Записать наш новый объект burgers в state
    this.setState({burgers})
    
  }

  updateBurger=(key,updatedBurger)=>{
     //Делаем копию объекта state
    const burgers={...this.state.burgers}
    burgers[key]=updatedBurger
      // Записать наш новый объект burgers в state
      this.setState({burgers})
  }


  deleteBurger=(key)=>{
   
    const burgers={...this.state.burgers}
    burgers[key]=null
    this.setState({burgers})
  }

  deleteFromOrder=(key)=>{
    const order={...this.state.order}
    delete order[key]
    this.setState({order})

  }

  loadSampleBurgers=()=>{
    this.setState({burgers:sampleBurgers})
    console.log('ready to load')
  }

  addToOrder=(key)=>{
    //1.делаем копию
    const order={...this.state.order}
    //2 Добавить ключ к заказу со значением 1
    order[key]=order[key]+1  || 1
    //3 записать наш новый order в state
    this.setState({order})
  }

handleLogout=async () =>{
 await firebase.auth().signOut()
 window.location.reload()
}

  render() {
    return (
      <SignIn>
      <div className="burger-paradise">
        <div className="menu">
          <Header title="Hot Burger" />
          <ul className="burgers">
           {
             Object.keys(this.state.burgers).map(key=>{
               return <Burger 
               key={key} 
               index ={key}  
               details={this.state.burgers[key]} 
               addToOrder={this.addToOrder}
               />
             })
           } 
          </ul>
        </div>
        <Order 
        burgers={this.state.burgers} 
        order={this.state.order} 
        deleteFromOrder={this.deleteFromOrder}
        />
        <MenuAdmin  
        addBurger={this.addBurger} 
        burgers={this.state.burgers} 
        loadSampleBurgers={this.loadSampleBurgers}
        updateBurger={this.updateBurger}
        deleteBurger={this.deleteBurger}
        handleLogout={this.handleLogout}
        />
      </div>
      </SignIn>
    )
  }
}
