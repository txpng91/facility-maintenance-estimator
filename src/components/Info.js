import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Info() {
  // Using useState to set and get values
  const [maintenancetask, setTask] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [p1Name, setP1Name] = useState('');
  const [p1Parse, setP1Parse] = useState('');
  const [p1Quantity, setP1Quantity] = useState('');
  const [p2Name, setP2Name] = useState('');
  const [p2Parse, setP2Parse] = useState('');
  const [p2Quantity, setP2Quantity] = useState('');
  const [p3Name, setP3Name] = useState('');
  const [p3Parse, setP3Parse] = useState('');
  const [p3Quantity, setP3Quantity] = useState('');
  const [p4Name, setP4Name] = useState('');
  const [p4Parse, setP4Parse] = useState('');
  const [p4Quantity, setP4Quantity] = useState('');
  const [mCost, setMCost] = useState('');
  const [lAParse, setLAParse] = useState('');
  const [lQuantity, setLQuantity] = useState('');
  const [lCost, setLCost] = useState('');
  const [lHourly, setLHourly] = useState('');
  const [aCost, setACost] = useState('');
  var [tEstimate, setTEstimate] = useState('');

  //Converting text value to float
  var fnum = mCost.replace(/\$|,/g, '');
  var snum = lCost.replace(/\$|,/g, '');
  var tnum = aCost.replace(/\$|,/g, '');

  //Converting text value to float
  var x = parseFloat(fnum);
  var y = parseFloat(snum);
  var z = parseFloat(tnum);

  //Calculating all costs to total estimate
  var sum = x + y + z;

  //Converting float value to currency
  let numUS = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  tEstimate = numUS.format(sum);

  // useEffect will let the page render only once with the captured data
  useEffect(() => {
    setTask(localStorage.getItem('Maintenance_Task'));
    setDate(localStorage.getItem('Date'));
    setDesc(localStorage.getItem('Description'));
    setP1Name(localStorage.getItem('Product_1_Name'));
    setP1Parse(localStorage.getItem('Product_1_Amount'));
    setP1Quantity(localStorage.getItem('Product_1_Quantity'));
    setP2Name(localStorage.getItem('Product_2_Name'));
    setP2Parse(localStorage.getItem('Product_2_Amount'));
    setP2Quantity(localStorage.getItem('Product_2_Quantity'));
    setP3Name(localStorage.getItem('Product_3_Name'));
    setP3Parse(localStorage.getItem('Product_3_Amount'));
    setP3Quantity(localStorage.getItem('Product_3_Quantity'));
    setP4Name(localStorage.getItem('Product_4_Name'));
    setP4Parse(localStorage.getItem('Product_4_Amount'));
    setP4Quantity(localStorage.getItem('Product_4_Quantity'));
    setMCost(localStorage.getItem('Material_Cost'));
    setLAParse(localStorage.getItem('Employee_Rate'));
    setLHourly(localStorage.getItem('Hours_Needed'));
    setLQuantity(localStorage.getItem('Employee_Amount'));
    setLCost(localStorage.getItem('Labor_Cost'));
    setACost(localStorage.getItem('All_Inclusive_Cost'));
    setTEstimate(localStorage.getItem('Total_Estimate'));
  }, []);

  return (
    <div className='info-container'>
      <label className='info-header'>Maintenance Information</label>
      <label className='label'>Maintenance Title</label>
      <p className='info-p'>{maintenancetask}</p>
      <label className='label'>Date</label>
      <p className='info-p'>{date}</p>
      <label className='label'>Description</label>
      <p className='info-p'>{desc}</p>
      <label className='label'>Material Cost</label>
      <p className='info-cost'>{mCost}</p>
      <table className='mcost-info-table'>
        <thead className='table-head'>
          <tr>
            <th className='info-table-header'>Products</th>
            <th className='info-table-header'>Price</th>
            <th className='info-table-header'>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr className='table-row'>
            <td className='table-decimal-info'>{p1Name}</td>
            <td className='table-decimal-info'>{p1Parse}</td>
            <td className='table-decimal-info'>{p1Quantity}</td>
          </tr>
          <tr className='table-row'>
            <td className='table-decimal-info'>{p2Name}</td>
            <td className='table-decimal-info'>{p2Parse}</td>
            <td className='table-decimal-info'>{p2Quantity}</td>
          </tr>
          <tr className='table-row'>
            <td className='table-decimal-info'>{p3Name}</td>
            <td className='table-decimal-info'>{p3Parse}</td>
            <td className='table-decimal-info'>{p3Quantity}</td>
          </tr>
          <tr className='table-row'>
            <td className='table-decimal-info'>{p4Name}</td>
            <td className='table-decimal-info'>{p4Parse}</td>
            <td className='table-decimal-info'>{p4Quantity}</td>
          </tr>
        </tbody>
      </table>
      <label className='label'>Labor Cost</label>
      <p className='info-cost'>{lCost}</p>
      <table className='lcost-info-table'>
        <thead className='table-head'>
          <tr className='table-row'>
            <th className='info-table-header'>Hourly Rate</th>
            <th className='info-table-header'>Time Required</th>
            <th className='info-table-header'>Number of Employees</th>
          </tr>
        </thead>
        <tbody>
          <tr className='table-row'>
            <td className='table-decimal-info'>{lAParse}</td>
            <td className='table-decimal-info'>{lHourly} hrs</td>
            <td className='table-decimal-info'>{lQuantity}</td>
          </tr>
        </tbody>
      </table>
      <label className='label'>All Inclusive Costs</label>
      <p className='info-cost'>{aCost}</p>
      <table className='total-table'>
        <thead>
          <tr>
            <th>Total Estimate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{tEstimate}</td>
          </tr>
        </tbody>
      </table>
      <Link to='/'>
        <Button className='cancel-btn'>Return</Button>
      </Link>
    </div>
  );
}

export default Info;
