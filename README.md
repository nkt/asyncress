Asyncress
=========

Express with async/await tweaks.

Usage
-----

```js
import express from 'asyncress';

const app = express();

app.get('/users', async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
});
```

Lisense
-------
MIT
