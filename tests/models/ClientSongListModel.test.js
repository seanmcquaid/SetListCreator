const ClientSongListModel = require("../../models/ClientSongListModel");
const expect = require("chai").expect;

describe("ClientSongListModel", () => {

    describe("addSong", () => {
        let id;
        
        const songInfo = {
            songName : "Add Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testclient@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        it("addSong", async () => {
    
            return await ClientSongListModel.addSong(songName, artistName, songKey, username)
                .then(async response => {
                    const expectedResponse = { 
                        username: "testclient@gmail.com",
                        songname: "Add Uptown Funk",
                        songkey: "D Minor",
                        artistname: "Bruno Mars" 
                    };

                    const songsResponse = response[0];

                    id = songsResponse.id;
                    
                    expect(expectedResponse.username).to.equal(songsResponse.username);
                    expect(expectedResponse.songname).to.equal(songsResponse.songname);
                    expect(expectedResponse.songkey).to.equal(songsResponse.songkey);
                    expect(expectedResponse.artistname).to.equal(songsResponse.artistname);
                })
                .catch(err => console.log(err));
        });

        afterEach(async () => await ClientSongListModel.deleteSong(username, id));
    });

    describe("getSongs", () => {
        let id, id2;
        
        const songInfo = {
            songName : "Get Songs Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testclient@gmail.com"
        };

        const songInfo2 = {
            songName : "Get Songs Treasure",
            artistName : "Bruno Mars",
            songKey : "Eb Major",
            username : "testclient@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(async () => await ClientSongListModel.addSong(songName, artistName, songKey, username));

        beforeEach(async () => await ClientSongListModel.addSong(songInfo2.songName, songInfo2.artistName, songInfo2.songKey, songInfo2.username));

        it("getSongs", async () => {
            return await ClientSongListModel.getSongs(username)
                .then(response => {
                    expect(response.length).to.equal(2);
                })
                .catch(err => console.log(err));

        });

        afterEach(async () => await ClientSongListModel.deleteSong(username, id));

        afterEach(async () => await ClientSongListModel.deleteSong(username , id2));

    });

    describe("getSong", () => {
        let id;
        
        const songInfo = {
            songName : "Get Song Treasure",
            artistName : "Bruno Mars",
            songKey : "Eb Major",
            username : "testclient@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(async () => {
            return await ClientSongListModel.addSong(songName, artistName, songKey, username)
                .then(response => {
                    id = response[0].id
                })
                .catch(err => console.log(err));
        });

        it("getSong", async () => {
            return await ClientSongListModel.getSong(songInfo.username, id)
                .then(async response => {
                    
                    const expectedResponse = { 
                        username: "testclient@gmail.com",
                        songname: "Get Song Treasure",
                        songkey: "Eb Major",
                        artistname: "Bruno Mars" 
                    };

                    const songsResponse = response[0];

                    id = songsResponse.id;
                    
                    expect(expectedResponse.username).to.equal(songsResponse.username);
                    expect(expectedResponse.songname).to.equal(songsResponse.songname);
                    expect(expectedResponse.songkey).to.equal(songsResponse.songkey);
                    expect(expectedResponse.artistname).to.equal(songsResponse.artistname);
                })
                .catch(err => console.log(err));
        });

        afterEach(async () => await ClientSongListModel.deleteSong(username , id));
    });

    describe("deleteSong", () => {
        let id;
        
        const songInfo = {
            songName : "Delete Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testclient@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(async () => {
            return await ClientSongListModel.addSong(songName, artistName, songKey, username)
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("deleteSong", async () => {
            return await ClientSongListModel.deleteSong(username, id)
                .then(response => {
                    expect(response.length).to.equal(0);
                })
                .catch(err => console.log(err));
        });

    });
    
    describe("editSong", () => {
        let id;
        
        const songInfo = {
            songName : "Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testclient@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(async () => {
            return await ClientSongListModel.addSong(songName, artistName, songKey, username)
                .then(response => {
                    id = response[0].id
                })
                .catch(err => console.log(err));
        });

        it("editSong", async () => {

            const updatedSong = {
                songName : "Edit Treasure",
                artistName : "Bruno Mars",
                songKey : "Eb Major",
                username : "testclient@gmail.com"
            };

            return await ClientSongListModel.editSong(id, updatedSong.songName, updatedSong.artistName, updatedSong.songKey, updatedSong.username)
                .then(async response => {

                    const expectedResponse = {
                        songName : "Edit Treasure",
                        artistName : "Bruno Mars",
                        songKey : "Eb Major",
                        username : "testclient@gmail.com"
                    };

                    const songsResponse = response[0];

                    id = songsResponse.id;
                    
                    expect(expectedResponse.username).to.equal(songsResponse.username);
                    expect(expectedResponse.songName).to.equal(songsResponse.songname);
                    expect(expectedResponse.songKey).to.equal(songsResponse.songkey);
                    expect(expectedResponse.artistName).to.equal(songsResponse.artistname);
                })
                .catch(err => console.log(err));
        });

        afterEach(async () => await ClientSongListModel.deleteSong(username , id));
    });

});