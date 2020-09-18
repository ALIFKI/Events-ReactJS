import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import React,{ Component } from 'react'
import Style from '../styles/FormLoginStyle.module.css'

class FormLogin extends Component {
    constructor(){
        super()
    }

    render(){
        return(
            <Form>
                <div className='input-wrapper no-gutter'>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="Inset Your Email" />
                </FormGroup>
                </div>
            </Form>
        )
    }
}

export default FormLogin