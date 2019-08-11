import React, {Component}  from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import {add, changeDescription, search, Clear} from './todoActions'

class TodoForm extends Component{

    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    keyHandler(e){
        const {add, description, search, Clear} = this.props
        
        if (e.key === 'Enter'){
            e.shiftKey ? search() : add( description)         
        } else if (e.key === 'Escape'){
            Clear()
        }
    }

    componentWillMount(){
        this.props.search()
    }

    render(){
        const {add, search, description, changeDescription} = this.props
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='tableTextbox'> 
                                <Grid cols='12 9 10'>
                                    <input id='description' 
                                        onKeyUp={this.keyHandler}
                                        className='form-control'
                                        placeholder='Adicione uma tarefa'
                                        onChange={changeDescription}
                                        value={this.props.description}/>                
                                </Grid>
                            </th>
                            <th className='tableButton'> 
                                <Grid cols='13 3 2'>        
                                    <IconButton style='primary' icon='plus'
                                        onClick={() => add(description)}/>
                                    <IconButton style='info' icon='search'
                                        onClick={() => search()}/>                                
                                    <IconButton style='default' icon='close'
                                        onClick={this.props.Clear}/>                                
                                </Grid>
                            </th>
                        </tr>
                    </thead>            
                </table>        
            </div>    
        )
    }
}

const mapStateToProps = state => ({description: state.todo.description})
const mapDispatchToProps = dispatch => 
    bindActionCreators(
        {add, changeDescription, search, Clear}, 
        dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
