// getSongByList.js

var MusicList = require('../schemas/musiclist').MusicList;

var getSongByList = function(req, res, next) {
	MusicList.findById(req.params.id).populate('Musics').exec(function(err, result) {
		if (err) throw err;
		res.jsonp(result.Musics);
	})

}

module.exports = getSongByList;