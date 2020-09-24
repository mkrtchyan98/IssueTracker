//generate data
db = client.db();
db.collection('issues').deleteMany({});
db.collection('deleted_issues').deleteMany({});
db.collection('counters').deleteMany({});

const owners = ['Ravan', 'Eddie', 'Pieta', 'Parvati', 'Victor'];
const statuses = ['New', 'Assigned', 'Fixed', 'Closed'];

const initialCount = db.collection('issues').count();

for (let i = 0; i < 100; i += 1) {
  const randomCreatedDate = (new Date())
    - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
  const created = new Date(randomCreatedDate);
  const randomDueDate = (new Date())
    - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
  const due = new Date(randomDueDate);

  const owner = owners[Math.floor(Math.random() * 5)];
  const status = statuses[Math.floor(Math.random() * 4)];
  const effort = Math.ceil(Math.random() * 20);
  const title = `Lorem ipsum dolor sit amet, ${i}`;
  const id = initialCount + i + 1;

  const issue = {
    id, title, created, due, owner, status, effort,
  };

  db.collection('issues').insertOne(issue);
}

const count = db.issues.count();
db.collection('counters').update({ _id: 'issues' }, { $set: { current: count } });

db.collection('issues').createIndex({ id: 1 }, { unique: true });
db.collection('issues').createIndex({ status: 1 });
db.collection('issues').createIndex({ owner: 1 });
db.collection('issues').createIndex({ created: 1 });
db.collection('deleted_issues').createIndex({ id: 1 }, { unique: true });
