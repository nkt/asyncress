import express from '..';

const app = express();

const db = {
  getUsers() {
    if (Math.round(Math.random() * 100) % 2 === 0) {
      return Promise.resolve([
        {
          username: 'nkt'
        }
      ]);
    }

    return Promise.reject(new Error('=('));
  }
};

app.get('/users', async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
});

app.use((err, req, res, next) => {
  res.json({
    error: {
      code: err.code,
      message: err.message
    }
  });
});

app.listen(3000, () => {
  console.log('server started on localhost:3000');
});
