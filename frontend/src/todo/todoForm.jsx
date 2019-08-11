import React, {Component}  from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import {add, changeDescription, search} from './todoActions'

class TodoForm extends Component{

    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    keyHandler(e){
        const {add, changeDescription, search} = this.props
        
        if (e.key === 'Enter'){
            e.shiftKey ? search() : add( description)         
        } else if (e.key === 'Escape'){
            this.props.handleClear()
        }
    }

    componentWillMount(){
        this.props.search()
    }

    render(){
        const {add, changeDescription, search} = this.props
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
                                        onChange={this.props.changeDescription}
                                        value={this.props.description}/>                
                                </Grid>
                            </th>
                            <th className='tableButton'> 
                                <Grid cols='13 3 2'>        
                                    <IconButton style='primary' icon='plus'
                                        onClick={() => add(this.props.description)}/>
                                    <IconButton style='info' icon='search'
                                        onClick={() => search()}/>                                
                                    <IconButton style='default' icon='close'
                                        onClick={this.props.handleClear}/>                                
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
        {add, changeDescription, search}, 
        dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
