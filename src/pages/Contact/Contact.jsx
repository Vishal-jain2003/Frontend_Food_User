import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'animate.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast.error("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      // await axios.post('http://localhost:8080/api/contact', formData);
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/contact`, formData);

      toast.success("Message sent successfully!");
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="contact-section py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 animate__animated animate__fadeInUp">
            <div className="contact-form p-5 shadow bg-white rounded-4">
              <h2 className="text-center mb-4 fw-bold text-gradient">Get in Touch</h2>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control custom-input"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control custom-input"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="email"
                      name="email"
                      className="form-control custom-input"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      name="message"
                      className="form-control custom-input"
                      rows="5"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3 btn-glow"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
