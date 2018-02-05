

window.onload=function(){
	var status,hidden,hidden_in; // hidden 0show  1hidden
	var song;
	var index;
	var noteList=["note_pink","note_white","note_blue","note_yellow"];
	var songList=[];
	var nameList=[];
	var diffX;
	var silder_button;
	var silder_pass;
	var silder_status=0;
	var time;
	var interval;
	function initAudio(){
		/*变量初始化*/
		status=0;
		index=0;
		hidden=0;
		hidden_in=1;
		/*歌曲初始化*/

		var musicList=document.getElementsByClassName("music_list");
		for (var i = 0; i < musicList.length; i++) {
			songList[i]=musicList[i].getAttribute("musicSrc");
			nameList[i]=musicList[i].getAttribute("musicName");
		}
		/**
			dom初始化
		**/
		silder_button=document.getElementById("silder_button");
		silder_pass=document.getElementById("silder_pass");
		time=document.getElementById("time");




		song = new Audio();
		change_music(index);
		song.volume=0.3;
		silder_hide();
		//console.log(silder_button.style.left);
		//console.log(nameList);
		//console.log(song.played);
		silder_button.onmousedown=function(e){
			silder_status=1;
			var e = e || window.event; //兼容ie浏览器  
	        diffX = e.clientX - silder_button.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离  
			song_stop();
		}

		window.onmousemove=function(e){
			if(silder_status==1){
				var e = e || window.event; //兼容ie浏览器  
	            var left=e.clientX-diffX;  
	            //var top=e.clientY-diffY;  
	  
	            //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条  
	            if(left<-10){  
	                left=-10;  
	            }else  if(left >490){  
	                left =490;  
	            }  
	            silder_pass.style.width=left+10+ 'px'; 
	            //移动时重新得到物体的距离，解决拖动时出现晃动的现象  
	            silder_button.style.left = left+ 'px';  
	           // silder_button.style.top = top + 'px';  
			}
		}

		silder_button.onmousemove=function(e){
			if(silder_status==1){
				var e = e || window.event; //兼容ie浏览器  
	            var left=e.clientX-diffX;  
	            //var top=e.clientY-diffY;  
	  
	            //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条  
	            if(left<0){  
	                left=0;  
	            }else  if(left >490){  
	                left =490;  
	            }  
	            silder_pass.style.width=left+10+ 'px'; 
	            //移动时重新得到物体的距离，解决拖动时出现晃动的现象  
	            silder_button.style.left = left+ 'px';  
	           // silder_button.style.top = top + 'px';  
			}
		}

		window.onmouseup=function(e){
			if(silder_status==1){
				silder_status=0;
				song.currentTime=(parseInt(silder_pass.style.width)/500)*song.duration;	
				silder_change();	
				song_paly();		
			}

		}
	}

	function silder_change(){
			time.innerHTML=secondToDate(parseInt(song.currentTime));
			silder_pass.style.width=(song.currentTime/song.duration)*500+"px";
			silder_button.style.left=(song.currentTime/song.duration)*500-5+"px"
	}

   	function secondToDate(result) {
            var h = Math.floor(result / 3600);
            
            var m = Math.floor((result / 60 % 60));
            var s = Math.floor((result % 60));
            return result = timeToTwo(h) + ":" + timeToTwo(m) + ":" + timeToTwo(s) ;
    }

    function timeToTwo(h){
    	return h=h<10?"0"+h:h;
    }
    /**
		生成音符
    **/
    function output_note(){
    	var silder_bg=document.getElementsByClassName("time_siler_bg");
    	var oDiv = document.createElement('i');
    	oDiv.classList.add("sprites");
    	oDiv.classList.add("note");
    	var number=parseInt(Math.random()*4);
    	oDiv.classList.add(noteList[number]);
    	oDiv.style.left=parseInt(silder_button.style.left)-Math.random()*30+"px";
    	oDiv.style.top="-"+(Math.random()*30+10)+"px";
    	silder_bg[0].appendChild(oDiv);
    	setTimeout(function(){
    		silder_bg[0].removeChild(oDiv);
    	},1000);
    }

	/**
		修改状态
		更改图标
	**/	

    function song_paly(){
    	document.getElementById("button_play").style.backgroundImage="url(images/stop.png)";
		song.play();
		interval = setInterval(function(){
				silder_change();
				output_note();
				if(song.ended){
					document.getElementById("button_next").click();
				}
		}, 500);
    }

    function song_stop(){
    	document.getElementById("button_play").style.backgroundImage="url(images/play.png)";
		song.pause();
		clearInterval(interval);
    }

	document.getElementById("button_play").onclick=function(){

		if(status==1){
			song_paly();
			status=0;

		}else{
			song_stop();
			status=1;	

		}
	};

	function change_music(index){
		song.src=songList[index];
		document.getElementById("musicCurrentName").innerHTML=nameList[index];
		song_stop();
		song_paly();
	}

	function silder_hide(){

		setTimeout(function(){
			if(hidden_in==1){
				document.getElementById("bottom_music").style.transform="translate(0px,60px)";
				hidden=1;
				document.getElementById("silder").style.transform="translate(0px,-40px)";		
			}
		},2000);	
		
	}

	function silder_show(){
		var oDom=document.getElementById("bottom_music").style.transform;
		//alert(oDom.length);
		if(oDom.length>0){
			document.getElementById("bottom_music").style.transform="";
			hidden=0;
			document.getElementById("silder").style.transform="";	
		}
		
	}
	/**
		1.判断
		2.切歌
	**/
	document.getElementById("button_pre").onclick=function (){
		if (index==0) {

			index=songList.length-1;
			change_music(index);
			

		}else{

			index--;	
			change_music(index);
		
		}
	};

	document.getElementById("button_next").onclick=function (){
		if (index==songList.length-1) {

			index=0;
			change_music(index);
			

		}else{

			index++;	
			change_music(index);
		
		}
	};

	document.getElementById("bottom_music").onmouseout=function(e){
		hidden_in=1;
		if(hidden==0){
			silder_hide();
		}

	}
	document.getElementById("bottom_music").onmouseover=function(e){
		hidden_in=0;
		if(hidden==1){
			silder_show();
		}
	}

	document.getElementById("volume_silder_bg").onclick=function(e){
			var e = e || window.event; //兼容ie浏览器  
	       // diffX = e.clientX - this.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离  
			var width=e.clientX-document.getElementsByClassName("volume_silder")[0].offsetLeft;
			document.getElementById("volume_pass").style.width=width+"px";
			song.volume=width/100;
	}
	initAudio();



}
