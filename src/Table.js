import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Form from './logic.js'

class Table extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      data:[{
        name: 'Grant Thompson',
        age: '18',
        grad: '2023',
        major: 'Mechanical Engineering'
      }, {
        name: 'Mark Kang',
        age: '20',
        grad: '2021',
        major: 'Economics; Computer Science'
      }, {
        name: 'Karthik Ramachandran',
        age: '19',
        grad: '2022',
        major: 'Electrical & Computer Engineering; Computer Science'
      }, {
        name: 'Aidan McCurry',
        age: '18',
        grad: '2023',
        major: 'Engineering Undecided'
      }, {
        name: 'Ethan Cheung',
        age: '20',
        grad: '2021',
        major: 'Mechanical Engineering'
      }, {
        name: 'Andres Montoya',
        age: '19',
        grad: '2022',
        major: 'Computer Science'
      }, {
        name: 'Eric Carlson',
        age: '19',
        grad: '2022',
        major: 'Computer Science; Mathematics'
      }, {
        name: 'Joshua Kang',
        age: '18',
        grad: '2023',
        major: 'Mechanical Engineering'
      }, {
        name: 'Luke Jewitt',
        age: '18',
        grad: '2023',
        major: 'Biomedical Engineering'
      }, {
        name: 'Jonah Sinclair',
        age: '20',
        grad: '2021',
        major: 'Neuroscience'
      }, {
        name: 'Alex Yu',
        age: '21',
        grad: '2020',
        major: 'Economics'
      }, {
        name: 'Juan Bermudez',
        age: '21',
        grad: '2020',
        major: 'Computer Science'
      }, {
        name: 'Andrew Gao',
        age: '18',
        grad: '2023',
        major: 'Electrical & Computer Engineering'
      }],
      name: '',
      age: '',
      grad: '',
      major: '',
      filtered: [],
      filterAll: '',
      header: '',
    }

    this.nameChange = this.nameChange.bind(this)
    this.ageChange = this.ageChange.bind(this)
    this.gradChange = this.gradChange.bind(this)
    this.majorChange = this.majorChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  nameChange(event) {
    this.setState({name: event.target.value})
  }

  ageChange(event) {
    this.setState({age: event.target.value})
  }

  gradChange(event) {
    this.setState({grad: event.target.value})
  }

  majorChange(event) {
    this.setState({major: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault();
    var tempList = this.state.data;
    tempList.push({
      name: this.state.name,
      age: this.state.age,
      grad: this.state.grad,
      major: this.state.major,
    })
    this.setState({data: tempList})
    event.target.reset()
    this.setState({name: ''})
    this.setState({age: ''})
    this.setState({grad: ''})
    this.setState({major: ''})
  }

  onFilteredChange(filtered) {
  if (filtered.length > 1 && this.state.filterAll.length) {
    const filterAll = '';
    this.setState({ filtered: filtered.filter((item) => item.id != 'all'), filterAll })
  }
  else
    this.setState({ filtered });
}

  render(){
    const { data } = this.state;

    const columns = [{
      Header: 'Name',
      accessor: 'name',
      sort: 'asc',
      filterMethod: (filter, row) => {
                    return row[filter.id].includes(filter.value);
                  }
    }, {
      Header: 'Age',
      accessor: 'age',
      Cell: props => <span className='number'>{props.value}</span>,
      filterMethod: (filter, row) => {
                    return row[filter.id].includes(filter.value);
                  }
    }, {
      Header: 'Graduation Year',
      accessor: 'grad',
      Cell: props => <span className='number'>{props.value}</span>,
      filterMethod: (filter, row) => {
                    return row[filter.id].includes(filter.value);
                  }
    }, {
      Header: 'Major',
      accessor: 'major',
      sort: 'asc',
      filterMethod: (filter, row) => {
                    return row[filter.id].includes(filter.value);
                  }
    }, {
      Header: "",
      id:'delete',
      accessor: str => "delete",
      sortable: 0,

      Cell: (row)=> (
        <span style={{cursor:'pointer',color:'red'}}
          onClick={() => {
              let data = this.state.data;
              console.log(this.state.data[row.index]);
              data.splice(row.index, 1)
              this.setState({data})
            }}>
              Delete
            </span>
      )
      }]

    return (
      <div>
        <ReactTable
          data={this.state.data}
          columns={columns}
          defaultPageSize={5}
          minRows={5}
          className="-striped -highlight"
          searching={true}

          filtered={this.state.filtered}
          ref={r => this.reactTable = r}
          onFilteredChange={this.onFilteredChange.bind(this)}

          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}

          getTrProps={(state,rowInfo)=>{
            return {}
          }}
        />
        <form onSubmit={this.handleSubmit} id='create-form'>
          <div className='formLine'>
            <label className='itemLabel'>
              Name:
              <input
              type='text'
              onChange={this.nameChange} />
            </label>
            <label className='itemLabel'>
              Age:
              <input
              type='text'
              onChange={this.ageChange} />
            </label>
          </div>
          <div className='formLine'>
            <label className='itemLabel'>
              Graduation Year:
              <input
              type='text'
              onChange={this.gradChange} />
            </label>
            <label className='itemLabel'>
              Major:
              <input
              type='text'
              onChange={this.majorChange} />
            </label>
          </div>
          <div className='button'>
            <input type='submit' value='Add Row' className='submitButton'/>
          </div>
        </form>
      </div>
    )
  }
}

export default Table
