import React, { useState } from 'react';
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";
import ResultsDisplay from '../components/ResultsDisplay';
import { motion, AnimatePresence } from "framer-motion";

export default function History() {
  const [expandedId, setExpandedId] = useState(null);

  const { data: lookups, isLoading } = useQuery({
    queryKey: ['serviceLookups'],
    queryFn: () => base44.entities.ServiceLookup.list('-created_date', 50),
    initialData: []
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Search History</h1>
          <p className="text-lg text-slate-600">
            Review your previous service lookups
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        ) : lookups.length === 0 ? (
          <Card className="border-0 shadow-xl">
            <CardContent className="p-12 text-center">
              <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No searches yet</h3>
              <p className="text-slate-600">Your saved service lookups will appear here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {lookups.map((lookup) => (
              <Card key={lookup.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {lookup.year} {lookup.make} {lookup.model}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className="bg-blue-500 text-white border-0">
                          {lookup.service_type}
                        </Badge>
                        {lookup.engine && (
                          <span className="text-sm text-slate-600">{lookup.engine}</span>
                        )}
                        {lookup.drivetrain && (
                          <span className="text-sm text-slate-600">• {lookup.drivetrain}</span>
                        )}
                        <span className="text-sm text-slate-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {format(new Date(lookup.created_date), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => toggleExpand(lookup.id)}
                      variant="outline"
                      className="ml-4"
                    >
                      {expandedId === lookup.id ? (
                        <>
                          <ChevronUp className="w-4 h-4 mr-2" />
                          Hide
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4 mr-2" />
                          View Details
                        </>
                      )}
                    </Button>
                  </div>

                  <AnimatePresence>
                    {expandedId === lookup.id && lookup.results && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-slate-200"
                      >
                        <ResultsDisplay
                          results={lookup.results}
                          vehicleInfo={{
                            year: lookup.year,
                            make: lookup.make,
                            model: lookup.model,
                            engine: lookup.engine,
                            drivetrain: lookup.drivetrain,
                            service_type: lookup.service_type
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}