export function fomatDateFn(date){
    var time = date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8);
    return time;
} 