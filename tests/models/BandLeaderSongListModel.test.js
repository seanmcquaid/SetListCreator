const BandleaderSongListModel = require("../../models/BandleaderSongListModel");
const expect = require("chai").expect;

describe("BandleaderSongListModel", () => {

    describe("addSong", () => {
        let id;
        
        const songInfo = {
            songName : "Add Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testuser@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        it("addSong", async () => {
    
            await BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(async response => {
                                            const expectedResponse = { 
                                                username: "testuser@gmail.com",
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

        afterEach(done => {
            BandleaderSongListModel.deleteSong(username, id)
                                        .then(response => done())
                                        .catch(err => console.log(err));
        });
    });


    describe("getSongs", done => {
        let id, id2;
        
        const songInfo = {
            songName : "Get Songs Uptown Funk",
            artistName : "Bruno Mars",
            songKey : "D Minor",
            username : "testuser@gmail.com"
        };

        const songInfo2 = {
            songName : "Get Songs Treasure",
            artistName : "Bruno Mars",
            songKey : "Eb Major",
            username : "testuser@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(done => {
            BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(response => {
                                            BandleaderSongListModel.addSong(songInfo2.songName, songInfo2.artistName, songInfo2.songKey, songInfo2.username)
                                                .then(response2 => {
                                                    id = response[0].id
                                                    id2 = response2[0].id
                                                    done();
                                                })
                                        })
                                        .catch(err => console.log(err));
        });

        it("getSongs", async () => {
            await BandleaderSongListModel.getSongs(username)
                                        .then(response => {
                                            expect(response.length).to.equal(2);
                                        })
                                        .catch(err => console.log(err));

        });

        afterEach(async () => {
            await BandleaderSongListModel.deleteSong(username, id)
                    .then(async () => {})
                    .catch(err => console.log(err));
            await BandleaderSongListModel.deleteSong(username , id2)
                    .then(() => {})
                    .catch(err => console.log(err));
        });

    });

    describe("getSong", () => {
        let id;
        
        const songInfo = {
            songName : "Get Song Treasure",
            artistName : "Bruno Mars",
            songKey : "Eb Major",
            username : "testuser@gmail.com"
        };

        const {songName, artistName, songKey, username} = songInfo;

        beforeEach(done => {
            BandleaderSongListModel.addSong(songName, artistName, songKey, username)
                                        .then(response => {
                                            console.log(response);
                                            id = response[0].id
                                            done();
                                        })
                                        .catch(err => console.log(err));
        });

        it("getSong", async () => {
            await BandleaderSongListModel.getSong(songInfo.username, id)
                                .then(async response => {
                                    
                                    const expectedResponse = { 
                                        username: "testuser@gmail.com",
                                        songname: "Get Song Treasure",
                                        songkey: "Eb Major",
                                        artistname: "Bruno Mars" 
                                    };

                                    const songsResponse = response[0];
                                    console.log(response);

                                    id = songsResponse.id;
                                    
                                    expect(expectedResponse.username).to.equal(songsResponse.username);
                                    expect(expectedResponse.songname).to.equal(songsResponse.songname);
                                    expect(expectedResponse.songkey).to.equal(songsResponse.songkey);
                                    expect(expectedResponse.artistname).to.equal(songsResponse.artistname);
                                })
                                .catch(err => console.log(err));
        });

        afterEach(done => {
            BandleaderSongListModel.deleteSong(username , id)
                                        .then(response => done())
                                        .catch(err => console.log(err));
        });

    });

    // describe("deleteSong", () => {
    //     let id;
        
    //     const songInfo = {
    //         songName : "Delete Uptown Funk",
    //         artistName : "Bruno Mars",
    //         songKey : "D Minor",
    //         username : "testuser@gmail.com"
    //     };

    //     const {songName, artistName, songKey, username} = songInfo;

    //     beforeEach(done => {
    //         BandleaderSongListModel.addSong(songName, artistName, songKey, username)
    //                                     .then(response => {
    //                                         id = response[0].id
    //                                         done();
    //                                     })
    //                                     .catch(err => console.log(err));
    //     });

    //     it("deleteSong", async () => {
    //         await BandleaderSongListModel.deleteSong(username, id)
    //                                     .then(response => {
    //                                     })
    //                                     .catch(err => console.log(err));
    //     });

    // });

    // describe("editSong", () => {
    //     let id;
        
    //     const songInfo = {
    //         songName : "Uptown Funk",
    //         artistName : "Bruno Mars",
    //         songKey : "D Minor",
    //         username : "testuser@gmail.com"
    //     };

    //     const {songName, artistName, songKey, username} = songInfo;

    //     beforeEach(done => {
    //         BandleaderSongListModel.addSong(songName, artistName, songKey, username)
    //                                     .then(response => {
    //                                         id = response[0].id
                                            
    //                                         done();
    //                                     })
    //                                     .catch(err => console.log(err));
    //     });

    //     it("editSong", async () => {

    //         const updatedSong = {
    //             songName : "Treasure",
    //             artistName : "Bruno Mars",
    //             songKey : "Eb Major",
    //             username : "testuser@gmail.com"
    //         };

    //         await BandleaderSongListModel.editSong(id, updatedSong.songName, updatedSong.artistName, updatedSong.songKey, updatedSong.username)
    //                             .then(async response => {
    //                                 expect(2).to.equal(2);
    //                             })
    //                             .catch(err => console.log(err));
    //     });

    //     afterEach(done => {
    //         BandleaderSongListModel.deleteSong(username , id)
    //                                     .then(response => done())
    //                                     .catch(err => console.log(err));
    //     });
    // })

});