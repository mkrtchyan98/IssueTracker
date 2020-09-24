import React from 'react'
import IssueRow from './IssueRow'


export default function IssueTable({issues})  {
	 const issueRows = issues.map((issue,index) =>
	 	<IssueRow 
	 	key={issue.id} 
	 	issue={issue} 
	 	index={index}
	 	/>
	 	);
	     return (
	     	<>
	     	<table className="bordered-table">
	     	<thead>
	     	<tr>
	     	<th>Action</th>
	     	<th>Status</th>
	     	<th>Owner</th>
	     	<th>Created</th>
	     	<th>Effort</th>
	     	<th>Due Date</th>
	     	<th>Title</th>
	     	</tr>
	     	</thead>
	     	<tbody>{ issueRows }</tbody>
	     	</table> 
	     	   </>
	     	    ); 
	     	   }
	     	