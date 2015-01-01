// addSong.js
var MusicList = require('../schemas/musiclist').MusicList;
var Music = require('../schemas/musiclist').Music;
var fs = require('fs');
var path = require('path');
var multiparty = require('multiparty');
var util = require('util');

var addSong = function(req, res, next) {
	var count = 0;
	MusicList.findById(req.params.id, function(err, list) {
		if (err) throw err;
		var form = new multiparty.Form();
		var name;
		var author;
		var songURI;
		var imageURI;
		form.on('error', next);
		form.on('close', function() {
			console.log("success");
		});
		form.on('field', function(name, val) {
			if (name == "name") {
				name = val;
			} else if (name == "author") {
				author = val;
			} else {
				return;
			}
		});

		form.on('part', function(part) {
			if (!part.filename) return;
			if (part.name == 'image') {
				image = {};
				image.filename = part.filename;
				image.size = 0;
				part.on('data', function(buf) {
					image.size += buf.length;
				});
			} else if (part.name == 'song') {
				song = {};
				song.filename = part.filename;
				song.size = 0;
				part.on('data', function(buf) {
					image.size += buf.length;
				});
			} else {
				return part.resume();
			}
		});

		form.on('file', function(name, file) {

			var is = fs.createReadStream(file.path);
			if (file.fieldName == 'song') {
				var os = fs.createWriteStream(path.join(__dirname, "../public/musics/", file.originalFilename));
				util.pump(is, os, function() {
					fs.unlinkSync(file.path);
					songURI = "./musics/" + file.originalFilename;
					console.log("success1");
					count++;
					if (count == 2) {
						console.log("success3");
						console.log("message" + imageURI);
						var newMusic = new Music({
							Name: name,
							Author: author,
							Src: songURI,
							Img: imageURI
						});
						newMusic.save();
						list.Musics.push(newMusic);
						list.save(function() {
							res.redirect("/songList/" + req.params.id);
						})
					}

				});
			} else if (file.fieldName == 'image') {
				var os = fs.createWriteStream(path.join(__dirname, "../public/images/", file.originalFilename));
				util.pump(is, os, function() {
					fs.unlinkSync(file.path);
					imageURI = "./images/" + file.originalFilename;
					console.log("success2");
					count++;
					if (count == 2) {
						console.log("success3");
						console.log("message" + imageURI);
						var newMusic = new Music({
							Name: name,
							Author: author,
							Src: songURI,
							Img: imageURI
						});
						newMusic.save();
						list.Musics.push(newMusic);
						list.save(function() {
							res.redirect("/songList/" + req.params.id);
						})
					}
				})
			}

		})

		form.parse(req);

	})

}


module.exports = addSong;