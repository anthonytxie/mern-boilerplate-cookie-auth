require('./db/mongoose.js');
const app = require('./app');
const PORT = process.env.PORT || 1995;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
