const githubBase = 'https://github.com';
const clientId = 'Iv1.b3bf0c66e73e3de5';
const redirectUri = 'http://localhost:3000';

function githubAuthorize() {

  const redirect = githubBase + "/login/oauth/authorize?client_id=" + clientId + "&scope=repo&redirect_uri=" + redirectUri;

  location.href = redirect;
}

function githubCallback() {

  const code = location.search.split('code=')[1];

  const url = githubBase + "/login/oauth/access_token";

  axios.post(url, {
    client_id: clientId,
    client_secret: '7721b7c5a5e58da663e7a9b002420707a28e3089',
    code: code,
    redirect_uri: redirectUri
  }, {
    headers: {
      'Accept': 'application/json',
    }
  }).then(function (response) {
    console.log(response);
  }
  ).catch(function (error) {
    console.log(error);
    alert(error);
  }
  );
}

githubCallback();