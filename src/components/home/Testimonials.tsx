import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  company: string;
  category: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "AlumConnect transformed my career journey completely. The mentorship I received was invaluable, and I'm now working at my dream company. The platform's matching system is incredibly accurate.",
    name: "Priya Sharma",
    role: "Software Engineer",
    image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    company: "Google",
    category: "Career Growth"
  },
  {
    quote: "The platform made it incredibly easy to give back to my alma mater. Mentoring students has been one of the most rewarding experiences, and the tools make communication seamless.",
    name: "Rohit Patel",
    role: "Product Manager",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    company: "Microsoft",
    category: "Mentorship"
  },
  {
    quote: "The networking opportunities and events have opened doors I never thought possible. The community here is truly supportive and the connections are genuine and lasting.",
    name: "Ananya Desai",
    role: "Data Scientist",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    company: "Amazon",
    category: "Networking"
  },
  {
    quote: "Found my co-founder through AlumConnect! The platform's ability to connect like-minded individuals is exceptional. Our startup has raised $2M in funding with alumni support.",
    name: "Arjun Kumar",
    role: "Founder & CEO",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    company: "TechStart Inc",
    category: "Entrepreneurship"
  },
  {
    quote: "The career guidance and job referrals I received were game-changing. Within 3 months of joining, I had multiple offers from top-tier companies. Highly recommend!",
    name: "Sneha Gupta",
    role: "Marketing Manager",
    image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    company: "Meta",
    category: "Job Search"
  },
  {
    quote: "International career transition made easy! Alumni from different countries provided invaluable insights about global markets and helped me land my dream job abroad.",
    name: "Vikram Singh",
    role: "Consultant",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    rating: 5,
    company: "McKinsey & Co",
    category: "Global Opportunities"
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-500 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 to-purple-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
            <Quote className="h-5 w-5 text-indigo-600" />
          </div>
        </div>

        <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 group-hover:text-gray-800 transition-colors">
          "{testimonial.quote}"
        </blockquote>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <motion.img
              src={testimonial.image}
              alt={testimonial.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-100 group-hover:ring-indigo-200 transition-all"
              whileHover={{ scale: 1.1 }}
            />
            <div className="ml-4">
              <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{testimonial.name}</div>
              <div className="text-gray-600 text-sm">{testimonial.role} at {testimonial.company}</div>
            </div>
          </div>
          <div className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full group-hover:bg-indigo-200 transition-colors">
            {testimonial.category}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [visibleCount, setVisibleCount] = React.useState(3);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - visibleCount + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length - visibleCount + 1) % (testimonials.length - visibleCount + 1));
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Loved by <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">thousands</span> of professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our community members have to say about their transformative experience with AlumConnect
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard key={currentIndex + index} testimonial={testimonial} index={index} />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-12 space-x-4">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </motion.button>
            
            <div className="flex space-x-2">
              {Array.from({ length: testimonials.length - visibleCount + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-indigo-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-300"
            >
              <ArrowRight className="h-5 w-5 text-gray-600" />
            </motion.button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "10,000+", label: "Active Users" },
            { number: "95%", label: "Success Rate" },
            { number: "500+", label: "Partner Companies" },
            { number: "50+", label: "Countries" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2 group-hover:text-indigo-700 transition-colors">
                {stat.number}
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