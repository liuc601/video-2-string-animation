(function(context){
    function VideoToString(vedioId){

        if(!vedioId){return alert('无法找到播放的视频！')}

        this.vedio=document.getElementById(vedioId);
        this.canvas = document.createElement("canvas");
        this.showDiv = document.createElement("div");
        this.showDiv.setAttribute('id',"showDiv");
        this.canvas.style.display="none";
        this.canvasContext = this.canvas.getContext('2d');
        this.tiemr=null;

        
        this.vedio.addEventListener('play',this.play.bind(this), false);
        this.vedio.addEventListener('pause',this.pause.bind(this), false);
        
        document.body.appendChild(this.canvas);
        document.body.appendChild(this.showDiv);
    }
    
    VideoToString.prototype.play=function(){
        var width = parseFloat(getComputedStyle(this.vedio).width),
        height = parseFloat(getComputedStyle(this.vedio).height);

        this.canvas.width = width;
        this.canvas.height = height;
        this.showDiv.style.width = width + "px";
        this.showDiv.style.height = height + "px";
        this.tiemr = setInterval(()=>{
            this.canvasContext.drawImage(this.vedio, 0, 0, width, height);
            draw(this.canvasContext,this.showDiv,width, height);
            if (this.vedio.ended) {
                clearInterval(this.tiemr)
            }
        }, 20);
    }

    VideoToString.prototype.pause=function(){
        clearInterval(this.tiemr)
    }

    function draw(ctx,showDiv,width,height) {
        const imgdata = ctx.getImageData(0, 0, width, height);
        var imgDataArr = imgdata.data;
        var imgDataWidth = imgdata.width;
        var imgDataHeight = imgdata.height;
        var html = '';
        for (h = 0; h < imgDataHeight; h += 12) {
            var p = '<p>';
            for (w = 0; w < imgDataWidth; w += 6) {
                var index = (w + imgDataWidth * h) * 4;
                var r = imgDataArr[index + 0];
                var g = imgDataArr[index + 1];
                var b = imgDataArr[index + 2];
                var gray = getGray(r, g, b);
                p += toString(gray);
            }
            p += '</p>';
            html += p;
        }
        showDiv.innerHTML = html;
    }
    // 根据灰度生成相应字符
    function toString(g) {
        if (g <= 30) {
            return '8';
        } else if (g > 30 && g <= 60) {
            return '&';
        } else if (g > 60 && g <= 120) {
            return '$';
        } else if (g > 120 && g <= 150) {
            return '*';
        } else if (g > 150 && g <= 180) {
            return 'o';
        } else if (g > 180 && g <= 210) {
            return '!';
        } else if (g > 210 && g <= 240) {
            return ';';
        } else {
            return '.';
        }
    }

    // 根据rgb值计算灰度
    function getGray(r, g, b) {
        return 0.299 * r + 0.578 * g + 0.114 * b;
    }

    context.VideoToString= VideoToString;

})(window);

