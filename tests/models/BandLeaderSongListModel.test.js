const BandLeaderSongListModel = require("../../models/BandLeaderSongListModel");
const expect = require("chai").expect;

describe("BandLeaderSongListModel", () => {

    describe("addSong", () => {
        let id;
        
        const songInfo = {
            songName : "Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testuser@gmail.com"
        };

        it("addSong", async () => {
    
            const {songName, artistName, songKey, username} = songInfo;
    
            await BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(async response => {
                                            const expectedResponse = { 
                                                username: "testuser@gmail.com",
                                                songname: "Uptown Funk",
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

        afterEach(async () => {
            await BandLeaderSongListModel.deleteSong(id)
                                        .then(response => {})
                                        .catch(err => console.log(err));
        });
    });


    it("getSongs", done => {
        let id;
        
        const songInfo = {
            songName : "Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testuser@gmail.com"
        };

        // add multiple songs

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(done => {
            BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(response => {
                                            id = response[0].id
                                            done();
                                        })
                                        .catch(err => console.log(err));
        });

        it("getSongs", async () => {
            
        });

        afterEach(done => {
            BandLeaderSongListModel.deleteSong(id)
                                        .then(response => done())
                                        .catch(err => console.log(err));
        });
    });

    describe("getSong", () => {
        let id;
        
        const songInfo = {
            songName : "Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testuser@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(done => {
            BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(response => {
                                            id = response[0].id
                                            done();
                                        })
                                        .catch(err => console.log(err));
        });

        it("getSong", async () => {
            await BandLeaderSongListModel.getSong(songInfo.username, id)
                                .then(async response => {
                                    
                                    const expectedResponse = { 
                                        username: "testuser@gmail.com",
                                        songname: "Uptown Funk",
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

        afterEach(done => {
            BandLeaderSongListModel.deleteSong(id)
                                        .then(response => done())
                                        .catch(err => console.log(err));
        });

    });

    describe("deleteSong", () => {
        let id;
        
        const songInfo = {
            songName : "Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testuser@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(done => {
            BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(response => {
                                            id = response[0].id
                                            done();
                                        })
                                        .catch(err => console.log(err));
        });

        it("deleteSong", async () => {
            await BandLeaderSongListModel.deleteSong(id)
                                        .then(response => {
                                            console.log(response);
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
            username : "testuser@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(done => {
            BandLeaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(response => {
                                            id = response[0].id
                                            done();
                                        })
                                        .catch(err => console.log(err));
        });

        it("editSong", async () => {
            
        });

        afterEach(done => {
            BandLeaderSongListModel.deleteSong(id)
                                        .then(response => done())
                                        .catch(err => console.log(err));
        });
    })

});