const Utils = {
    convertMsToTime(ms) {
        let sec = Math.floor(ms / 1000);
        let min = Math.floor(sec / 60);
        sec = sec % 60;
        min = min % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    },

    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      },

    is_touching(obj1, obj2){
        if((((obj1.x > obj2.x && obj1.x < obj2.x+obj2.width/2)
            || (obj1.x + obj1.width > obj2.x && obj1.x + obj1.width < obj2.x+obj2.width/2))
            && ((obj1.y +obj1.height> obj2.y && obj1.y +obj1.height < obj2.y + obj2.height/2)
            || (obj1.y > obj2.y && obj1.y < obj2.y + obj2.height/2)))
            || (((obj2.x > obj1.x && obj2.x < obj1.x+obj1.width)
            || (obj2.x + obj2.width/2 > obj1.x && obj2.x + obj2.width/2 < obj1.x+obj1.width))
            && ((obj2.y +obj2.height/2> obj1.y && obj2.y +obj2.height/2 < obj1.y + obj1.height)
            || (obj2.y > obj1.y && obj2.y < obj1.y + obj1.height)))){
                // debugger
            return true
        }
        return false
    }

}

export default Utils