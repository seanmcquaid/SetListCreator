const SetListsModel = require("../../models/SetListsModel");
const expect = require("chai").expect;

describe("SetListsModel", () => {
    describe("addSetList", () => {
        const setListInfo = {
            clientName : "addtestclient@gmail.com",
            bandleaderName : "addtestleader@gmail.com",
            setList : [{info : "Completed Set List Here"}],
            bandleaderComments : ["Song Comments Here"]
        };

        const {clientName, bandleaderName, setList, bandleaderComments} = setListInfo;

        it("addSetList", async () => {
            return await SetListsModel.addSetList(clientName, bandleaderName, setList, bandleaderComments)
                .then(response => {
                    const expectedResponse = {
                        clientName : "addtestclient@gmail.com",
                        bandleaderName : "addtestleader@gmail.com",
                        setList : ["{\"info\":\"Completed Set List Here\"}"],
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

        after(async () => SetListsModel.deleteSetList(clientName, bandleaderName));
    });

    describe("getSetList", () => {
        const setListInfo = {
            clientName : "gettestclient@gmail.com",
            bandleaderName : "gettestleader@gmail.com",
            setList : [{info : "Completed Set List Here"}],
            bandleaderComments : ["Song Comments Here"]
        };

        const {clientName, bandleaderName, setList, bandleaderComments} = setListInfo;

        before(async () => await SetListsModel.addSetList(clientName, bandleaderName, setList, bandleaderComments));

        it("getSetList", async () => {
            return await SetListsModel.getSetList(clientName)
                .then(response => {
                    const expectedResponse = {
                        clientName : "gettestclient@gmail.com",
                        bandleaderName : "gettestleader@gmail.com",
                        setList : ["{\"info\":\"Completed Set List Here\"}"],
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

        after(async () => await SetListsModel.deleteSetList(clientName, bandleaderName));
    });

    describe("addClientCommentsAndApprovalStatus", () => {
        const setListInfo = {
            clientName : "addtestclientapproval@gmail.com",
            bandleaderName : "addtestleader@gmail.com",
            setList : [{info : "Completed Set List Here"}],
            bandleaderComments : ["Song Comments Here"],
            clientComments: ["Client Comments Here"],
            clientApproved: true
        };

        const {clientName, bandleaderName, setList, bandleaderComments, clientComments, clientApproved} = setListInfo;

        before(async () => await SetListsModel.addSetList(clientName, bandleaderName, setList, bandleaderComments));

        it("addClientCommentsAndApprovalStatus", async () => {
            return await SetListsModel.addClientCommentsAndApprovalStatus(clientName, clientComments, clientApproved)
                .then(response => {
                    const expectedResponse = {
                        clientName : "addtestclientapproval@gmail.com",
                        bandleaderName : "addtestleader@gmail.com",
                        setList : ["{\"info\":\"Completed Set List Here\"}"],
                        bandleaderComments : ["Song Comments Here"],
                        clientComments: ["Client Comments Here"],
                        clientApproved: true
                    };

                    const setListInfoResponse = response[0];

                    expect(setListInfoResponse.clientname).to.equal(expectedResponse.clientName);
                    expect(setListInfoResponse.bandleadername).to.equal(expectedResponse.bandleaderName);
                    expect(setListInfoResponse.setlist).to.eql(expectedResponse.setList);
                    expect(setListInfoResponse.bandleadercomments).to.eql(expectedResponse.bandleaderComments);
                    expect(setListInfoResponse.clientcomments).to.eql(expectedResponse.clientComments);
                    expect(setListInfoResponse.clientapproved).to.equal(expectedResponse.clientApproved);
                })
        });

        after(async () => await SetListsModel.deleteSetList(clientName, bandleaderName));
    });

    describe("editSetList", () => {
        const setListInfo = {
            clientName : "addtestclient@gmail.com",
            bandleaderName : "addtestleader@gmail.com",
            setList : [{info : "Completed Set List Here"}],
            bandleaderComments : ["Song Comments Here"],
        };

        const {clientName, bandleaderName, setList, bandleaderComments} = setListInfo;

        before(async () => await SetListsModel.addSetList(clientName, bandleaderName, setList, bandleaderComments));

        const updatedSetListInfo = {
            clientName : "edittestclient@gmail.com",
            bandleaderName : "edittestleader@gmail.com",
            setList : [{info : "Completed Set List Here"}],
            bandleaderComments : ["Edit Comments Here"],
        };

        it("editSetList", async () => {
            return await SetListsModel.editSetList(updatedSetListInfo.clientName, updatedSetListInfo.bandleaderName, updatedSetListInfo.setList, updatedSetListInfo.bandleaderComments)
                .then(response => {
                    const expectedResponse = {
                        clientName : "edittestclient@gmail.com",
                        bandleaderName : "edittestleader@gmail.com",
                        setList : ["{\"info\":\"Completed Set List Here\"}"],
                        bandleaderComments : ["Edit Comments Here"],
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
        });

        after(async () => SetListsModel.deleteSetList(clientName, bandleaderName));
    });
});