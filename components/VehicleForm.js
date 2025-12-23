import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function VehicleForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    year: '',
    make: '',
    model: '',
    engine: '',
    drivetrain: '',
    service_type: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const drivetrainOptions = ['FWD', 'RWD', 'AWD', '4WD'];

  return (
    <Card className="bg-white border-0 shadow-xl">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="year" className="text-sm font-medium text-slate-700">
                Year
              </Label>
              <Input
                id="year"
                type="text"
                placeholder="2020"
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
                className="h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="make" className="text-sm font-medium text-slate-700">
                Make
              </Label>
              <Input
                id="make"
                type="text"
                placeholder="Toyota"
                value={formData.make}
                onChange={(e) => handleChange('make', e.target.value)}
                className="h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="model" className="text-sm font-medium text-slate-700">
                Model
              </Label>
              <Input
                id="model"
                type="text"
                placeholder="Camry"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
                className="h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="engine" className="text-sm font-medium text-slate-700">
                Engine
              </Label>
              <Input
                id="engine"
                type="text"
                placeholder="2.5L 4-Cylinder"
                value={formData.engine}
                onChange={(e) => handleChange('engine', e.target.value)}
                className="h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="drivetrain" className="text-sm font-medium text-slate-700">
                Drivetrain
              </Label>
              <select
                id="drivetrain"
                value={formData.drivetrain}
                onChange={(e) => handleChange('drivetrain', e.target.value)}
                className="w-full h-12 px-3 text-base border border-slate-200 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select drivetrain</option>
                {drivetrainOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service_type" className="text-sm font-medium text-slate-700">
                Service Type
              </Label>
              <Input
                id="service_type"
                type="text"
                placeholder="Oil Change, Brake Pad Replacement, etc."
                value={formData.service_type}
                onChange={(e) => handleChange('service_type', e.target.value)}
                className="h-12 text-base border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base font-medium shadow-lg shadow-blue-500/30 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Find Parts & Specs
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}