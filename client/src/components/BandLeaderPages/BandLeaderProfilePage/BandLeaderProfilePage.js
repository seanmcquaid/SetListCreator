import React, {useState, useEffect} from "react";
import styles from "./BandLeaderProfilePage.module.css";
import Text from "../../UI/Text/Text";
import Input from "../../UI/Input/Input";
import {connect} from "react-redux";

const BandLeaderProfilePage = props => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className={styles.bandLeaderProfilePageContainer}>
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
            </form>
        </div>
    )
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(BandLeaderProfilePage);