"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useEffect, useRef } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Software Engineer",
      feedback:
        "This platform has completely transformed how I connect with alumni. The opportunities I've gained are incredible!",
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
    {
      name: "Maria Garcia",
      role: "Frontend Developer",
      feedback:
        "The mentorship I received was invaluable. Highly recommend AlumConnect to everyone!",
      image: "https://i.pravatar.cc/150?img=4",
    },
    {
      name: "Raj Patel",
      role: "Product Manager",
      feedback:
        "Exceptional platform for career growth. Found amazing mentors and lifelong connections here.",
      image: "https://i.pravatar.cc/150?img=5",
    },
  ];

  const stats = [
    { number: 10000, label: "Active Users", suffix: "+" },
    { number: 95, label: "Success Rate", suffix: "%" },
    { number: 500, label: "Partner Companies", suffix: "+" },
    { number: 50, label: "Countries", suffix: "+" },
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollSpeed = 1;
    const containerWidth = container.scrollWidth;
    const viewportWidth = container.offsetWidth;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition > containerWidth - viewportWidth) {
        scrollPosition = 0;
      }
      container.scrollLeft = scrollPosition;
    };

    const interval = setInterval(scroll, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white">
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

        {/* Testimonials Carousel */}
        <div className="mb-20">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-full md:w-96 bg-gradient-to-br from-gray-50 to-indigo-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all snap-center"
                whileHover={{ y: -5 }}
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
                <div className="flex text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 italic">
                  "{testimonial.feedback}"
                </p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Scroll to see more testimonials →
          </p>
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
