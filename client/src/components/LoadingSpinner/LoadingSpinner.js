import React from "react";
import PropTypes from "prop-types";
import {SyncLoader} from "react-spinners";
import {css} from "@emotion/core";

const override = css`
    position : absolute;
    top : 50%;
    left : 50%;
`;

const LoadingSpinner = React.memo(({isLoading}) => (
    <SyncLoader
        css={override}
        loading={isLoading}
        size={30}
        sizeUnit={"px"}
        color={"#555555"}
    />
));

LoadingSpinner.propTypes = {
    isLoading : PropTypes.bool.isRequired,
};

LoadingSpinner.defaultProps = {
    isLoading : true,
};

export default LoadingSpinner;