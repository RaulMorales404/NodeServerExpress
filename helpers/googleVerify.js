
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

 GoogleVerify
 async function  GoogleVerify(token) {

  const  CLIENT_ID = process.env.GOOLGE_CLIENT_ID;
 
  console.log()
  const ticket = await client.verifyIdToken({
      idToken:token.id_token,
      audience: CLIENT_ID,  
  });
  
  const {name,picture,email} =  ticket.getPayload();
  return { name,img:picture,email} 

}

module.exports = {
  GoogleVerify,
};
