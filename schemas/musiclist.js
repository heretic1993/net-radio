//musiclist.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MusicListSchema = new Schema({
	ListName: String,
	Description: String,
	CreateDate: {
		type: Date,
		default: Date.now
	},
	Musics: [{
		type: Schema.Types.ObjectId,
		ref: 'Music'
	}]
})

var MusicSchema = new Schema({
	Name: String,
	Author: String,
	Src: String,
	Img: String
})


exports.Music = mongoose.model('Music', MusicSchema);
exports.MusicList = mongoose.model('MusicList', MusicListSchema);