import React ,{useState,useEffect}from 'react';
import './index.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

 

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    FirstName: '',
    LastName: '',
    DOB:'',
    Study:'',
    StartDate:'',
    EndDate:'',
    CurrentSalary:'',
    Description:'',
  });
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    // Fetch employees when the component mounts
    fetchEmployees();  
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://sweede.app/DeliveryBoy/Get-Employee/');
      setEmployees(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const addEmployee = async () => {
    try {
      await axios.post('https://sweede.app/DeliveryBoy/Add-Employee/', newEmployee);
      // After successfully adding, clear the form and fetch the updated employee list
      setNewEmployee({
        FirstName: '',
        LastName: '',
        DOB:'',
        Study:'',
        StartDate:'',
        EndDate:'',
        CurrentSalary:'',
        Description:'',
      });
      fetchEmployees();
    } catch (error) {
      // Handle error
    }
  };

  const updateEmployee = async () => {
    try {
      await axios.put(`https://sweede.app/DeliveryBoy/update-Employee/${editingEmployee.id}`, editingEmployee);
      // After successfully updating, clear the edit mode and fetch the updated employee list
      setEditingEmployee(null);
      fetchEmployees();
    } catch (error) {
      // Handle error
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`https://sweede.app/DeliveryBoy/delete-Employee/${id}`);
      // After successfully deleting, fetch the updated employee list
      fetchEmployees();
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="employee-management-container">
      <h1 className="main-heading">Employee Registration Form</h1>
      
       
      <nav>
        <ul>
          <li>
            <Link to="/employee-dropdown">Employee Dropdown</Link>
          </li>
          <li>
            <Link to="/date-picker">Date Picker</Link>
          </li>
        </ul>
      </nav>


      {/* Add Employee Form */}
      <div className="section">
        
        <div className='grid-container'>
        <div className='grid-item'>
        <input
          className="form-input"
          type="text"
          placeholder="First Name"
          value={newEmployee.FirstName}
          onChange={(e) => setNewEmployee({ ...newEmployee, FirstName: e.target.value })}
          required
        />
        </div>
        <div className='grid-item'>
          <input
          className="form-input"
          type="text"
          placeholder="Last Name"
          value={newEmployee.LastName}
          onChange={(e) => setNewEmployee({ ...newEmployee, LastName: e.target.value })}
          required
        />
        </div>
        </div>
        
        <input
        
        className="date-group-data"
        
          type="date"
          placeholder="Date of Birth"
          value={newEmployee.DOB}
          onChange={(e) => setNewEmployee({ ...newEmployee, DOB: e.target.value })}
          required
        />
        
        <input
        className="form-input"
          type="text"
          placeholder="Study"
          value={newEmployee.Study}
          onChange={(e) => setNewEmployee({ ...newEmployee, study: e.target.value })}
          required
        />
      
         <input className='date-group-data'
          type="date"
          placeholder="Start Date"
          value={newEmployee.StartDate}
          onChange={(e) => setNewEmployee({ ...newEmployee, StartDate: e.target.value })}
          required

    />
    
         <input
         className='date-group-data'
          type="date"
          placeholder="End Date"
          value={newEmployee.EndDate}
          onChange={(e) => setNewEmployee({ ...newEmployee, EndDate: e.target.value })}
          required

        />
      
        <input
         className='form-input'
          type="text"
          placeholder="Current Salary"
          value={newEmployee.CurrentSalary}
          onChange={(e) => setNewEmployee({ ...newEmployee, CurrentSalary: e.target.value })}
          required

        />
        <textarea
        className='form-input'
            type="description"
            placeholder="Description"
            value={newEmployee.Description}
            onChange={(e) => setNewEmployee({ ...newEmployee, Description: e.target.value })}
            
            /><br/>
        {/* Add input fields for other employee data */}
        <button className="btn-add" onClick={addEmployee}>Add</button>
      </div>

      {/* Employee List */}
      <div className="section">
        <h2 className="section-heading">Employee List</h2>
        <ul className="employee-list">
          {employees.map((employee) => (
            <li key={employee.id} className="employee-item">
              <span className="employee-name">{employee.FirstName} {employee.LastName}</span>
              <span className="employee-dob">{employee.DOB}</span>
              <span className="employee-study">{employee.Study}</span>
              <span className="employee-start-date">{employee.StartDate}</span>  <span className="employee-end-date">{employee.EndDate}</span>
              <span className="employee-salary">{employee.CurrentSalary}</span>
              <button className="btn-edit" onClick={() => setEditingEmployee(employee)}>Edit</button>
              <button className="btn-delete" onClick={() => deleteEmployee(employee.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Employee Form */}
      {editingEmployee && (
        <div className="section">
          <h2 className="section-heading">Edit Employee</h2>
          <input
            className="form-input"
            type="text"
            placeholder="Fist Name"
            value={editingEmployee.FirstName}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, FirstName: e.target.value })}
          />
          <input
            className="form-input"

            type="text"
            placeholder="Last Name"
            value={editingEmployee.LastName}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, LastName: e.target.value })}
          />
          
          <input
          className='date-group-data'
          type="date"
          
          placeholder="DOB"
          value={editingEmployee.DOB}
          onChange={(e) => setEditingEmployee({ ...editingEmployee, DOB: e.target.value })}
        />
        <input
            className="form-input"

          type="text"
          placeholder="Study"
          value={editingEmployee.study}
          onChange={(e) => setEditingEmployee({ ...editingEmployee, study: e.target.value })}
        />
         <input
         className='date-group-data'
          type="date"
          placeholder="Start Date"
          value={editingEmployee.StartDate}
          onChange={(e) => setEditingEmployee({ ...editingEmployee, StartDate: e.target.value })}
        />
         <input
         className='date-group-data'
          type="date"
          placeholder="End Date"
          value={editingEmployee.EndDate}
          onChange={(e) => setEditingEmployee({ ...editingEmployee, EndDate: e.target.value })}
        />
        <input
            className="form-input"

          type="text"
          placeholder="Current Salary"
          value={editingEmployee.CurrentSalary}
          onChange={(e) => setEditingEmployee({ ...editingEmployee, CurrentSalary: e.target.value })}
        />
        <textarea
            className="form-input"

            type="description"
            placeholder="Description"
            value={editingEmployee.Description}
            onChange={(e) => setEditingEmployee({ ...editingEmployee, Description: e.target.value })}
            
            />
          {/* Add input fields for other employee data */}
          <button className="btn-save" onClick={updateEmployee}>Save</button>
          <button className="btn-cancel" onClick={() => setEditingEmployee(null)}>Cancel</button>
        </div>
      )}
      
      
    </div>
    
  );
}

export default EmployeeManagement; 