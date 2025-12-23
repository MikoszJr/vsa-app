import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Undefined() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-slate-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-slate-700 mb-2">Page Not Found</h2>
          <p className="text-lg text-slate-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={createPageUrl('Home')}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg h-12 px-6">
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="h-12 px-6 border-slate-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}