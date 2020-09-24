import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import IssueList from './IssueList.js';
import IssueReport from './IssueReporter.js';
import IssueEdit from './IssueEdit.js';
const NotFound = () => <h1>Page Not Found</h1>;
export default function Contents() {
  return ( 
  <Switch>
  <Redirect exact from="/" to="/issues" />
  <Route path="/issues" component={IssueList} />
  <Route path="/report" component={IssueReport} />
  <Route path="/edit/:id" component={IssueEdit} />
  <Route component={NotFound} />
      </Switch> 
       );
   }