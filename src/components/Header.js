import React from 'react';
function Header() {
  return (
    <section className='main-container'>
      <h1 className='opening-header'>Facility Maintenance Estimator</h1>
      <p className='opening-paragraph'>
        This page is intended for facility maintenance concerns. If there are
        any needed repairs or concerns in this facility, please click
        <b> Create Estimate</b> to add any information and costs required for
        completion. An estimate will be calculated, after submitting all fields.
      </p>
      <p className='opening-paragraph'>
        You can also <b> Update</b> or <b> Delete</b> any maintenance concerns,
        if any changes occured.
      </p>
      <p className='opening-paragraph'>
        Click on the <b> Title</b> for more information on each row.
      </p>
    </section>
  );
}

export default Header;
