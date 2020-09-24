import React,{ useEffect,useState }  from 'react';
import {
  gql,
  useQuery,
} from "@apollo/client";
import { useRouteMatch,useLocation,Route,NavLink,Link,useParams } from 'react-router-dom';
import URLSearchParams from 'url-search-params';
import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';
import IssueDetails from './IssueDetails';
import { Panel, Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import Search from './Search'
export const GET_ISSUES = gql`
query issueList(
$status: StatusType
$effortMin: Int
$effortMax: Int
$page: Int
) {
  issueList (
  status: $status
  effortMin: $effortMin
  effortMax: $effortMax
  page: $page
  ) {
   issues{
    id 
    title
     status
      owner
      created
       effort
        due
      }

    }
    }`;
 const SECTION_SIZE = 5;
 function PageLink({
  params,
  page,
  activePage,
  children,
 }) {
  params.set('page',page);
  if(page === 0) return React.cloneElement(children, {disabled: true });
  return (
    <LinkContainer isActive={() => page === activePage}
    to={{ search: `?${params.toString()}` }}
    >
          {children}
          </LinkContainer>
    )

 }

export default function IssueList()   {
  const  location = useLocation();
  const match = useRouteMatch();
  const searchParams = new URLSearchParams(location.search);
  let page = parseInt(searchParams.get('page'), 10);
  if (Number.isNaN(page)) page = 3;
  
  const [status,setStatus] = useState(searchParams.get('status'));
  const effortMin = parseInt(searchParams.get('effortMin'), 10);
  const effortMax = parseInt(searchParams.get('effortMax'), 10);
 
  const { data, loading, error,fetchMore } = useQuery(GET_ISSUES,{
    variables:{
      status:status,
      effortMax:effortMax,
      effortMin:effortMin,
      page:page
    },
  });
  const startPage = Math.floor((page - 1) / SECTION_SIZE) * SECTION_SIZE + 1;
  const endPage = startPage + SECTION_SIZE - 1;
const prevSection = startPage === 1 ? 0 : startPage - SECTION_SIZE;
const nextSection = endPage >= 10 ? 0 : startPage + SECTION_SIZE;
  const items = [];
for (let i = startPage; i <= Math.min(endPage, 10); i += 1) {
  searchParams.set('page', i);
  items.push((
  <PageLink key={i} params={searchParams} activePage={page} page={i}>
  <Pagination.Item>
      {i}
      </Pagination.Item>
  </PageLink>
  ));
}

     useEffect(() => {
       let isCancelled =false;
       setStatus(searchParams.get('status'));

                return () => {
      isCancelled = true;
    }
     },[searchParams]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  return (
  	<React.Fragment>
  	<h1>Issue Tracker</h1>
    <IssueFilter />
  	<hr />
    <Pagination>
    <PageLink params={searchParams} page={prevSection}>
    <Pagination.Item>{'<'}</Pagination.Item>
    </PageLink>
    {items}
    <PageLink params={searchParams} page={nextSection}>
    <Pagination.Item>{'>'}</Pagination.Item>
    </PageLink>
    </Pagination>
  	<IssueTable issues={data.issueList.issues} />
  	<hr />
    <IssueAdd />
    <Search />
    <Route path={`${match.url}/:id`} component={IssueDetails} />
  	</React.Fragment>   
  	 );
  	
  }