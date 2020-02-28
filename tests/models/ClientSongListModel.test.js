const ClientSongListModel = require("../../models/ClientSongListModel");
const expect = require("chai").expect;

describe("ClientSongListModel", () => {

    describe("addSong", () => {

        it("addSong", async () => {
            ClientSongListModel.addSong()
                            .then(response => {

                            })
                            .catch(err => console.log(response))
        });

        afterEach(done => {
            ClientSongListModel.deleteSong()
                            .then(response => done())
                            .catch(err => console.log(err));
        });
    });

    describe("getSongs", () => {
        beforeEach(done => {
            ClientSongListModel.addSong()
                            .then(response => {

                            })
                            .catch(err => console.log(response))
        });

        beforeEach(done => {
            ClientSongListModel.addSong()
                            .then(response => {

                            })
                            .catch(err => console.log(response))
        });

        it("getSongs", async () => {
            ClientSongListModel.getSongs()
                            .then(response => {

                            })
                            .catch(err => console.log(err));
        });

        afterEach(done => {
            ClientSongListModel.deleteSong()
                            .then(response => done())
                            .catch(err => console.log(err));
        });
    });

    describe("getSong", () => {
        beforeEach(done => {
            ClientSongListModel.addSong()
                            .then(response => {

                            })
                            .catch(err => console.log(response))
        });

        it("getSong", async () => {
            ClientSongListModel.getSong()
                            .then(response => {

                            })
                            .catch(err => console.log(err));
        });

        afterEach(done => {
            ClientSongListModel.deleteSong()
                            .then(response => done())
                            .catch(err => console.log(err));
        });
    });

    describe("deleteSong", () => {
        beforeEach(done => {
            ClientSongListModel.addSong()
                            .then(response => {

                            })
                            .catch(err => console.log(response))
        });

        it("getSongs", async () => {
            ClientSongListModel.deleteSong()
                            .then(response => {

                            })
                            .catch(err => console.log(err));
        });
    });
    
    describe("editSong", () => {
        beforeEach(done => {
            ClientSongListModel.addSong()
                            .then(response => {

                            })
                            .catch(err => console.log(response))
        });

        it("editSong", async () => {
            ClientSongListModel.editSong()
                            .then(response => {

                            })
                            .catch(err => console.log(err));
        });

        afterEach(done => {
            ClientSongListModel.deleteSong()
                            .then(response => done())
                            .catch(err => console.log(err));
        });
    });

});