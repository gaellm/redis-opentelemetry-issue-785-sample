const redis = require("redis");
const client = redis.createClient({
	url: "redis://redis:6379"
  });

console.log("Hello from Node a little pause (10sec) for Redis and tracing preload !");
setTimeout(()=>{
 	
		client.on('error', (err) => console.log('Redis Client Error', err));
		let value = Math.floor(Math.random() * 100);

		console.log("Redis call without callback 'client.SET('key', value)': ");
		console.log("  *  Setting key to value: " + value + " in Redis");
		client.set('key', value);

	   

		value = Math.floor(Math.random() * 100);

		console.log("Redis call with empty callback function 'client.SET('key', value, ()=>{})' : ");
		console.log("  *  Setting key to value: " + value + " in Redis");
		client.set('key', value, ()=>{});

	 setTimeout(()=>{
	 	console.log("End: we should see 2 'set' spans.");
	 }, 15000);
 }, 10000);


