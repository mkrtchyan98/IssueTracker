const { MongoClient } = require('mongodb');

async  function connectToDb() {
const  uri = process.env.MONGO_CLIENT;
const client = new MongoClient(uri,{ useUnifiedTopology: true });
await client.connect();
db = client.db();
db.collection('issues').deleteMany({});
db.collection('deleted_issues').deleteMany({});

const issuesDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2019-01-15'),
    due: undefined,
    title: 'Error in console when clicking Add',
    description: 'Steps to recreate the problem:'
      + '\n1. Refresh the browser.'
      + '\n2. Select "New" in the filter'
      + '\n3. Refresh the browser again. Note the warning in the console:'
      + '\n   Warning: Hash history cannot PUSH the same path; a new entry'
      + '\n   will not be added to the history stack'
      + '\n4. Click on Add.'
      + '\n5. There is an error in console, and add doesn\'t work.',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2019-01-16'),
    due: new Date('2019-02-01'),
    title: 'Missing bottom border on panel',
    description: 'There needs to be a border in the bottom in the panel'
      + ' that appears when clicking on Add',
  },
];

db.collection('issues').insertMany(issuesDB);
const count = db.collection('issues').countDocuments();

db.collection('counters').deleteOne({ _id: 'issues' });
db.collection('counters').insertOne({ _id: 'issues', current: count });

db.collection('issues').createIndex({ id: 1 }, { unique: true });
db.collection('issues').createIndex({ status: 1 });
db.collection('issues').createIndex({ owner: 1 });
db.collection('issues').createIndex({ created: 1 });
db.collection('issues').createIndex({ title: 'text', description: 'text' });

db.collection('deleted_issues').createIndex({ id: 1 }, { unique: true });
}
async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1} },
    { returnOriginal: false },
  );
  return result.value.current;
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };