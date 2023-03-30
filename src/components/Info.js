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
    //Used localstorage to get the values in Main pages
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
      <section className='info-section'>
        <header className='info-header'>
          <h1>Maintenance Information</h1>
        </header>
        <main>
          <section>
            <h2 className='label'>Maintenance Title</h2>
            <p className='info-p'>{maintenancetask}</p>
            <h2 className='label'>Date</h2>
            <p className='info-p'>{date}</p>
            <h2 className='label'>Description</h2>
            <p className='info-p'>{desc}</p>
          </section>
        </main>
      </section>
      <section className='info-section'>
        <header className=''>
          <h1>Cost Information</h1>
        </header>
        <main>
          <section className='cost-section'>
            <header>
              <h2>Material Cost</h2>
              <p className='info-cost'>{mCost}</p>
            </header>
            <table className='cost-table'>
              <thead>
                <tr>
                  <th className='info-table-header'>Products</th>
                  <th className='info-table-header'>Price</th>
                  <th className='info-table-header'>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='table-decimal-info'>{p1Name}</td>
                  <td className='table-decimal-info'>{p1Parse}</td>
                  <td className='table-decimal-info'>{p1Quantity}</td>
                </tr>
                <tr>
                  <td className='table-decimal-info'>{p2Name}</td>
                  <td className='table-decimal-info'>{p2Parse}</td>
                  <td className='table-decimal-info'>{p2Quantity}</td>
                </tr>
                <tr>
                  <td className='table-decimal-info'>{p3Name}</td>
                  <td className='table-decimal-info'>{p3Parse}</td>
                  <td className='table-decimal-info'>{p3Quantity}</td>
                </tr>
                <tr>
                  <td className='table-decimal-info'>{p4Name}</td>
                  <td className='table-decimal-info'>{p4Parse}</td>
                  <td className='table-decimal-info'>{p4Quantity}</td>
                </tr>
              </tbody>
            </table>
          </section>
          {/* Labor cost */}
          <section className='cost-section'>
            <header>
              <h2>Labor Cost</h2>
              <p className='info-cost'>{lCost}</p>
            </header>

            <table className='cost-table'>
              <thead>
                <tr>
                  <th className='info-table-header'>Hourly Rate</th>
                  <th className='info-table-header'>Time Required</th>
                  <th className='info-table-header'>Employees</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='table-decimal-info'>{lAParse}</td>
                  <td className='table-decimal-info'>{lHourly} hrs</td>
                  <td className='table-decimal-info'>{lQuantity}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <h2>All Inclusive Costs</h2>
          <p className='info-cost'>{aCost}</p>
        </main>
        <footer className='footer'>
          <h2>Total Estimate</h2>
          <p>{tEstimate}</p>
        </footer>
      </section>
      <Link to='/'>
        <Button className='cancel-btn'>Return</Button>
      </Link>
    </div>
  );
}

export default Info;
