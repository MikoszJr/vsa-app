import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Wrench, Video, FileText, ExternalLink, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export default function ResultsDisplay({ results, vehicleInfo }) {
  if (!results) return null;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Vehicle Summary */}
      <motion.div variants={item}>
        <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-bold text-white">
                {vehicleInfo.year} {vehicleInfo.make} {vehicleInfo.model}
              </h3>
              <Badge className="bg-blue-500 text-white border-0 px-3 py-1">
                {vehicleInfo.service_type}
              </Badge>
            </div>
            {vehicleInfo.engine && (
              <p className="text-slate-300 mt-2">{vehicleInfo.engine} • {vehicleInfo.drivetrain}</p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommended Parts */}
      {results.parts && results.parts.length > 0 && (
        <motion.div variants={item}>
          <Card className="border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Package className="w-6 h-6 mr-2 text-blue-600" />
                Recommended Parts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.parts.map((part, idx) => (
                <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-lg text-slate-900">{part.name}</h4>
                    <Badge className="bg-blue-100 text-blue-700 border-0">
                      #{idx + 1}
                    </Badge>
                  </div>
                  <p className="text-slate-600 text-sm mb-3 leading-relaxed">{part.description}</p>
                  
                  {part.retailers && part.retailers.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-2 mb-3">
                        <ShoppingCart className="w-4 h-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">Available at:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {part.retailers.map((retailer, ridx) => (
                          <a
                            key={ridx}
                            href={retailer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow"
                          >
                            {retailer.name}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Critical Specifications */}
      {results.specifications && (
        <motion.div variants={item}>
          <Card className="border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Wrench className="w-6 h-6 mr-2 text-blue-600" />
                Critical Specifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(results.specifications).map(([key, value], idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm font-medium text-slate-500 mb-1">
                      {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </div>
                    <div className="text-base font-semibold text-slate-900">
                      {typeof value === 'object' ? JSON.stringify(value) : value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Installation Videos & Guides */}
      {results.guides && results.guides.length > 0 && (
        <motion.div variants={item}>
          <Card className="border-0 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Video className="w-6 h-6 mr-2 text-blue-600" />
                Installation Videos & Guides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {results.guides.map((guide, idx) => (
                <a
                  key={idx}
                  href={guide.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                    {guide.type === 'video' ? (
                      <Video className="w-5 h-5 text-blue-600" />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">{guide.title}</h5>
                    <p className="text-sm text-slate-600 mb-2">{guide.description}</p>
                    {guide.url && (
                      <div className="text-xs text-blue-600 font-medium flex items-center gap-1">
                        <span>View Resource</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-600 flex-shrink-0 ml-2 transition-colors" />
                </a>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
