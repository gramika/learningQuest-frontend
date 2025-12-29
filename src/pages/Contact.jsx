import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Header from "../users/components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendContactAPI } from "../services/allAPI";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, message } = form;

    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    const result = await sendContactAPI(form);

    if (result && result.status === 200) {
      toast.success("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } else {
      toast.error("Failed to send message");
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-teal-600 mb-2">
              Get in Touch
            </h1>
            <p className="text-gray-600">
              Have any questions or feedback? We’d love to hear from you!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faEnvelope} />
                    support@learningquest.com
                  </p>
                  <p className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faPhone} />
                    98765 43210
                  </p>
                  <p className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    Trivandrum, India
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-4 text-2xl text-gray-600">
                <FontAwesomeIcon icon={faLinkedin} />
                <FontAwesomeIcon icon={faGithub} />
                <FontAwesomeIcon icon={faInstagram} />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white shadow-md rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                Send a Message
              </h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label>Message</label>
                  <textarea
                    rows="5"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Contact;
