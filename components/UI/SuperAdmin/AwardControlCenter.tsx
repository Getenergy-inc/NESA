
// "use client";

// import { FC } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/U-I/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/U-I/card";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/U-I/table";

const AwardControlCenter: React.FC = () => {
  return (
    <></>
//     <div className="space-y-6 p-4"
//               style={{
//           backgroundImage: "url('/images/nesa-card.png')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}>
//       <h1 className="text-2xl font-bold">🧾 Award Super Category Control Center</h1>

//       <Tabs defaultValue="blue-garnet" className="w-full">
//         <TabsList className="mb-6">
//           <TabsTrigger value="blue-garnet">🔷 Blue Garnet</TabsTrigger>
//           <TabsTrigger value="gold-certificate">🟨 Gold Certificate</TabsTrigger>
//           <TabsTrigger value="platinum">🟩 Platinum Certificate</TabsTrigger>
//         </TabsList>

//         {/* 🔷 Blue Garnet */}
//         <TabsContent value="blue-garnet" className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <Card>
//               <CardHeader><CardTitle>Total Nominations</CardTitle></CardHeader>
//               <CardContent><p className="text-2xl font-bold">120</p></CardContent>
//             </Card>
//             <Card>
//               <CardHeader><CardTitle>Public vs Internal</CardTitle></CardHeader>
//               <CardContent>
//                 <Progress value={70} className="w-full" />
//                 <p className="text-sm mt-2">70% Public / 30% Internal</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader><CardTitle>Status</CardTitle></CardHeader>
//               <CardContent className="flex gap-2">
//                 <Badge variant="outline">Accepted</Badge>
//                 <Badge variant="secondary">Pending</Badge>
//                 <Badge variant="destructive">Rejected</Badge>
//               </CardContent>
//             </Card>
//           </div>

//           <Card>
//             <CardHeader><CardTitle>Nominee List</CardTitle></CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Nomination Type</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Assigned Judge</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   <TableRow>
//                     <TableCell>Jane Doe</TableCell>
//                     <TableCell>Public</TableCell>
//                     <TableCell><Badge variant="outline">Accepted</Badge></TableCell>
//                     <TableCell>Judge A</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>John Smith</TableCell>
//                     <TableCell>Internal</TableCell>
//                     <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
//                     <TableCell>Judge B</TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* 🟨 Gold Certificate */}
//         <TabsContent value="gold-certificate" className="space-y-4">
//           <Accordion type="single" collapsible className="w-full">
//             {Array.from({ length: 3 }).map((_, i) => (
//               <AccordionItem key={i} value={`category-${i}`}>
//                 <AccordionTrigger>Category {i + 1} (Expandable)</AccordionTrigger>
//                 <AccordionContent>
//                   <div className="space-y-4">
//                     <p className="font-medium">Subcategories: 10</p>
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Nominee</TableHead>
//                           <TableHead>Votes</TableHead>
//                           <TableHead>AGC Earned</TableHead>
//                           <TableHead>Judge Comment</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         <TableRow>
//                           <TableCell>Alice</TableCell>
//                           <TableCell>540</TableCell>
//                           <TableCell>120 AGC</TableCell>
//                           <TableCell>Strong impact</TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell>Michael</TableCell>
//                           <TableCell>320</TableCell>
//                           <TableCell>85 AGC</TableCell>
//                           <TableCell>Needs more docs</TableCell>
//                         </TableRow>
//                       </TableBody>
//                     </Table>
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </TabsContent>

//         {/* 🟩 Platinum Certificate */}
//         <TabsContent value="platinum" className="space-y-4">
//           <Accordion type="single" collapsible className="w-full">
//             {Array.from({ length: 2 }).map((_, i) => (
//               <AccordionItem key={i} value={`institution-${i}`}>
//                 <AccordionTrigger>Institutional Category {i + 1}</AccordionTrigger>
//                 <AccordionContent>
//                   <div className="space-y-4">
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Nominee</TableHead>
//                           <TableHead>Submission</TableHead>
//                           <TableHead>Documentation Score</TableHead>
//                           <TableHead>ESG/SDG</TableHead>
//                           <TableHead>Review Status</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         <TableRow>
//                           <TableCell>Org A</TableCell>
//                           <TableCell>Uploaded</TableCell>
//                           <TableCell><Progress value={80} /></TableCell>
//                           <TableCell>
//                             <Badge>ESG</Badge> <Badge variant="outline">SDG</Badge>
//                           </TableCell>
//                           <TableCell><Badge variant="outline">Approved</Badge></TableCell>
//                         </TableRow>
//                         <TableRow>
//                           <TableCell>Org B</TableCell>
//                           <TableCell>Missing Docs</TableCell>
//                           <TableCell><Progress value={40} /></TableCell>
//                           <TableCell>
//                             <Badge variant="secondary">SDG</Badge>
//                           </TableCell>
//                           <TableCell><Badge variant="destructive">Pending</Badge></TableCell>
//                         </TableRow>
//                       </TableBody>
//                     </Table>
//                   </div>
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </TabsContent>
//       </Tabs>
//     </div>
  );
};

export default AwardControlCenter;
