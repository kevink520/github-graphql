const fetch = require('node-fetch');
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/data', async (req, res) => {
  const query = `{
    search(query: "stars:>50000", type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }`;
  
  const url = 'https://api.github.com/graphql';
  const options = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${process.env.APIKEY}`,
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server ready'));
