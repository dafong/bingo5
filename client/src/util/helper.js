var schems = {
	default: ['#fff','#222'],
	contract : ['#222','#bada55'],
	tracker: ['#222','#f79a30'],
	room  : ['#222','#f7f630'],
	player : ['#222','#30cdf7'],
	other: ['#222','#f74730'],
	warn: ['#222','#fb85de']

}

export default {
    st : Date.now(),
    debug: true,
    log: function(){
        if(!this.debug) return;
        var c,s;
        if(arguments.length > 1){
        	c= arguments[0]
        	s= arguments[1]
        }else{
        	s= arguments[0]
        }

        var cols = schems[c] || schems.default
        if (window.console){
            if(console.log){
                var t=Date.now()-this.st;
                console.log(`%c ${t} ${s}`,`background:${cols[0]} ; color: ${cols[1]};`);
            }
        }
    }
}
