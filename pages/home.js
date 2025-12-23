import React, { useState } from 'react';
import { base44 } from "@/api/base44Client";
import VehicleForm from '../components/VehicleForm';
import ResultsDisplay from '../components/ResultsDisplay';
import { Button } from "@/components/ui/button";
import { Save, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    setIsSaved(false);
    setVehicleInfo(formData);

    try {
      const prompt = `You are an automotive service expert. Provide detailed information for the following vehicle service:

Vehicle: ${formData.year} ${formData.make} ${formData.model}
Engine: ${formData.engine || 'Not specified'}
Drivetrain: ${formData.drivetrain || 'Not specified'}
Service: ${formData.service_type}

Please provide:
1. The top 5 most popular/recommended parts needed for this service with:
   - Part name and description
   - Recommended retailers with actual URLs (Amazon, RockAuto, AutoZone, O'Reilly, NAPA, eBay Motors, etc.)
   - Include multiple retailer options per part
2. Critical specifications needed (torque specs, fluid types, capacities, etc.)
3. Up to 10 installation videos from YouTube ONLY:
   - Actual YouTube video URLs (youtube.com or youtu.be links)
   - Title and description of each video
   - Find real, existing YouTube videos that are popular and helpful for this specific service
   - Do NOT include any non-YouTube links

Search the internet to find actual, working URLs for YouTube videos and retailer product pages. Return specific links, not search queries.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            parts: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  retailers: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        url: { type: "string" }
                      }
                    }
                  }
                }
              }
            },
            specifications: {
              type: "object",
              additionalProperties: true
            },
            guides: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  type: { type: "string" },
                  url: { type: "string" }
                }
              }
            }
          }
        }
      });

      setResults(response);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await base44.entities.ServiceLookup.create({
        ...vehicleInfo,
        results: results
      });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error('Error saving lookup:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-slate-900 mb-4"
          >
            Vehicle Service Assistant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Get AI-powered parts recommendations, specifications, and installation guides
          </motion.p>
        </div>

        {/* Form */}
        <div className="mb-8">
          <VehicleForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* Results */}
        <AnimatePresence>
          {results && vehicleInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-end mb-4">
                <Button
                  onClick={handleSave}
                  disabled={isSaved}
                  className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg"
                >
                  {isSaved ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Lookup
                    </>
                  )}
                </Button>
              </div>
              <ResultsDisplay results={results} vehicleInfo={vehicleInfo} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
