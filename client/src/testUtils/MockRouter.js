import React from "react";
import {MemoryRouter as Router} from "react-router-dom";

const MockRouter = ({initialRoute, children}) => (
    initialRoute ?
        <Router initialEntries={[initialRoute]}>
            {children}
        </Router> : 
        <Router>
            {children}
        </Router>
);

export default MockRouter;