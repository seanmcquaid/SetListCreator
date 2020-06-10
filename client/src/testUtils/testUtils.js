import React from "react";
import {render as rtlRender} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "store/store";

export const render = component => (
    rtlRender(
        <Provider store={store}>
            {component}
        </Provider>)
);
