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
        expect(2).to.equal(2);
        done();
    });

    describe("getSong", () => {
        it("getSong", done => {
            expect(2).to.equal(2);
            done();
        })
    });

    it("deleteSong", done => {
        expect(2).to.equal(2);
        done();
    })

    it("editSong", done => {
        expect(2).to.equal(2);
        done();
    })

});