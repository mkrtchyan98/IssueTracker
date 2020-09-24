import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import URLSearchParams from 'url-search-params';
import {
  gql,
  useMutation
} from "@apollo/client";
import { GET_ISSUES } from './IssueList';
import Button from '@material-ui/core/Button';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CLOSE_ISSUE  = gql`
mutation issueClose($id: Int!) {
  issueUpdate(id: $id, changes: { status: Closed }) {
    id title status owner effort created due description
  }
}`;

const DELETE_ISSUE = gql `
mutation issueDelete( $id: Int!){
	issueDelete(id:$id) 
}`


const IssueRow = (({ issue,index }) => {
    const  location = useLocation();
    const searchParams = new URLSearchParams();
    const selectLocation = { pathname: `/issues/${issue.id}`, searchParams};	
    const [closeIssue] = useMutation(CLOSE_ISSUE);
    const [deleteIssue] = useMutation(DELETE_ISSUE);
      const issueClose = () => {
	   	closeIssue({
	   		variables: {
	  		id:Number(issue.id),
	  	 }
	   	})
	   	}
	   	const issueRemove = () => {
	   		deleteIssue({
	   			variables: {
	   				id:Number(issue.id)
	   			},
	   			refetchQueries: () => [{
    query: GET_ISSUES
  }],
	   		})	   	
	   	}

	return (
		<tr>
		<td>
			      <Button variant="outlined"  color="primary" >
				<Link to={selectLocation}>Select</Link>
				</Button>
		{' | '} 
		      <Button variant="contained"  color="primary" onClick={issueClose}>
			Close
			</Button>
					{' | '}
		     <Button variant="contained" color="secondary"  onClick={issueRemove}>
			delete
			</Button>
		{' | '}	
 <Button variant="outlined"  color="primary" >
 <Link to={`/edit/${issue.id}`}>Edit</Link>
</Button>
		</td>
		<td>{issue.status}</td>
		<td>{issue.owner}</td>
		<td>{issue.created}</td>
		<td>{issue.effort}</td>
		<td>{issue.due}</td>
		<td>{issue.title}</td>
		</tr>

		)
 });

export default IssueRow;