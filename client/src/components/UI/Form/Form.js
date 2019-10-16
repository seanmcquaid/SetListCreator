import React from "react";
import styles from "./Form.module.css";
import Input from "../Input/Input";


const Form = props => {
    const inputInformation = props.inputInformation.map(inputInfo => {
        return(
            <Input 
                
            />
        )
    });
    return(
        <form onSubmit={props.onSubmitHandler}>
            {inputInformation}
        </form>
    )
};

export default Form;