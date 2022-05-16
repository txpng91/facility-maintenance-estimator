import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditTask() {
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
  const [lAParse, setLAParse] = useState('');
  const [lHParse, setLHParse] = useState('');
  const [lQuantity, setLQuantity] = useState('');
  const [aCost, setACost] = useState('');
  const [id, setId] = useState('');

  // for navigation in javascript
  let history = useNavigate();

  // function for taking and
  // applying changes of editing/updating
  const handleSubmit = async (e) => {
    e.preventDefault(); // preventing from reload

    //Alerts user if there was nothing entered
    if (!document.getElementById('maintenancetask').value) {
      alert('Please add maintenance task.');
      return;
    } else if (!document.getElementById('date').value) {
      alert('Please enter date.');
      return;
    } else if (!document.getElementById('product1-name').value) {
      alert('Please add at least one neccessary product.');
      return;
    } else if (!document.getElementById('product1-amount').value) {
      alert('Please add the amount for this product.');
      return;
    } else if (!document.getElementById('product1-quantity').value) {
      alert('Please add the quantity for this product.');
      return;
    } else if (!document.getElementById('aCost').value) {
      alert('Please enter all inclusive amount.');
      return;
    } else if (!document.getElementById('lCost-amount').value) {
      alert('Please enter a pay rate for each employee.');
      return;
    } else if (!document.getElementById('lCost-quantity').value) {
      alert('Please enter how many there are employees.');
      return;
    }

    //Places empty strings or 0s in any null values
    if (!document.getElementById('description').value) {
      document.getElementById('description').value = ' ';
    }
    if (!document.getElementById('product2-name').value) {
      document.getElementById('product2-name').value = ' ';
    }
    if (!document.getElementById('product2-amount').value) {
      document.getElementById('product2-amount').value = '0.00';
    }
    if (!document.getElementById('product2-quantity').value) {
      document.getElementById('product2-quantity').value = 0.0;
    }
    if (!document.getElementById('product3-name').value) {
      document.getElementById('product3-name').value = ' ';
    }
    if (!document.getElementById('product3-amount').value) {
      document.getElementById('product3-amount').value = '0.00';
    }
    if (!document.getElementById('product3-quantity').value) {
      document.getElementById('product3-quantity').value = 0.0;
    }
    if (!document.getElementById('product4-name').value) {
      document.getElementById('product4-name').value = ' ';
    }
    if (!document.getElementById('product4-amount').value) {
      document.getElementById('product4-amount').value = '0.00';
    }
    if (!document.getElementById('product4-quantity').value) {
      document.getElementById('product4-quantity').value = 0.0;
    }

    //Getting text & date values from form
    const maintenancetask = document.getElementById('maintenancetask').value;
    const date = document.getElementById('date').value;
    const desc = document.getElementById('description').value;
    const p1Name = document.getElementById('product1-name').value;
    const p2Name = document.getElementById('product2-name').value;
    const p3Name = document.getElementById('product3-name').value;
    const p4Name = document.getElementById('product4-name').value;

    //Getting all product amount & quantity values from form
    const p1Amount = document.getElementById('product1-amount').value;
    const p1Quantity = document.getElementById('product1-quantity').value;
    const p2Amount = document.getElementById('product2-amount').value;
    const p2Quantity = document.getElementById('product2-quantity').value;
    const p3Amount = document.getElementById('product3-amount').value;
    const p3Quantity = document.getElementById('product3-quantity').value;
    const p4Amount = document.getElementById('product4-amount').value;
    const p4Quantity = document.getElementById('product4-quantity').value;
    const aCost = document.getElementById('aCost').value;

    //Converting all product amount and quantity into float
    var p1Parse = parseFloat(p1Amount);
    var p1QParse = parseFloat(p1Quantity);
    var p2Parse = parseFloat(p2Amount);
    var p2QParse = parseFloat(p2Quantity);
    var p3Parse = parseFloat(p3Amount);
    var p3QParse = parseFloat(p3Quantity);
    var p4Parse = parseFloat(p4Amount);
    var p4QParse = parseFloat(p4Quantity);

    //Calculating each product price
    var p1Price = p1Parse * p1QParse;
    var p2Price = p2Parse * p2QParse;
    var p3Price = p3Parse * p3QParse;
    var p4Price = p4Parse * p4QParse;

    //Adding all products to estimate the Material Cost
    var mCost = p1Price + p2Price + p3Price + p4Price;

    //Getting labor amount and quantity from form
    const lAmount = document.getElementById('lCost-amount').value;
    const lHourly = document.getElementById('lCost-hrs').value;
    const lQuantity = document.getElementById('lCost-quantity').value;

    //Converting labor amount and quantity into float
    var lAParse = parseFloat(lAmount);
    var lHParse = parseFloat(lHourly);
    var lQParse = parseFloat(lQuantity);

    //Calulating amount and quantity to estimate Labor Cost
    var lCost = lAParse * (lQParse * lHParse);

    //Converting all inclusive costs into float
    var aICosts = parseFloat(aCost);

    //Calculating all costs to total estimate
    var tEstimate = mCost + lCost + aICosts;

    //Converting float values to currency
    let numUS = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    //Updating a maintenance task with the changes
    const updateTask = {
      Maintenance_Task: maintenancetask,
      Date: date,
      Description: desc,
      Material_Cost: numUS.format(mCost),
      Product_1_Name: p1Name,
      Product_1_Amount: numUS.format(p1Parse),
      Product_1_Quantity: p1Quantity,
      Product_2_Name: p2Name,
      Product_2_Amount: numUS.format(p2Parse),
      Product_2_Quantity: p2Quantity,
      Product_3_Name: p3Name,
      Product_3_Amount: numUS.format(p3Parse),
      Product_3_Quantity: p3Quantity,
      Product_4_Name: p4Name,
      Product_4_Amount: numUS.format(p4Parse),
      Product_4_Quantity: p4Quantity,
      Labor_Cost: numUS.format(lCost),
      Employee_Rate: numUS.format(lAParse),
      Hours_Needed: lHourly,
      Employee_Amount: lQuantity,
      All_Inclusive_Cost: numUS.format(aCost),
      Total_Estimate: numUS.format(tEstimate),
    };

    //Updating the task within the db
    await fetch(`http://localhost:5000/data/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updateTask),
    });

    // redirecting to main page
    history('/');
  };

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
    setLAParse(localStorage.getItem('Employee_Rate'));
    setLQuantity(localStorage.getItem('Employee_Amount'));
    setACost(localStorage.getItem('All_Inclusive_Cost'));
    setLHParse(localStorage.getItem('Hours_Needed'));
    setId(localStorage.getItem('id'));
  }, []);

  return (
    <div className='container'>
      <h2 className='action-header'>Edit Maintenenace Task</h2>
      <Form>
        {/* setting a maintenance task from the input textfiled */}
        <label className='label'>Maintenance Title</label>
        <Form.Group>
          <Form.Control
            value={maintenancetask}
            id='maintenancetask'
            className='form-control-input'
            onChange={(e) => setTask(e.target.value)}
            type='text'
            placeholder='Enter Task'
          />
        </Form.Group>

        {/* setting a date from input */}
        <label className='label'>Date</label>
        <Form.Group>
          <Form.Control
            value={date}
            className='form-control-input'
            onChange={(e) => setDate(e.target.value)}
            id='date'
            type='date'
            placeholder='Date'
          />
        </Form.Group>

        {/* Setting a description input in description*/}
        <label className='label'>Description</label>
        <Form.Group>
          <Form.Control
            value={desc}
            className='form-control-description'
            as='textarea'
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            placeholder='Please provide more information'
            name='description'
            id='description'
            required
          />
        </Form.Group>

        {/* Fetching a value from input in material costs*/}
        <label className='label'>Material Costs</label>
        <label className='sub-label'>Product 1</label>
        <Form.Group>
          <Form.Control
            value={p1Name}
            className='form-control-input'
            onChange={(e) => setP1Name(e.target.value)}
            id='product1-name'
            type='text'
            placeholder='Enter Product'
            name='product1-name'
            required
          />
        </Form.Group>
        <label>Amount</label>
        <Form.Group>
          <Form.Control
            value={p1Parse}
            className='form-control-input'
            onChange={(e) => setP1Parse(e.target.value)}
            id='product1-amount'
            type='text'
            placeholder='Enter Amount'
            name='product1-amount'
            required
          />
        </Form.Group>
        <label>Quantity</label>
        <Form.Group>
          <Form.Control
            value={p1Quantity}
            className='form-control-quantity'
            onChange={(e) => setP1Quantity(e.target.value)}
            id='product1-quantity'
            type='number'
            name='product1-quantity'
            placeholder='0'
            required
          />
        </Form.Group>

        <label className='sub-label'>Product 2</label>
        <Form.Group>
          <Form.Control
            value={p2Name}
            className='form-control-input'
            onChange={(e) => setP2Name(e.target.value)}
            id='product2-name'
            type='text'
            placeholder='Enter Product'
            name='product2-name'
            required
          />
        </Form.Group>
        <label>Amount</label>
        <Form.Group>
          <Form.Control
            value={p2Parse}
            className='form-control-input'
            onChange={(e) => setP2Parse(e.target.value)}
            id='product2-amount'
            type='text'
            placeholder='Enter Amount'
            name='product2-amount'
            required
          />
        </Form.Group>
        <label>Quantity</label>
        <Form.Group>
          <Form.Control
            value={p2Quantity}
            className='form-control-quantity'
            onChange={(e) => setP2Quantity(e.target.value)}
            id='product2-quantity'
            type='number'
            name='product2-quantity'
            placeholder='0'
            required
          />
        </Form.Group>

        <label className='sub-label'>Product 3</label>
        <Form.Group>
          <Form.Control
            value={p3Name}
            className='form-control-input'
            onChange={(e) => setP3Name(e.target.value)}
            id='product3-name'
            type='text'
            placeholder='Enter Product'
            name='product3-name'
            required
          />
        </Form.Group>
        <label>Amount</label>
        <Form.Group>
          <Form.Control
            value={p3Parse}
            className='form-control-input'
            onChange={(e) => setP3Parse(e.target.value)}
            id='product3-amount'
            type='text'
            placeholder='Enter Amount'
            name='product3-amount'
            required
          />
        </Form.Group>
        <label>Quantity</label>
        <Form.Group>
          <Form.Control
            value={p3Quantity}
            className='form-control-quantity'
            onChange={(e) => setP3Quantity(e.target.value)}
            id='product3-quantity'
            type='number'
            name='product3-quantity'
            placeholder='0'
            required
          />
        </Form.Group>

        <label className='sub-label'>Product 4</label>
        <Form.Group>
          <Form.Control
            value={p4Name}
            className='form-control-input'
            onChange={(e) => setP4Name(e.target.value)}
            id='product4-name'
            type='text'
            placeholder='Enter Product'
            name='product4-name'
            required
          />
        </Form.Group>
        <label>Amount</label>
        <Form.Group>
          <Form.Control
            value={p4Parse}
            className='form-control-input'
            onChange={(e) => setP4Parse(e.target.value)}
            id='product4-amount'
            type='text'
            placeholder='Enter Amount'
            name='product4-amount'
            required
          />
        </Form.Group>
        <label>Quantity</label>
        <Form.Group>
          <Form.Control
            value={p4Quantity}
            className='form-control-quantity'
            onChange={(e) => setP4Quantity(e.target.value)}
            id='product4-quantity'
            type='number'
            name='product4-quantity'
            placeholder='0'
            required
          />
        </Form.Group>

        {/* Fetching a value from input in labor costs*/}
        <label className='label'>Labor Costs</label>
        <label>Hourly Rate</label>
        <Form.Group>
          <Form.Control
            value={lAParse.replace(/\$|,/g, '')}
            className='form-control-input'
            onChange={(e) => setLAParse(e.target.value)}
            id='lCost-amount'
            type='text'
            placeholder='Enter Amount'
            name='laborcost-amount'
            required
          />
        </Form.Group>
        <label>Hours Required</label>
        <Form.Group>
          <Form.Control
            value={lHParse}
            className='form-control-quantity'
            onChange={(e) => setLHParse(e.target.value)}
            id='lCost-hrs'
            type='number'
            placeholder='0'
            name='laborcost-amount'
            required
          />
        </Form.Group>
        <label>How Many Employees?</label>
        <Form.Group>
          <Form.Control
            value={lQuantity}
            className='form-control-quantity'
            onChange={(e) => setLQuantity(e.target.value)}
            id='lCost-quantity'
            type='number'
            placeholder='0'
            name='laborcost-quantity'
            required
          />
        </Form.Group>

        {/* Fetching a value from input in all inclusive costs*/}
        <label className='label'>All Inclusive Cost</label>
        <Form.Group>
          <Form.Control
            className='form-control-input'
            value={aCost.replace(/\$|,/g, '')}
            id='aCost'
            onChange={(e) => setACost(e.target.value)}
            type='text'
            placeholder='Enter Amount'
            name='allinclusivecost'
            required
          />
        </Form.Group>

        {/* Handling an onclick event running an edit logic */}
        <Button
          className='submit-btn'
          onClick={(e) => handleSubmit(e)}
          variant='primary'
          type='submit'
          size='lg'
        >
          Save
        </Button>

        {/* Redirecting to main page after editing */}
        <Link className='d-grid gap-2' to='/'>
          <Button className='cancel-btn'>Cancel</Button>
        </Link>
      </Form>
    </div>
  );
}

export default EditTask;
