//getSongList.js

var MusicList = require('../schemas/musiclist').MusicList;
var Music = require('../schemas/musiclist').Music;

var getSongList = function(req, res, next) {
	// MusicList.find({}, function(err, result) {
	// 	if (err) throw err;
	// 	res.jsonp(result);
	// })

	MusicList.find({}).populate("Musics").exec(function(err, result) {
		if (err) throw err;
		res.jsonp(result);
	})

}

module.exports = getSongList;