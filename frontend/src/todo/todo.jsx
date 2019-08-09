import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from '../todo/todoForm'
import TodoList from '../todo/todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends React.Component{
    constructor(props){
        super(props)
        this.state = {description: '', list:[]}
        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkasDone = this.handleMarkasDone.bind(this)
        this.handleMarkasPending = this.handleMarkasPending.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
        
        this.refresh()
    }

    handleClear(){
        this.refresh()
    }


    handleRemove(todo){    
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleChange(e){        
        this.setState({...this.state, description: e.target.value})
    }

    handleAdd(){    
        const description = this.state.description
        axios.post(URL, {description})
            .then(resp => this.refresh())
    }

    handleMarkasDone(todo){    
        axios.put(`${URL}/${todo._id}`, {...todo, done:true})
            .then(resp => this.refresh(this.state.description))
    }
    
    handleMarkasPending(todo){    
        axios.put(`${URL}/${todo._id}`, {...todo, done:false})
            .then(resp => this.refresh(this.state.description))
    }

    render() {
        return(
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TodoForm 
                    description = {this.state.description}
                    handleChange={this.handleChange}
                    handleAdd={this.handleAdd} 
                    handleSearch={this.handleSearch}      
                    handleClear={this.handleClear}      
                    />                                       
                <TodoList 
                    list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkasPending={this.handleMarkasPending}
                    handleMarkasDone={this.handleMarkasDone}
                    />
            </div>
        )
    }
}