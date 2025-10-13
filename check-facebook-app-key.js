import 'dotenv/config';
import https from 'https';

const appId = process.env.INSTAGRAM_APP_ID;
const appSecret = process.env.INSTAGRAM_APP_SECRET;

if (!appId || !appSecret) {
  console.error('Error: FACEBOOK_APP_ID and FACEBOOK_APP_SECRET environment variables not set.');
  process.exit(1);
}

const getTokenOptions = {
  hostname: 'graph.facebook.com',
  path: `/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&grant_type=client_credentials`,
  method: 'GET'
};

const getTokenReq = https.request(getTokenOptions, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const accessToken = JSON.parse(data).access_token;
      console.log('Successfully obtained app access token.');
      checkApp(accessToken);
    } else {
      console.error(`Error getting access token: API returned status code ${res.statusCode}`);
      console.error('Response:', data);
    }
  });
});

getTokenReq.on('error', (error) => {
  console.error('Error making request to get access token:', error);
});

getTokenReq.end();

function checkApp(accessToken) {
  const options = {
    hostname: 'graph.facebook.com',
    path: `/v13.0/app?access_token=${accessToken}`,
    method: 'GET'
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('App key is valid.');
        console.log('App info:', JSON.parse(data));
      } else {
        console.error(`Error checking app: API returned status code ${res.statusCode}`);
        console.error('Response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error making request to check app:', error);
  });

  req.end();
}
