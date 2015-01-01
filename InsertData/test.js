//hotel.js
var mongoose = require('mongoose');

var MusicList = require('../schemas/musiclist').MusicList;

mongoose.connect('mongodb://localhost/netradio');

var musicList1 = new MusicList({

	ListName: "经典老歌",
	Description: "经典歌曲描述",
	Musics: [{
		Name: "大海",
		Author: "张雨生",
		Src: "http://music.baidu.com/mv/64205686/a.mp3"
	},
	{
		Name: "我不一样",
		Author: "HI SUHYUN/Bobby",
		Src: "http://music.baidu.com/mv/64205686/a.mp3"
	},
	{
		Name: "When You Believe",
		Author: "Whitney Houston/Mariah Carey",
		Src: "http://music.baidu.com/mv/64205686/a.mp3"
	},
	{
		Name: "I Will Always Love You",
		Author: "Whitney Houston",
		Src: "http://music.baidu.com/mv/64205686/a.mp3"
	}]
});

musicList1.save();


return 0;