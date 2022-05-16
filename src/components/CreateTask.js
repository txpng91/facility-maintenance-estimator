import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import '../style.css';

function CreateTask() {
  // Using useNavigation for redirecting to pages
  let history = useNavigate();

  // Function for creating a post/entry
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent reload

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
    } else if (!document.getElementById('lCost-hrs').value) {
      alert('Please enter the hours needed to get the task done.');
      return;
    } else if (!document.getElementById('lCost-quantity').value) {
      alert('Please enter how many there are employees.');
      return;
    }

    //Empty space or add a 0 to any optional variables (description & products 2 to 4) if left emptied
    if (!document.getElementById('description').value) {
      document.getElementById('description').value = ' ';
    }
    if (!document.getElementById('product2-name').value) {
      document.getElementById('product2-name').value = ' ';
    }
    if (!document.getElementById('product2-amount').value) {
      document.getElementById('product2-amount').value = 0;
    }
    if (!document.getElementById('product2-quantity').value) {
      document.getElementById('product2-quantity').value = 0;
    }
    if (!document.getElementById('product3-name').value) {
      document.getElementById('product3-name').value = ' ';
    }
    if (!document.getElementById('product3-amount').value) {
      document.getElementById('product3-amount').value = 0;
    }
    if (!document.getElementById('product3-quantity').value) {
      document.getElementById('product3-quantity').value = 0;
    }
    if (!document.getElementById('product4-name').value) {
      document.getElementById('product4-name').value = ' ';
    }
    if (!document.getElementById('product4-amount').value) {
      document.getElementById('product4-amount').value = 0;
    }
    if (!document.getElementById('product4-quantity').value) {
      document.getElementById('product4-quantity').value = 0;
    }

    const ids = uuid(); // Creating unique id
    let uni = ids.slice(0, 8); // Slicing unique id

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
    var aCost = document.getElementById('aCost').value;

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
    const tEstimate = mCost + lCost + aICosts;

    //Converting float values to currency
    let numUS = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    // Fetching a value from form and pushing to javascript object
    const task = {
      id: uni,
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

    //Fetch url to make a post request and applying new object to local db
    await fetch('http://localhost:5000/data', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    // Returning to main page after creation done
    history('/');
  };
  return (
    <div className='container'>
      <h2 className='action-header'>Add Maintenenace Task</h2>
      <Form>
        {/* Fetching a value from input in maintenance task*/}
        <label className='label'>Maintenance Title</label>
        <Form.Group>
          <Form.Control
            className='form-control-input'
            type='text'
            placeholder='Enter Task'
            name='maintenancetask'
            id='maintenancetask'
            required
          />
        </Form.Group>

        {/* Fetching a value from input in date*/}
        <label className='label'>Date</label>
        <Form.Group>
          <Form.Control
            className='form-control-input'
            type='Date'
            placeholder='Date'
            name='date'
            id='date'
            required
          />
        </Form.Group>

        {/* Fetching a value from input in description*/}
        <label className='label'>Description</label>
        <Form.Group>
          <Form.Control
            className='form-control-description'
            as='textarea'
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
            className='form-control-input'
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
            className='form-control-input'
            id='product1-amount'
            type='text'
            placeholder='0.00'
            name='product1-amount'
            required
          />
        </Form.Group>
        <label>Quantity</label>
        <Form.Group>
          <Form.Control
            className='form-control-quantity'
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
            className='form-control-input'
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
            className='form-control-input'
            id='product2-amount'
            type='text'
            placeholder='0.00'
            name='product2-amount'
            required
          />
        </Form.Group>
        <label>Quantity</label>
        <Form.Group>
          <Form.Control
            className='form-control-quantity'
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
            className='form-control-input'
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
            className='form-control-input'
            id='product3-amount'
            type='text'
            placeholder='0.00'
            name='product3-amount'
            required
          />
        </Form.Group>
        <label>Quantity</label>
        <Form.Group>
          <Form.Control
            className='form-control-quantity'
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
            className='form-control-input'
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
            className='form-control-input'
            id='product4-amount'
            type='text'
            placeholder='0.00'
            name='product4-amount'
            required
          />
        </Form.Group>
        <label>Quantity</label>
        <Form.Group>
          <Form.Control
            className='form-control-quantity'
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
            className='form-control-input'
            id='lCost-amount'
            type='text'
            placeholder='Enter Hourly Rate'
            name='laborcost-amount'
            required
          />
        </Form.Group>
        <label>Required Hours</label>
        <Form.Group>
          <Form.Control
            className='form-control-quantity'
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
            className='form-control-quantity'
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
            id='aCost'
            type='text'
            placeholder='Enter Amount'
            name='allinclusivecost'
            required
          />
        </Form.Group>

        {/* Handing a onclick event in button for calling a function */}
        <Button
          className='submit-btn'
          onClick={(e) => handleSubmit(e)}
          variant='primary'
          type='submit'
        >
          Submit
        </Button>

        {/* Returning to home page */}
        <Link to='/'>
          <Button className='cancel-btn' variant='info' size='lg'>
            Cancel
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default CreateTask;
