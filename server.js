const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});

// // server.js
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const apps = express();
// const server = http.createServer(apps);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });


// // the categories and the subcategory groupchat
// const categoryGroups = {
//   BestMediaOrganizationinEducationalAdvocacyNigeria:[
//     'Best Print Media Educational Advocacy Award', 
//     'Best Broadcast Media Educational Advocacy Award',
//     'Best Digital Media Educational Advocacy Award',
//   ],
//   BestCSRinEducationAfricaRegional: [
//     'Banking And Finance CSR in Education Award', 
//     'Telecommunications CSR in Education Award',
//     'Oil And Gas CSR in Education Award',
//     'Food And Beverages CSR in Education Award',
//     'Manufacturing CSR in Education Award',
//     'Aviation CSR in Education Award',
//     'Technology (ICT & Software) in Education Award',
//     'Construction CSR in Education Award',
//     'Commerce retail CSR in Education Award',
//     'Pharmaceuticals CSR in Education Award',
//     'Insurance CSR in Education Award',
//     'Conglomerates And Diversified Companies CSR in Education Award',
//     'TMedia And Entertainment CSR in Education Award',
//     'Agriculture And Agribusiness CSR in Education Award',
//     'Health Care And Hospitals CSR in Education Award',
//     'Professional Services CSR in Education Award',
//     'Fintech CSR in Education Award',
//     'Microfinance Banks CSR in Education Award',
//     'Emerging Telecommunications CSR in Education Award',
//     'Real Estate Development CSR in Education Award',
//     'Hotels CSR in Education Award',
//   ],
//   BestNGOContributiontoAchievingEducationforAllAfricaRegional: [
//     'Best Educational Infrastructure Initiative By An NGO', 
//     'Exceptional Donation Of Educational Materials By An NGO',
//     'Outstanding Donation Of Education Aid By NGO',
//     'Youth Empowerment Through Educational Services by an NGO in Nigeria',
//     'Women and Girl\'s Empowerment in Education by an NGO in Nigeria',
//   ],
//   CreativeArtsIndustryContributiontoEducationNigeria: [
//     'Best Nollywood Production And Artiste For Educational Content Award', 
//     'Best Music Industry Contribution To Education Award',
//     'Best Literature And Art Works For Education Award',
//     'Visual Arts and Educational Impact Award',
//     'Performing Arts and Education Enrichment Award',
//     'Film and Media for Educational Advancement Award',
//     'Creative Advocacy and Educational Campaigns Award',
//   ],
//   BestEduTechOrganizationAfrica: [
//     'Demo chat', 
//   ],
//   BestNGOContributiontoEducationNigeria: [
//     'Best Educational Infrastructure Initiative By An NGO', 
//     'Exceptional Donation Of Educational Materials By An NGO',
//     'Outstanding Donation Of Education Aid By NGO',
//     'Youth Empowerment Through Educational Services by an NGO in Nigeria',
//     'Women and Girl\'s Empowerment in Education by an NGO in Nigeria',
//   ],
//   BestCSRinEducationNigeria: [
//     'Demo chat', 
//   ],
//   AfricaneducationCSRAwardsBankingTelecomHealthcareMediaetc: [
//     'Banking And Finance CSR in Education Award', 
//     'Telecommunications CSR in Education Award',
//     'Oil And Gas CSR in Education Award',
//     'Food And Beverages CSR in Education Award',
//     'Manufacturing CSR in Education Award',
//     'Aviation CSR in Education Award',
//     'Technology (ICT & Software) in Education Award',
//     'Construction CSR in Education Award',
//     'Commerce retail CSR in Education Award',
//     'Pharmaceuticals CSR in Education Award',
//     'Insurance CSR in Education Award',
//     'Conglomerates And Diversified Companies CSR in Education Award',
//     'Media And Entertainment CSR in Education Award',
//     'Agriculture And Agribusiness CSR in Education Award',
//     'Health Care And Hospitals CSR in Education Award',
//     'Professional Services CSR in Education Award',
//     'Fintech CSR in Education Award',
//     'Microfinance Banks CSR in Education Award',
//     'Emerging Telecommunications CSR in Education Award',
//     'Real Estate Development CSR in Education Award',
//     'Hotels CSR in Education Award',
//   ],
//   BestEducationalFriendlyStateNigeriabyZone: [
//     'Best Education Initiative in North Central Zone Award', 
//     'Best Education Initiative in North East Zone Award', 
//     'Best Education Initiative in North West Zone Award', 
//     'Best Education Initiative in South East Zone Award', 
//     'Best Education Initiative in South South Zone Award', 
//     'Best Education Initiative in South West Zone Award', 
//   ],
//   BestLibraryinNigerianTertiaryInstitutions: [
//     'Best University Library in Nigeria (Public)', 
//     'Best University Library in Nigeria (Private)', 
//     'Best Polytechnic Library in Nigeria (Public)', 
//     'Best College of Education Library in Nigeria (Public)', 
//     'Best College of Nursing Library in Nigeria (Public)', 
//     'Best Polytechnic Library in Nigeria (Private)', 
//     'Best College of Education Library in Nigeria (Private)', 
//     'Best College of Nursing Library in Nigeria (Private)', 
//   ],
//   BestResearchInstitutionsinNigeria: [
//     'Best Agricultural Research Institute in Nigeria', 
//     'Best Pharmaceutical And Drug Research Institute in Nigeria', 
//     'Best Environmental And Ecological Research Institute in Nigeria', 
//   ],
//   AfricaLifetimeEducationIconRecognition: [
//     'Africa Education Philanthropy Icon Of The Decade (2014-2024)', 
//     'Literary And New Curriculum Advocate Africa Education Icon Of The Decade (2014-2024)', 
//     'Africa Technical Educator Icon Of The Decade (2014-2024)', 
//   ],
//   BestFaithBasedOrganizationinEducation404: [
//     'Demo chat',  
//   ],
//   BestPoliticalLeadersEducationalSupportServices: [
//     'Demo chat',  
//   ],
//   BestSTEMEducationChampion404: [
//     'Innovation In Educational Technology Award', 
//     'Excellence In E-Learning Solutions Award', 
//     'Best Use Of Artificial Intelligence In Education', 
//     'Outstanding Contribution To Digital Literacy Award', 
//     'Best Mobile Learning Solution Award', 
//   ],
//   DiasporaEducationImpactAwards404: [
//     'Demo chat', 
//   ],
//   BestInternationalandBilateralContributorstoEducation404: [
//     'Demo chat',   
//   ],
//   DiasporaContributionstoEducationinAfrica404: [
//     'Demo chat', 
//   ],
//   BestCorporateSocialResponsibilityCSRinEducationNigeria: [
//     'Banking And Finance CSR in Education Award', 
//     'Telecommunications CSR in Education Award', 
//     'Oil And Gas CSR in Education Award', 
//     'Food And Beverages CSR in Education Award', 
//     'Manufacturing CSR in Education Award', 
//     'Aviation CSR in Education Award', 
//     'Technology (ICT & Software) in Education Award', 
//     'Construction CSR in Education Award', 
//     'Commerce retail CSR in Education Award', 
//     'Pharmaceuticals CSR in Education Award', 
//     'Insurance CSR in Education Award', 
//     'Conglomerates And Diversified Companies CSR in Education Award', 
//     'Media And Entertainment CSR in Education Award', 
//     'Agriculture And Agribusiness CSR in Education Award', 
//     'Health Care And Hospitals CSR in Education Award', 
//     'Professional Services CSR in Education Award', 
//     'Fintech CSR in Education Award', 
//     'Microfinance Banks CSR in Education Award', 
//     'Emerging Telecommunications CSR in Education Award', 
//     'Real Estate Development CSR in Education Award', 
//     'Hotels CSR in Education Award', 
//   ],
//   BestCSRinEducationAfrica: [
//     'Banking And Finance CSR in Education Award', 
//     'Telecommunications CSR in Education Award', 
//     'Oil And Gas CSR in Education Award', 
//     'Food And Beverages CSR in Education Award', 
//     'Manufacturing CSR in Education Award', 
//     'Aviation CSR in Education Award', 
//     'Technology (ICT & Software) in Education Award', 
//     'Construction CSR in Education Award', 
//     'Commerce retail CSR in Education Award', 
//     'Pharmaceuticals CSR in Education Award', 
//     'Insurance CSR in Education Award', 
//     'Conglomerates And Diversified Companies CSR in Education Award', 
//     'Media And Entertainment CSR in Education Award', 
//     'Agriculture And Agribusiness CSR in Education Award', 
//     'Health Care And Hospitals CSR in Education Award', 
//     'Professional Services CSR in Education Award', 
//     'Fintech CSR in Education Award', 
//     'Microfinance Banks CSR in Education Award', 
//     'Emerging Telecommunications CSR in Education Award', 
//     'Real Estate Development CSR in Education Award', 
//     'Hotels CSR in Education Award', 
//   ],
//   AfricaEducationPhilanthropyIconOfTheDecade20142024: [
//     'Africa Education Philanthropy Icon Of The Decade (2014-2024)', 
//   ],
  
//   AfricaTechnicalEducatorIconOfTheDecade20142024: [
//     'Africa Technical Educator Icon Of The Decade (2014-2024)', 
//   ],

// };

// const roomMessages = {};
// const polls = {};

// // Initialize general room
// roomMessages['General Judges'] = [];

// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('join', ({ username, category }) => {
//     socket.username = username;
//     socket.category = category;

//     // Join General Judges room
//     socket.join('General Judges');
//     socket.emit('roomMessages', { room: 'General Judges', messages: roomMessages['General Judges'] });

//     // Initialize poll for General Judges if not exist
//     if (!polls['General Judges']) {
//       polls['General Judges'] = {
//         question: `Vote for the best in General Judges`,
//         options: ['Nominee A', 'Nominee B', 'Nominee C'],
//         votes: { 'Nominee A': 0, 'Nominee B': 0, 'Nominee C': 0 },
//       };
//     }
//     socket.emit('pollData', { room: 'General Judges', poll: polls['General Judges'] });

//     // Join category-specific rooms
//     const groups = categoryGroups[category] || [];
//     groups.forEach((group) => {
//       if (!roomMessages[group]) roomMessages[group] = [];
//       socket.join(group);
//       socket.emit('roomMessages', { room: group, messages: roomMessages[group] });

//       // Initialize poll for each group if not exist
//       if (!polls[group]) {
//         polls[group] = {
//           question: `Vote for the best in ${group}`,
//           options: ['Nominee A', 'Nominee B', 'Nominee C'],
//           votes: { 'Nominee A': 0, 'Nominee B': 0, 'Nominee C': 0 },
//         };
//       }
//       socket.emit('pollData', { room: group, poll: polls[group] });
//     });

//     // Send available rooms to client
//     socket.emit('availableRooms', ['General Judges', ...groups]);
//   });

//   // Handle incoming chat messages
//   socket.on('sendMessage', ({ room, message }) => {
//     const msg = { username: socket.username, text: message, timestamp: new Date() };
//     if (!roomMessages[room]) roomMessages[room] = [];
//     roomMessages[room].push(msg);
//     io.to(room).emit('message', { room, message: msg });
//   });

//   // Handle votes
//   socket.on('vote', ({ room, option }) => {
//     if (polls[room] && polls[room].votes[option] !== undefined) {
//       polls[room].votes[option]++;
//       io.to(room).emit('pollData', { room, poll: polls[room] });
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// server.listen(4000, () => {
//   console.log('Socket.IO server running on port 4000');
// });
