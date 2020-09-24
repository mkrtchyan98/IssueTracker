import React,{ useState } from 'react';
import { Link,useParams,useHistory } from 'react-router-dom';
import {
  gql,
  useQuery,
  useMutation
} from "@apollo/client";
import Select from 'react-select'

const GET_ISSUE = gql`
 query issue($id: Int!) {
 	issue(id: $id) {
 		title
 		status
 		owner
 		effort
 		description
 		created
 		due
 		
 	}

 }`;
 const UPDATE_ISSUE = gql`
 mutation issueUpdate($id: Int!, $changes: IssueUpdateInputs!) { 
  issueUpdate(id: $id, changes: $changes) { 
     id 
     title
     status
     owner
     effort
     created
     due
     description
       }
   }`


const options = [
  { value: '', label: 'All' },
  { value: 'New', label: 'New' },
  { value: 'Assigned', label: 'Assigned' },
  { value: 'Fixed', label: 'Fixed' },
  { value: 'Closed', label: 'Closed' },

]

export default function IssueEdit() {
	  const { id } = useParams();
	  const history = useHistory();
      const [selectedOption, setSelectedOption] = useState({});
	  const [issue,setIssue] = useState({})
	  const { data,error,loading } =useQuery(GET_ISSUE,{
	  	variables:{
	  		id:Number(id)
	  	}
	  });
	  const [issueUpdate] = useMutation(UPDATE_ISSUE, {
	  	variables: {
	  		id:Number(id),
	  		changes:issue
	  	}
	  });
    
	function onChange(event) {
		const { name,value } = event.target;
		setIssue({
			status:selectedOption.value,
			[name]:value === Number(value) ? Number(value) : value
		})
}
		   const handleSubmit = e => {
	   	e.preventDefault();
	   	issueUpdate({
	   		variables: {
	  		id:Number(id),
	  		changes:issue
	  	 }
	   	})
	   	 history.push({
		  pathname: '/issues'
		   });
    	}

    		   
	  
 if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found {id}</p>;

	return (
<form onSubmit={handleSubmit}>
<h3>{`Editing issue: ${id}`}</h3>
<table>
<tbody>
<tr>
<td>Created:</td>
<td>{data.issue.created}</td>
</tr>
<tr>
<td>Status:</td>
<td>
  <Select options={options} defaultValue={selectedOption}  onChange={setSelectedOption} />
</td>
</tr>
<tr>
<td>Owner:</td>
<td><input name="owner"  onChange={onChange} placeholder={data.issue.owner} required />
</td>
</tr>
<tr>
<td>Effort:</td>
<td><input name="effort" type="numer" onChange={onChange} placeholder={data.issue.effort} />
</td>
</tr>
<tr>
<td>Title:</td>
<td>
<input size={50} name="title"  onChange={onChange} placeholder={data.issue.title} required />
</td>
</tr>
<tr>
<td>Description:</td>
<td>
<textarea rows={8} cols={50} name="description"  onChange={onChange} placeholder={data.issue.description} />
</td>
</tr>
<tr>
<td><button type="submit">Submit</button></td>
</tr>
</tbody>
</table>
<Link to={`/edit/${id - 1}`}>Prev</Link>
{' | '}
<Link  to={`/edit/${id + 1}`}>Next</Link>
</form>
	);
}