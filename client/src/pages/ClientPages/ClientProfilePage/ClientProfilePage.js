import React, {useState, useEffect} from "react";
import styles from "./ClientProfilePage.module.css";
import Text from "components/Text/Text";
import Input from "components/Input/Input";
import Dropdown from "components/Dropdown/Dropdown";
import {connect} from "react-redux";

const ClientProfilePage = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [bandleaders, setBandleaders] = useState([""]);
    const [selectedBandleader, setSelectedBandleader] = useState("");

    return (
        <div className={styles.clientProfilePageContainer}>
            <Text headerText={true}>Profile Page</Text>
            <form>
                <Input
                placeholder="Username here"
                />
                <Input 
                placeholder="Password here"
                />
                <Input 
                placeholder="Confirm Password here"
                />
                <Dropdown/>
            </form>
        </div>
    )
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ClientProfilePage);