import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {MarkasDone, MarkasPending, Remove} from './todoActions'
import IconButton from '../template/iconButton'

const TodoList = props => {
    
    const renderRows = () =>{
        const list = props.list || []
        return list.map(todo => (
               <tr key={todo._id}>
                   <td className={todo.done ? 'markedAsDone': ''}>{todo.description}</td>
                   <td>
                        <IconButton
                            style='success'
                            icon='check'
                            onClick={() => props.MarkasDone(todo)}
                            hide={todo.done}
                            >
                        </IconButton>
                        <IconButton
                            style='warning'
                            icon='undo'
                            onClick={() => props.MarkasPending(todo)}
                            hide={todo.done == false}
                            >
                        </IconButton>
                        <IconButton 
                            style='danger'
                            icon='trash-o'
                            hide={todo.done == false}
                            onClick={() => props.Remove(todo)}>
                        </IconButton>      
                   </td>
               </tr> 
            ))
    }

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>

    )
}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = (dispatch) => bindActionCreators({ MarkasDone, MarkasPending, Remove}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
