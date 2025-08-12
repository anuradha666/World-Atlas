import React from 'react'

export const Contact = () => {

  const handleFormSubmit = (formData) => {
    // React 19 feature
    const formInputData = Object.fromEntries(formData.entries())
    console.log(formInputData)
  }

  return (
    <section>
      <div className="section-contact">

        <div className="container-title">
          Contact Us
        </div>

        <div className="contact-wrapper container">
          <form action={handleFormSubmit}>
            <input
            type="text"
            className='form-control'
            placeholder='Enter Your Name' 
            required
            autoComplete='off'
            name='username'
            />
            <input
            type="email"
            className='form-control'
            placeholder='Enter Your Email' 
            required
            autoComplete='false'
            name='email'
            />
            <textarea
            className='form-control'
            rows="10"
            placeholder='Enter Your Message'
            name='message'
            required
            autoComplete='false'
            ></textarea>
            <button type='submit' value='send'>Send</button>
          </form>
        </div>
        
      </div>
    </section>
  )
}
