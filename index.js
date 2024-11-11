const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
   console.log(`Moderator called: ${req.body.type}`);
   const  {type, data} = req.body;

   if(type === 'CommentCreated'){
      const status = data.content.includes('oranges') ? 'rejected' : 'approved'; //Replace oranges with any word you want to remove in comment.

      try {
         await axios.post('http://event-bus-srv:4005/events',{
            type: 'CommentModerated',
            data : {
               id : data.id,
               content: data.content,
               status,
               postId : data.postId
            }
         })   
      } catch (error) {
         console.log("Error detected in moderation",error)
      }

   }

   res.send({});
});

const port = 4003;
app.listen(port, () => {
   console.log(`Listening to port: ${port}`);
});
