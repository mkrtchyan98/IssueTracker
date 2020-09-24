import React, { useState } from 'react'
import {
  gql,
  useMutation
} from "@apollo/client";
import { GET_ISSUES } from './IssueList';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

 const ADD_ISSUE = gql`
 mutation issueAdd($issue: IssueInputs!) {
 	 	issueAdd(issue: $issue)
 	 	 {
 	 	 	id
 	 	 }
 	 	}
 	`;


export default function IssueAdd({onLoadMore}) {
    
	   const [issue, setIssue] = useState({});
	   const [issueAdd] = useMutation(ADD_ISSUE);

	   const handleChange = (e) => {
    setIssue({
      ...issue,
      [e.target.name]: e.target.value,
    });
  };

	   const handleSubmit = e => {
	   	e.preventDefault();
	   	issueAdd({
	   		variables: {
	   		issue:{...issue}
	   		},
refetchQueries: () => [{
    query: GET_ISSUES
  }],	   	})
	   }

	    return (
<form name="issueAdd" onSubmit={handleSubmit} >
  <TextField required id="standard-required" label="Required" defaultValue="Owner" value={issue.owner} onChange={handleChange} />
  <TextField required id="standard-required" label="Required" defaultValue="Title" value={issue.title} onChange={handleChange} />
	
  		     <Button variant="contained" color="secondary" type="submit" >
				Add
			</Button>
	     	<Button
      onClick={onLoadMore}
      >
      Load More
    </Button>
</form>		    
 );
 		  }
