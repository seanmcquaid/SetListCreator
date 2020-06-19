import React from "react";
import {MemoryRouter} from "react-router-dom";

const MockRouter = ({initialRoute, children, history}) => (
    initialRoute ?
        <MemoryRouter initialEntries={[initialRoute]} history={history}>
            {children}
        </MemoryRouter> : 
        <MemoryRouter history={history}>
            {children}
        </MemoryRouter>
);

export default MockRouter;