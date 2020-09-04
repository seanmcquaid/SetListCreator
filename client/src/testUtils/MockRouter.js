import React from "react";
import { MemoryRouter } from "react-router-dom";

const MockRouter = ({ initialRoute, children }) =>
  initialRoute ? (
    <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
  ) : (
    <MemoryRouter>{children}</MemoryRouter>
  );

export default MockRouter;
