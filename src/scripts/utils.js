import Ingredient from "./ingredient";

const Utils = {
    convertMsToTime(ms) {
        let sec = Math.floor(ms / 1000);
        let min = Math.floor(sec / 60);
        sec = (sec) % 60;
        min = (min) % 60;

        return `${min}:${sec.toString().padStart(2, '0')}`;
    },

    distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      },

    isTouching(obj1, obj2){
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
    },

    //received as objects
    getSeq(item, heldItems){
        if(!heldItems || heldItems.length===0){
            return [item.name]
        }
        const seq = [item.name]
        const subSeq = []
        for(let i=0; i < heldItems.length; i++){
            const heldItem = heldItems[i]
            if (heldItem.constructor === Ingredient || (heldItem.heldItems && heldItem.heldItems.length === 0)){
                subSeq.push(heldItem.name)
            }else{
                subSeq.push(this.getSeq(heldItem, heldItem.heldItems))
            }
        }
        
        subSeq.sort()
        seq.push(subSeq)
        return this.convertArrToStr(seq)
    },

    convertArrToStr(arr){
        if (arr.length===0){return "";}
        
        let str = "["

        for(let i=0; i < arr.length; i++){
            const el = arr[i]
            if (el.constructor === Array){
                str+= this.convertArrToStr(el);
            }else{
                str+=el
            }
            
            if(i < arr.length-1){
                str+=","
            }
        }

        str+="]"

        return str
    }

    // isMatchSeq(seq1, seq2){
    //     //returns 
    //     if (seq1.length !==seq2.length){return false;}
    //     let isMatch = true

    //     while (seq1.length >0){
    //         let elSeq1 = seq1.shift()
    //         let elSeq2 = seq2.shift()

    //         if ()
    //         if (elSeq1 !== elSeq2){
    //             return false
    //         }
    //     }

    //     return isMatch
    // }

}

export default Utils