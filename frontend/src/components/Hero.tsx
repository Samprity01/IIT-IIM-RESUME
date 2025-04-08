import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleCreateResume = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewTemplates = () => {
    document
      .getElementById("templates")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

      {/* Animated decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 left-10 w-20 h-20 border-2 border-blue-500/30 rotate-45 z-0"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5,
        }}
        className="absolute bottom-20 right-10 w-32 h-32 border-2 border-indigo-500/30 rotate-12 rounded-lg z-0"
      />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Land Your Dream Job with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                IIT-IIM Formatted Resumes
              </span>
            </h1>

            <p className="text-xl text-blue-100 mb-8 max-w-xl mx-auto lg:mx-0">
              Create professional resumes tailored specifically for IIT and IIM
              standards. Stand out from the crowd and increase your chances of
              getting noticed by top recruiters.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 rounded-full text-lg shadow-lg shadow-blue-600/20 transition-transform hover:scale-105"
                onClick={handleCreateResume}
              >
                Create Your Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full text-lg"
                onClick={handleViewTemplates}
              >
                View Templates
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <div className="w-[400px] h-[550px] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-2xl transform -rotate-3"></div>
              <div className="absolute inset-0 w-[400px] h-[550px] bg-white rounded-xl shadow-xl p-8 transform rotate-3">
                <div className="h-6 w-20 bg-blue-500 rounded-md mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3 space-y-1">
                      <div className="h-3 w-40 bg-gray-200 rounded"></div>
                      <div className="h-3 w-32 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3 space-y-1">
                      <div className="h-3 w-36 bg-gray-200 rounded"></div>
                      <div className="h-3 w-28 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3 space-y-1">
                      <div className="h-3 w-44 bg-gray-200 rounded"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-blue-100 mb-4 font-medium">
            Trusted by 10,000+ students and professionals from top institutions
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {/* Placeholder for institution logos */}
            <div className="h-8 w-20 bg-white/20 rounded"></div>
            <div className="h-8 w-24 bg-white/20 rounded"></div>
            <div className="h-8 w-16 bg-white/20 rounded"></div>
            <div className="h-8 w-24 bg-white/20 rounded"></div>
            <div className="h-8 w-20 bg-white/20 rounded"></div>
          </div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-blue-300/50 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-blue-400 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
