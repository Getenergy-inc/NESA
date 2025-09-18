"use client";

import React from "react";
import { useHasMounted } from "@/hooks/useHasMounted";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/U-I/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/U-I/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/U-I/accordion";
import { Progress } from "@/components/U-I/progress";
import { Badge } from "@/components/U-I/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/U-I/table";
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AwardControlCenter: React.FC = () => {
  const mounted = useHasMounted();
  if (!mounted) return null;

  return (
    <motion.div
      className="space-y-6 p-4 sm:p-6 min-h-screen shadow-md backdrop-blur-sm"
      style={{
        backgroundImage: "url('/images/nesa-card.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Heading */}
      <motion.h1
        className="text-xl sm:text-2xl font-extrabold text-white dark:text-white flex items-center gap-2"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        🧾 Award Super Category Control Center
      </motion.h1>

      {/* Tabs */}
      <Tabs defaultValue="blue-garnet" className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2 sm:gap-4 bg-white/60 dark:bg-gray-800 rounded-lg p-2">
          <TabsTrigger value="blue-garnet" className="px-3 py-2 text-sm rounded-lg font-semibold">
            🔷 Blue Garnet
          </TabsTrigger>
          <TabsTrigger value="gold-certificate" className="px-3 py-2 text-sm rounded-lg font-semibold">
            🟨 Gold Certificate
          </TabsTrigger>
          <TabsTrigger value="platinum" className="px-3 py-2 text-sm rounded-lg font-semibold">
            🟩 Platinum Certificate
          </TabsTrigger>
        </TabsList>

        {/* 🔷 Blue Garnet */}
        <TabsContent value="blue-garnet" className="space-y-6">
          <AnimatePresence>
            <motion.div
              key="blue-garnet-content"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <motion.div variants={fadeInUp} transition={{ delay: 0.1 }}>
                  <Card className="bg-white/60 dark:bg-gray-900 shadow-md">
                    <CardHeader>
                      <CardTitle>Total Nominations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl sm:text-3xl font-bold text-orange-600">120</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
                  <Card className="bg-white/60 dark:bg-gray-900 shadow-md">
                    <CardHeader>
                      <CardTitle>Public vs Internal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={70} className="w-full h-2" />
                      <p className="text-xs sm:text-sm mt-3 text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-blue-600">70% Public</span> / 30% Internal
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeInUp} transition={{ delay: 0.3 }}>
                  <Card className="bg-white/60 dark:bg-gray-900 shadow-md">
                    <CardHeader>
                      <CardTitle>Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-2 flex-wrap">
                      <Badge variant="outline">Accepted</Badge>
                      <Badge variant="secondary">Pending</Badge>
                      <Badge variant="destructive">Rejected</Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Table (Scrollable on Mobile) */}
              <Card className="bg-white/60 dark:bg-gray-900 shadow-md">
                <CardHeader>
                  <CardTitle>Nominee List</CardTitle>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Nomination Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Assigned Judge</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Jane Doe</TableCell>
                        <TableCell>Public</TableCell>
                        <TableCell>
                          <Badge variant="outline">Accepted</Badge>
                        </TableCell>
                        <TableCell>Judge A</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>John Smith</TableCell>
                        <TableCell>Internal</TableCell>
                        <TableCell>
                          <Badge variant="secondary">Pending</Badge>
                        </TableCell>
                        <TableCell>Judge B</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* 🟨 Gold Certificate */}
        <TabsContent value="gold-certificate">
          <AnimatePresence>
            <motion.div
              key="gold-certificate-content"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <Accordion type="single" collapsible className="w-full">
                {Array.from({ length: 3 }).map((_, i) => (
                  <AccordionItem key={i} value={`category-${i}`}>
                    <AccordionTrigger className="font-semibold text-base sm:text-lg">
                      Category {i + 1} (Expandable)
                    </AccordionTrigger>
                    <AccordionContent>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4 overflow-x-auto"
                      >
                        <p className="font-medium text-gray-700 dark:text-gray-300">
                          Subcategories: 10
                        </p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nominee</TableHead>
                              <TableHead>Votes</TableHead>
                              <TableHead>AGC Earned</TableHead>
                              <TableHead>Judge Comment</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Alice</TableCell>
                              <TableCell>540</TableCell>
                              <TableCell>120 AGC</TableCell>
                              <TableCell>Strong impact</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Michael</TableCell>
                              <TableCell>320</TableCell>
                              <TableCell>85 AGC</TableCell>
                              <TableCell>Needs more docs</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </TabsContent>

        {/* 🟩 Platinum Certificate */}
        <TabsContent value="platinum">
          <AnimatePresence>
            <motion.div
              key="platinum-content"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <Accordion type="single" collapsible className="w-full">
                {Array.from({ length: 2 }).map((_, i) => (
                  <AccordionItem key={i} value={`institution-${i}`}>
                    <AccordionTrigger className="font-semibold text-base sm:text-lg">
                      Institutional Category {i + 1}
                    </AccordionTrigger>
                    <AccordionContent>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4 overflow-x-auto"
                      >
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nominee</TableHead>
                              <TableHead>Submission</TableHead>
                              <TableHead>Documentation Score</TableHead>
                              <TableHead>ESG/SDG</TableHead>
                              <TableHead>Review Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>Org A</TableCell>
                              <TableCell>Uploaded</TableCell>
                              <TableCell>
                                <Progress value={80} />
                              </TableCell>
                              <TableCell>
                                <Badge>ESG</Badge>{" "}
                                <Badge variant="outline">SDG</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">Approved</Badge>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Org B</TableCell>
                              <TableCell>Missing Docs</TableCell>
                              <TableCell>
                                <Progress value={40} />
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary">SDG</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="destructive">Pending</Badge>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default AwardControlCenter;
