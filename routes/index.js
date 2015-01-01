var express = require('express');
var router = express.Router();
var getSongList = require('../API/getSongList');
var getSongByList = require('../API/getSongByList');
var addSong = require('../API/addSong');
var musicList = require('../schemas/musiclist').MusicList;
var Music = require('../schemas/musiclist').Music;


/* GET home page. */
router.get('/', function(req, res) {
	musicList.find({},function(err, musiclist) {
		if (err) throw err;
		res.render('index', {
			title: 'Windows UWA 网络电台',
			listItem: musiclist
		});
	})

});

router.get('/getSongList', getSongList);

router.get('/getSongByList/:id', getSongByList);


router.get('/addSongList', function(req, res) {
	res.render('addSongList');
});

router.get('/songList/:id', function(req, res) {
	musicList.findById(req.params.id).populate("Musics").exec(function(err, list) {
		if (err) throw err;
		console.log(list);
		res.render('songList', {
			SongList: list
		})
	})
});

router.get('/addSong/:id', function(req, res) {
	res.render('addSong', {
		songList: req.params.id
	})
});

router.post('/addSong/:id', addSong);


router.post('/addSongList', function(req, res) {
	var newlist = musicList({
		ListName: req.body.listname,
		Description: req.body.intro
	})
	newlist.save(function(err) {
		if (err) throw err;
		res.redirect('/');
	})
})


module.exports = router;