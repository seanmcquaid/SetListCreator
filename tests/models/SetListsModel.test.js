const SetListsModel = require("../../models/SetListsModel");
const expect = require("chai").expect;

describe("SetListsModel", () => {
    describe("addSetList", () => {
        it("addSetList", () => {

        });

        afterEach(async () => SetListsModel.deleteSetList());
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