const faunadb = require('faunadb');

const q = faunadb.query;
const { FAUNADB_SECRET: secret } = process.env;
const client = new faunadb.Client({ secret });

module.exports = async (req, res) => {
  try {
    let collections = [];

    await client
      .paginate(q.Collections())
      .map(ref => q.Get(ref))
      .each(page => {
        collections = collections.concat(page);
      });

    res.json(collections);
  } catch (error) {
    res.status(500).json({ error });
  }
};
