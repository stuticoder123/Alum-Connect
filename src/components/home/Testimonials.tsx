"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Software Engineer",
      feedback:
        "This platform has completely transformed how I connect with alumni. The opportunities I’ve gained are incredible!",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Jane Smith",
      role: "Data Scientist",
      feedback:
        "An amazing experience! The networking and mentorship here are unmatched.",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Alex Johnson",
      role: "Product Manager",
      feedback:
        "I found my dream job through the alumni network. The support is phenomenal.",
      image: "https://i.pravatar.cc/150?img=3",
    },
  ];

  const stats = [
    { number: 10000, label: "Active Users", suffix: "+" },
    { number: 95, label: "Success Rate", suffix: "%" },
    { number: 500, label: "Partner Companies", suffix: "+" },
    { number: 50, label: "Countries", suffix: "+" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
        >
          What Our Alumni Say
        </motion.h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                “{testimonial.feedback}”
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
            >
              {/* CountUp number animation */}
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2 group-hover:text-indigo-700 transition-colors">
                <CountUp
                  start={0}
                  end={stat.number}
                  duration={2.5}
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
