import React from 'react';
import URLSearchParams from 'url-search-params';
import {
  gql,
  useQuery
} from "@apollo/client";
import { useLocation} from 'react-router-dom';

const statuses = ['New', 'Assigned', 'Fixed', 'Closed'];

const headerColums = (
	statuses.map(status => (
		<th key={status}>{status}</th>
		))
		);

export default function IssueReport() {
    const  location = useLocation();
	const params = new URLSearchParams();
	const vars = { };
	if(params.get('status')) vars.status = params.get('status');
	const effortMin = parseInt(params.get('effortMin'),10);
	if(!Number.isNaN(effortMin)) vars.effortMin = effortMin;
	const effortMax = parseInt(params.get('effortMax)'),10);
	if(!Number.isNaN(effortMax)) vars.effortMax = effortMax;
	const COUNT = gql`
	query issueList (
	$status: StatusType
	$effortMin: Int
	$effortMax: Int
	) {
		issueCounts(
		status: $status
		effortMin: $effortMin
		effortMax: $effortMax
		) {
			owner New Assigned Fixed Closed
		}
	}
	`
	const { data, loading, error } = useQuery(COUNT,{
    variables:{
      effortMax:vars.effortMax,
      effortMin:vars.effortMin,
      status:vars.status
    },
  });

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
	return (
		<>
		<table>
		<thead>
		<tr>
		<th />
		{headerColums}
		</tr>
		</thead>
		<tbody>
		{data.issueCounts.map(counts => (
			<tr key={counts.owner}>
			 <td>{counts.owner}</td>
			 {statuses.map(status => (
			 	<td key={status}>{counts[status]}</td>
			 	))}
			 </tr>
			  )
			 )
			}
			</tbody>
			</table>
		</>
	);
}