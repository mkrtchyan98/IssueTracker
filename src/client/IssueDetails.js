import React from 'react'
import { useParams } from 'react-router-dom'; 
import {
  gql,
  useQuery,
} from "@apollo/client";

const GET_ISSUE = gql`
 query issue($id: Int!) {
 	issue(id: $id) {
 		id 
 		description
 	}

 }`;

const IssueDetails = () => {
const  {id} = useParams();
const { data,error,loading } =useQuery(GET_ISSUE,{variables:{id:Number(id)}})
 if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
	return (
<div>
<h3>Description</h3>
<pre>{data.issue.description}</pre>
</div>
		)
}

export default IssueDetails