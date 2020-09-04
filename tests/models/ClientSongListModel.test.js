const ClientSongListModel = require("../../models/ClientSongListModel");
const expect = require("chai").expect;

describe("ClientSongListModel", () => {
  describe("addSong", () => {
    let id;

    const songInfo = {
      songName: "Add Uptown Funk",
      artistName: "Bruno Mars",
      songKey: "D Minor",
      username: "testclient@gmail.com",
    };

    const { songName, artistName, songKey, username } = songInfo;

    it("addSong", async () => {
      return await ClientSongListModel.addSong(
        songName,
        artistName,
        songKey,
        username
      )
        .then(async (response) => {
          const expectedResponse = {
            username: "testclient@gmail.com",
            songname: "Add Uptown Funk",
            songkey: "D Minor",
            artistname: "Bruno Mars",
          };

          const songsResponse = response[0];

          id = songsResponse.id;

          expect(songsResponse.username).to.equal(expectedResponse.username);
          expect(songsResponse.songname).to.equal(expectedResponse.songname);
          expect(songsResponse.songkey).to.equal(expectedResponse.songkey);
          expect(songsResponse.artistname).to.equal(
            expectedResponse.artistname
          );
        })
        .catch((err) => console.log(err));
    });

    after(async () => await ClientSongListModel.deleteSong(username, id));
  });

  describe("getSongs", () => {
    let id, id2;

    const songInfo = {
      songName: "Get Songs Uptown Funk",
      artistName: "Bruno Mars",
      songKey: "D Minor",
      username: "testclient@gmail.com",
    };

    const { songName, artistName, songKey, username } = songInfo;

    before(async () => {
      return await ClientSongListModel.addSong(
        songName,
        artistName,
        songKey,
        username
      )
        .then((response) => {
          id = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    const songInfo2 = {
      songName: "Get Songs Treasure",
      artistName: "Bruno Mars",
      songKey: "Eb Major",
      username: "testclient@gmail.com",
    };

    before(async () => {
      return await ClientSongListModel.addSong(
        songInfo2.songName,
        songInfo2.artistName,
        songInfo2.songKey,
        songInfo2.username
      )
        .then((response) => {
          id2 = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    it("getSongs", async () => {
      return await ClientSongListModel.getSongs(username)
        .then((response) => {
          expect(response.length).to.equal(2);
        })
        .catch((err) => console.log(err));
    });

    after(async () => await ClientSongListModel.deleteSong(username, id));

    after(async () => await ClientSongListModel.deleteSong(username, id2));
  });

  describe("getSong", () => {
    let id;

    const songInfo = {
      songName: "Get Song Treasure",
      artistName: "Bruno Mars",
      songKey: "Eb Major",
      username: "testclient@gmail.com",
    };

    const { songName, artistName, songKey, username } = songInfo;

    before(async () => {
      return await ClientSongListModel.addSong(
        songName,
        artistName,
        songKey,
        username
      )
        .then((response) => {
          id = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    it("getSong", async () => {
      return await ClientSongListModel.getSong(songInfo.username, id)
        .then(async (response) => {
          const expectedResponse = {
            username: "testclient@gmail.com",
            songname: "Get Song Treasure",
            songkey: "Eb Major",
            artistname: "Bruno Mars",
          };

          const songsResponse = response[0];

          expect(songsResponse.username).to.equal(expectedResponse.username);
          expect(songsResponse.songname).to.equal(expectedResponse.songname);
          expect(songsResponse.songkey).to.equal(expectedResponse.songkey);
          expect(songsResponse.artistname).to.equal(
            expectedResponse.artistname
          );
        })
        .catch((err) => console.log(err));
    });

    after(async () => await ClientSongListModel.deleteSong(username, id));
  });

  describe("deleteSong", () => {
    let id;

    const songInfo = {
      songName: "Delete Uptown Funk",
      artistName: "Bruno Mars",
      songKey: "D Minor",
      username: "testclient@gmail.com",
    };

    const { songName, artistName, songKey, username } = songInfo;

    before(async () => {
      return await ClientSongListModel.addSong(
        songName,
        artistName,
        songKey,
        username
      )
        .then((response) => {
          id = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    it("deleteSong", async () => {
      return await ClientSongListModel.deleteSong(username, id)
        .then((response) => {
          expect(response.length).to.equal(0);
        })
        .catch((err) => console.log(err));
    });
  });

  describe("editSong", () => {
    let id;

    const songInfo = {
      songName: "Uptown Funk",
      artistName: "Bruno Mars",
      songKey: "D Minor",
      username: "testclient@gmail.com",
    };

    const { songName, artistName, songKey, username } = songInfo;

    before(async () => {
      return await ClientSongListModel.addSong(
        songName,
        artistName,
        songKey,
        username
      )
        .then((response) => {
          id = response[0].id;
        })
        .catch((err) => console.log(err));
    });

    it("editSong", async () => {
      const updatedSong = {
        songName: "Edit Treasure",
        artistName: "Bruno Mars",
        songKey: "Eb Major",
        username: "testclient@gmail.com",
      };

      return await ClientSongListModel.editSong(
        id,
        updatedSong.songName,
        updatedSong.artistName,
        updatedSong.songKey,
        updatedSong.username
      )
        .then(async (response) => {
          const expectedResponse = {
            songName: "Edit Treasure",
            artistName: "Bruno Mars",
            songKey: "Eb Major",
            username: "testclient@gmail.com",
          };

          const songsResponse = response[0];

          expect(songsResponse.username).to.equal(expectedResponse.username);
          expect(songsResponse.songName).to.equal(expectedResponse.songname);
          expect(songsResponse.songKey).to.equal(expectedResponse.songkey);
          expect(songsResponse.artistName).to.equal(
            expectedResponse.artistname
          );
        })
        .catch((err) => console.log(err));
    });

    after(async () => await ClientSongListModel.deleteSong(username, id));
  });
});
