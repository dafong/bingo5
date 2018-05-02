export default {

	 test : function(){
		return new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve(1);
			},3000);
		})
	},

	getCurrentBlock : async function(){
		var i = await this.test();
		console.log(i)

	}




}
