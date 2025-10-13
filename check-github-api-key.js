const https = require('https');

const apiKey = process.env.GITHUB_API_KEY;

if (!apiKey) {
  console.error('Error: GITHUB_API_KEY environment variable not set.');
  process.exit(1);
}

const options = {
  hostname: 'api.github.com',
  path: '/user',
  method: 'GET',
  headers: {
    'User-Agent': 'Node.js',
    'Authorization': `token ${apiKey}`
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('API key is valid.');
      console.log('User profile:', JSON.parse(data));
    } else {
      console.error(`Error: API returned status code ${res.statusCode}`);
      console.error('Response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error making request:', error);
});

req.end();
