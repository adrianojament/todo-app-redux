import 'modules/bootstrap/dist/css/bootstrap.min.css'
import 'modules/font-awesome/css/font-awesome.min.css'
import '../template/custom.css'
import React from 'react'
import Menu from '../template/menu'
import Router from './router'

export default props => (
    <div className='container'>
        <Menu/>
        <Router/>        
    </div>
)