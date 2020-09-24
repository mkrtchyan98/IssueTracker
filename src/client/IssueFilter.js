import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Select from 'react-select'
import URLSearchParams from 'url-search-params';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		 '& .MuiButtonBase-root':{
    	background:'green',
    	margin:'10px 0px 0px 4px',
      } 
	}

});


const options = [
  { value: '', label: 'All' },
  { value: 'New', label: 'New' },
  { value: 'Assigned', label: 'Assigned' },
  { value: 'Fixed', label: 'Fixed' },
  { value: 'Closed', label: 'Closed' },

]

  const  IssueFilter = () => {
		let history = useHistory();
		const [effortMin,setEffortMin] = useState(0);
  		const [effortMax,setEffortMax] = useState(100);
        const [selectedOption, setSelectedOption] = useState(null);
        const classes = useStyles();
	    function applyFilter() {
		 const params = new URLSearchParams();
		 if (selectedOption) params.set('status', selectedOption.value);
		 if (effortMin) params.set('effortMin', effortMin);
		 if (effortMax) params.set('effortMax', effortMax);
		 const search = params.toString() ? `?${params.toString()}` : "";
		 history.push({
		  pathname: '/issues', search
		   });
    	}
		return (
			<div className={classes.root}>
			Status
			{' '}
  <Select options={options} defaultValue={selectedOption}  onChange={setSelectedOption} />
  <hr />
 
  <TextField
          id="standard-number"
          label="Effort"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEffortMin(e.target.value)}
        />
        <TextField
          id="standard-number"
          label="between"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
onChange={(e) => setEffortMax(e.target.value)}
        />

  		     <Button variant="contained" color="secondary"  onClick={applyFilter}>
              Apply
              	</Button>

			</div>
			);
	}

export default IssueFilter;