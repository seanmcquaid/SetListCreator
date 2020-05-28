const SetListsModel = require("../../models/SetListsModel");
const expect = require("chai").expect;

describe("SetListsModel", () => {
    describe("addSetList", () => {
        const setListInfo = {
            clientName : "addtestclient@gmail.com",
            bandleaderName : "addtestleader@gmail.com",
            setList : ["Song", "Info", "Here"],
            bandleaderComments : ["Song Comments Here"]
        };

        const {clientName, bandleaderName, setList, bandleaderComments} = setListInfo;

        it("addSetList", async () => {
            return await SetListsModel.addSetList(clientName, bandleaderName, setList, bandleaderComments)
                .then(response => {
                    const expectedResponse = {
                        clientName : "addtestclient@gmail.com",
                        bandleaderName : "addtestleader@gmail.com",
                        setList : ["Song", "Info", "Here"],
                        bandleaderComments : ["Song Comments Here"],
                        clientComments: null,
                        clientApproved: null
                    };

                    const setListInfoResponse = response[0];

                    expect(setListInfoResponse.clientname).to.equal(expectedResponse.clientName);
                    expect(setListInfoResponse.bandleadername).to.equal(expectedResponse.bandleaderName);
                    expect(setListInfoResponse.setlist).to.equal(expectedResponse.setList);
                    expect(setListInfoResponse.bandleadercomments).to.equal(expectedResponse.bandleaderComments);
                    expect(setListInfoResponse.clientcomments).to.equal(expectedResponse.clientComments);
                    expect(setListInfoResponse.clientapproved).to.equal(expectedResponse.clientApproved);
                })
                .catch(err => console.log(err));
        });

        afterEach(async () => SetListsModel.deleteSetList(clientName, bandleaderName));
    });

    describe("getSetList", () => {
        const setListInfo = {
            clientName : "gettestclient@gmail.com",
            bandleaderName : "gettestleader@gmail.com",
            setList : ["Song", "Info", "Here"],
            bandleaderComments : ["Song Comments Here"]
        };

        const {clientName, bandleaderName, setList, bandleaderComments} = setListInfo;

        beforeEach(async () => await SetListsModel.addSetList(clientName, bandleaderName, setList, bandleaderComments));

        it("getSetList", async () => {
            return await SetListsModel.getSetList(clientName)
                .then(response => {
                    const expectedResponse = {
                        clientName : "gettestclient@gmail.com",
                        bandleaderName : "gettestleader@gmail.com",
                        setList : ["Song", "Info", "Here"],
                        bandleaderComments : ["Song Comments Here"],
                        clientComments: null,
                        clientApproved: null
                    };

                    const setListInfoResponse = response[0];

                    expect(setListInfoResponse.clientname).to.equal(expectedResponse.clientName);
                    expect(setListInfoResponse.bandleadername).to.equal(expectedResponse.bandleaderName);
                    expect(setListInfoResponse.setlist).to.equal(expectedResponse.setList);
                    expect(setListInfoResponse.bandleadercomments).to.equal(expectedResponse.bandleaderComments);
                    expect(setListInfoResponse.clientcomments).to.equal(expectedResponse.clientComments);
                    expect(setListInfoResponse.clientapproved).to.equal(expectedResponse.clientApproved);
                })
                .catch(err => console.log(err));
        });

        afterEach(async () => await SetListsModel.deleteSetList(clientName, bandleaderName));
    });

    describe("addClientCommentsAndApprovalStatus", () => {
        const setListInfo = {
            clientName : "addtestclientapproval@gmail.com",
            bandleaderName : "addtestleader@gmail.com",
            setList : ["Song", "Info", "Here"],
            bandleaderComments : ["Song Comments Here"],
            clientComments: ["Client Comments Here"],
            clientApproved: true
        };

        const {clientName, bandleaderName, setList, bandleaderComments, clientComments, clientApproved} = setListInfo;

        beforeEach(async () => await SetListsModel.addSetList(clientName, bandleaderName, setList, bandleaderComments));

        it("addClientCommentsAndApprovalStatus", () => {
            return await SetListsModel.addClientCommentsAndApprovalStatus(clientName, clientComments, clientApproved)
                .then(response => {
                    const expectedResponse = {
                        clientName : "addtestclientapproval@gmail.com",
                        bandleaderName : "addtestleader@gmail.com",
                        setList : ["Song", "Info", "Here"],
                        bandleaderComments : ["Song Comments Here"],
                        clientComments: ["Client Comments Here"],
                        clientApproved: true
                    };

                    const setListInfoResponse = response[0];

                    expect(setListInfoResponse.clientname).to.equal(expectedResponse.clientName);
                    expect(setListInfoResponse.bandleadername).to.equal(expectedResponse.bandleaderName);
                    expect(setListInfoResponse.setlist).to.equal(expectedResponse.setList);
                    expect(setListInfoResponse.bandleadercomments).to.equal(expectedResponse.bandleaderComments);
                    expect(setListInfoResponse.clientcomments).to.equal(expectedResponse.clientComments);
                    expect(setListInfoResponse.clientapproved).to.equal(expectedResponse.clientApproved);
                })
        });

        afterEach(async () => await SetListsModel.deleteSetList(clientName, bandleaderName));
    });

    describe("editSetList", () => {
        beforeEach(async () => SetListsModel.addSetList());

        it("editSetList", () => {

        });

        afterEach(async () => SetListsModel.deleteSetList());
    });
});