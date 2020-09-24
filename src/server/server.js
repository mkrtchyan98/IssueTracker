const { ApolloServer } = require('apollo-server-express');
const { connectToDb } = require('./db.js');
const express = require('express');
const fs = require('fs');
const GraphQLDate = require('./graphqlDate.js');
const about = require('./about.js');
const issue = require('./issue.js');
const  cors = require ('cors');

const resolvers = {
	Query: {
	about: about.getMessage,
	issueList: issue.getIssues,
	issue: issue.getIssue,
	count: issue.getCounts,
	issueCounts: issue.counts,
	},
	
	Mutation: {
     setAboutMessage: about.setMessage,
	 issueAdd:issue.issueAdd,
	 issueUpdate:issue.issueUpdate,
	 issueDelete: issue.issueDelete,
	 issueRestore: issue.restore,
	},
	GraphQLDate,
};






const server = new ApolloServer({
	typeDefs: fs.readFileSync('./src/server/schema.graphql', 'utf-8'),
	resolvers,
	formatError: error => {
		console.log(error);
		return error;
		  },

})

const app = express();
app.use('*', cors({ origin: 'http://localhost:3000' }));
(async function () {
	try {
		await connectToDb();
server.applyMiddleware({ app,path: '/graphql'})
app.listen(4000, () => {
	console.log('Started on port 4000')
});

} catch(err) {
	console.log('Error:', err)
}
})();
