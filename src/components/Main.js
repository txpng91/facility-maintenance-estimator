import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../style.css';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
  let history = useNavigate();

  /*------ Collecting specific data when going to Info or Edit page ------*/

  const setInfoID = (
    id,
    maintenancetask,
    date,
    desc,
    mCost,
    p1Name,
    p1Parse,
    p1Quantity,
    p2Name,
    p2Parse,
    p2Quantity,
    p3Name,
    p3Parse,
    p3Quantity,
    p4Name,
    p4Parse,
    p4Quantity,
    lCost,
    lAParse,
    lHourly,
    lQuantity,
    aCost
  ) => {
    localStorage.setItem('id', id);
    localStorage.setItem('Maintenance_Task', maintenancetask);
    localStorage.setItem('Date', date);
    localStorage.setItem('Description', desc);
    localStorage.setItem('Product_1_Name', p1Name);
    localStorage.setItem('Product_1_Amount', p1Parse);
    localStorage.setItem('Product_1_Quantity', p1Quantity);
    localStorage.setItem('Product_2_Name', p2Name);
    localStorage.setItem('Product_2_Amount', p2Parse);
    localStorage.setItem('Product_2_Quantity', p2Quantity);
    localStorage.setItem('Product_3_Name', p3Name);
    localStorage.setItem('Product_3_Amount', p3Parse);
    localStorage.setItem('Product_3_Quantity', p3Quantity);
    localStorage.setItem('Product_4_Name', p4Name);
    localStorage.setItem('Product_4_Amount', p4Parse);
    localStorage.setItem('Product_4_Quantity', p4Quantity);
    localStorage.setItem('Material_Cost', mCost.toString());
    localStorage.setItem('Employee_Rate', lAParse);
    localStorage.setItem('Hours_Needed', lHourly);
    localStorage.setItem('Employee_Amount', lQuantity);
    localStorage.setItem('Labor_Cost', lCost.toString());
    localStorage.setItem('All_Inclusive_Cost', aCost.toString());
  };

  const setEditID = (
    id,
    maintenancetask,
    date,
    desc,
    p1Name,
    p1Parse,
    p1Quantity,
    p2Name,
    p2Parse,
    p2Quantity,
    p3Name,
    p3Parse,
    p3Quantity,
    p4Name,
    p4Parse,
    p4Quantity,
    lCost,
    lAParse,
    lHourly,
    lQuantity,
    aCost,
    mCost
  ) => {
    localStorage.setItem('id', id);
    localStorage.setItem('Maintenance_Task', maintenancetask);
    localStorage.setItem('Date', date);
    localStorage.setItem('Description', desc);
    localStorage.setItem('Product_1_Name', p1Name);
    localStorage.setItem('Product_1_Amount', p1Parse.toString());
    localStorage.setItem('Product_1_Quantity', p1Quantity);
    localStorage.setItem('Product_2_Name', p2Name);
    localStorage.setItem('Product_2_Amount', p2Parse.toString());
    localStorage.setItem('Product_2_Quantity', p2Quantity);
    localStorage.setItem('Product_3_Name', p3Name);
    localStorage.setItem('Product_3_Amount', p3Parse.toString());
    localStorage.setItem('Product_3_Quantity', p3Quantity);
    localStorage.setItem('Product_4_Name', p4Name);
    localStorage.setItem('Product_4_Amount', p4Parse.toString());
    localStorage.setItem('Product_4_Quantity', p4Quantity);
    localStorage.setItem('Material_Cost', mCost.toString());
    localStorage.setItem('Employee_Rate', lAParse.toString());
    localStorage.setItem('Hours_Needed', lHourly);
    localStorage.setItem('Employee_Amount', lQuantity);
    localStorage.setItem('Labor_Cost', lCost.toString());
    localStorage.setItem('All_Inclusive_Cost', aCost.toString());
  };

  /*------ Collecting data with db.json ------*/

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  /*------ Fetch data ------*/
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/data');
    const data = await res.json();

    return data;
  };

  /*------ Delete function ------*/
  async function deleteTask(id) {
    await fetch(`http://localhost:5000/data/${id}`, {
      method: 'DELETE',
    });

    setTasks(tasks.filter((task) => task.id !== id));

    /*------ Re-rendering the page to get results ------*/
    history('/');
  }

  return (
    <div className='main'>
      <Header />
      {/* Button takes you to create maintenance task page for insertion of values */}
      <Link to='/create'>
        <button variant='warning' size='lg' className='add-btn'>
          Create Estimate
        </button>
      </Link>
      {/* Table */}
      <table className='table'>
        <thead className='table-head'>
          <tr>
            <th className='table-header'>Maintenance Title</th>
            <th className='table-header'>Date</th>
            <th className='table-header'>Material Costs</th>
            <th className='table-header'>Labor Costs</th>
            <th className='table-header'>All Inclusive Costs</th>
            <th className='table-header'>Total Estimate</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping through and showing data in the table */}
          {tasks.map((task) => {
            return (
              <tr className='table-row' key={task.id}>
                <td className='table-decimal'>
                  {/* Button in "Maintenance Task" text to take to Info page with collected data*/}
                  <Link to={`/info`}>
                    <button
                      className='info-btn'
                      onClick={(e) =>
                        setInfoID(
                          task.id,
                          task.Maintenance_Task,
                          task.Date,
                          task.Description,
                          task.Material_Cost,
                          task.Product_1_Name,
                          task.Product_1_Amount,
                          task.Product_1_Quantity,
                          task.Product_2_Name,
                          task.Product_2_Amount,
                          task.Product_2_Quantity,
                          task.Product_3_Name,
                          task.Product_3_Amount,
                          task.Product_3_Quantity,
                          task.Product_4_Name,
                          task.Product_4_Amount,
                          task.Product_4_Quantity,
                          task.Labor_Cost,
                          task.Employee_Rate,
                          task.Hours_Needed,
                          task.Employee_Amount,
                          task.All_Inclusive_Cost,
                          task.Total_Estimate
                        )
                      }
                      variant='info'
                    >
                      {task.Maintenance_Task}
                    </button>
                  </Link>
                </td>
                <td className='table-decimal'>{task.Date}</td>
                <td className='table-decimal'>{task.Material_Cost}</td>
                <td className='table-decimal'>{task.Labor_Cost}</td>
                <td className='table-decimal'>{task.All_Inclusive_Cost}</td>
                <td className='table-decimal'>{task.Total_Estimate}</td>

                {/* sends you to edit page with specified data to make changes */}
                <td>
                  <Link to={`/edit`}>
                    <button
                      className='edit-btn'
                      onClick={(e) =>
                        setEditID(
                          task.id,
                          task.Maintenance_Task,
                          task.Date,
                          task.Description,
                          task.Product_1_Name,
                          task.Product_1_Amount.replace(/\$|,/g, ''),
                          task.Product_1_Quantity,
                          task.Product_2_Name,
                          task.Product_2_Amount.replace(/\$|,/g, ''),
                          task.Product_2_Quantity,
                          task.Product_3_Name,
                          task.Product_3_Amount.replace(/\$|,/g, ''),
                          task.Product_3_Quantity,
                          task.Product_4_Name,
                          task.Product_4_Amount.replace(/\$|,/g, ''),
                          task.Product_4_Quantity,
                          task.Labor_Cost.replace(/\$|,/g, ''),
                          task.Employee_Rate.replace(/\$|,/g, ''),
                          task.Hours_Needed,
                          task.Employee_Amount,
                          task.All_Inclusive_Cost.replace(/\$|,/g, ''),
                          task.Material_Cost.replace(/\$|,/g, ''),
                          task.Labor_Cost.replace(/\$|,/g, ''),
                          task.Total_Estimate.replace(/\$|,/g, '')
                        )
                      }
                      variant='info'
                    >
                      Update
                    </button>
                  </Link>
                </td>
                {/* Using thr deleted function passing the id of an entry */}
                <td>
                  <button
                    className='delete-btn'
                    onClick={(e) => deleteTask(task.id)}
                    variant='danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Main;
