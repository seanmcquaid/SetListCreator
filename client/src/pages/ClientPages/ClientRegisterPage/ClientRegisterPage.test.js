import React from "react";
import configureStore from "store/configureStore";
import axios from "axios";
import { Provider } from "react-redux";
import { render, waitFor, fireEvent, screen} from "@testing-library/react";
import MockRouter from "testUtils/MockRouter";
import { Route } from "react-router-dom";
import ClientRegisterPage from "./ClientRegisterPage";
import ClientLoginPage from "../ClientLoginPage/ClientLoginPage";
import ClientHomePage from "../ClientHomePage/ClientHomePage";

describe("<ClientRegisterPage/>", () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("Loading Spinner appears when you first enter the page", async () => {
        const getBandleadersResponse = {
            bandleaders : [
                {
                    username : "testbandleader@gmail.com",
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getBandleadersResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientRegister">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.queryByTestId("loadingSpinner")).toBeNull();

    });

    test("Error displays when there is a problem with getting bandleaders", async () => {

        jest.spyOn(axios, "get").mockRejectedValueOnce({});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientRegister">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );

        expect(screen.getByTestId("loadingSpinner")).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.queryByTestId("loadingSpinner")).toBeNull();

        expect(screen.getByText("There was a problem getting Bandleaders, please reload")).toBeInTheDocument();
    });

    test("Login link takes you to client login page", async () => {
        const getBandleadersResponse = {
            bandleaders : [
                {
                    username : "testbandleader@gmail.com",
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getBandleadersResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientRegister">
                    <Route exact path="/clientLogin" component={ClientLoginPage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        expect(screen.getByText("Client Register")).toBeInTheDocument();
        
        fireEvent.click(screen.getByText("Here"));

        expect(() => screen.getByText("Client Register")).toThrowError();

        expect(screen.getByText("Client Login")).toBeInTheDocument();
        
    });
    
    test("Successfully register user - redirected to client home", async () => {
        const getBandleadersResponse = {
            bandleaders : [
                {
                    username : "testbandleader@gmail.com",
                }
            ],
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getBandleadersResponse}});

        const username = "testuser@gmail.com";
        const password = "testpassword";
        const accountType = "client";
        const selectedBandleader = "testbandleader@gmail.com";

        const registerActionResponse = {
            isAuthenticated : true,
            token : "test token",
            username,
            accountType,
            setListAvailable : false,
            selectedBandleader,
        };

        jest.spyOn(axios, "post").mockResolvedValueOnce({data : {...registerActionResponse}});

        const store = configureStore();

        render(
            <Provider store={store}>
                <MockRouter initialRoute="/clientRegister">
                    <Route exact path="/clientHome" component={ClientHomePage}/>
                    <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                </MockRouter>
            </Provider>
        );

        await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());

        fireEvent.change(screen.getByTestId("UsernameTextInput"), {target : {value : username}});
        expect(screen.getByTestId("UsernameTextInput").value).toEqual(username);

        fireEvent.change(screen.getByTestId("PasswordTextInput"), {target : {value : password}});
        expect(screen.getByTestId("PasswordTextInput").value).toEqual(password);

        fireEvent.change(screen.getByTestId("Confirm PasswordTextInput"), {target : {value : password}});
        expect(screen.getByTestId("Confirm PasswordTextInput").value).toEqual(password);
        
        fireEvent.change(screen.getByTestId("Select Your BandleaderDropdown"), {target : {value : selectedBandleader}});
        expect(screen.getByTestId("Select Your BandleaderDropdown").value).toEqual(selectedBandleader);

        const getClientSongsActionResponse = {
            bandleader : "",
            doNotPlaySongsList : [],
            requestedSongsList : [],
            isLoading : true,
            setListAvailable : false,
            clientApproved : false
        };

        jest.spyOn(axios, "get").mockResolvedValueOnce({data : {...getClientSongsActionResponse}});
        
        fireEvent.click(screen.getByText("Register"));

        await waitFor(() => expect(screen.getByText("Musical Preferences Page")).toBeInTheDocument());

    });

    describe("Unsucessfully register user", () => {
        test("Passwords don't match", async () => {
            const getBandleadersResponse = {
                bandleaders : [
                    {
                        username : "testbandleader@gmail.com",
                    }
                ],
            };
    
            jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getBandleadersResponse}});
    
            const username = "testuser@gmail.com";
            const password = "testpassword";
            const wrongConfirmPassword = "passwordtest";
            const selectedBandleader = "testbandleader@gmail.com";
    
            const store = configureStore();
    
            render(
                <Provider store={store}>
                    <MockRouter initialRoute="/clientRegister">
                        <Route exact path="/clientHome" component={ClientHomePage}/>
                        <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                    </MockRouter>
                </Provider>
            );
    
            await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    
            fireEvent.change(screen.getByTestId("UsernameTextInput"), {target : {value : username}});
            expect(screen.getByTestId("UsernameTextInput").value).toEqual(username);
    
            fireEvent.change(screen.getByTestId("PasswordTextInput"), {target : {value : password}});
            expect(screen.getByTestId("PasswordTextInput").value).toEqual(password);
    
            fireEvent.change(screen.getByTestId("Confirm PasswordTextInput"), {target : {value : wrongConfirmPassword}});
            expect(screen.getByTestId("Confirm PasswordTextInput").value).toEqual(wrongConfirmPassword);
            
            fireEvent.change(screen.getByTestId("Select Your BandleaderDropdown"), {target : {value : selectedBandleader}});
            expect(screen.getByTestId("Select Your BandleaderDropdown").value).toEqual(selectedBandleader);
            
            fireEvent.click(screen.getByText("Register"));

            expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
        });
    
        test("Bandleader not selected", async () => {
            const getBandleadersResponse = {
                bandleaders : [
                    {
                        username : "testbandleader@gmail.com",
                    }
                ],
            };
    
            jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getBandleadersResponse}});
    
            const username = "testuser@gmail.com";
            const password = "testpassword";
    
            const store = configureStore();
    
            render(
                <Provider store={store}>
                    <MockRouter initialRoute="/clientRegister">
                        <Route exact path="/clientHome" component={ClientHomePage}/>
                        <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                    </MockRouter>
                </Provider>
            );
    
            await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    
            fireEvent.change(screen.getByTestId("UsernameTextInput"), {target : {value : username}});
            expect(screen.getByTestId("UsernameTextInput").value).toEqual(username);
    
            fireEvent.change(screen.getByTestId("PasswordTextInput"), {target : {value : password}});
            expect(screen.getByTestId("PasswordTextInput").value).toEqual(password);
    
            fireEvent.change(screen.getByTestId("Confirm PasswordTextInput"), {target : {value : password}});
            expect(screen.getByTestId("Confirm PasswordTextInput").value).toEqual(password);
            
            fireEvent.click(screen.getByText("Register"));

            expect(screen.getByText("SELECT A BANDLEADER")).toBeInTheDocument();
        });

        test("User already is registered - error message displays", async () => {
            const getBandleadersResponse = {
                bandleaders : [
                    {
                        username : "testbandleader@gmail.com",
                    }
                ],
            };
    
            jest.spyOn(axios, "get").mockResolvedValueOnce({data : { ...getBandleadersResponse}});
    
            const username = "testuser@gmail.com";
            const password = "testpassword";
            const selectedBandleader = "testbandleader@gmail.com";
    
            const registerActionResponse = {
                errorMessage : "Register Error Here"
            };
    
            jest.spyOn(axios, "post").mockRejectedValueOnce({
                response : {
                    data : {...registerActionResponse}
                }
            });
    
            const store = configureStore();
    
            render(
                <Provider store={store}>
                    <MockRouter initialRoute="/clientRegister">
                        <Route exact path="/clientHome" component={ClientHomePage}/>
                        <Route exact path="/clientRegister" component={ClientRegisterPage}/>
                    </MockRouter>
                </Provider>
            );
    
            await waitFor(() => expect(screen.queryByTestId("loadingSpinner")).toBeNull());
    
            fireEvent.change(screen.getByTestId("UsernameTextInput"), {target : {value : username}});
            expect(screen.getByTestId("UsernameTextInput").value).toEqual(username);
    
            fireEvent.change(screen.getByTestId("PasswordTextInput"), {target : {value : password}});
            expect(screen.getByTestId("PasswordTextInput").value).toEqual(password);
    
            fireEvent.change(screen.getByTestId("Confirm PasswordTextInput"), {target : {value : password}});
            expect(screen.getByTestId("Confirm PasswordTextInput").value).toEqual(password);
            
            fireEvent.change(screen.getByTestId("Select Your BandleaderDropdown"), {target : {value : selectedBandleader}});
            expect(screen.getByTestId("Select Your BandleaderDropdown").value).toEqual(selectedBandleader);
            
            fireEvent.click(screen.getByText("Register"));

            await waitFor(() => expect(screen.getByText("Register Error Here")).toBeInTheDocument());
    
        });
    });
});