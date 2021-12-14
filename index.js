console.log("Hello from Node a little pause (10sec) for Redis and tracing preload !");
setTimeout(()=>{
 	
 	const redisPromise = require('./setupRedis').redis;

	(async () => {

	      let client = await redisPromise;
	      let value = Math.floor(Math.random() * 100);

	      console.log("Redis call without callback 'client.SET('key', value)': ");
	      console.log("  *  Setting key to value: " + value + " in Redis");
	      await client.SET('key', value);

	   

	      value = Math.floor(Math.random() * 100);

	      console.log("Redis call with empty callback function 'client.SET('key', value, ()=>{})' : ");
	      console.log("  *  Setting key to value: " + value + " in Redis");
	      await client.SET('key', value, ()=>{});

	      
	})();

	 setTimeout(()=>{
	 	console.log("End: we should see 2 'set' spans.");
	 }, 15000);


 }, 10000);


