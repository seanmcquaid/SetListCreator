import React from "react";
import PropTypes from "prop-types";
import {SyncLoader} from "react-spinners";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = React.memo(({isLoading}) => (
    <div className={styles.loadingSpinnerContainer} data-testid="loadingSpinner">
        <SyncLoader
            loading={isLoading}
            size={30}
            sizeUnit={"px"}
            color={"#555555"}
        />
    </div>
));

LoadingSpinner.propTypes = {
    isLoading : PropTypes.bool.isRequired,
};

LoadingSpinner.defaultProps = {
    isLoading : true,
};

export default LoadingSpinner;