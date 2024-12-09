const {createClient}=require('redis')
//note o createclient nai hunu pardo raixa yo function jasto vanae ra bhujam na
const dotenv=require("dotenv")

dotenv.config({path:"./.env"})



exports.connectRedis=async()=>{
    const redis=await createClient({url:process.env.REDIS_URL});
    try {
        await redis.connect();
        console.log("connected to Redis successfully");
    } catch (err) {
        console.error("Failed to connect to Redis:", err);
    }

    return redis;
}