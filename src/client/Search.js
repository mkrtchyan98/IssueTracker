import React, { useState, Component } from 'react';
import {
  useLazyQuery,
  gql
} from '@apollo/client';
import { withApollo } from '@apollo/react-hoc';


const SEARCH_ITEM = gql `
query issueList($search: String) {
  issueList(search: $search) {
    issues {
      id title
    }
  }   
   }`


class Search extends Component {

  state = {
    issues: [],
    search: ''
  }

  render() {
    return (
      <div>
        <div>
          <input
            type='text'
            onChange={e => this.setState({ search: e.target.value })}
          />
          <button onClick={() => this._executeSearch()}> Search </button>
        </div>
        {this.state.issues.map((issue, index) => (
         <h1> label: issue.id: issue.title </h1>
        ))}
      </div>
    )
  }
  _executeSearch = async () => {
  const { search } = this.state
  const result = await this.props.client.query({
    query: SEARCH_ITEM,
    variables: { search },
  })
  const issues = result.data.issueList.issues
  this.setState({ issues })
}
}
export default withApollo(Search)