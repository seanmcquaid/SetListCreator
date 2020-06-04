const BandleaderSongListModel = require("../../models/BandleaderSongListModel");
const expect = require("chai").expect;

describe("BandleaderSongListModel", () => {

    describe("addSong", () => {
        let id;
        
        const songInfo = {
            songName : "Add Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testleader@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        it("addSong", async () => {
    
            return await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                .then(async response => {
                    const expectedResponse = { 
                        username: "testleader@gmail.com",
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

        after(async () => await BandleaderSongListModel.deleteSong(username, id));
    });


    describe("getSongs", () => {
        let id, id2;
        
        const songInfo = {
            songName : "Get Songs Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testleader@gmail.com"
        };

        const songInfo2 = {
            songName : "Get Songs Treasure",
            artistName : "Bruno Mars",
            songKey : "Eb Major",
            username : "testleader@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        before(async () => await BandleaderSongListModel.addSong(songName, artistName, songKey, username));

        before(async () => await BandleaderSongListModel.addSong(songInfo2.songName, songInfo2.artistName, songInfo2.songKey, songInfo2.username));

        it("getSongs", async () => {
            return await BandleaderSongListModel.getSongs(username)
                .then(response => {
                    expect(response.length).to.equal(2);
                })
                .catch(err => console.log(err));

        });

        after(async () => await BandleaderSongListModel.deleteSong(username, id));

        after(async () => await BandleaderSongListModel.deleteSong(username , id2));

    });

    describe("getSong", () => {
        let id;
        
        const songInfo = {
            songName : "Get Song Treasure",
            artistName : "Bruno Mars",
            songKey : "Eb Major",
            username : "testleader@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        before(async () => {
            return await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                .then(response => {
                    id = response[0].id
                })
                .catch(err => console.log(err));
        });

        it("getSong", async () => {
            return await BandleaderSongListModel.getSong(songInfo.username, id)
                .then(async response => {
                    
                    const expectedResponse = { 
                        username: "testleader@gmail.com",
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

        after(async () => await BandleaderSongListModel.deleteSong(username , id));
    });

    describe("deleteSong", () => {
        let id;
        
        const songInfo = {
            songName : "Delete Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testleader@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        before(async () => {
            return await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                .then(response => {
                    id = response[0].id;
                })
                .catch(err => console.log(err));
        });

        it("deleteSong", async () => {
            return await BandleaderSongListModel.deleteSong(username, id)
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
            username : "testleader@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        before(async () => {
            return await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
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
                username : "testleader@gmail.com"
            };

            return await BandleaderSongListModel.editSong(id, updatedSong.songName, updatedSong.artistName, updatedSong.songKey, updatedSong.username)
                .then(async response => {

                    const expectedResponse = {
                        songName : "Edit Treasure",
                        artistName : "Bruno Mars",
                        songKey : "Eb Major",
                        username : "testleader@gmail.com"
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

        after(async () => await BandleaderSongListModel.deleteSong(username , id));
    });
});