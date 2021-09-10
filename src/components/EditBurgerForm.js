import React from 'react'
import PropTypes from 'prop-types'


export default class EditBurgerForm extends React.Component{


    static propTypes={
        burger:PropTypes.shape({
            image: PropTypes.string,
            name:PropTypes.string,
            price: PropTypes.number,
            desc:PropTypes.string,
            status:PropTypes.string
        }),

        index: PropTypes.string,
        updateBurger:PropTypes.func,
        deleteBurger:PropTypes.func

    }


    handleChange=(event)=>{
        const updatedBurger={
            ...this.props.burger,
            [event.currentTarget.name]:event.currentTarget.name==='price' ? parseFloat(event.currentTarget.value) ||0 :event.currentTarget.value 
        }



        this.props.updateBurger(this.props.index,updatedBurger)

    }
    render(){
        return(
            <div className='burger-edit'>
                <input  
                name='name'
                type='text'
                onChange={this.handleChange}
                value={this.props.burger.name}
                />
                <input  
                name='price' 
                type='text' 
                onChange={this.handleChange} 
                value={this.props.burger.price}
                />
                <select  
                name='status'
                className='status'
                onChange={this.handleChange}  
                value={this.props.burger.status}
                >
                <option value='available'>Available</option>
                <option value='unavailable'>Unavailable</option>
                </select>
                <textarea  
                name='desc'  
                onChange={this.handleChange}
                value={this.props.burger.desc}
                ></textarea>
                <input  
                name='image' 
                type='text'  
                value={this.props.burger.image}
                />

                <button onClick={()=>{this.props.deleteBurger(this.props.index)}}>Delete from menu</button>
            </div>
        )
    }
}