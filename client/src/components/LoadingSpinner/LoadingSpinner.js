import React from "react";
import PropTypes from "prop-types";
import {SyncLoader} from "react-spinners";
import {css} from "@emotion/core";

const override = css`
    position : absolute;
    top : 50%;
    left : 44%;
`;

const LoadingSpinner = ({isLoading}) => (
    <SyncLoader
        css={override}
        loading={isLoading}
        size={50}
        sizeUnit={"px"}
        color={"#555555"}
    />
);

LoadingSpinner.propTypes = {
    isLoading : PropTypes.bool.isRequired,
}

export default LoadingSpinner;