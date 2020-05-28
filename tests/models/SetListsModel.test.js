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
                        bandleaderComments : ["Song Comments Here"]
                    };

                    const setListInfoResponse = response[0];

                    expect(setListInfoResponse.clientname).to.equal(expectedResponse.clientName);
                    expect(setListInfoResponse.bandleadername).to.equal(expectedResponse.bandleaderName);
                    expect(setListInfoResponse.setlist).to.equal(expectedResponse.setList);
                    expect(setListInfoResponse.bandleadercomments).to.equal(expectedResponse.bandleaderComments);
                })
                .catch(err => console.log(err));
        });

        afterEach(async () => SetListsModel.deleteSetList(clientName, bandleaderName));
    });

    describe("getSetList", () => {
        beforeEach(async () => SetListsModel.addSetList());

        it("getSetList", () => {

        });

        afterEach(async () => SetListsModel.deleteSetList());
    });

    describe("addClientCommentsAndApprovalStatus", () => {
        beforeEach(async () => SetListsModel.addSetList());

        it("addClientCommentsAndApprovalStatus", () => {

        });

        afterEach(async () => SetListsModel.deleteSetList());
    });

    describe("editSetList", () => {
        beforeEach(async () => SetListsModel.addSetList());

        it("editSetList", () => {

        });

        afterEach(async () => SetListsModel.deleteSetList());
    });
});