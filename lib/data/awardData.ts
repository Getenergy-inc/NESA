export interface Nominee {
  name: string;
  image: string;
  achievement: string;
  state?: string;
  country?: string;
}

export interface SubCategory {
  title: string;
  description: string;
  nominees: Nominee[];
}

export interface Region {
  name: string;
  subCategories: SubCategory[];
}
export interface Category {
  title: string;
  description: string;
  regions?: Region[];
  subCategories?: SubCategory[];
}
  export const categories: Category[] = [
    {
      "title": "Africa Lifetime Education Icon Special Recognition Award",
      "description": "The Africa Lifetime Education Icon Special Recognition Award is the pinnacle of the NESA-Africa awards and the Santos Creations Educational Foundation. Envisioned as the Africa education advocacy Nobel award recognition, this prestigious accolade honors individuals from around the world who have dedicated their lives to advancing sustainable education for all in Africa, aligning with the United Nations Sustainable Development Goal 4 (SDG 4) - Quality Education.",
      "subCategories": [
        {
          "title": "Africa Education Philanthropy Icon Of The Decade (2014-2024)",
          "description": "Honors significant philanthropic contributions that have improved educational access and quality, advancing SDG 4's targets.",
          "nominees": [
            { "name": "Aliko Dangote", "image": "/images/africaicons/aliko-dangote.png", "achievement": "Established the 'Dangote Foundation' in 1993, which has invested millions in educational causes across Africa." },
            { "name": "Mo Ibrahim", "image": "/images/africaicons/mo-ibrahim.png", "achievement": "Founded the 'Mo Ibrahim Foundation' in 2006, supporting governance and leadership in Africa." },
            { "name": "Strive Masiyiwa", "image": "/images/africaicons/strive-masiyiwa.png", "achievement": "Established the 'Higher Life Foundation' in 1996, providing scholarships to over 250,000 African students." },
            { "name": "Folorunso Alakija", "image": "/images/africaicons/Folorunso-alakija.png", "achievement": "Established the 'Rose of Sharon Foundation' in 2008, providing scholarships and educational support to widows and orphans." },
            { "name": "Patrice Motsepe", "image": "/images/africaicons/patrice-motsepe.png", "achievement": "Founded the 'Motsepe Foundation' in 1999, focusing on education, scholarships, and school infrastructure in South Africa." },
            { "name": "Tony Elumelu", "image": "/images/africaicons/tony-elumelu.png", "achievement": "Established the 'Tony Elumelu Foundation' in 2010, providing scholarships and promoting entrepreneurship education across Africa." },
            { "name": "Isabel dos Santos", "image": "/images/africaicons/isabel-dos-santos.png", "achievement": "Founded the 'Isabel dos Santos Foundation' in 2014, which has funded educational projects and scholarships in Angola." },
            { "name": "Nassef Sawiris", "image": "/images/africaicons/nassef-sawiris.png", "achievement": "Founded the 'Sawiris Foundation for Social Development' in 2001, supporting higher education and scholarships in Egypt." },
            { "name": "Osei Kwame", "image": "/images/africaicons/osei-kwame.png", "achievement": "Founded the 'Despite Foundation,' supporting education through scholarships and school building projects in Ghana." },
            { "name": "Tsitsi Masiyiwa", "image": "/images/africaicons/tsitsi-masiyiwa.png", "achievement": "Co-founded the 'Capernaum Trust' in 1996, providing scholarships and educational support to orphans and vulnerable children." }
          ]
        },
        {
          "title": "Literary And New Curriculum Advocate Africa Education Icon Of The Decade (2014-2024)",
          "description": "Honors significant contributions to literature and curriculum development in African education.",
          "nominees": [
            { "name": "Ngugi wa Thiong'o", "image": "/images/africaicons/ngugi-wa-thiongo.png", "achievement": "Founded the 'Ngugi wa Thiong'o Foundation' in 1980, promoting indigenous languages in education in Kenya." },
            { "name": "Chinua Achebe", "image": "/images/africaicons/chinua-achebe.png", "achievement": "Founded the 'Chinua Achebe Foundation' in 1990, promoting African literature and supporting literary education (posthumously)." },
            { "name": "Mariama Ba", "image": "/images/africaicons/mariama-ba.png", "achievement": "Established the 'Mariama Ba School' in 1979, a beacon of girls' education in Senegal." },
            { "name": "Chris Abani", "image": "/images/africaicons/chris-abani.png", "achievement": "Dedication to improving rural education, particularly for girls, demonstrating a significant impact on her community." },
            { "name": "Buchi Emecheta", "image": "/images/africaicons/buchi-emecheta.png", "achievement": "Dedication to improving rural education, particularly for girls, demonstrating a significant impact on her community." },
            { "name": "Chimamanda Ngozi Adichie", "image": "/images/africaicons/chimamanda-ngozi-adichie.png", "achievement": "Founded the 'Farafina Trust' in 2008, promoting literary education and supporting young writers in Nigeria." },
            { "name": "Wole Soyinka", "image": "/images/africaicons/wole-soyinka.png", "achievement": "Established the 'Wole Soyinka Centre for Investigative Journalism' in 2004, promoting media literacy and education in Nigeria." },
            { "name": "Ama Ata Aidoo", "image": "/images/africaicons/ama-ata-aidoo.png", "achievement": "Founded the 'Mbaasem Foundation' in 2000, supporting the development of African women writers and promoting literacy in Ghana." },
            { "name": "Nnedi Okorafor", "image": "/images/africaicons/nnedi-okorafor.png", "achievement": "Co-founded the 'African Speculative Fiction Society' in 2016, promoting African literature in science fiction and fantasy." },
            { "name": "Teju Cole", "image": "/images/africaicons/teju-cole.png", "achievement": "Founded the 'Teju Cole Literary Project' in 2010, promoting literature and creative writing in Nigeria." }
          ]
        },
        {
          "title": "Africa Technical Educator Icon Of The Decade (2014-2024)",
          "description": "Recognizes outstanding contributions to technical education in Africa.",
          "nominees": [
            { "name": "Patrick Awuah", "image": "/images/africaicons/patrick-awuah.png", "achievement": "Founder of 'Ashesi University' in 2002, which emphasizes leadership, ethics, and entrepreneurship in its technical and liberal arts education." },
            { "name": "Ndidi Nwuneli", "image": "/images/africaicons/ndidi-nwuneli.png", "achievement": "Co-founder of 'LEAP Africa' in 2002, which focuses on leadership and life skills training for young people." },
            { "name": "Fred Swaniker", "image": "/images/africaicons/fred-swaniker.png", "achievement": "Founder of 'African Leadership University' in 2015, a network of tertiary institutions focused on developing Africa's next generation of leaders." },
            { "name": "Oluseun Onigbinde", "image": "/images/africaicons/oluseun-onigbinde.png", "achievement": "Co-founder of 'BudgIT' in 2011, which uses data to drive education in governance and public policy." },
            { "name": "Bright Simons", "image": "/images/africaicons/bright-simons.png", "achievement": "Founder of 'mPedigree' in 2007, an organization that uses mobile technology to enhance healthcare and education services." },
            { "name": "Rebecca Enonchong", "image": "/images/africaicons/rebecca-enonchong.png", "achievement": "Founder of 'AppsTech' in 1999, which provides enterprise application solutions and has supported IT education in Africa." },
            { "name": "Judith Owigar", "image": "/images/africaicons/judith-owigar.png", "achievement": "Co-founder of 'AkiraChix' in 2010, which empowers young women in Kenya through technical training in software development." },
            { "name": "Tunde Kehinde", "image": "/images/africaicons/tunde-kehinde.png", "achievement": "Co-founder of 'Lidya' in 2016, a digital financial services platform that provides financial literacy and resources to small businesses in Africa." },
            { "name": "Iyinoluwa Aboyeji", "image": "/images/africaicons/iyinoluwa-aboyeji.png", "achievement": "Co-founder of 'Flutterwave' in 2016, supporting fintech education and training across Africa." },
            { "name": "Audrey Cheng", "image": "/images/africaicons/audrey-cheng.png", "achievement": "Founder of 'Moringa School' in 2014, a Nairobi-based technology and coding bootcamp training the next generation of software developers." }
          ]
        }
      ]
    },
      
    {
      "title": "Best NGO Education Support Recognition Award",
      "description": "This award recognizes non-governmental organizations (NGOs) that have made outstanding contributions to education in Africa through various initiatives and support programs.",
      "subCategories": [
        {
          "title": "Best Educational Infrastructure Initiative By An NGO",
          "description": "This award honors NGOs that have made substantial effort in improving or building educational infrastructure. It includes initiatives like constructing schools, libraries, and other educational facilities.",
          "nominees": [
            { "name": "Teach For Nigeria", "image": "/images/ngo/teach-for-nigeria.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Slum2School Africa", "image": "/images/ngo/slum2school.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "ActionAid Nigeria", "image": "/images/ngo/actionaid.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Plan International Nigeria", "image": "/images/ngo/plan-international-nigeria.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Malala Fund Nigeria", "image": "/images/ngo/malala-fund.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Girl Child Education Initiative", "image": "/images/ngo/girl-child-initiative.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Universal Learning Solutions", "image": "/images/ngo/universal-learning-solutions.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Bridge International Academies", "image": "/images/ngo/bridge.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Save the Children Nigeria", "image": "/images/ngo/save-the-children.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "UNICEF Nigeria", "image": "/images/ngo/unicef.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." }
          ]
        },
        {
          "title": "Exceptional Donation Of Educational Materials By An NGO",
          "description": "Recognizing NGOs that have significantly contributed educational material to schools and educational institutions like books, computers, and other learning resources.",
          "nominees": [
            { "name": "Nigeria Youth Futures Fund", "image": "/images/ngo/nigeria-youth-futures-fund.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "One Million Teachers", "image": "/images/ngo/one-million-teachers.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "The Education Partnership (TEP)", "image": "/images/ngo/the-education-partnership.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Street Child Nigeria", "image": "/images/ngo/street-child.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Educate Nigeria Initiative", "image": "/images/ngo/educate-nigeria-initiative.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "LEAP Africa", "image": "/images/ngo/leap-africa.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Young Educators Foundation", "image": "/images/ngo/young-educators-foundation.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "The Tony Elumelu Foundation", "image": "/images/ngo/the-tony-elumelu-foundation.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "YEDBC (Yaba Educators Centre for In)", "image": "/images/ngo/yedbc.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Oando Foundation", "image": "/images/ngo/oando-foundation.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." }
          ]
        },
        {
          "title": "Outstanding Donation Of Education Aid By NGO",
          "description": "Celebrates NGOs that provide substantial educational aid, which can include scholarships, funding for educational programs, support for teachers, and other forms of financial assistance.",
          "nominees": [
            { "name": "Paradigm Initiative", "image": "/images/ngo/paradigm-initiative.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "MANI (Maternal and Child Survival Program)", "image": "/images/ngo/mani.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "STEM Nigeria Direct", "image": "/images/ngo/stem-nigeria-direct.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "Tech4Dev (Technology for Social G)", "image": "/images/ngo/tech4dev.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "REACH Initiative International", "image": "/images/ngo/reach-initiative-international.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "KnowledgeAid Initiative", "image": "/images/ngo/knowledgeaid-initiative.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "YISA (Youth Initiative for Sustain)", "image": "/images/ngo/yisa.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "SkillNG", "image": "/images/ngo/saind.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "AYECI (African Youth Initiative on)", "image": "/images/ngo/save-the-children.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." },
            { "name": "EVA (The Education As A Vaccine In)", "image": "/images/ngo/eva.png", "achievement": "Significant contributions to improving rural education, particularly for girls, demonstrating a significant impact on their community." }
          ]
        },
        {
          "title": "Youth Empowerment Through Educational Services By An NGO In Nigeria",
          "description": "Recognizes NGOs that have implemented innovative programs to empower youth through education and skill development.",
          "nominees": [
            { "name": "Youth for Technology Foundation", "image": "/images/ngo/youth-for-technology.png", "achievement": "Provided technology training and entrepreneurship education to young people in Nigeria. Empowered over 20,000 youths wi..." },
            { "name": "Junior Achievement Nigeria (JAN)", "image": "/images/ngo/junior-achievement.png", "achievement": "Implemented educational programs that empowered youths with financial literacy and workforce readiness for youths, reache..." },
            { "name": "YALI Network Nigeria", "image": "/images/ngo/yali-network.png", "achievement": "Provided leadership and professional development opportunities for young Nigerians through the Young African Leaders Initiative..." },
            { "name": "AIESEC Nigeria", "image": "/images/ngo/aiesec.png", "achievement": "Offered international exchange programs that provide young people with leadership opportunities, global internships, and socia..." },
            { "name": "Girls Education Mission International (GEM)", "image": "/images/ngo/girls-education-mission.png", "achievement": "Focused on empowering young girls through education, providing scholarships, mentorship, and advocacy for girls' rights. I..." },
            { "name": "Rise Network", "image": "/images/ngo/rise-network.png", "achievement": "Facilitated career development, mentorship, and skills training for young people in Nigeria. Supported over 35,000 young Nige..." },
            { "name": "Jobberman Nigeria", "image": "/images/ngo/jobberman.png", "achievement": "Offered job training and placement services for young Nigerians, bridging the gap between job seekers and employers. Trained..." },
            { "name": "Young African Leadership Initiative (YALI) Nigeria", "image": "/images/ngo/yali.png", "achievement": "Empowered young Nigerians through leadership training, civic engagement, and professional development programs. Impac..." },
            { "name": "YouthHubAfrica", "image": "/images/ngo/youthhub-africa.png", "achievement": "Supported youth-driven initiatives for social change and education, providing platforms for young voices to be heard in Nigeri..." },
            { "name": "Youth Mentoring Initiative for Youth Empowerment (MIYE)", "image": "/images/ngo/youth-mentoring-initiative.png", "achievement": "Guided young people through mentorship and educational programs, focusing on leadership and personal development. Ment..." }
          ]
        },
        {
          "title": "Women And Girls' Empowerment In Education By An NGO In Nigeria",
          "description": "Honors NGOs that have made significant contributions to empowering women and girls through educational initiatives.",
          "nominees": [
            { "name": "Girls Education Mission International (GEM)", "image": "/images/ngo/girls-education-mission.png", "achievement": "Provided educational scholarships, mentorship, and advocacy for the education of girls in northern Nigeria. Empowered over..." },
            { "name": "ActionAid Nigeria", "image": "/images/ngo/actionaid.png", "achievement": "Implemented the Safe Cities for Women and Girls initiative. Advocated for educational programs to empower women and girls, focu..." },
            { "name": "Educate Girls Nigeria", "image": "/images/ngo/educate-girls.png", "achievement": "Focused on enrolling and retaining girls in school, especially in rural and underserved communities. Increased school enrollmen..." },
            { "name": "Women's Rights Advancement and Protection Alternative (WRAPA)", "image": "/images/ngo/wrapa.png", "achievement": "Provided education and vocational training for women and girls, particularly those affected by gender-based violence. Empow..." },
            { "name": "Girl Child Concerns (GCC)", "image": "/images/ngo/girl-child-concerns.png", "achievement": "Implemented initiatives focused on the education and empowerment of adolescent girls in northern Nigeria. Supported the educ..." },
            { "name": "Women for Women International Nigeria", "image": "/images/ngo/women-for-women.png", "achievement": "Provided educational programs, vocational skills training, and support to women survivors of conflict. Empowered over 20,000..." },
            { "name": "Baobab for Women's Human Rights", "image": "/images/ngo/baobab.png", "achievement": "Focused on educating women and girls about their rights, including the right to education. Provided literacy programs for wom..." },
            { "name": "Centre for Girls Education (CGE)", "image": "/images/ngo/centre-for-girls-education.png", "achievement": "Implemented programs to educate and empower girls in rural northern Nigeria, focusing on literacy and life skills. Improved..." },
            { "name": "Tech4Dev Women's Empowerment Program", "image": "/images/ngo/tech4dev.png", "achievement": "Educated young women in digital skills and entrepreneurship, helping them to access better job opportunities. Trained over 5,000..." },
            { "name": "Association of Nigerian Women Entrepreneurs (ANWE)", "image": "/images/ngo/anwep.png", "achievement": "Promoted education and entrepreneurship for women and girls, providing resources and support for business startups. Empowered o..." }
          ]
        }
      ]
    },
  
  
      {
        "title": "Africa Diaspora association Educational Impact Projects Recognition Award in Africa",
        "description": "Honoring the significant contributions made by diaspora organizations towards achieving \"Education for all\" across the African Continent.",
        "subCategories": [
          {
            "title": "The Best Diaspora-Led Educational Infrastructure Project in Africa",
            "description": "This category celebrates diaspora organizations that have created significant educational infrastructure, advancing the quality of education across Africa.",
            "nominees": [
              {
                "name": "Nigerian Association in the UK",
                "achievement": "Constructed a science and technology center in Osun State, Nigeria, fully equipped with modern laboratories and classrooms.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Nigerian_Association_in_the_UK.png"
              },
              {
                "name": "Ghanaian Association of Washington",
                "achievement": "Built a community library and learning center in Kumasi, Ghana, with a focus on providing access to books and digital resources.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Ghanaian_Association_of_Washington.png"
              },
              {
                "name": "Kenyan Diaspora Alliance",
                "achievement": "Constructed three primary schools in rural areas of Kenya, including the provision of solar power and internet access.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Kenyan_Diaspora_Alliance.png"
              },
              {
                "name": "Ethiopian Diaspora Fellowship",
                "achievement": "Renovated dilapidated schools in Addis Ababa, Ethiopia, including upgrading classrooms, sanitation facilities, and playgrounds.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Ethiopian_Diaspora_Fellowship.png"
              },
              {
                "name": "South African Diaspora United",
                "achievement": "Funded the construction of a multi-purpose education and sports complex in Soweto, South Africa. Provided a safe space for learning and recreation.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/South_African_Diaspora_United.png"
              },
              {
                "name": "Ugandan North American Association",
                "achievement": "Built a secondary school in Gulu, Uganda, focusing on regions recovering from conflict. Provided quality education to over 500 students.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Ugandan_North_American_Association.png"
              },
              {
                "name": "Zimbabwean Diaspora Network",
                "achievement": "Led the refurbishment of schools in Matabeleland, Zimbabwe, including the installation of computer labs and solar power systems.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Zimbabwean_Diaspora_Network.png"
              },
              {
                "name": "Senegalese Association in France",
                "achievement": "Funded the construction of a vocational training center in Dakar, Senegal, focusing on trades such as carpentry, plumbing, and electrical work.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Senegalese_Association_in_France.png"
              },
              {
                "name": "Tanzanian Community in the USA",
                "achievement": "Established digital learning hubs in rural Tanzania, providing internet access and e-learning tools to underserved communities.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Tanzanian_Community_in_the_USA.png"
              },
              {
                "name": "Congolese Diaspora Impact Group",
                "achievement": "Built a school complex in Kinshasa, Democratic Republic of the Congo, including classrooms, a library, and a computer lab.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Congolese_Diaspora_Impact_Group.png"
              }
            ]
          },
          {
            "title": "The Best Diaspora-Led Educational Program Innovation in Africa",
            "description": "This category recognizes innovative educational programs initiated by diaspora organizations that have significantly impacted learning outcomes in Africa.",
            "nominees": [
              {
                "name": "African Diaspora Network (ADN)",
                "achievement": "Developed an e-learning platform that offers free access to STEM courses for students across Africa. Trained 5,000 teachers across the continent.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/African_Diaspora_Network.png"
              },
              {
                "name": "Sierra Leonean Empowerment Network",
                "achievement": "Reached over 10,000 students in multiple countries, significantly improving their understanding and performance in science subjects.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Sierra_Leonean_Empowerment_Network.png"
              },
              {
                "name": "African Leadership Academy Alumni",
                "achievement": "Designed an after-school leadership program that fosters entrepreneurial skills among African youth. Over 1,000 students have participated.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/African_Leadership_Academy_Alumni.png"
              },
              {
                "name": "Nigerian Diaspora Direct Investment Summit",
                "achievement": "Introduced a mentorship and investment program for young entrepreneurs in Nigeria, combining educational resources with financial support.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Nigerian_Diaspora_Direct_Investment_Summit.png"
              },
              {
                "name": "Somali Diaspora Youth",
                "achievement": "Developed a distance learning program that connects Somali students in rural areas with diaspora educators via virtual classrooms.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Somali_Diaspora_Youth.png"
              },
              {
                "name": "Eritrean Diaspora Initiative",
                "achievement": "Launched a digital literacy program that provides Eritrean students with essential IT skills, including coding and digital communication.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Eritrean_Diaspora_Network.png"
              },
              {
                "name": "Moroccan American Network",
                "achievement": "Established a bilingual education program that supports French and Arabic literacy in Moroccan schools using digital tools.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Moroccan_American_Network.png"
              },
              {
                "name": "Ghana Diaspora Professional Network",
                "achievement": "Developed an IT skills training program focused on coding, web development, and digital marketing for Ghanaian youth.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Ghana_Diaspora_Professional_Network.png"
              },
              {
                "name": "Botswana Educational Foundation",
                "achievement": "Introduced an environmental education program that teaches sustainable practices and conservation in Botswana's schools.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Botswana_Educational_Foundation.png"
              },
              {
                "name": "Liberian Diaspora Education Fund",
                "achievement": "Implemented an after-school tutoring and mentorship program in Liberia, focusing on literacy and numeracy skills. Improved academic performance for over 5,000 students.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Liberian_Diaspora_Education_Fund.png"
              }
            ]
          },
          {
            "title": "The Best Diaspora-Led Teacher Training And Support Initiative in Africa",
            "description": "This category honors diaspora-led initiatives that have significantly improved teacher training and support across Africa.",
            "nominees": [
              {
                "name": "African Teacher Foundation",
                "achievement": "Delivered a teacher training program covering modern pedagogical methods, classroom management, and technology integration.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/African_Teacher_Foundation.png"
              },
              {
                "name": "Diaspora African Women in Education (DAWIE)",
                "achievement": "Established a mentorship program connecting female educators in Africa with experienced teachers abroad. Empowered 2,000 women in education.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Diaspora_African_Women_in_Education.png"
              },
              {
                "name": "Zimbabwean Teachers Association Abroad",
                "achievement": "Launched a continuous professional development program for Zimbabwean teachers, focusing on curriculum development and modern teaching methods.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Zimbabwean_Teachers_Association_Abroad.png"
              },
              {
                "name": "Ghanaian Teachers in Diaspora",
                "achievement": "Developed an annual teacher training conference in Accra, Ghana, featuring workshops on best practices in education and technology integration.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Ghanaian_Teachers_in_Diaspora.png"
              },
              {
                "name": "Ugandan Teachers' Network",
                "achievement": "Implemented a peer-to-peer support network for Ugandan teachers, offering resources, mentorship, and collaborative professional development.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Ugandan_Teachers_Network.png"
              },
              {
                "name": "Malawian Diaspora Teaching Initiative",
                "achievement": "Conducted teacher training workshops focusing on inclusive education and teaching students with special needs. Trained over 1,000 educators.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Malawian_Diaspora_Teaching_Initiative.png"
              },
              {
                "name": "Sierra Leone Teachers Abroad Network",
                "achievement": "Provided remote training and resources for teachers in Sierra Leone, focusing on post-conflict education and trauma-informed teaching practices.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Sierra_Leone_Teachers_Abroad_Network.png"
              },
              {
                "name": "Ethiopian Education Foundation",
                "achievement": "Established a teacher exchange program that brings Ethiopian educators to the United States for training in STEM education. Improved science and math instruction in over 100 Ethiopian schools.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Ethiopian_Education_Foundation.png"
              },
              {
                "name": "South Sudanese Educators Abroad",
                "achievement": "Developed a peace education curriculum and trained teachers in South Sudan on conflict resolution and peacebuilding. Trained over 500 educators.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/South_Sudanese_Educators_Abroad.png"
              },
              {
                "name": "Zambian Diaspora Education Trust",
                "achievement": "Developed a STEM-focused teacher training initiative, providing resources and training to Zambian teachers. Trained 1,500 teachers in innovative science and math instruction methods.",
                "state": "Lagos, Nigeria",
                "country": "Nigeria",
                "image": "/images/diaspora/Zambian_Diaspora_Education_Trust.png"
              }
            ]
          }
        ]
      },
  
  
      {
        title: "The Overall Best CSR for Education in Nigeria Award 2024",
        description: "Honoring corporate social responsibility by banks, telecommunications, and other sectors, and showing their impactful CSR initiatives that have ...",
        subCategories: [
          {
            title: "Banking And Finance CSR in Education Award",
            description: "Recognizes financial institutions for their initiatives in supporting education.",
            nominees: [
              { name: "Access Bank", image: "/images/csricons/access.png", achievement: "Launched the 'Access Bank School Adoption Program' to renovate schools and provide learning materials." },
              { name: "First Bank of Nigeria", image: "/images/csricons/firstbank.png", achievement: "Sponsored the 'SPARK' initiative for mentoring and career development in schools." },
              { name: "Zenith Bank", image: "/images/csricons/zenith.png", achievement: "Funded ICT labs in several public schools across Nigeria. Provided scholarships for underprivileged students in tertiary institutions." },
              { name: "GTBank", image: "/images/csricons/gtb.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
              { name: "UBA", image: "/images/csricons/uba.png", achievement: "Established the 'UBA Foundation' focused on education and development. Provided scholarships and educational grants to students across Nigeria." },
              { name: "Ecobank", image: "/images/csricons/ecobank.png", achievement: "Supported digital literacy projects in collaboration with local NGOs. Donated educational materials to rural schools." },
              { name: "Fidelity Bank", image: "/images/csricons/fidelity.png", achievement: "Launched the 'Fidelity Helping Hands Project' to improve school facilities. Engaged in teacher training workshops to enhance education quality." },
              { name: "Stanbic IBTC", image: "/images/csricons/stanbicibtc.png", achievement: "Provided capacity-building workshops for educators. Engaged in teacher training workshops to enhance education quality." },
              { name: "Union Bank", image: "/images/csricons/union.png", achievement: "Funded infrastructure development in schools through the 'UnionCares' initiative. Provided capacity-building workshops for educators." },
              { name: "Sterling Bank", image: "/images/csricons/sterling.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." }
            ]
          },
          {
            title: "Telecommunications CSR in Education Award",
            description: "Honors telecom companies for their support in digital learning programs and connectivity for education.",
            nominees: [
              { name: "MTN Nigeria", image: "/images/csricons/mtn.png", achievement: "Implemented the 'MTN Foundation Schools Connect' to provide internet access to rural schools. Donated computers and ICT equip..." },
              { name: "Airtel Nigeria", image: "/images/csricons/airtel.png", achievement: "Launched the 'Adopt-a-School' initiative to improve school infrastructure. Provided scholarships for students pursuing technolo..." },
              { name: "Glo Mobile", image: "/images/csricons/glo.png", achievement: "Provided scholarships for students pursuing technology courses. Organized coding and programming workshops for secondary sch..." },
              { name: "9mobile", image: "/images/csricons/9mobile.png", achievement: "Developed the '9mobile Future Minds' initiative for digital education. Collaborated with educational NGOs to provide learning..." }
            ]
          },
          {
            title: "Oil And Gas CSR in Education Award",
            description: "Celebrates oil and gas companies' contributions to educational development in their host communities.",
            nominees: [
              { name: "Shell Nigeria", image: "/images/csricons/shell.png", achievement: "Implemented the 'Shell University Scholarship Scheme' for engineering students. Sponsored STEM workshops for secondary school..." },
              { name: "ExxonMobil Nigeria", image: "/images/csricons/exxonmobil.png", achievement: "Developed the 'ExxonMobil Teachers Academy' for STEM educators. Provided grants for educational infrastructure develo..." },
              { name: "Chevron Nigeria", image: "/images/csricons/chevron.png", achievement: "Developed the 'ExxonMobil Teachers Academy' for STEM educators. Provided grants for educational infrastructure develo..." },
              { name: "Total Nigeria", image: "/images/csricons/total.png", achievement: "Launched the 'TotalEnergies STEM Excellence Program' for secondary schools. Sponsored science fairs and exhibitions to promote inn..." },
              { name: "Eni (Agip)", image: "/images/csricons/agip.png", achievement: "Implemented the 'Eni Scholarship Program' for tertiary education in technical fields. Supported educational research projects in..." },
              { name: "Schlumberger Nigeria", image: "/images/csricons/schlumberger.png", achievement: "Implemented the 'Schlumberger Teachers Empowerment Program' for continuous professional development. Funded scholars..." },
              { name: "Baker Hughes", image: "/images/csricons/baker_hughes.png", achievement: "Supported the 'Global School Infrastructure Development Project' in rural areas. Engaged in educational outreach programs..." },
              { name: "Seplat Petroleum", image: "/images/csricons/seplat.png", achievement: "Implemented the 'Seplat Teachers Empowerment Program' for continuous professional development." },
              { name: "Addax Petroleum", image: "/images/csricons/addax.png", achievement: "Funded science laboratories in secondary schools through the 'Addax Science Initiative'. Sponsored educational trips and excursions..." },
              { name: "Oando Plc", image: "/images/csricons/oando.png", achievement: "Launched the 'Oando Foundation's Adopt-a-School Initiative' to improve learning environments. Provided mentorship and c..." }
            ]
          },
          {
            title: "Food And Beverages CSR in Education Award",
            description: "Acknowledges food and beverage companies' support for nutrition and education programs.",
            nominees: [
              { name: "Nestle Nigeria", image: "/images/csricons/nestlenigeria.png", achievement: "Launched the 'Nestlé Healthy Kids Program' to educate children on nutrition and health. Provided school feeding programs in partne..." },
              { name: "Cadbury Nigeria", image: "/images/csricons/cadbury.png", achievement: "Supported the 'Cadbury Nutrition Education Initiative' in primary schools. Donated learning materials and resources to schools..." },
              { name: "Nigerian Breweries", image: "/images/csricons/nigerianbreweries.png", achievement: "Developed the 'Nigerian Breweries Felix Ohiwerei Education Trust Fund' to support education. Funded scholarships and educat..." },
              { name: "Guinness Nigeria", image: "/images/csricons/guinness.png", achievement: "Established the 'Guinness Nigeria Empowerment Program' for youth development. Supported vocational training..." },
              { name: "Flour Mills of Nigeria", image: "/images/csricons/fmnn.png", achievement: "Supported the 'FMN Educational Support Initiative' to improve literacy and numeracy. Provided educational materials and resourc..." },
              { name: "Coca-Cola Nigeria", image: "/images/csricons/cocacola.png", achievement: "Implemented the 'Coca-Cola Foundation School Support Program' for educational infrastructure. Sponsored health and well..." },
              { name: "Dangote Sugar", image: "/images/csricons/dangotesugar.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
              { name: "PepsiCo Nigeria", image: "/images/csricons/pepsi.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
              { name: "FrieslandCampina WAMCO", image: "/images/csricons/frieslandcampina.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
              { name: "Promasidor Nigeria", image: "/images/csricons/promasi.png", achievement: "Implemented the 'Promasidor Quill Awards' for educational journalism. Sponsored essay competitions and academic challenges for..." }
            ]
          },
          {
            title: "Manufacturing CSR in Education Award",
            description: "Recognizes manufacturing companies for their initiatives in technical and vocational education.",
            nominees: [
              { name: "Dangote Group", image: "/images/csricons/dangotecement.png", achievement: "Implemented the 'Dangote Academy' for vocational and technical training. Provided scholarships and sponsorships for engineer..." },
              { name: "Nigerian Bottling Company", image: "/images/csricons/bottle.png", achievement: "Launched the 'NBC Education Initiative' to support digital learning. Sponsored ICT training workshops for teachers." },
              { name: "Lafarge Africa", image: "/images/csricons/lafarge.png", achievement: "Developed the 'Lafarge Education Support Program' for secondary schools. Donated building materials for school infrastructure p..." },
              { name: "Unilever Nigeria", image: "/images/csricons/unilever.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
              { name: "PZ Cussons Nigeria", image: "/images/csricons/pz.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
              { name: "Procter & Gamble Nigeria", image: "/images/csricons/pg.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
              { name: "Honeywell Flour Mills", image: "/images/csricons/honeywell.png", achievement: "Launched the 'Honeywell Excellence Program' for educational sponsorships. Supported capacity-building workshops for..." },
              { name: "BUA Group", image: "/images/csricons/bua.png", achievement: "Supported the 'BUA School Renovation Project' to improve learning environments. Funded vocational training programs for yo..." },
              { name: "Innoson Vehicle Manufacturing", image: "/images/csricons/innoson.png", achievement: "Supported the 'Innoson Auto Mechanics Training Program' for skill acquisition. Donated educational materials and resourc..." },
              { name: "May & Baker Nigeria", image: "/images/csricons/mb.png", achievement: "Launched the 'May & Baker Science Challenge' for secondary school students. Sponsored science fairs and exhibitions to p..." }
            ]
          },
      {
  title: "Aviation CSR in Education Award",
  description: "Honors aviation companies for their support of aerospace education and training programs.",
  nominees: [
    { name: "Arik Air", image: "/images/csricons/arikair.png", achievement: "Launched the \"Arik Wings for Kids\" program to introduce children to aviation. Provided educational materials and resources to avia..." },
    { name: "Air Peace", image: "/images/csricons/airpeace.png", achievement: "Implemented the \"Air Peace Aviation Scholarship\" for aspiring pilots and engineers. Sponsored aviation career for se..." },
    { name: "Dana Air", image: "/images/csricons/danaair.png", achievement: "Implemented the \"Dana Air Youth Empowerment Initiative\" for aviation education. Sponsored educational trips to a..." },
    { name: "Ibom Air", image: "/images/csricons/ibomair.png", achievement: "Launched the \"Ibom Air Future Aviators Program\" for youth development. Sponsored educational workshops on aviation safety a..." },
    { name: "Aero Contractors", image: "/images/csricons/aero.png", achievement: "Supported the \"Aero Aviation Training Academy\" for skill development. Engaged in educational outreach programs in local co..." },
    { name: "Azman Air", image: "/images/csricons/azmanair.png", achievement: "Supported the \"Azman Aviation Education Project\" for capacity building. Donated learning materials and resources to schools..." },
    { name: "Overland Airways", image: "/images/csricons/overlandairways.png", achievement: "Launched the \"Overland Airways School Support Program\" for educational infrastructure. Provided mentorship and car..." },
    { name: "Med-View Airline", image: "/images/csricons/med.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Green Africa Airways", image: "/images/csricons/greenafrica.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Max Air", image: "/images/csricons/max.png", achievement: "Implemented the \"Max Air Scholarship Program\" for aviation studies. Engaged in community outreach programs to promote..." }
  ]
},
{
  title: "Technology And ICT CSR in Education Award",
  description: "Recognizes tech companies for their initiatives in digital education, ICT training, and e-learning support.",
  nominees: [
    { name: "Microsoft Nigeria", image: "/images/csricons/microsoft.png", achievement: "Implemented the \"Microsoft YouthSpark\" initiative to provide digital skills training. Sponsored coding competitions and hackathons." },
    { name: "Google Nigeria", image: "/images/csricons/google.png", achievement: "Launched the \"Google Digital Skills for Africa\" program for ICT education. Conducted workshops on using Google tools for teachin..." },
    { name: "Andela", image: "/images/csricons/andela.png", achievement: "Implemented the \"Andela Learning Community\" to train young developers. Sponsored hackathons and technology boo..." },
    { name: "Flutterwave", image: "/images/csricons/flutterwave.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" },
    { name: "Paystack", image: "/images/csricons/paystack.png", achievement: "Launched the \"Paystack Developer Accelerator\" for aspiring tech entrepreneurs. Sponsored coding workshops and mentorshi..." },
    { name: "Interswitch", image: "/images/csricons/interswitch.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" },
    { name: "Oracle Nigeria", image: "/images/csricons/oracle.png", achievement: "Launched the \"Oracle Academy\" to support computer science education. Sponsored workshops on database management and..." },
    { name: "HP Nigeria", image: "/images/csricons/hp.png", achievement: "Supported the \"HP LIFE\" program to provide technology education for entrepreneurs. Donated laptops and ICT equipment to scho..." },
    { name: "Tek Experts Nigeria", image: "/images/csricons/te.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" },
    { name: "Cisco Nigeria", image: "/images/csricons/cisco.png", achievement: "Implemented the \"Cisco Networking Academy\" for ICT education and training. Offered certifications and courses for stude..." }
  ]
},
{
  title: "Real Estate And Construction CSR in Education Award",
  description: "Honors companies in the real estate and construction sector for their educational infrastructure support.",
  nominees: [
    { name: "Julius Berger Nigeria", image: "/images/csricons/juliusberger.png", achievement: "Implemented the \"Julius Berger School Support Program\" for educational infrastructure. Funded engineering scholarships for university students." },
    { name: "Dangote Cement", image: "/images/csricons/dangote.png", achievement: "Supported the \"Dangote Cement School Empowerment Program\" to improve learning environments. Funded vocational training programs for youth empowerment." },
    { name: "Cappa & D'Alberto Plc", image: "/images/csricons/cd.png", achievement: "Developed the \"FL-ICAN Education Initiative\" for vocational training. Supported capacity-building workshops for educators." },
    { name: "Dantata & Sawoe Construction", image: "/images/csricons/ds.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" },
    { name: "RCC Nigeria", image: "/images/csricons/rcc.png", achievement: "Implemented the \"RCC Educational Support Program\" for secondary schools. Provided scholarships and sponsorships for engineering students." },
    { name: "ITB Nigeria", image: "/images/csricons/itb.png", achievement: "Supported the \"ITB School Infrastructure Development Project\" in rural areas. Engaged in educational outreach programs in local communities." },
    { name: "Costain West Africa", image: "/images/csricons/cwa.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" },
    { name: "El-Alan Construction Company", image: "/images/csricons/ellanroadconstruction.png", achievement: "Developed the \"El-Alan Education Initiative\" for vocational training. Supported capacity-building workshops for educators." },
    { name: "Setraco Nigeria", image: "/images/csricons/setraco.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" },
    { name: "Arab Contractors", image: "/images/csricons/arabhomes.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" }
  ]
},
{
  title: "Retail And E-Commerce CSR in Education Award",
  description: "Recognizes retail and e-commerce companies for their support of education through various initiatives.",
  nominees: [
    { name: "Shoprite Nigeria", image: "/images/csricons/shoprite.png", achievement: "Supported the \"Shoprite Community Education Initiative\" for school infrastructure development. Engaged in educational outre..." },
    { name: "Spar Nigeria", image: "/images/csricons/spar.png", achievement: "Developed the \"Spar School Support Scheme\" for educational resources and infrastructure. Donated learning materials." },
    { name: "Jumia Nigeria", image: "/images/csricons/jumia.png", achievement: "Implemented the \"Jumia School Support Program\" to provide educational resources. Sponsored digital literacy workshops for stu..." },
    { name: "Konga", image: "/images/csricons/konga.png", achievement: "Launched the \"Konga Digital Academy\" for e-learning and digital skills development. Provided scholarships for students pursuing..." },
    { name: "Justrite Superstore", image: "/images/csricons/justrite.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" },
    { name: "Game Stores Nigeria", image: "/images/csricons/game.png", achievement: "Supported the \"Game Community Education Initiative\" for school infrastructure development. Engaged in educational outre..." },
    { name: "Prince Ebeano Supermarket", image: "/images/csricons/pes.png", achievement: "Launched the \"Prince Ebeano Education Empowerment Program\" for skill acquisition and vocational training. Sponsored schol..." },
    { name: "Addide Supermarket", image: "/images/csricons/addide.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" },
    { name: "Everyday Supermarket", image: "/images/csricons/everyday.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" },
    { name: "Hubmart Stores", image: "/images/csricons/hub.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" }
  ]
},
{
  title: "Pharmaceuticals CSR in Education Award",
  description: "Honors pharmaceutical companies for their support of health education and related initiatives.",
  nominees: [
    { name: "GlaxoSmithKline Nigeria", image: "/images/csricons/gsk.png", achievement: "Supported the \"GSK Health Education Program\" for primary schools. Conducted health and wellness workshops for students..." },
    { name: "Pfizer Nigeria", image: "/images/csricons/pfizer.png", achievement: "Launched the \"Pfizer Science Challenge\" for secondary school students. Sponsored science fairs and exhibitions to promote inn..." },
    { name: "Emzor Pharmaceutical", image: "/images/csricons/emzor.png", achievement: "Implemented the \"Emzor Health Education Program\" to promote health literacy in schools. Donated medical supplies and reso..." },
    { name: "May & Baker Nigeria", image: "/images/csricons/mbn.png", achievement: "Developed the \"May & Baker Science Education Initiative\" for STEM education. Donated laboratory equipment and resourc..." },
    { name: "Fidson Healthcare Plc", image: "/images/csricons/fidson.png", achievement: "Launched the \"Fidson Science Challenge\" for secondary school students. Sponsored science fairs and exhibitions to promote inn..." },
    { name: "Neimeth International Pharmaceuticals", image: "/images/csricons/neimeth.png", achievement: "Launched the \"Neimeth Science Challenge\" for secondary school students. Sponsored science fairs and exhibitions to promote inn..." },
    { name: "Mopson Pharmaceuticals", image: "/images/csricons/mp.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" },
    { name: "Swiss Pharma Nigeria", image: "/images/csricons/swipha.png", achievement: "Developed the \"Swiss Pharma Education Initiative\" for STEM education. Donated laboratory equipment and resources to sch..." },
    { name: "Biofem Pharmaceuticals", image: "/images/csricons/biofem.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" },
    { name: "Evans Medical Plc", image: "/images/csricons/evans.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community" }
  ]
},
    {
  title: "Insurance CSR in Education Award",
  description: "Recognizes insurance companies for their contributions to financial literacy and education programs.",
  nominees: [
    { name: "AXA Mansard Insurance", image: "/images/csricons/axamansard.png", achievement: "Supported the 'AXA Mansard Financial Literacy Program' for secondary schools. Conducted workshops on financial planning." },
    { name: "AIICO Insurance Plc", image: "/images/csricons/aiico.png", achievement: "Launched the 'AIICO Education Support Initiative' for educational resources. Sponsored scholarships for students pursuing..." },
    { name: "Leadway Assurance", image: "/images/csricons/leadway.png", achievement: "Implemented the 'Leadway Financial Literacy Program' for secondary schools. Conducted workshops on financial planning and insura..." },
    { name: "Custodian and Allied Plc", image: "/images/csricons/custodian.png", achievement: "Implemented the 'Mutual Benefits Financial Literacy Program' for secondary schools. Conducted workshops on financial..." },
    { name: "NEM Insurance Plc", image: "/images/csricons/nem.png", achievement: "Launched the 'NEM Education Support Initiative' for educational resources. Sponsored scholarships for students pursuing..." },
    { name: "Mutual Benefits Assurance", image: "/images/csricons/mutualbenefits.png", achievement: "Supported the 'Sovereign Trust Financial Literacy Program' for secondary schools. Conducted workshops on financial planning..." },
    { name: "Cornerstone Insurance", image: "/images/csricons/cornerstone.png", achievement: "Implemented the 'Cornerstone Financial Literacy Program' for secondary schools. Conducted workshops on financial planning..." },
    { name: "Lasaco Assurance Plc", image: "/images/csricons/lasaco.png", achievement: "n" },
    { name: "Consolidated Hallmark Insurance", image: "/images/csricons/consolidatedhallmark.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Sovereign Trust Insurance", image: "/images/csricons/sovereigntrust.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "NSIA Insurance", image: "/images/csricons/nsia.png", achievement: "Launched the 'NSIA Education Support Initiative' for educational resources. Sponsored scholarships for students pursuing..." },
    { name: "Zenith General Insurance:", image: "/images/csricons/zenith.png", achievement: "Launched the 'Zenith General Education Support Initiative' for educational resources. Sponsored scholarships for students purs..." }
  ]
},

{
  title: "Media And Entertainment CSR in Education Award",
  description: "Recognizes media and entertainment companies for their support of educational content and initiatives.",
  nominees: [
    { name: "Channels Television", image: "/images/csricons/channels.png", achievement: "Implemented the 'Channels Kids Club' to promote educational content for children. Sponsored educational documentaries and..." },
    { name: "NTA (Nigerian Television Authority)", image: "/images/csricons/nta.png", achievement: "Launched the 'NTA Educational Initiative' to support learning through television. Produced educational programs and docu..." },
    { name: "Silverbird Television", image: "/images/csricons/silverbird.png", achievement: "Developed the 'Silverbird Education Initiative' for educational content creation. Produced documentaries and programs focused on e..." },
    { name: "TVC Communications", image: "/images/csricons/tvc.png", achievement: "Launched the 'TVC Education Support Initiative' for educational outreach. Sponsored educational programs and even..." },
    { name: "Multichoice Nigeria (DSTV)", image: "/images/csricons/multichoice.png", achievement: "Supported the 'DSTV Eutelsat Star Awards' to promote science and technology education. Sponsored educational scholarships for stu..." },
    { name: "HipTV", image: "/images/csricons/hiptv.png", achievement: "Developed the 'HipTV Educational Initiative' for educational content creation. Produced documentaries and programs focused on e..." },
    { name: "Wazobia FM", image: "/images/csricons/wazobia.png", achievement: "Launched the 'Wazobia Education Support Program' for educational outreach. Sponsored educational programs and even..." },
    { name: "AIT (Africa Independent Television)", image: "/images/csricons/ait.png", achievement: "Implemented the 'Arise Educational Initiative' to support learning through media. Produced educational programs and docu..." },
    { name: "Cool FM Nigeria", image: "/images/csricons/coolfm.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "The Guardian Nigeria", image: "/images/csricons/guardian.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "EbonyLife TV", image: "/images/csricons/ebonylife.png", achievement: "Launched the 'EbonyLife Education Support Program' for educational outreach. Sponsored educational programs and even..." },
    { name: "Arise News", image: "/images/csricons/arise.png", achievement: "Implemented the 'Arise Educational Initiative' to support learning through media. Produced educational programs and docu..." }
  ]
},

{
  title: "Agriculture And Agribusiness CSR In Education Award",
  description: "Recognizes agricultural and agribusiness companies for their contributions to education in the sector.",
  nominees: [
    { name: "Olam Nigeria", image: "/images/csricons/olam.png", achievement: "Implemented the 'Olam Agricultural Education Program' to promote agricultural literacy in schools. Donated seeds and reso..." },
    { name: "Flour Mills of Nigeria", image: "/images/csricons/fmn.png", achievement: "Launched the 'FMN Agro-Allied Education Initiative' for agricultural education. Sponsored training programs for students in..." },
    { name: "Presco Plc", image: "/images/csricons/presco.png", achievement: "Supported the 'Presco Agro-Education Initiative' for agricultural training and skill development. Engaged in capacity-building..." },
    { name: "PZ Wilmar", image: "/images/csricons/pzwilmar.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Dangote Sugar", image: "/images/csricons/dangotesugar.png", achievement: "Developed the 'Dangote Sugar Agricultural Education Program' for secondary schools. Donated farming equipment and resources..." },
    { name: "BUA Sugar Refinery", image: "/images/csricons/bua.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Nestle Nigeria", image: "/images/csricons/nestle.png", achievement: "Developed the 'Nestle Agricultural Education Program' for secondary schools. Sponsored training programs for students in agricultur..." },
    { name: "Cadbury Nigeria", image: "/images/csricons/cadbury.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Guinness Nigeria", image: "/images/csricons/guinness.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Nigerian Breweries", image: "/images/csricons/nigerianbreweries.png", achievement: "Launched the 'Nigerian Breweries Agricultural Education Initiative' for secondary schools. Donated farming equipment and resources..." },
    { name: "Chi Farms", image: "/images/csricons/chifarms.png", achievement: "Implemented the 'Chi Farms Agro-Education Initiative' for agricultural training and skill development. Engaged in capacity-building..." },
    { name: "Notore Chemical Industries:", image: "/images/csricons/notore.png", achievement: "Supported the 'Notore Agricultural Education Program' for secondary schools. Donated farming equipment and resources to school..." },
    { name: "Premier Feeds Mills", image: "/images/csricons/premierfeeds.png", achievement: "Launched the 'Premier Feeds Agricultural Education Initiative' for secondary schools. Donated farming equipment and resources..." },
    { name: "AACE Foods", image: "/images/csricons/aacefoods.png", achievement: "Developed the 'AACE Foods Agro-Education Program' for secondary schools. Sponsored training programs for students in agricultur..." }
  ]
},

{
  title: "Health Care And Hospitals CSR In Education Award",
  description: "Recognizes healthcare providers and hospitals for their educational initiatives in health and wellness.",
  nominees: [
    { name: "Reddington Hospital", image: "/images/csricons/reddington.png", achievement: "Implemented the 'Reddington Health Education Program' to promote health literacy in schools. Donated medical supplies and resources to healthcare training institutions." },
    { name: "St. Nicholas Hospital", image: "/images/csricons/stnicholas.png", achievement: "Developed the 'St. Nicholas Health Education Program' for primary schools. Conducted health and wellness workshops for students and teachers." },
    { name: "Lagoon Hospitals", image: "/images/csricons/lagoon.png", achievement: "Launched the 'Lagoon Medical Education Initiative' for secondary schools. Sponsored health and wellness workshops for students and teachers." },
    { name: "Eko Hospital", image: "/images/csricons/eko.png", achievement: "Launched the 'Eko Medical Education Initiative' for secondary schools. Sponsored health and wellness workshops for students and teachers." },
    { name: "First Consultants Medical Centre", image: "/images/csricons/fcmc.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Medbury Medical Services", image: "/images/csricons/medbury.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Avon Healthcare Limited", image: "/images/csricons/avon.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Lifebridge Medical Diagnostics", image: "/images/csricons/lifebridge.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Bridge Clinic", image: "/images/csricons/bridge.png", achievement: "Developed the 'Bridge Clinic Health Education Program' for primary schools. Conducted health and wellness workshops for students and teachers." },
    { name: "Lily Hospitals", image: "/images/csricons/lily.png", achievement: "Supported the 'Lily Medical Education Initiative' for secondary schools. Sponsored health and wellness workshops for students and teachers." },
    { name: "Eye Foundation Hospital", image: "/images/csricons/eyefoundation.png", achievement: "Supported the 'Eye Foundation Health Education Program' for primary schools. Conducted health and wellness workshops for students and teachers." },
    { name: "First Cardiology Consultants", image: "/images/csricons/firstcardiology.png", achievement: "Developed the 'First Cardiology Medical Education Initiative' for secondary schools. Sponsored health and wellness workshops for students and teachers." }
  ]
},

{
  title: "Professional Services CSR In Education Award",
  description: "Recognizes professional services firms for their educational initiatives and support programs.",
  nominees: [
    { name: "PwC Nigeria", image: "/images/csricons/pwc.png", achievement: "Implemented the 'PwC Business Education Program' for secondary schools. Sponsored internships and training programs for stude..." },
    { name: "Deloitte Nigeria", image: "/images/csricons/deloitte.png", achievement: "Supported the 'Deloitte Business Education Program' for secondary schools. Sponsored internships and training programs for stude..." },
    { name: "KPMG Nigeria", image: "/images/csricons/kpmg.png", achievement: "Launched the 'KPMG Education Support Initiative' for educational resources. Sponsored scholarships for students pursuin..." },
    { name: "Ernst & Young Nigeria", image: "/images/csricons/ey.png", achievement: "Launched the 'EY Education Support Initiative' for educational resources. Sponsored scholarships for students pursuin..." },
    { name: "Accenture Nigeria", image: "/images/csricons/accenture.png", achievement: "Implemented the 'Accenture Business Education Program' for secondary schools. Sponsored internships and training program..." },
    { name: "Baker Tilly Nigeria", image: "/images/csricons/bakertilly.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "SIAO Partners", image: "/images/csricons/siao.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Grant Thornton Nigeria", image: "/images/csricons/grantthornton.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Banwo & Ighodalo", image: "/images/csricons/banwoighodalo.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "Aluko & Oyebode", image: "/images/csricons/alukooyebode.png", achievement: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
    { name: "McKinsey & Company Nigeria:", image: "/images/csricons/mckinsey.png", achievement: "Launched the 'McKinsey Education Support Initiative' for educational resources. Sponsored scholarships for students pursuin..." },
    { name: "Boston Consulting Group Nigeria", image: "/images/csricons/bcg.png", achievement: "Supported the 'BCG Business Education Program' for secondary schools. Sponsored internships and training programs for stude..." },
    { name: "FBNQuest", image: "/images/csricons/fbnquest.png", achievement: "Launched the 'FBNQuest Education Support Initiative' for educational resources. Sponsored scholarships for students pursuin..." },
    { name: "Stanbic IBTC Holdings", image: "/images/csricons/stanbic.png", achievement: "Implemented the 'Stanbic IBTC Business Education Program' for secondary schools. Sponsored internships and training program..." },
    { name: "United Capital Plc:", image: "/images/csricons/unitedcapital.png", achievement: "Launched the 'United Capital Education Support Initiative' for educational resources. Sponsored scholarships for students pursuin..." }
  ]
},
    {
    title: "Fintech CSR in Education Award",
    description: "Recognizes fintech companies for their contributions to educational initiatives.",
    nominees: [
      { name: "Flutterwave", image: "/images/csricons/flutterwave.png", achievement: "Implemented the 'Flutterwave Financial Literacy Program' for secondary schools. Conducted workshops on financial planning." },
      { name: "Paystack", image: "/images/csricons/paystack.png", achievement: "Launched the 'Paystack Education Support Initiative' for educational resources. Sponsored scholarships for students pursuing..." },
      { name: "Interswitch", image: "/images/csricons/interswitch.png", achievement: "Supported the 'Interswitch Financial Literacy Program' for secondary schools. Conducted workshops on financial planning and fintech." },
      { name: "Remita", image: "/images/csricons/remita.png", achievement: "Implemented the 'Remita Financial Literacy Program' for secondary schools. Conducted workshops on financial planning." },
      { name: "Carbon", image: "/images/csricons/carbon.png", achievement: "Launched the 'Carbon Education Support Initiative' for educational resources. Sponsored scholarships for students pursuing..." },
      { name: "Paga", image: "/images/csricons/paga.png", achievement: "Launched the 'Paga Education Support Initiative' for educational resources. Sponsored scholarships for students pursuing..." },
      { name: "Kuda Bank", image: "/images/csricons/kudabank.png", achievement: "Supported the 'Kuda Financial Literacy Program' for secondary schools. Conducted workshops on financial planning." },
      { name: "Moniepoint", image: "/images/csricons/moniepoint.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "FairMoney", image: "/images/csricons/fairmoney.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "TeamApt", image: "/images/csricons/teamapt.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "OPay", image: "/images/csricons/opay.png", achievement: "Launched the 'OPay Education Support Initiative' for educational resources. Sponsored scholarships for students pursuing..." },
      { name: "PalmPay", image: "/images/csricons/palmpay.png", achievement: "Implemented the 'PalmPay Financial Literacy Program' for secondary schools. Conducted workshops on financial planning." },
      { name: "Chipper Cash", image: "/images/csricons/chippercash.png", achievement: "Launched the 'Chipper Cash Education Support Initiative' for educational resources. Sponsored scholarships for students pursuing..." }
    ]
  },
  {
    title: "Microfinance Banks CSR in Education Award",
    description: "Honors microfinance banks for their support of educational programs.",
    nominees: [
      { name: "LAPO Microfinance Bank", image: "/images/csricons/lapo.png", achievement: "Implemented the 'LAPO Education Support Initiative' for primary schools. Sponsored scholarships for students from underprivileg..." },
      { name: "Grooming Centre", image: "/images/csricons/groomingcentre.png", achievement: "Supported the 'Grooming Education Support Initiative' for primary schools. Sponsored scholarships for students from underprivileg..." },
      { name: "Accion Microfinance Bank", image: "/images/csricons/accion.png", achievement: "Launched the 'Accion Education Support Initiative' for primary schools. Sponsored scholarships for students from underprivileg..." },
      { name: "AB Microfinance Bank NIGERIA", image: "/images/csricons/abmicrofinance.png", achievement: "Launched the 'AB Education Support Initiative' for primary schools. Sponsored scholarships for students from underprivileg..." },
      { name: "Baobab Microfinance Bank", image: "/images/csricons/baobab.png", achievement: "Launched the 'Baobab Education Support Initiative' for primary schools. Sponsored scholarships for students from underprivileg..." },
      { name: "Mainstreet Microfinance Bank", image: "/images/csricons/mainstreet.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "NPF Microfinance Bank Plc", image: "/images/csricons/npf.png", achievement: "Implemented the 'NPF Education Support Initiative' for primary schools. Sponsored scholarships for students from underprivileg..." },
      { name: "Fina Trust Microfinance Bank", image: "/images/csricons/finatrust.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "Rehoboth Microfinance Bank", image: "/images/csricons/rehoboth.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "Fortis MFB", image: "/images/csricons/fortis.png", achievement: "Supported the 'Fortis Education Support Initiative' for primary schools. Sponsored scholarships for students from underprivileg..." },
      { name: "EdFin Microfinance Bank", image: "/images/csricons/edfin.png", achievement: "Implemented the 'EdFin Education Support Initiative' for primary schools. Sponsored scholarships for students from underprivileg..." },
      { name: "Addosser Microfinance Bank", image: "/images/csricons/addosser.png", achievement: "Launched the 'Addosser Education Support Initiative' for primary schools. Sponsored scholarships for students from underprivileg..." },
      { name: "AB Microfinance Bank Nigeria", image: "/images/csricons/abmicrofinance.png", achievement: "Launched the 'AB Education Support Initiative' for primary schools. Sponsored scholarships for students from underprivileg..." }
    ]
  },
  {
    title: "Emerging Telecommunications CSR in Education Award",
    description: "Recognizes emerging telecom companies for their educational support initiatives.",
    nominees: [
      { name: "Smile Communications", image: "/images/csricons/smile.png", achievement: "Implemented the 'Smile School Support Program' to provide educational resources. Sponsored digital literacy workshops for stu..." },
      { name: "Spectranet", image: "/images/csricons/spectranet.png", achievement: "Supported the 'Spectranet Community Education Initiative' for school infrastructure development. Engaged in educational outre..." },
      { name: "ipNX Nigeria", image: "/images/csricons/ipnx.png", achievement: "Implemented the 'ipNX School Support Program' to provide educational resources. Sponsored digital literacy workshops for stu..." },
      { name: "Ntel", image: "/images/csricons/ntel.png", achievement: "Launched the 'Ntel Digital Academy' for e-learning and digital skills development. Provided scholarships for students pursuing..." },
      { name: "Tizeti (Wifi.com.ng)", image: "/images/csricons/tizeti.png", achievement: "Launched the 'Tizeti Digital Academy' for e-learning and digital skills development. Provided scholarships for students pursuing..." },
      { name: "SWIFT Networks", image: "/images/csricons/swift.png", achievement: "Developed the 'Swift School Support Scheme' for educational resources and infrastructure. Donated learning materials a..." },
      { name: "VDT Communications", image: "/images/csricons/vdt.png", achievement: "Supported the 'VDT Community Education Initiative' for school infrastructure development. Engaged in educational outre..." },
      { name: "Tingo Mobile", image: "/images/csricons/tingo.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "Cobranet Limited", image: "/images/csricons/cobranet.png", achievement: "Launched the 'Cobranet Education Empowerment Program' for skill acquisition and vocational training. Sponsored scholars..." },
      { name: "Coollink NG", image: "/images/csricons/coollink.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "Bitflux Communications", image: "/images/csricons/bitflux.png", achievement: "Launched the 'Bitflux Education Empowerment Program' for skill acquisition and vocational training. Sponsored schol..." }
    ]
  },
  {
    title: "Conglomerates And Diversified Businesses CSR in Education Award",
    description: "Honors diversified companies for their wide-ranging support of educational initiatives.",
    nominees: [
      { name: "Dangote Group", image: "/images/csricons/dangote.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "UAC of Nigeria Plc", image: "/images/csricons/uac.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "Flour Mills of Nigeria", image: "/images/csricons/flourmills.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "Honeywell Group", image: "/images/csricons/honeywell.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "BUA Group", image: "/images/csricons/bua.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "Transcorp Nigeria", image: "/images/csricons/transcorp.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "Stallion Group", image: "/images/csricons/stallion.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "Kewalram Chanrai Group", image: "/images/csricons/kewalram.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "Leventis Group", image: "/images/csricons/leventis.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." },
      { name: "Chellarams Plc", image: "/images/csricons/chellarams.png", achievement: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community." }
    ]
  },
  {
    title: "Real Estate Development CSR in Education Award",
    description: "Recognizes real estate developers for their contributions to educational infrastructure and programs.",
    nominees: [
      { name: "UPDC Plc", image: "/images/csricons/updc.png", achievement: "Implemented the 'UPDC Educational Support Initiative' for primary schools. Provided educational materials and resources to rura..." },
      { name: "Mixta Africa", image: "/images/csricons/mixta.png", achievement: "Developed the 'Mixta Africa Education Initiative' for capacity building and skill acquisition. Supported capacity-building w..." },
      { name: "Landmark Group", image: "/images/csricons/landmark.png", achievement: "Launched the 'Landmark School Support Scheme' for educational infrastructure development. Donated building materials fo..." },
      { name: "Cosgrove Investment Limited", image: "/images/csricons/cosgrove.png", achievement: "Supported the 'Cosgrove Education Empowerment Program' for secondary schools. Sponsored scholarships and edu..." },
      { name: "Octo5 Holdings Limited", image: "/images/csricons/octo5.png", achievement: "Implemented the 'Octo5 School Support Program' for educational resources. Engaged in educational outreach programs in local c..." },
      { name: "Brains & Hammers Limited", image: "/images/csricons/brainshammers.png", achievement: "Launched the 'Brains & Hammers Educational Initiative' for primary schools. Provided educational materials and resourc..." },
      { name: "GText Homes", image: "/images/csricons/gtext.png", achievement: "Developed the 'GText School Support Scheme' for educational infrastructure development. Donated building materials fo..." },
      { name: "Megamound Investment Limited", image: "/images/csricons/megamound.png", achievement: "Supported the 'Megamound Education Empowerment Program' for secondary schools. Sponsored scholarships and educa..." },
      { name: "Adron Homes and Properties", image: "/images/csricons/adron.png", achievement: "Implemented the 'Adron School Support Program' for educational resources. Engaged in educational outreach programs..." },
      { name: "RevolutionPlus Property Development", image: "/images/csricons/revolutionplus.png", achievement: "Launched the 'RevolutionPlus Educational Initiative' for primary schools. Provided educational materials and resources to rura..." }
    ]
  },
  {
  title: "Hotels CSR in Education Award 2022-2024 in Nigeria",
  description: "Recognizes hotels for their contributions to educational initiatives in Nigeria.",
  nominees: [
    { name: "Transcorp Hilton Abuja", image: "/images/csricons/transcorphilton.png", achievement: "Launched the 'Transcorp Hilton Educational Support Program' for primary schools. Provided scholarships for student..." },
    { name: "Eko Hotels & Suites", image: "/images/csricons/ekohotels.png", achievement: "Developed the 'Eko Hotels School Support Scheme' for educational infrastructure development. Donated building materials fo..." },
    { name: "Radisson Blu Lagos", image: "/images/csricons/radissonblu.png", achievement: "Implemented the 'Radisson Blu Education Empowerment Program' for secondary schools. Sponsored scholarships and educa..." },
    { name: "Sheraton Lagos Hotel", image: "/images/csricons/sheraton.png", achievement: "Supported the 'Sheraton School Support Program' for educational resources. Engaged in educational outreach programs in local c..." },
    { name: "Intercontinental Hotel Lagos", image: "/images/csricons/intercontinental.png", achievement: "Launched the 'Intercontinental Educational Initiative' for primary schools. Provided educational materials and resources to rura..." },
    { name: "Protea Hotel Ikeja", image: "/images/csricons/protea.png", achievement: "Developed the 'Protea School Support Scheme' for educational infrastructure development. Donated building materials..." },
    { name: "Four Points by Sheraton Lagos", image: "/images/csricons/fourpoints.png", achievement: "Supported the 'Four Points Education Empowerment Program' for secondary schools. Sponsored scholarships and educa..." },
    { name: "Golden Tulip Hotel", image: "/images/csricons/goldentulip.png", achievement: "Developed the 'Golden Tulip School Support Scheme' for educational infrastructure development. Donated building materials..." },
    { name: "Lagos Continental Hotel", image: "/images/csricons/lagoscontinental.png", achievement: "Implemented the 'Lagos Continental School Support Program' for educational resources. Engaged in educational outreach programs..." },
    { name: "Federal Palace Hotel", image: "/images/csricons/federalpalace.png", achievement: "Launched the 'Federal Palace Educational Initiative' for primary schools. Provided educational materials and resources to rura..." }
  ]
}
  ]
  },
  
  {
    "title": "Best Africa Regional Companies CSR for Education Special Recognition Award in Africa 2024",
    "description": "Recognize the most outstanding educational technology companies that have made significant contributions to advancing education in Africa through innovative solutions, programs, and initiatives.",
    "regions": [
      {
        "name": "North Africa",
        "subCategories": [
          {
            "title": "Best Banking and Finance CSR in Education in North Africa",
            "description": "Recognizing outstanding contributions in the banking and finance sector to education in North Africa",
            "nominees": [
              { "name": "Attijariwafa Bank", "image": "/images/africacsr/attijariwafa.png", "achievement": "Supporting local education, providing scholarships, and funding educational initiatives.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Bank of Alexandria", "image": "/images/africacsr/bankofalexandria.png", "achievement": "Supporting education through CSR initiatives, offering financial literacy programs.", "state": "Alexandria", "country": "Egypt" },
              { "name": "NCB Bank", "image": "/images/africacsr/ncbbank.png", "achievement": "Providing educational support, offering scholarships, and funding educational initiatives.", "state": "Jeddah", "country": "Saudi Arabia" },
              { "name": "Banque Misr", "image": "/images/africacsr/banquemisr.png", "achievement": "Supporting education through various CSR initiatives and scholarship programs.", "state": "Cairo", "country": "Egypt" },
              { "name": "National Bank of Egypt", "image": "/images/africacsr/nationalbankofegypt.png", "achievement": "Offering educational support and funding various educational initiatives.", "state": "Cairo", "country": "Egypt" },
              { "name": "Arab Bank", "image": "/images/africacsr/arabbank.png", "achievement": "Supporting education through CSR initiatives and scholarship programs.", "state": "Amman", "country": "Jordan" },
              { "name": "QNB", "image": "/images/africacsr/qnb.png", "achievement": "Providing educational support and funding various educational initiatives.", "state": "Doha", "country": "Qatar" },
              { "name": "Commercial International Bank", "image": "/images/africacsr/cib.png", "achievement": "Supporting education through CSR initiatives and scholarship programs.", "state": "Cairo", "country": "Egypt" },
              { "name": "Al Baraka Bank", "image": "/images/africacsr/albaraka.png", "achievement": "Supporting education, offering scholarships, and funding educational initiatives.", "state": "Manama", "country": "Bahrain" },
              { "name": "Union National Bank", "image": "/images/africacsr/unionnationalbank.png", "achievement": "Providing educational support and funding various educational initiatives.", "state": "Abu Dhabi", "country": "United Arab Emirates" }
            ]
          },
          {
            "title": "Best Telecommunications CSR in Education in North Africa",
            "description": "Honoring telecommunications companies making significant educational contributions in North Africa",
            "nominees": [
              { "name": "Orange Morocco", "image": "/images/africacsr/orange.png", "achievement": "Supporting local education, providing digital resources, and offering training programs.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Telecom Egypt", "image": "/images/africacsr/telecomegypt.png", "achievement": "Implementing digital education initiatives and providing technological resources.", "state": "Cairo", "country": "Egypt" },
              { "name": "Ooredoo Algeria", "image": "/images/africacsr/ooredoo.png", "achievement": "Supporting education through various CSR initiatives and digital programs.", "state": "Algiers", "country": "Algeria" },
              { "name": "Tunisie Telecom", "image": "/images/africacsr/tunisietelecom.png", "achievement": "Providing educational support and implementing digital education initiatives.", "state": "Tunis", "country": "Tunisia" },
              { "name": "Maroc Telecom", "image": "/images/africacsr/maroctelcom.png", "achievement": "Supporting education through CSR initiatives and digital resources.", "state": "Rabat", "country": "Morocco" },
              { "name": "Vodafone Egypt", "image": "/images/africacsr/vodafone.png", "achievement": "Implementing educational programs and providing digital resources to schools.", "state": "Cairo", "country": "Egypt" },
              { "name": "Algerie Telecom", "image": "/images/africacsr/algerietelecom.png", "achievement": "Supporting education through various CSR initiatives and digital programs.", "state": "Algiers", "country": "Algeria" },
              { "name": "Sudatel", "image": "/images/africacsr/sudatel.png", "achievement": "Providing educational support and implementing digital education initiatives.", "state": "Khartoum", "country": "Sudan" },
              { "name": "Mauritel", "image": "/images/africacsr/mauritel.png", "achievement": "Supporting education through CSR initiatives and digital resources.", "state": "Nouakchott", "country": "Mauritania" },
              { "name": "Mobilis", "image": "/images/africacsr/mobilis.png", "achievement": "Implementing educational programs and providing digital resources to schools.", "state": "Algiers", "country": "Algeria" }
            ]
          },
          {
            "title": "Best Technology and ICT CSR in Education in North Africa",
            "description": "Recognizing technology and ICT companies making substantial educational impacts in North Africa",
            "nominees": [
              { "name": "IBM North Africa", "image": "/images/africacsr/ibm.png", "achievement": "Providing AI and cloud computing education, supporting coding initiatives.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Microsoft Egypt", "image": "/images/africacsr/microsoft.png", "achievement": "Implementing digital literacy programs and supporting teacher training.", "state": "Cairo", "country": "Egypt" },
              { "name": "Dell Morocco", "image": "/images/africacsr/dell.png", "achievement": "Supporting education through various technology initiatives and resources.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Oracle Egypt", "image": "/images/africacsr/oracle.png", "achievement": "Providing educational support and implementing technology education programs.", "state": "Cairo", "country": "Egypt" },
              { "name": "SAP North Africa", "image": "/images/africacsr/sap.png", "achievement": "Supporting education through CSR initiatives and technology resources.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Cisco Systems North Africa", "image": "/images/africacsr/cisco.png", "achievement": "Implementing educational programs and providing networking resources.", "state": "Cairo", "country": "Egypt" },
              { "name": "Huawei Technologies North Africa", "image": "/images/africacsr/huawei.png", "achievement": "Supporting education through various technology initiatives and resources.", "state": "Cairo", "country": "Egypt" },
              { "name": "Nokia North Africa", "image": "/images/africacsr/nokia.png", "achievement": "Providing educational support and implementing technology education programs.", "state": "Cairo", "country": "Egypt" },
              { "name": "Siemens Egypt", "image": "/images/africacsr/siemens.png", "achievement": "Supporting education through CSR initiatives and technology resources.", "state": "Cairo", "country": "Egypt" },
              { "name": "Intel Egypt", "image": "/images/africacsr/intel.png", "achievement": "Implementing educational programs and providing computing resources.", "state": "Cairo", "country": "Egypt" }
            ]
          },
          {
            "title": "Manufacturing And Industrial CSR in Education",
            "description": "Recognizing outstanding contributions in the manufacturing and industrial sector to education in North Africa",
            "nominees": [
              { "name": "Siemens (Egypt)", "image": "/images/africacsr/siemens.png", "achievement": "Supporting engineering education, providing training programs and scholarships.", "state": "Cairo", "country": "Egypt" },
              { "name": "OCP (Office Chérifien des Phosphates) (Morocco)", "image": "/images/africacsr/ocp.png", "achievement": "Supporting STEM education, providing scholarships and educational resources.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Cevital Group (Algeria)", "image": "/images/africacsr/cevital.png", "achievement": "Supporting vocational training, providing internships and educational partnerships.", "state": "Algiers", "country": "Algeria" },
              { "name": "Algerien Cement (Algeria)", "image": "/images/africacsr/algeriencement.png", "achievement": "Supporting technical education, providing training programs and infrastructure support.", "state": "Algiers", "country": "Algeria" },
              { "name": "Lafarge Holcim (Morocco)", "image": "/images/africacsr/lafargeholcim.png", "achievement": "Supporting sustainable development education, providing scholarships and community programs.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Egyptian Steel (Egypt)", "image": "/images/africacsr/egyptiansteel.png", "achievement": "Supporting technical education, providing training programs and scholarships.", "state": "Cairo", "country": "Egypt" },
              { "name": "El Nasr Automotive (Egypt)", "image": "/images/africacsr/elnasrautomotive.png", "achievement": "Supporting automotive engineering education, providing internships and training programs.", "state": "Cairo", "country": "Egypt" },
              { "name": "Orascom Construction (Egypt)", "image": "/images/africacsr/orascom.png", "achievement": "Supporting engineering education, providing scholarships and infrastructure development.", "state": "Cairo", "country": "Egypt" },
              { "name": "Managem Group (Morocco)", "image": "/images/africacsr/managem.png", "achievement": "Supporting mining education, providing training programs and community development initiatives.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Cosumar (Morocco)", "image": "/images/africacsr/cosumar.png", "achievement": "Supporting agricultural education, providing scholarships and rural development programs.", "state": "Casablanca", "country": "Morocco" }
            ]
          },
          {
            "title": "Agriculture And Agribusiness CSR in Education",
            "description": "Honoring agriculture and agribusiness companies making significant educational contributions in North Africa",
            "nominees": [
              { "name": "Cosumar (Morocco)", "image": "/images/africacsr/cosumar.png", "achievement": "Supporting agricultural education, providing scholarships and rural development programs.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Al Dahra Agriculture (Egypt)", "image": "/images/africacsr/aldahra.png", "achievement": "Supporting sustainable agriculture education, providing training programs and research initiatives.", "state": "Cairo", "country": "Egypt" },
              { "name": "Morocco Foodex", "image": "/images/africacsr/moroccofoodex.png", "achievement": "Supporting food technology education, providing internships and export-oriented training.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Centrale Danone (Morocco)", "image": "/images/africacsr/centraledanone.png", "achievement": "Supporting dairy industry education, providing scholarships and rural development initiatives.", "state": "Casablanca", "country": "Morocco" },
              { "name": "El Rashidi El Mizan (Egypt)", "image": "/images/africacsr/elrashidielmizan.png", "achievement": "Supporting food processing education, providing vocational training and community programs.", "state": "Cairo", "country": "Egypt" },
              { "name": "Agro-Consortiom (Egypt)", "image": "/images/africacsr/agroconsortium.png", "achievement": "Supporting agricultural research, providing scholarships and innovative farming education.", "state": "Cairo", "country": "Egypt" },
              { "name": "Société des Brasseries du Maroc", "image": "/images/africacsr/societedesbrasseriesdumaroc.png", "achievement": "Supporting beverage industry education, providing training programs and community initiatives.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Cooperative Agricole de Taroudannt", "image": "/images/africacsr/cooperativeagricoletaroudannt.png", "achievement": "Supporting cooperative education, providing training for small-scale farmers and rural communities.", "state": "Taroudannt", "country": "Morocco" },
              { "name": "National Agricultural Cooperative", "image": "/images/africacsr/nationalagriculturalcooperative.png", "achievement": "Supporting agricultural education, providing training programs and rural development initiatives.", "state": "Cairo", "country": "Egypt" },
              { "name": "Egyptian Agricultural Products Co.", "image": "/images/africacsr/egyptianagriculturalproducts.png", "achievement": "Supporting agribusiness education, providing internships and export-oriented training programs.", "state": "Cairo", "country": "Egypt" }
            ]
          },
          {
            "title": "Social Media Influencer CSR For Education in Africa",
            "description": "Recognizing social media influencers making substantial educational impacts in Africa",
            "nominees": [
              { "name": "Amr Diab (Egypt)", "image": "/images/africacsr/amrdiab.png", "achievement": "Supporting music education, providing scholarships and mentorship programs.", "state": "Cairo", "country": "Egypt" },
              { "name": "Yassmine El Saied (Egypt)", "image": "/images/africacsr/yassmineelsaied.png", "achievement": "Promoting literacy and education awareness through social media campaigns.", "state": "Cairo", "country": "Egypt" },
              { "name": "Abou El Anwar (Sina) (Morocco)", "image": "/images/africacsr/abouelanwar.png", "achievement": "Supporting youth education and entrepreneurship through online mentoring and resources.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Dina El-Sherbiny (Egypt)", "image": "/images/africacsr/dinaelsherbiny.png", "achievement": "Promoting girls' education and empowerment through social media advocacy.", "state": "Cairo", "country": "Egypt" },
              { "name": "Salma Rachid (Egypt)", "image": "/images/africacsr/salmarachid.png", "achievement": "Supporting arts education and cultural awareness through online platforms.", "state": "Cairo", "country": "Egypt" },
              { "name": "Mohamed Henedy (Egypt)", "image": "/images/africacsr/mohamedhenedy.png", "achievement": "Promoting educational comedy and literacy through social media content.", "state": "Cairo", "country": "Egypt" },
              { "name": "Ghada Elrazek (Morocco)", "image": "/images/africacsr/ghadaelrazek.png", "achievement": "Supporting women's education and entrepreneurship through online courses and mentorship.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Nadia Hassani (Egypt)", "image": "/images/africacsr/nadiahassani.png", "achievement": "Promoting health education and awareness through social media campaigns.", "state": "Cairo", "country": "Egypt" },
              { "name": "Fatima Zahra Bennacer (Morocco)", "image": "/images/africacsr/fatimazahrabennacer.png", "achievement": "Supporting sustainable living education through online content and community initiatives.", "state": "Rabat", "country": "Morocco" },
              { "name": "Lamia (Tunisia)", "image": "/images/africacsr/lamia.png", "achievement": "Promoting technology education and digital literacy through social media tutorials.", "state": "Tunis", "country": "Tunisia" }
            ]
          },
          {
            "title": "African International Sports Stars CSR For Education in Africa",
            "description": "Honoring African international sports stars making significant educational contributions in Africa",
            "nominees": [
              { "name": "Mo Salah (Egypt)", "image": "/images/africacsr/mosalah.png", "achievement": "Supporting youth education and sports development through scholarships and community programs.", "state": "Cairo", "country": "Egypt" },
              { "name": "Riyad Mahrez (Algeria)", "image": "/images/africacsr/riyadmahrez.png", "achievement": "Promoting education and sports opportunities for underprivileged youth.", "state": "Algiers", "country": "Algeria" },
              { "name": "Karim Benzema (Algeria/France)", "image": "/images/africacsr/karimbenzema.png", "achievement": "Supporting educational initiatives and sports academies in North Africa.", "state": "Lyon", "country": "France" },
              { "name": "Mehdi Benatia (Morocco)", "image": "/images/africacsr/mehdibenatia.png", "achievement": "Promoting education and sports development in rural areas of Morocco.", "state": "Casablanca", "country": "Morocco" },
              { "name": "Hakim Ziyech (Morocco)", "image": "/images/africacsr/hakimziyech.png", "achievement": "Supporting educational programs and sports facilities in underprivileged communities.", "state": "Amsterdam", "country": "Netherlands" },
              { "name": "Yassine Bounou (Morocco)", "image": "/images/africacsr/yassinebounou.png", "achievement": "Promoting goalkeeper training programs and educational support for aspiring athletes.", "state": "Seville", "country": "Spain" },
              { "name": "Achraf Hakimi (Morocco)", "image": "/images/africacsr/achrafhakimi.png", "achievement": "Supporting education and sports infrastructure development in Morocco.", "state": "Paris", "country": "France" },
              { "name": "Trezeguet (Egypt)", "image": "/images/africacsr/trezeguet.png", "achievement": "Promoting youth education and football development programs in Egypt.", "state": "Istanbul", "country": "Turkey" },
              { "name": "Sofiane Feghouli (Algeria)", "image": "/images/africacsr/sofianefeghouli.png", "achievement": "Supporting educational initiatives and sports academies in Algeria.", "state": "Istanbul", "country": "Turkey" },
              { "name": "Islam Slimani (Algeria)", "image": "/images/africacsr/islamslimani.png", "achievement": "Promoting education and sports opportunities for youth in Algeria.", "state": "Lyon", "country": "France" }
            ]
          }
        ]
      },
      {
        "name": "East Africa",
        "subCategories": [
          {
            "title": "Best Banking and Finance CSR in Education in East Africa",
            "description": "Recognizing outstanding contributions in the banking and finance sector to education in East Africa",
            "nominees": [
              {"name": "Equity Bank", "image": "/images/csricons/equitybank.png", "achievement": "Empowering youth through scholarships and financial literacy programs.", "state": "Nairobi", "country": "Kenya"},
              {"name": "KCB Bank", "image": "/images/csricons/kcb.png", "achievement": "Supporting school infrastructure and digital learning.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Co-op Bank", "image": "/images/csricons/coopbank.png", "achievement": "Providing scholarships and supporting school development.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Standard Chartered", "image": "/images/csricons/standardchartered.png", "achievement": "Supporting STEM education and leadership initiatives.", "state": "Nairobi", "country": "Kenya"},
              {"name": "ABSA", "image": "/images/csricons/absa.png", "achievement": "Providing scholarships and digital learning resources.", "state": "Nairobi", "country": "Kenya"},
              {"name": "DTB", "image": "/images/csricons/dtb.png", "achievement": "Empowering youth through financial education programs.", "state": "Nairobi", "country": "Kenya"},
              {"name": "National Bank", "image": "/images/csricons/nationalbank.png", "achievement": "Providing educational support and scholarships.", "state": "Nairobi", "country": "Kenya"},
              {"name": "BK Group", "image": "/images/csricons/bkgroup.png", "achievement": "Funding school infrastructure and technology programs.", "state": "Kigali", "country": "Rwanda"},
              {"name": "Yellow", "image": "/images/csricons/yellow.png", "achievement": "Supporting digital literacy and financial education.", "state": "Kampala", "country": "Uganda"},
              {"name": "Central Bank of Tanzania", "image": "/images/csricons/centralbanktz.png", "achievement": "Providing scholarships and supporting school development.", "state": "Dar es Salaam", "country": "Tanzania"}
            ]
          },
          {
            "title": "Best Telecommunications CSR in Education in East Africa",
            "description": "Honoring telecommunications companies making significant educational contributions in East Africa",
            "nominees": [
              {"name": "Vodacom", "image": "/images/csricons/vodacom.png", "achievement": "Digital education platforms and school connectivity programs.", "state": "Dar es Salaam", "country": "Tanzania"},
              {"name": "MTN", "image": "/images/csricons/mtn.png", "achievement": "Supporting e-learning and digital skills training.", "state": "Kampala", "country": "Uganda"},
              {"name": "Airtel", "image": "/images/csricons/airtel.png", "achievement": "Providing digital resources and supporting school technology.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Telkom", "image": "/images/csricons/telkom.png", "achievement": "Empowering schools with internet and digital learning.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Cell C", "image": "/images/csricons/cellc.png", "achievement": "Providing digital resources and supporting school technology.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Zantel", "image": "/images/csricons/zantel.png", "achievement": "Supporting online learning and school connectivity.", "state": "Dar es Salaam", "country": "Tanzania"},
              {"name": "Liquid Telecom", "image": "/images/csricons/liquidtelecom.png", "achievement": "Connecting schools and supporting STEM education.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Neotel", "image": "/images/csricons/neotel.png", "achievement": "Providing digital infrastructure for education.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Smile", "image": "/images/csricons/smile.png", "achievement": "Providing internet access for schools.", "state": "Kampala", "country": "Uganda"},
              {"name": "BongoNet", "image": "/images/csricons/bongonet.png", "achievement": "Supporting digital learning initiatives.", "state": "Dar es Salaam", "country": "Tanzania"}
            ]
          },
          {
            "title": "Best Technology and ICT CSR in Education in East Africa",
            "description": "Recognizing technology and ICT companies making substantial educational impacts in East Africa",
            "nominees": [
              {"name": "Andela", "image": "/images/csricons/andela.png", "achievement": "Supporting coding and robotics education.", "state": "Nairobi", "country": "Kenya"},
              {"name": "BRCK", "image": "/images/csricons/brck.png", "achievement": "Providing digital skills training and resources.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Safaricom", "image": "/images/csricons/safaricom.png", "achievement": "Empowering schools with technology solutions.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Liquid Telecom", "image": "/images/csricons/liquidtelecom.png", "achievement": "Supporting ICT infrastructure for schools.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Cellulant", "image": "/images/csricons/cellulant.png", "achievement": "Providing software solutions for education.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Africa's Talking", "image": "/images/csricons/africastalking.png", "achievement": "Supporting digital transformation in schools.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Twiga Foods", "image": "/images/csricons/twiga.png", "achievement": "Empowering schools with technology solutions.", "state": "Nairobi", "country": "Kenya"},
              {"name": "M-KOPA", "image": "/images/csricons/mkopa.png", "achievement": "Providing internet connectivity for schools.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Fuzu", "image": "/images/csricons/fuzu.png", "achievement": "Supporting digital literacy and teacher training.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Jumia", "image": "/images/csricons/jumia.png", "achievement": "Promoting e-commerce education and entrepreneurship.", "state": "Nairobi", "country": "Kenya"}
            ]
          },
          {
            "title": "Agriculture And Agribusiness CSR in Education in East Africa",
            "description": "Honoring agriculture and agribusiness companies making significant educational contributions in East Africa",
            "nominees": [
              {"name": "Kilombero Sugar", "image": "/images/csricons/kilombero.png", "achievement": "Supporting agricultural education and rural development.", "state": "Morogoro", "country": "Tanzania"},
              {"name": "KTDA", "image": "/images/csricons/ktda.png", "achievement": "Providing scholarships and supporting school development.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Top Quality Seed", "image": "/images/csricons/topqualityseed.png", "achievement": "Supporting agricultural education and rural development.", "state": "Nairobi", "country": "Kenya"},
              {"name": "EABL", "image": "/images/csricons/eabl.png", "achievement": "Supporting STEM education and school infrastructure.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Bakhresa Group", "image": "/images/csricons/bakhresa.png", "achievement": "Providing scholarships and supporting school development.", "state": "Dar es Salaam", "country": "Tanzania"},
              {"name": "Heineken", "image": "/images/csricons/heineken.png", "achievement": "Supporting vocational training and educational partnerships.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Mumias Sugar", "image": "/images/csricons/mumiassugar.png", "achievement": "Supporting technical education and infrastructure support.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Mombasa Cement", "image": "/images/csricons/mombasacement.png", "achievement": "Supporting sustainable development education and scholarships.", "state": "Mombasa", "country": "Kenya"},
              {"name": "Crown Paints", "image": "/images/csricons/crownpaints.png", "achievement": "Supporting technical education and training programs.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Akili Holdings", "image": "/images/csricons/akiliholdings.png", "achievement": "Promoting agricultural innovation and education.", "state": "Nairobi", "country": "Kenya"}
            ]
          },
          {
            "title": "Manufacturing And Industrial CSR in Education in East Africa",
            "description": "Recognizing outstanding contributions in the manufacturing and industrial sector to education in East Africa",
            "nominees": [
              {"name": "Bamburi Cement", "image": "/images/csricons/bamburicement.png", "achievement": "Supporting engineering education and providing scholarships.", "state": "Nairobi", "country": "Kenya"},
              {"name": "EABL", "image": "/images/csricons/eabl.png", "achievement": "Supporting STEM education and school infrastructure.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Kenya Breweries", "image": "/images/csricons/kenyabreweries.png", "achievement": "Providing scholarships and supporting school development.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Bipco", "image": "/images/csricons/bipco.png", "achievement": "Supporting vocational training and educational partnerships.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Crown Paints", "image": "/images/csricons/crownpaints.png", "achievement": "Supporting technical education and training programs.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Heineken", "image": "/images/csricons/heineken.png", "achievement": "Supporting sustainable development education and scholarships.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Mombasa Cement", "image": "/images/csricons/mombasacement.png", "achievement": "Supporting technical education and infrastructure support.", "state": "Mombasa", "country": "Kenya"}
            ]
          },
          {
            "title": "Social Media Influencer CSR For Education in East Africa",
            "description": "Recognizing social media influencers making substantial educational impacts in East Africa",
            "nominees": [
              {"name": "Nominee 1", "image": "/images/influencers/nominee1.png", "achievement": "Promoting education and empowerment through social media advocacy.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Nominee 2", "image": "/images/influencers/nominee2.png", "achievement": "Supporting girls' education and empowerment through social media.", "state": "Kampala", "country": "Uganda"},
              {"name": "Nominee 3", "image": "/images/influencers/nominee3.png", "achievement": "Promoting literacy and education awareness through social media campaigns.", "state": "Dar es Salaam", "country": "Tanzania"},
              {"name": "Nominee 4", "image": "/images/influencers/nominee4.png", "achievement": "Supporting youth education and entrepreneurship through online mentoring and resources.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Nominee 5", "image": "/images/influencers/nominee5.png", "achievement": "Promoting health education and awareness through social media campaigns.", "state": "Kampala", "country": "Uganda"},
              {"name": "Nominee 6", "image": "/images/influencers/nominee6.png", "achievement": "Supporting sustainable living education through online content and community initiatives.", "state": "Dar es Salaam", "country": "Tanzania"},
              {"name": "Nominee 7", "image": "/images/influencers/nominee7.png", "achievement": "Promoting technology education and digital literacy through social media tutorials.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Nominee 8", "image": "/images/influencers/nominee8.png", "achievement": "Supporting women's education and entrepreneurship through online courses and mentorship.", "state": "Kampala", "country": "Uganda"},
              {"name": "Nominee 9", "image": "/images/influencers/nominee9.png", "achievement": "Promoting educational comedy and literacy through social media content.", "state": "Dar es Salaam", "country": "Tanzania"},
              {"name": "Nominee 10", "image": "/images/influencers/nominee10.png", "achievement": "Promoting arts education and cultural awareness through online platforms.", "state": "Nairobi", "country": "Kenya"}
            ]
          },
          {
            "title": "African International Sports Stars CSR For Education in East Africa",
            "description": "Honoring East African international sports stars making significant educational contributions in East Africa",
            "nominees": [
              {"name": "Nominee 1", "image": "/images/sports/nominee1.png", "achievement": "Supporting youth education and sports development through scholarships and community programs.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Nominee 2", "image": "/images/sports/nominee2.png", "achievement": "Promoting education and sports opportunities for underprivileged youth.", "state": "Kampala", "country": "Uganda"},
              {"name": "Nominee 3", "image": "/images/sports/nominee3.png", "achievement": "Supporting educational initiatives and sports academies in East Africa.", "state": "Dar es Salaam", "country": "Tanzania"},
              {"name": "Nominee 4", "image": "/images/sports/nominee4.png", "achievement": "Promoting education and sports development in rural areas of East Africa.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Nominee 5", "image": "/images/sports/nominee5.png", "achievement": "Supporting educational programs and sports facilities in underprivileged communities.", "state": "Kampala", "country": "Uganda"},
              {"name": "Nominee 6", "image": "/images/sports/nominee6.png", "achievement": "Promoting goalkeeper training programs and educational support for aspiring athletes.", "state": "Dar es Salaam", "country": "Tanzania"},
              {"name": "Nominee 7", "image": "/images/sports/nominee7.png", "achievement": "Supporting education and sports infrastructure development in East Africa.", "state": "Nairobi", "country": "Kenya"},
              {"name": "Nominee 8", "image": "/images/sports/nominee8.png", "achievement": "Promoting youth education and football development programs in East Africa.", "state": "Kampala", "country": "Uganda"},
              {"name": "Nominee 9", "image": "/images/sports/nominee9.png", "achievement": "Supporting educational initiatives and sports academies in East Africa.", "state": "Dar es Salaam", "country": "Tanzania"},
              {"name": "Nominee 10", "image": "/images/sports/nominee10.png", "achievement": "Promoting education and sports opportunities for youth in East Africa.", "state": "Nairobi", "country": "Kenya"}
            ]
          }
        ]
      },
      {
        "name": "South Africa",
        "subCategories": [
          {
            "title": "Best Banking and Finance CSR in Education in South Africa",
            "description": "Recognizing outstanding contributions in the banking and finance sector to education in South Africa",
            "nominees": [
              {"name": "Standard Bank", "image": "/images/csricons/stanbicibtc.png", "achievement": "Feeding Young Minds – Implementing school feeding programs and supporting educational materials in South Africa.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "FirstRand", "image": "/images/csricons/firstrand.png", "achievement": "Tomorrow's Leaders – Providing scholarships and leadership training for students in South Africa and Namibia.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Nedbank", "image": "/images/csricons/nedbank.png", "achievement": "Supporting financial literacy and school infrastructure projects.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "ABSA", "image": "/images/csricons/absa.png", "achievement": "Providing scholarships and digital learning resources.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Capitec", "image": "/images/csricons/capitec.png", "achievement": "Empowering youth through financial education programs.", "state": "Stellenbosch", "country": "South Africa"},
              {"name": "Investec", "image": "/images/csricons/investec.png", "achievement": "Supporting STEM education and leadership initiatives.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "African Bank", "image": "/images/csricons/africanbank.png", "achievement": "Providing educational support and scholarships.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "RMB", "image": "/images/csricons/rmb.png", "achievement": "Funding school infrastructure and technology programs.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "TymeBank", "image": "/images/csricons/tymebank.png", "achievement": "Supporting digital literacy and financial education.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Sasfin", "image": "/images/csricons/sasfin.png", "achievement": "Providing scholarships and supporting school development.", "state": "Johannesburg", "country": "South Africa"}
            ]
          },
          {
            "title": "Best Telecommunications CSR in Education in South Africa",
            "description": "Honoring telecommunications companies making significant educational contributions in South Africa",
            "nominees": [
              {"name": "Vodacom", "image": "/images/csricons/vodacom.png", "achievement": "Digital education platforms and school connectivity programs.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "MTN", "image": "/images/csricons/mtn.png", "achievement": "Supporting e-learning and digital skills training.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Cell C", "image": "/images/csricons/cellc.png", "achievement": "Providing digital resources and supporting school technology.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Telkom", "image": "/images/csricons/telkom.png", "achievement": "Empowering schools with internet and digital learning.", "state": "Pretoria", "country": "South Africa"},
              {"name": "Liquid Telecom", "image": "/images/csricons/liquidtelecom.png", "achievement": "Connecting schools and supporting STEM education.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Neotel", "image": "/images/csricons/neotel.png", "achievement": "Providing digital infrastructure for education.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Rain", "image": "/images/csricons/rain.png", "achievement": "Supporting online learning and school connectivity.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Smile", "image": "/images/csricons/smile.png", "achievement": "Providing internet access for schools.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Paratus", "image": "/images/csricons/paratus.png", "achievement": "Supporting digital learning initiatives.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "EOH", "image": "/images/csricons/eoh.png", "achievement": "Empowering schools with technology solutions.", "state": "Johannesburg", "country": "South Africa"}
            ]
          },
          {
            "title": "Best Technology and ICT CSR in Education in South Africa",
            "description": "Recognizing technology and ICT companies making substantial educational impacts in South Africa",
            "nominees": [
              {"name": "Dimension Data", "image": "/images/csricons/dimensiondata.png", "achievement": "Supporting coding and robotics education.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "BCX", "image": "/images/csricons/bcx.png", "achievement": "Providing digital skills training and resources.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Altron", "image": "/images/csricons/altron.png", "achievement": "Empowering schools with technology solutions.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Mustek", "image": "/images/csricons/mustek.png", "achievement": "Supporting ICT infrastructure for schools.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Adapt IT", "image": "/images/csricons/adaptit.png", "achievement": "Providing software solutions for education.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Datatec", "image": "/images/csricons/datatec.png", "achievement": "Supporting digital transformation in schools.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "EOH", "image": "/images/csricons/eoh.png", "achievement": "Empowering schools with technology solutions.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "SEACOM", "image": "/images/csricons/seacom.png", "achievement": "Providing internet connectivity for schools.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Microsoft South Africa", "image": "/images/csricons/microsoft.png", "achievement": "Supporting digital literacy and teacher training.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "GreenMatter", "image": "/images/csricons/greenmatter.png", "achievement": "Promoting environmental education and sustainability.", "state": "Johannesburg", "country": "South Africa"}
            ]
          },
          {
            "title": "African International Sports Stars CSR For Education in South Africa",
            "description": "Honoring South African international sports stars making significant educational contributions in South Africa",
            "nominees": [
              {"name": "Percy Tau", "image": "/images/africacsr/percystau.png", "achievement": "Supporting youth education and sports development through scholarships and community programs.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Thembi Kgatlana", "image": "/images/africacsr/thembikgatlana.png", "achievement": "Promoting education and sports opportunities for underprivileged youth.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Thulani Hlatshwayo", "image": "/images/africacsr/thulanihlatshwayo.png", "achievement": "Supporting educational initiatives and sports academies in South Africa.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Desiree Ellis", "image": "/images/africacsr/desireeellis.png", "achievement": "Promoting education and sports development in rural areas of South Africa.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Janine van Wyk", "image": "/images/africacsr/janinevanwyk.png", "achievement": "Supporting educational programs and sports facilities in underprivileged communities.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Lucas Radebe", "image": "/images/africacsr/lucasradebe.png", "achievement": "Promoting goalkeeper training programs and educational support for aspiring athletes.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Benni McCarthy", "image": "/images/africacsr/bennimccarthy.png", "achievement": "Supporting education and sports infrastructure development in South Africa.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Portia Modise", "image": "/images/africacsr/portiamodise.png", "achievement": "Promoting youth education and football development programs in South Africa.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Aaron Mokoena", "image": "/images/africacsr/aaronmokoena.png", "achievement": "Supporting educational initiatives and sports academies in South Africa.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Siphiwe Tshabalala", "image": "/images/africacsr/siphiwetshabalala.png", "achievement": "Promoting education and sports opportunities for youth in South Africa.", "state": "Johannesburg", "country": "South Africa"}
            ]
          },
          {
            "title": "Manufacturing And Industrial CSR in Education in South Africa",
            "description": "Recognizing outstanding contributions in the manufacturing and industrial sector to education in South Africa",
            "nominees": [
              {"name": "Sasol", "image": "/images/csricons/sasol.png", "achievement": "Supporting engineering education and providing scholarships.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Impala Platinum", "image": "/images/csricons/impalaplatinum.png", "achievement": "Supporting STEM education and school infrastructure.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Anglo American", "image": "/images/csricons/angloamerican.png", "achievement": "Providing scholarships and supporting school development.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "De Beers Group", "image": "/images/csricons/debeers.png", "achievement": "Supporting vocational training and educational partnerships.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Barloworld", "image": "/images/csricons/barloworld.png", "achievement": "Supporting technical education and infrastructure support.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Gold Star", "image": "/images/csricons/goldstar.png", "achievement": "Supporting sustainable development education and scholarships.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "MOZAL", "image": "/images/csricons/mozal.png", "achievement": "Supporting technical education and training programs.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Murray & Roberts", "image": "/images/csricons/murrayandroberts.png", "achievement": "Supporting engineering education and infrastructure development.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Tongaat Hulett", "image": "/images/csricons/tongaat.png", "achievement": "Supporting school infrastructure and STEM education.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Namibia Breweries Limited", "image": "/images/csricons/namibiabreweries.png", "achievement": "Supporting vocational training and community development.", "state": "Windhoek", "country": "Namibia"}
            ]
          },
          {
            "title": "Agriculture And Agribusiness CSR in Education in South Africa",
            "description": "Honoring agriculture and agribusiness companies making significant educational contributions in South Africa",
            "nominees": [
              {"name": "Tongaat Hulett", "image": "/images/csricons/tongaat.png", "achievement": "Supporting school infrastructure and STEM education.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Illovo", "image": "/images/csricons/illovo.png", "achievement": "Supporting agricultural education and rural development.", "state": "Durban", "country": "South Africa"},
              {"name": "Namib Mills", "image": "/images/csricons/namibmills.png", "achievement": "Providing scholarships and supporting school development.", "state": "Windhoek", "country": "Namibia"},
              {"name": "Murray & Roberts", "image": "/images/csricons/murrayandroberts.png", "achievement": "Supporting engineering education and infrastructure development.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "De Beers Group", "image": "/images/csricons/debeers.png", "achievement": "Supporting vocational training and educational partnerships.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Namibia Breweries Limited", "image": "/images/csricons/namibiabreweries.png", "achievement": "Supporting vocational training and community development.", "state": "Windhoek", "country": "Namibia"},
              {"name": "Tongaat Hulett", "image": "/images/csricons/tongaat.png", "achievement": "Supporting school infrastructure and STEM education.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Namib Mills", "image": "/images/csricons/namibmills.png", "achievement": "Providing scholarships and supporting school development.", "state": "Windhoek", "country": "Namibia"},
              {"name": "Namibia Breweries Limited", "image": "/images/csricons/namibiabreweries.png", "achievement": "Supporting vocational training and community development.", "state": "Windhoek", "country": "Namibia"},
              {"name": "Angola Beverages", "image": "/images/csricons/angolabeverages.png", "achievement": "Supporting beverage industry education and training programs.", "state": "Luanda", "country": "Angola"}
            ]
          },
          {
            "title": "Social Media Influencer CSR For Education in South Africa",
            "description": "Recognizing social media influencers making substantial educational impacts in South Africa",
            "nominees": [
              {"name": "Nominee 1", "image": "/images/influencers/nominee1.png", "achievement": "Promoting education and empowerment through social media advocacy.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Nominee 2", "image": "/images/influencers/nominee2.png", "achievement": "Supporting girls' education and empowerment through social media.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Nominee 3", "image": "/images/influencers/nominee3.png", "achievement": "Promoting literacy and education awareness through social media campaigns.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Nominee 4", "image": "/images/influencers/nominee4.png", "achievement": "Supporting youth education and entrepreneurship through online mentoring and resources.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Nominee 5", "image": "/images/influencers/nominee5.png", "achievement": "Promoting health education and awareness through social media campaigns.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Nominee 6", "image": "/images/influencers/nominee6.png", "achievement": "Supporting sustainable living education through online content and community initiatives.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Nominee 7", "image": "/images/influencers/nominee7.png", "achievement": "Promoting technology education and digital literacy through social media tutorials.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Nominee 8", "image": "/images/influencers/nominee8.png", "achievement": "Supporting women's education and entrepreneurship through online courses and mentorship.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Nominee 9", "image": "/images/influencers/nominee9.png", "achievement": "Promoting educational comedy and literacy through social media content.", "state": "Johannesburg", "country": "South Africa"},
              {"name": "Nominee 10", "image": "/images/influencers/nominee10.png", "achievement": "Promoting arts education and cultural awareness through online platforms.", "state": "Johannesburg", "country": "South Africa"}
            ]
          }
        ]
      },
         {
        "name": "West Africa",
        "subCategories": [
          {
            "title": "Best Banking and Finance CSR in Education in West Africa",
            "description": "Recognizing outstanding contributions in the banking and finance sector to education in West Africa",
            "nominees": [
              {"name": "Ecobank", "image": "/images/csricons/ecobank.png", "achievement": "Empowering youth through scholarships and financial literacy programs.", "state": "Lagos", "country": "Nigeria"},
              {"name": "UBA", "image": "/images/csricons/uba.png", "achievement": "Supporting school infrastructure and digital learning.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Zenith Bank", "image": "/images/csricons/zenith.png", "achievement": "Providing scholarships and supporting school development.", "state": "Lagos", "country": "Nigeria"},
              {"name": "GTBank", "image": "/images/csricons/gtbank.png", "achievement": "Supporting STEM education and leadership initiatives.", "state": "Lagos", "country": "Nigeria"},
              {"name": "FirstBank", "image": "/images/csricons/firstbank.png", "achievement": "Providing scholarships and digital learning resources.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Access Bank", "image": "/images/csricons/accessbank.png", "achievement": "Empowering youth through financial education programs.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Fidelity Bank", "image": "/images/csricons/fidelity.png", "achievement": "Providing educational support and scholarships.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Union Bank", "image": "/images/csricons/unionbank.png", "achievement": "Funding school infrastructure and technology programs.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Stanbic IBTC", "image": "/images/csricons/stanbicibtc.png", "achievement": "Supporting digital literacy and financial education.", "state": "Lagos", "country": "Nigeria"},
              {"name": "United Bank of Africa", "image": "/images/csricons/uba.png", "achievement": "Providing scholarships and supporting school development.", "state": "Lagos", "country": "Nigeria"}
            ]
          },
          {
            "title": "Best Telecommunications CSR in Education in West Africa",
            "description": "Honoring telecommunications companies making significant educational contributions in West Africa",
            "nominees": [
              {"name": "MTN", "image": "/images/csricons/mtn.png", "achievement": "Digital education platforms and school connectivity programs.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Airtel", "image": "/images/csricons/airtel.png", "achievement": "Supporting e-learning and digital skills training.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Vodacom", "image": "/images/csricons/vodacom.png", "achievement": "Providing digital resources and supporting school technology.", "state": "Accra", "country": "Ghana"},
              {"name": "Orange", "image": "/images/csricons/orange.png", "achievement": "Empowering schools with internet and digital learning.", "state": "Abidjan", "country": "Ivory Coast"},
              {"name": "9mobile", "image": "/images/csricons/9mobile.png", "achievement": "Providing digital resources and supporting school technology.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Expresso", "image": "/images/csricons/expresso.png", "achievement": "Supporting online learning and school connectivity.", "state": "Dakar", "country": "Senegal"},
              {"name": "Moov Africa", "image": "/images/csricons/moovafrica.png", "achievement": "Connecting schools and supporting STEM education.", "state": "Lomé", "country": "Togo"},
              {"name": "Airtel Nigeria", "image": "/images/csricons/airtel.png", "achievement": "Providing digital infrastructure for education.", "state": "Lagos", "country": "Nigeria"},
              {"name": "MTN Project Fame", "image": "/images/csricons/mtn.png", "achievement": "Providing internet access for schools.", "state": "Lagos", "country": "Nigeria"}
            ]
          },
          {
            "title": "Best Technology and ICT CSR in Education in West Africa",
            "description": "Recognizing technology and ICT companies making substantial educational impacts in West Africa",
            "nominees": [
              {"name": "Flutterwave", "image": "/images/csricons/flutterwave.png", "achievement": "Supporting coding and robotics education.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Paystack", "image": "/images/csricons/paystack.png", "achievement": "Providing digital skills training and resources.", "state": "Lagos", "country": "Nigeria"},
              {"name": "MainOne", "image": "/images/csricons/mainone.png", "achievement": "Empowering schools with technology solutions.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Andela", "image": "/images/csricons/andela.png", "achievement": "Supporting ICT infrastructure for schools.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Interswitch", "image": "/images/csricons/interswitch.png", "achievement": "Providing software solutions for education.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Jumia", "image": "/images/csricons/jumia.png", "achievement": "Supporting digital transformation in schools.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Kobo360", "image": "/images/csricons/kobo360.png", "achievement": "Empowering schools with technology solutions.", "state": "Lagos", "country": "Nigeria"},
              {"name": "TradeDepot", "image": "/images/csricons/tradedepot.png", "achievement": "Providing internet connectivity for schools.", "state": "Lagos", "country": "Nigeria"},
              {"name": "GIG Logistics", "image": "/images/csricons/giglogistics.png", "achievement": "Supporting digital literacy and teacher training.", "state": "Lagos", "country": "Nigeria"},
              {"name": "e-Settlement", "image": "/images/csricons/esettlement.png", "achievement": "Promoting e-commerce education and entrepreneurship.", "state": "Lagos", "country": "Nigeria"}
            ]
          },
          {
            "title": "Agriculture And Agribusiness CSR in Education in West Africa",
            "description": "Honoring agriculture and agribusiness companies making significant educational contributions in West Africa",
            "nominees": [
              {"name": "Olam", "image": "/images/csricons/olam.png", "achievement": "Supporting agricultural education and rural development.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Nestle", "image": "/images/csricons/nestle.png", "achievement": "Providing scholarships and supporting school development.", "state": "Accra", "country": "Ghana"},
              {"name": "Dangote Sugar", "image": "/images/csricons/dangotesugar.png", "achievement": "Supporting STEM education and school infrastructure.", "state": "Lagos", "country": "Nigeria"},
              {"name": "FMN", "image": "/images/csricons/fmn.png", "achievement": "Providing scholarships and supporting school development.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Tropingo Foods", "image": "/images/csricons/tropingo.png", "achievement": "Supporting vocational training and educational partnerships.", "state": "Accra", "country": "Ghana"},
              {"name": "Cargill", "image": "/images/csricons/cargill.png", "achievement": "Supporting technical education and infrastructure support.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Cocoa Processing Company Ltd.", "image": "/images/csricons/cocoaprocessing.png", "achievement": "Supporting sustainable development education and scholarships.", "state": "Accra", "country": "Ghana"},
              {"name": "Guinness", "image": "/images/csricons/guinness.png", "achievement": "Supporting technical education and training programs.", "state": "Lagos", "country": "Nigeria"},
              {"name": "S.A.H.", "image": "/images/csricons/sah.png", "achievement": "Promoting agricultural innovation and education.", "state": "Abidjan", "country": "Ivory Coast"}
            ]
          },
          {
            "title": "Manufacturing And Industrial CSR in Education in West Africa",
            "description": "Recognizing outstanding contributions in the manufacturing and industrial sector to education in West Africa",
            "nominees": [
              {"name": "Dangote Group", "image": "/images/csricons/dangotegroup.png", "achievement": "Supporting engineering education and providing scholarships.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Lafarge", "image": "/images/csricons/lafarge.png", "achievement": "Supporting STEM education and school infrastructure.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Nestle", "image": "/images/csricons/nestle.png", "achievement": "Providing scholarships and supporting school development.", "state": "Accra", "country": "Ghana"},
              {"name": "FMN", "image": "/images/csricons/fmn.png", "achievement": "Supporting vocational training and educational partnerships.", "state": "Lagos", "country": "Nigeria"},
              {"name": "CIMAF", "image": "/images/csricons/cimaf.png", "achievement": "Supporting technical education and training programs.", "state": "Abidjan", "country": "Ivory Coast"},
              {"name": "Guinness", "image": "/images/csricons/guinness.png", "achievement": "Supporting sustainable development education and scholarships.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Unilever", "image": "/images/csricons/unilever.png", "achievement": "Supporting technical education and infrastructure support.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Cocoa Processing Company Ltd.", "image": "/images/csricons/cocoaprocessing.png", "achievement": "Supporting technical education and training programs.", "state": "Accra", "country": "Ghana"},
              {"name": "Bolloré", "image": "/images/csricons/bollore.png", "achievement": "Promoting industrial innovation and education.", "state": "Abidjan", "country": "Ivory Coast"},
              {"name": "Olam", "image": "/images/csricons/olam.png", "achievement": "Supporting engineering education and providing scholarships.", "state": "Lagos", "country": "Nigeria"}
            ]
          },
          {
            "title": "Social Media Influencer CSR For Education in West Africa",
            "description": "Recognizing social media influencers making substantial educational impacts in West Africa",
            "nominees": [
              {"name": "Nominee 1", "image": "/images/influencers/nominee1.png", "achievement": "Promoting education and empowerment through social media advocacy.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Nominee 2", "image": "/images/influencers/nominee2.png", "achievement": "Supporting girls' education and empowerment through social media.", "state": "Accra", "country": "Ghana"},
              {"name": "Nominee 3", "image": "/images/influencers/nominee3.png", "achievement": "Promoting literacy and education awareness through social media campaigns.", "state": "Abidjan", "country": "Ivory Coast"},
              {"name": "Nominee 4", "image": "/images/influencers/nominee4.png", "achievement": "Supporting youth education and entrepreneurship through online mentoring and resources.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Nominee 5", "image": "/images/influencers/nominee5.png", "achievement": "Promoting health education and awareness through social media campaigns.", "state": "Accra", "country": "Ghana"},
              {"name": "Nominee 6", "image": "/images/influencers/nominee6.png", "achievement": "Supporting sustainable living education through online content and community initiatives.", "state": "Abidjan", "country": "Ivory Coast"},
              {"name": "Nominee 7", "image": "/images/influencers/nominee7.png", "achievement": "Promoting technology education and digital literacy through social media tutorials.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Nominee 8", "image": "/images/influencers/nominee8.png", "achievement": "Supporting women's education and entrepreneurship through online courses and mentorship.", "state": "Accra", "country": "Ghana"},
              {"name": "Nominee 9", "image": "/images/influencers/nominee9.png", "achievement": "Promoting educational comedy and literacy through social media content.", "state": "Abidjan", "country": "Ivory Coast"},
              {"name": "Nominee 10", "image": "/images/influencers/nominee10.png", "achievement": "Promoting arts education and cultural awareness through online platforms.", "state": "Lagos", "country": "Nigeria"}
            ]
          },
          {
            "title": "African International Sports Stars CSR For Education in West Africa",
            "description": "Honoring West African international sports stars making significant educational contributions in West Africa",
            "nominees": [
              {"name": "Nominee 1", "image": "/images/sports/nominee1.png", "achievement": "Supporting youth education and sports development through scholarships and community programs.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Nominee 2", "image": "/images/sports/nominee2.png", "achievement": "Promoting education and sports opportunities for underprivileged youth.", "state": "Accra", "country": "Ghana"},
              {"name": "Nominee 3", "image": "/images/sports/nominee3.png", "achievement": "Supporting educational initiatives and sports academies in West Africa.", "state": "Abidjan", "country": "Ivory Coast"},
              {"name": "Nominee 4", "image": "/images/sports/nominee4.png", "achievement": "Promoting education and sports development in rural areas of West Africa.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Nominee 5", "image": "/images/sports/nominee5.png", "achievement": "Supporting educational programs and sports facilities in underprivileged communities.", "state": "Accra", "country": "Ghana"},
              {"name": "Nominee 6", "image": "/images/sports/nominee6.png", "achievement": "Promoting goalkeeper training programs and educational support for aspiring athletes.", "state": "Abidjan", "country": "Ivory Coast"},
              {"name": "Nominee 7", "image": "/images/sports/nominee7.png", "achievement": "Supporting education and sports infrastructure development in West Africa.", "state": "Lagos", "country": "Nigeria"},
              {"name": "Nominee 8", "image": "/images/sports/nominee8.png", "achievement": "Promoting youth education and football development programs in West Africa.", "state": "Accra", "country": "Ghana"},
              {"name": "Nominee 9", "image": "/images/sports/nominee9.png", "achievement": "Supporting educational initiatives and sports academies in West Africa.", "state": "Abidjan", "country": "Ivory Coast"},
              {"name": "Nominee 10", "image": "/images/sports/nominee10.png", "achievement": "Promoting education and sports opportunities for youth in West Africa.", "state": "Lagos", "country": "Nigeria"}
            ]
          }
        ] 
      },
         
        {
          "name": "Central Africa",
          "subCategories": [
            {
              "title": "Best Banking and Finance CSR in Education in Central Africa",
              "description": "Recognizing outstanding contributions in the banking and finance sector to education in Central Africa",
              "nominees": [
                {"name": "Ecobank", "image": "/images/csricons/ecobank.png", "achievement": "Empowering youth through scholarships and financial literacy programs.", "state": "Douala", "country": "Cameroon"},
                {"name": "BGFI Bank", "image": "/images/csricons/bgfibank.png", "achievement": "Supporting school infrastructure and digital learning.", "state": "Libreville", "country": "Gabon"},
                {"name": "Standard Chartered", "image": "/images/csricons/standardchartered.png", "achievement": "Providing scholarships and supporting school development.", "state": "Kinshasa", "country": "DR Congo"},
                {"name": "UBA", "image": "/images/csricons/uba.png", "achievement": "Supporting STEM education and leadership initiatives.", "state": "Douala", "country": "Cameroon"},
                {"name": "Afriland First Bank", "image": "/images/csricons/afriland.png", "achievement": "Providing scholarships and digital learning resources.", "state": "Yaoundé", "country": "Cameroon"},
                {"name": "Commercial Bank", "image": "/images/csricons/commercialbank.png", "achievement": "Empowering youth through financial education programs.", "state": "Douala", "country": "Cameroon"},
                {"name": "BICEC", "image": "/images/csricons/bicec.png", "achievement": "Providing educational support and scholarships.", "state": "Douala", "country": "Cameroon"},
                {"name": "Société Générale Congo", "image": "/images/csricons/societegenerale.png", "achievement": "Funding school infrastructure and technology programs.", "state": "Brazzaville", "country": "Congo"},
                {"name": "Ecobank Congo", "image": "/images/csricons/ecobank.png", "achievement": "Supporting digital literacy and financial education.", "state": "Brazzaville", "country": "Congo"},
                {"name": "Tigo Chad", "image": "/images/csricons/tigo.png", "achievement": "Providing scholarships and supporting school development.", "state": "N'Djamena", "country": "Chad"}
              ]
            },
            {
              "title": "Best Telecommunications CSR in Education in Central Africa",
              "description": "Honoring telecommunications companies making significant educational contributions in Central Africa",
              "nominees": [
                {"name": "MTN Cameroon", "image": "/images/csricons/mtn.png", "achievement": "Digital education platforms and school connectivity programs.", "state": "Douala", "country": "Cameroon"},
                {"name": "Airtel Congo", "image": "/images/csricons/airtel.png", "achievement": "Supporting e-learning and digital skills training.", "state": "Brazzaville", "country": "Congo"},
                {"name": "Orange Central Africa", "image": "/images/csricons/orange.png", "achievement": "Providing digital resources and supporting school technology.", "state": "Bangui", "country": "Central African Republic"},
                {"name": "Camtel", "image": "/images/csricons/camtel.png", "achievement": "Empowering schools with internet and digital learning.", "state": "Yaoundé", "country": "Cameroon"},
                {"name": "Moov Africa", "image": "/images/csricons/moovafrica.png", "achievement": "Providing digital resources and supporting school technology.", "state": "Libreville", "country": "Gabon"},
                {"name": "Africell", "image": "/images/csricons/africell.png", "achievement": "Supporting online learning and school connectivity.", "state": "Kinshasa", "country": "DR Congo"},
                {"name": "Vodacom Congo", "image": "/images/csricons/vodacom.png", "achievement": "Connecting schools and supporting STEM education.", "state": "Kinshasa", "country": "DR Congo"},
                {"name": "Unitel Angola", "image": "/images/csricons/unitel.png", "achievement": "Providing digital infrastructure for education.", "state": "Luanda", "country": "Angola"},
                {"name": "GITGE", "image": "/images/csricons/gitge.png", "achievement": "Providing internet access for schools.", "state": "Malabo", "country": "Equatorial Guinea"}
              ]
            },
            {
              "title": "Best Technology and ICT CSR in Education in Central Africa",
              "description": "Recognizing technology and ICT companies making substantial educational impacts in Central Africa",
              "nominees": [
                {"name": "Huawei Central Africa", "image": "/images/csricons/huawei.png", "achievement": "Supporting coding and robotics education.", "state": "Yaoundé", "country": "Cameroon"},
                {"name": "Ericsson Central Africa", "image": "/images/csricons/ericsson.png", "achievement": "Providing digital skills training and resources.", "state": "Douala", "country": "Cameroon"},
                {"name": "ZTE Central Africa", "image": "/images/csricons/zte.png", "achievement": "Empowering schools with technology solutions.", "state": "Kinshasa", "country": "DR Congo"},
                {"name": "Camtel", "image": "/images/csricons/camtel.png", "achievement": "Supporting ICT infrastructure for schools.", "state": "Yaoundé", "country": "Cameroon"},
                {"name": "Liquid Telecom Central Africa", "image": "/images/csricons/liquidtelecom.png", "achievement": "Providing software solutions for education.", "state": "Libreville", "country": "Gabon"},
                {"name": "SES Central Africa", "image": "/images/csricons/ses.png", "achievement": "Supporting digital transformation in schools.", "state": "Douala", "country": "Cameroon"},
                {"name": "1WayAfrica", "image": "/images/csricons/1wayafrica.png", "achievement": "Empowering schools with technology solutions.", "state": "Malabo", "country": "Equatorial Guinea"},
                {"name": "Ringo", "image": "/images/csricons/ringo.png", "achievement": "Providing internet connectivity for schools.", "state": "Yaoundé", "country": "Cameroon"},
                {"name": "Africom", "image": "/images/csricons/africom.png", "achievement": "Supporting digital literacy and teacher training.", "state": "Kinshasa", "country": "DR Congo"},
                {"name": "Hi-Tech Solutions Central Africa", "image": "/images/csricons/hitech.png", "achievement": "Promoting e-commerce education and entrepreneurship.", "state": "Douala", "country": "Cameroon"}
              ]
            },
            {
              "title": "Manufacturing And Industrial CSR in Education in Central Africa",
              "description": "Recognizing outstanding contributions in the manufacturing and industrial sector to education in Central Africa",
              "nominees": [
                {"name": "CBG", "image": "/images/csricons/cbg.png", "achievement": "Supporting engineering education and providing scholarships.", "state": "Conakry", "country": "Guinea"},
                {"name": "Alucam", "image": "/images/csricons/alucam.png", "achievement": "Supporting STEM education and school infrastructure.", "state": "Douala", "country": "Cameroon"},
                {"name": "Ciment de l'Afrique (CIMAF)", "image": "/images/csricons/cimaf.png", "achievement": "Providing scholarships and supporting school development.", "state": "Abidjan", "country": "Ivory Coast"},
                {"name": "Total Gabon", "image": "/images/csricons/totalgabon.png", "achievement": "Supporting vocational training and educational partnerships.", "state": "Libreville", "country": "Gabon"},
                {"name": "CIB", "image": "/images/csricons/cib.png", "achievement": "Supporting technical education and infrastructure support.", "state": "Brazzaville", "country": "Congo"},
                {"name": "Perenco", "image": "/images/csricons/perenco.png", "achievement": "Supporting sustainable development education and scholarships.", "state": "Libreville", "country": "Gabon"},
                {"name": "Heidelberg Materials", "image": "/images/csricons/heidelberg.png", "achievement": "Supporting technical education and training programs.", "state": "Douala", "country": "Cameroon"},
                {"name": "Glencore", "image": "/images/csricons/glencore.png", "achievement": "Promoting industrial innovation and education.", "state": "Kinshasa", "country": "DR Congo"},
                {"name": "SNPC", "image": "/images/csricons/snpc.png", "achievement": "Supporting engineering education and providing scholarships.", "state": "Brazzaville", "country": "Congo"},
                {"name": "ExxonMobil", "image": "/images/csricons/exxonmobil.png", "achievement": "Supporting engineering education and providing scholarships.", "state": "Malabo", "country": "Equatorial Guinea"}
              ]
            },
            {
              "title": "Agriculture And Agribusiness CSR in Education in Central Africa",
              "description": "Honoring agriculture and agribusiness companies making significant educational contributions in Central Africa",
              "nominees": [
                {"name": "PALMCI", "image": "/images/csricons/palmci.png", "achievement": "Supporting agricultural education and rural development.", "state": "Abidjan", "country": "Ivory Coast"},
                {"name": "Gabon Maize", "image": "/images/csricons/gabonmaize.png", "achievement": "Providing scholarships and supporting school development.", "state": "Libreville", "country": "Gabon"},
                {"name": "SEEG", "image": "/images/csricons/seeg.png", "achievement": "Supporting STEM education and school infrastructure.", "state": "Libreville", "country": "Gabon"},
                {"name": "Feronia", "image": "/images/csricons/feronia.png", "achievement": "Providing scholarships and supporting school development.", "state": "Kinshasa", "country": "DR Congo"},
                {"name": "CotonTchad", "image": "/images/csricons/cotontchad.png", "achievement": "Supporting vocational training and educational partnerships.", "state": "N'Djamena", "country": "Chad"},
                {"name": "COMILOG", "image": "/images/csricons/comilog.png", "achievement": "Supporting technical education and infrastructure support.", "state": "Moanda", "country": "Gabon"},
                {"name": "Cocoa Processing Company Ltd.", "image": "/images/csricons/cocoaprocessing.png", "achievement": "Supporting sustainable development education and scholarships.", "state": "Libreville", "country": "Gabon"},
                {"name": "SOSUCAM", "image": "/images/csricons/sosucam.png", "achievement": "Supporting technical education and training programs.", "state": "Yaoundé", "country": "Cameroon"},
                {"name": "CIB", "image": "/images/csricons/cib.png", "achievement": "Promoting agricultural innovation and education.", "state": "Brazzaville", "country": "Congo"}
              ]
            },
            {
              "title": "Social Media Influencer CSR For Education in Central Africa",
              "description": "Recognizing social media influencers making substantial educational impacts in Central Africa",
              "nominees": [
                {"name": "Fally Ipupa", "image": "/images/influencers/fallyipupa.png", "achievement": "Promoting education and empowerment through social media advocacy.", "state": "Kinshasa", "country": "DR Congo"},
                {"name": "Awilo Longomba", "image": "/images/influencers/awilolongomba.png", "achievement": "Supporting girls' education and empowerment through social media.", "state": "Brazzaville", "country": "Congo"},
                {"name": "Innoss'B", "image": "/images/influencers/innossb.png", "achievement": "Promoting literacy and education awareness through social media campaigns.", "state": "Kinshasa", "country": "DR Congo"}
              ]
            }
          ],
       
  }]
},

      
{
  "title": "Best EduTech Organization in Nigeria and Africa 2024",
  "description": "Acknowledges educational technology organizations that have demonstrated exemplary commitment and results in advancing education from 2014-2024.",
  "regions": [
    {
      "name": "North Africa",
      "subCategories": [
        {
          "title": "Best EduTech Startup in North Africa",
          "description": "Recognizes telecommunications companies with impactful corporate social responsibility initiatives in education in North Africa.",
          "nominees": [
            {
              "name": "Nafham (Egypt)",
              "image": "/images/edutech/nafham.png",
              "country": "Egypt",
              "achievement": "Developed an online platform offering free K-12 video lessons aligned with national curricula, utilizing crowdsourced video content to address curriculum gaps. Reached over 4 million students across Egypt and the MENA region."
            },
            {
              "name": "Almentor (Egypt)",
              "image": "/images/edutech/almentor.png",
              "country": "Egypt",
              "achievement": "Created an e-learning platform providing video-based online courses from regional experts, integrating AI-driven personalized learning paths. Empowered over 2 million learners."
            },
            {
              "name": "uLesson (Nigeria)",
              "image": "/images/edutech/uLesson.png",
              "country": "Nigeria",
              "achievement": "Interactive learning platform offering curriculum-based video lessons, quizzes, and live classes for African students. Over 2 million app downloads."
            },
            {
              "name": "ClassQuiz (Tunisia)",
              "image": "/images/edutech/classquiz.png",
              "country": "Tunisia",
              "achievement": "Gamified education platform enabling teachers to create and share quizzes, fostering interactive learning experiences."
            },
            {
              "name": "Edraak (MENA region)",
              "image": "/images/edutech/edraak.png",
              "country": "Jordan",
              "achievement": "A pioneering MOOC platform offering free online courses in Arabic, impacting millions of learners across the Arab world."
            },
            {
              "name": "Maroc Numeric Fund (Morocco)",
              "image": "/images/edutech/marocnumeric.png",
              "country": "Morocco",
              "achievement": "Investment fund supporting tech startups in Morocco, including those focused on education technology."
            },
            {
              "name": "Tadrib Online (Egypt)",
              "image": "/images/edutech/tadrib.png",
              "country": "Egypt",
              "achievement": "Online platform offering vocational and professional training programs tailored to the Egyptian market."
            },
            {
              "name": "Chifco (Tunisia)",
              "image": "/images/edutech/chifco.png",
              "country": "Tunisia",
              "achievement": "Smart solutions provider leveraging IoT and AI for educational and industrial applications."
            },
            {
              "name": "MCISE (Morocco)",
              "image": "/images/edutech/mcise.png",
              "country": "Morocco",
              "achievement": "Moroccan Center for Innovation and Social Entrepreneurship advancing social impact through education projects."
            },
            {
              "name": "Medsol (Egypt)",
              "image": "/images/edutech/medsol.png",
              "country": "Egypt",
              "achievement": "Provider of education-related technology solutions, including digital learning platforms."
            }
          ]
        },
        {
          "title": "Best EduTech Established Company in North Africa",
          "description": "Honors telecommunications companies with significant educational initiatives in North Africa.",
          "nominees": [
            {
              "name": "ATLAR (Algeria)",
              "image": "/images/edutech/atlar.png",
              "country": "Algeria",
              "achievement": "Leading provider of digital classrooms and e-learning solutions."
            },
            {
              "name": "Arab Academy for Science and Technology (Egypt)",
              "image": "/images/edutech/arabacademy.png",
              "country": "Egypt",
              "achievement": "Regional university with educational programs integrating technology and practical skills."
            },
            {
              "name": "GOMYCODE (Tunisia)",
              "image": "/images/edutech/gomycode.png",
              "country": "Tunisia",
              "achievement": "Offers coding courses and digital skills training through physical and online platforms."
            },
            {
              "name": "Menaitech (Morocco)",
              "image": "/images/edutech/menaitech.png",
              "country": "Morocco",
              "achievement": "Developer of payroll and HR software adapted for the MENA education sector."
            },
            {
              "name": "TechKnowledge (Libya)",
              "image": "/images/edutech/techknowledge.png",
              "country": "Libya",
              "achievement": "Provides digital learning solutions to universities and schools across Libya."
            },
            {
              "name": "Edunation (Jordan)",
              "image": "/images/edutech/edunation.png",
              "country": "Jordan",
              "achievement": "Learning management platform enabling schools to create, manage, and deliver online classes."
            },
            {
              "name": "Ciseco (Morocco)",
              "image": "/images/edutech/ciseco.png",
              "country": "Morocco",
              "achievement": "Delivers educational content and technology solutions to North African institutions."
            },
            {
              "name": "Edraak (Jordan)",
              "image": "/images/edutech/edraak.png",
              "country": "Jordan",
              "achievement": "Provides MOOCs with a focus on Arabic-language content."
            },
            {
              "name": "Kngine (Egypt)",
              "image": "/images/edutech/kngine.png",
              "country": "Egypt",
              "achievement": "AI-powered search engine designed to enhance learning and knowledge discovery."
            },
            {
              "name": "Learnovia (Egypt)",
              "image": "/images/edutech/learnovia.png",
              "country": "Egypt",
              "achievement": "Learning management platform that includes course creation, student tracking, and reporting."
            }
          ]
        },
        {
          "title": "Best EduTech Social Impact Initiative in North Africa",
          "description": "Recognizes technology projects with significant impact on education in North Africa.",
          "nominees": [
            {
              "name": "Injaz Egypt (Egypt)",
              "image": "/images/edutech/injaz.png",
              "country": "Egypt",
              "achievement": "Bridging the gap between education and employment through entrepreneurship programs."
            },
            {
              "name": "EFE Egypt (Education for Employment) (Egypt)",
              "image": "/images/edutech/efeegypt.png",
              "country": "Egypt",
              "achievement": "Providing youth with training and job placement to improve employability."
            },
            {
              "name": "Career 180 (Egypt)",
              "image": "/images/edutech/career180.png",
              "country": "Egypt",
              "achievement": "Career counseling and professional development platform reaching 500,000 young people."
            },
            {
              "name": "Hack the Future (Tunisia)",
              "image": "/images/edutech/hackfuture.png",
              "country": "Tunisia",
              "achievement": "Organizes hackathons and future skills training for youth."
            },
            {
              "name": "Future Leaders (Morocco)",
              "image": "/images/edutech/futureleaders.png",
              "country": "Morocco",
              "achievement": "Engages students in leadership and community development programs."
            },
            {
              "name": "Teach for Morocco (Morocco)",
              "image": "/images/edutech/teachformorocco.png",
              "country": "Morocco",
              "achievement": "Recruits and trains young leaders to teach in underserved schools."
            },
            {
              "name": "Arab Digital Opportunities (Libya)",
              "image": "/images/edutech/arabdigitalopportunities.png",
              "country": "Libya",
              "achievement": "Offers technology and online learning opportunities to youth."
            },
            {
              "name": "Empower Her (Tunisia)",
              "image": "/images/edutech/empowerher.png",
              "country": "Tunisia",
              "achievement": "Empowering young women through technology and entrepreneurship training."
            },
            {
              "name": "Digital Learning Egypt (Egypt)",
              "image": "/images/edutech/digitallearningegypt.png",
              "country": "Egypt",
              "achievement": "Provides online courses and digital resources to improve education accessibility."
            },
            {
              "name": "Youth for Science Foundation (Tunisia)",
              "image": "/images/edutech/youthforscience.png",
              "country": "Tunisia",
              "achievement": "Promotes STEM education and scientific research among youth."
            }
          ]
        }
      ]
    },
    {
      "name": "South Africa",
      "subCategories": [
        {
          "title": "Best EduTech Startup in South Africa",
          "description": "Recognizes innovative educational technology startups in South Africa.",
          "nominees": [
            {
              "name": "Siyavula Foundation",
              "image": "/images/edutech/siyavula.png",
              "country": "South Africa",
              "achievement": "Free online textbooks and practice questions for high school students in mathematics and science subjects, accessible to all students."
            },
            {
              "name": "GetSmarter",
              "image": "/images/edutech/getsmarter.png",
              "country": "South Africa",
              "achievement": "Premium online education provider offering short courses from top universities. Educational courses over 350,000 people."
            },
            {
              "name": "Snapplify",
              "image": "/images/edutech/snapplify.png",
              "country": "South Africa",
              "achievement": "Digital content platform offering e-books, audiobooks, and educational resources for schools and universities."
            },
            {
              "name": "Think Ahead",
              "image": "/images/edutech/thinkahead.png",
              "country": "South Africa",
              "achievement": "Digital learning platform providing educational content and resources for enhanced learning experiences."
            },
            {
              "name": "ITSI",
              "image": "/images/edutech/itsi.png",
              "country": "South Africa",
              "achievement": "Technology and innovation platform providing digital education solutions and technology training programs."
            },
            {
              "name": "Via Afrika",
              "image": "/images/edutech/viaafrika.png",
              "country": "South Africa",
              "achievement": "Educational publisher and content provider offering digital textbooks and learning materials for South African schools."
            },
            {
              "name": "INA Box",
              "image": "/images/edutech/inabox.png",
              "country": "South Africa",
              "achievement": "Digital education solutions provider offering innovative learning platforms and educational technology services."
            },
            {
              "name": "Digemy",
              "image": "/images/edutech/digemy.png",
              "country": "South Africa",
              "achievement": "Online learning platform that uses AI-driven adaptive learning to create personalized learning pathways for students."
            },
            {
              "name": "FunDza Literacy Trust",
              "image": "/images/edutech/fundza.png",
              "country": "South Africa",
              "achievement": "Mobile reading platform providing engaging stories and literacy content to improve reading skills among young South Africans."
            },
            {
              "name": "Varsity Vibe",
              "image": "/images/edutech/varsityvibe.png",
              "country": "South Africa",
              "achievement": "Student support platform that provides guidance and resources for university students to achieve academic success."
            }
          ]
        },
        {
          "title": "Best EduTech Established Company in South Africa",
          "description": "Honors established educational technology companies with significant impact in South Africa.",
          "nominees": [
            {
              "name": "Think Ahead",
              "image": "/images/edutech/thinkahead.png",
              "country": "South Africa",
              "achievement": "Established educational technology company providing comprehensive learning solutions and professional development programs."
            },
            {
              "name": "ITSI",
              "image": "/images/edutech/itsi.png",
              "country": "South Africa",
              "achievement": "Leading educational technology provider offering digital classroom solutions and educational content management systems."
            },
            {
              "name": "Via Afrika",
              "image": "/images/edutech/viaafrika.png",
              "country": "South Africa",
              "achievement": "Prominent educational publisher providing comprehensive learning materials and digital education solutions for African schools."
            },
            {
              "name": "GetSmarter",
              "image": "/images/edutech/getsmarter.png",
              "country": "South Africa",
              "achievement": "Established online education provider partnering with leading universities to deliver premium short courses and certifications."
            },
            {
              "name": "Snapplify",
              "image": "/images/edutech/snapplify.png",
              "country": "South Africa",
              "achievement": "Digital content distribution platform serving educational institutions with e-books, digital resources and content management."
            },
            {
              "name": "INA Box",
              "image": "/images/edutech/inabox.png",
              "country": "South Africa",
              "achievement": "Established technology solutions provider offering comprehensive digital education platforms and learning management systems."
            },
            {
              "name": "Digemy",
              "image": "/images/edutech/digemy.png",
              "country": "South Africa",
              "achievement": "Adaptive learning platform company using advanced analytics and AI to personalize educational experiences for students."
            },
            {
              "name": "FunDza Literacy Trust",
              "image": "/images/edutech/fundza.png",
              "country": "South Africa",
              "achievement": "Established literacy organization using mobile technology and gamification to improve reading levels across South Africa."
            },
            {
              "name": "Varsity Vibe",
              "image": "/images/edutech/varsityvibe.png",
              "country": "South Africa",
              "achievement": "Student services platform providing academic support, career guidance and university application assistance to South African students."
            },
            {
              "name": "Mammoth",
              "image": "/images/edutech/mammoth.png",
              "country": "South Africa",
              "achievement": "Provides digital learning solutions and comprehensive educational technology services for schools and training institutions."
            }
          ]
        },
        {
          "title": "Best EduTech Social Impact Initiative in South Africa",
          "description": "Recognizes educational technology initiatives with significant social impact in South Africa.",
          "nominees": [
            {
              "name": "CONNECT",
              "image": "/images/edutech/connect.png",
              "country": "South Africa",
              "achievement": "Digital inclusion initiative providing technology access and digital literacy training to underserved communities across South Africa."
            },
            {
              "name": "Mish Tech Geeks",
              "image": "/images/edutech/mishtech.png",
              "country": "South Africa",
              "achievement": "Youth empowerment program focusing on technology education and digital skills development for disadvantaged students."
            },
            {
              "name": "FunDza Literacy Trust",
              "image": "/images/edutech/fundza.png",
              "country": "South Africa",
              "achievement": "Mobile literacy platform using stories and interactive content to improve reading skills among South African youth."
            },
            {
              "name": "Project Isizwe",
              "image": "/images/edutech/projectisizwe.png",
              "country": "South Africa",
              "achievement": "Social impact initiative providing free WiFi and internet access to schools and communities, bridging the digital divide."
            },
            {
              "name": "Dream Factory Foundation",
              "image": "/images/edutech/dreamfactory.png",
              "country": "South Africa",
              "achievement": "Youth development program using technology and entrepreneurship training to empower young people in townships."
            },
            {
              "name": "Numeric",
              "image": "/images/edutech/numeric.png",
              "country": "South Africa",
              "achievement": "Mathematics education initiative using digital tools and gamification to improve numeracy skills among South African students."
            },
            {
              "name": "SulaBula Literacy Project",
              "image": "/images/edutech/sulabula.png",
              "country": "South Africa",
              "achievement": "Community-based literacy program using technology to improve reading and writing skills in rural and underserved areas."
            },
            {
              "name": "Empower Her",
              "image": "/images/edutech/empowerher_sa.png",
              "country": "South Africa",
              "achievement": "Women empowerment initiative providing technology training and entrepreneurship skills to young women in South Africa."
            },
            {
              "name": "Khula Development Group",
              "image": "/images/edutech/khula.png",
              "country": "South Africa",
              "achievement": "Community development organization using technology and education to create sustainable development solutions in rural communities."
            },
            {
              "name": "Teach South Africa",
              "image": "/images/edutech/teachsa.png",
              "country": "South Africa",
              "achievement": "Educational initiative training and placing young graduates in high-need schools to improve educational outcomes."
            }
          ]
        }
      ]
    },
    {
      "name": "West Africa",
      "subCategories": [
        {
          "title": "Best EduTech Startup in West Africa",
          "description": "Recognizes innovative educational technology startups in West Africa.",
          "nominees": [
            {
              "name": "Andela",
              "image": "/images/edutech/andela.png",
              "country": "Nigeria",
              "achievement": "Global talent accelerator providing software engineering training and connecting African developers with international opportunities."
            },
            {
              "name": "Tuteria",
              "image": "/images/edutech/tuteria.png",
              "country": "Nigeria",
              "achievement": "Online platform connecting students with qualified tutors for personalized learning experiences across various subjects."
            },
            {
              "name": "uLesson",
              "image": "/images/edutech/ulesson.png",
              "country": "Nigeria",
              "achievement": "Interactive learning platform offering curriculum-based video lessons, quizzes, and live classes for African students."
            },
            {
              "name": "Ubongo",
              "image": "/images/edutech/ubongo.png",
              "country": "Nigeria",
              "achievement": "Educational entertainment company creating localized learning content through cartoons, games, and mobile applications."
            },
            {
              "name": "BRCК",
              "image": "/images/edutech/brck.png",
              "country": "Nigeria",
              "achievement": "Technology solutions provider developing rugged internet connectivity devices and educational content for African schools."
            },
            {
              "name": "Edukoya",
              "image": "/images/edutech/edukoya.png",
              "country": "Nigeria",
              "achievement": "Social learning platform enabling collaborative study experiences and peer-to-peer knowledge sharing among students."
            },
            {
              "name": "M-Shule",
              "image": "/images/edutech/mshule.png",
              "country": "Senegal",
              "achievement": "AI-powered SMS-based learning platform providing accessible education content via mobile phones without internet connectivity."
            },
            {
              "name": "Eneza Education",
              "image": "/images/edutech/eneza.png",
              "country": "Ghana",
              "achievement": "Mobile learning platform delivering educational content via SMS and mobile apps to students across Africa."
            },
            {
              "name": "Afrilearn",
              "image": "/images/edutech/afrilearn.png",
              "country": "Nigeria",
              "achievement": "Digital learning platform providing curriculum-aligned video lessons and interactive content for African students."
            }
          ]
        },
        {
          "title": "Best EduTech Established Company in West Africa",
          "description": "Honors established educational technology companies with significant impact in West Africa.",
          "nominees": [
            {
              "name": "Khan Academy",
              "image": "/images/edutech/khanacademy.png",
              "country": "Nigeria",
              "achievement": "Global non-profit providing free, world-class education through comprehensive online courses and personalized learning dashboard."
            },
            {
              "name": "PrepClass",
              "image": "/images/edutech/prepclass.png",
              "country": "Nigeria",
              "achievement": "Comprehensive exam preparation platform offering practice tests, video lessons, and study materials for standardized tests."
            },
            {
              "name": "Sterlo.me",
              "image": "/images/edutech/sterlo.png",
              "country": "Nigeria",
              "achievement": "Digital content management platform providing educational institutions with tools for content creation and distribution."
            },
            {
              "name": "Eneza Education",
              "image": "/images/edutech/eneza.png",
              "country": "Ghana",
              "achievement": "Established mobile learning provider offering educational content and assessment tools across multiple African countries."
            },
            {
              "name": "Tuteria",
              "image": "/images/edutech/tuteria.png",
              "country": "Nigeria",
              "achievement": "Leading online tutoring marketplace connecting students with qualified instructors across various academic subjects."
            },
            {
              "name": "EDVES",
              "image": "/images/edutech/edves.png",
              "country": "Nigeria",
              "achievement": "Educational technology solutions provider offering learning management systems and digital content for schools."
            },
            {
              "name": "PrepClass",
              "image": "/images/edutech/prepclass.png",
              "country": "Nigeria",
              "achievement": "Established test preparation platform providing comprehensive study materials and mock examinations for various standardized tests."
            },
            {
              "name": "Teesas",
              "image": "/images/edutech/teesas.png",
              "country": "Senegal",
              "achievement": "Educational technology provider offering digital learning solutions and content management systems for African schools."
            },
            {
              "name": "Edmodo",
              "image": "/images/edutech/edmodo.png",
              "country": "Ghana",
              "achievement": "Social learning platform connecting teachers, students, and parents through secure communication and collaborative tools."
            },
            {
              "name": "KYTABU",
              "image": "/images/edutech/kytabu.png",
              "country": "Nigeria",
              "achievement": "Digital textbook platform providing affordable access to educational content through mobile devices and tablets."
            }
          ]
        },
        {
          "title": "Best EduTech Social Impact Initiative in West Africa",
          "description": "Recognizes educational technology initiatives with significant social impact in West Africa.",
          "nominees": [
            {
              "name": "Funda",
              "image": "/images/edutech/funda.png",
              "country": "Nigeria",
              "achievement": "Educational foundation providing technology access and digital literacy training to underserved communities."
            },
            {
              "name": "PrepClass",
              "image": "/images/edutech/prepclass.png",
              "country": "Nigeria",
              "achievement": "Social impact initiative offering free and subsidized exam preparation resources to disadvantaged students."
            },
            {
              "name": "Socrates.ai",
              "image": "/images/edutech/socrates.png",
              "country": "Nigeria",
              "achievement": "AI-powered educational assistant providing personalized learning support and academic guidance to students."
            },
            {
              "name": "Achieve!",
              "image": "/images/edutech/achieve.png",
              "country": "Nigeria",
              "achievement": "Youth empowerment program focusing on educational achievement and career development through technology training."
            },
            {
              "name": "MyChild",
              "image": "/images/edutech/mychild.png",
              "country": "Nigeria",
              "achievement": "Parental engagement platform connecting parents with schools and providing tools for child development monitoring."
            },
            {
              "name": "Ubongo",
              "image": "/images/edutech/ubongo.png",
              "country": "Nigeria",
              "achievement": "Social impact media company creating educational entertainment content to improve learning outcomes for African children."
            },
            {
              "name": "M-Shule",
              "image": "/images/edutech/mshule.png",
              "country": "Senegal",
              "achievement": "Inclusive learning platform providing accessible education through SMS technology, reaching students without internet access."
            },
            {
              "name": "Learnable",
              "image": "/images/edutech/learnable.png",
              "country": "Ghana",
              "achievement": "Skills development platform offering coding and digital literacy training to bridge the technology skills gap."
            },
            {
              "name": "uLesson",
              "image": "/images/edutech/ulesson.png",
              "country": "Nigeria",
              "achievement": "Educational equity initiative providing high-quality learning content to students across different socioeconomic backgrounds."
            },
            {
              "name": "Edukoya",
              "image": "/images/edutech/edukoya.png",
              "country": "Nigeria",
              "achievement": "Community learning platform fostering collaborative education and peer support among African students."
            }
          ]
        }
      ]
    },
    {
      "name": "East Africa",
      "subCategories": [
        {
          "title": "Best EduTech Startup in East Africa",
          "description": "Recognizes innovative educational technology startups in East Africa.",
          "nominees": [
            {
              "name": "KYTABU",
              "image": "/images/edutech/kytabu.png",
              "country": "Kenya",
              "achievement": "Digital textbook platform providing affordable access to educational content through mobile and tablet applications."
            },
            {
              "name": "Andela",
              "image": "/images/edutech/andela.png",
              "country": "Kenya",
              "achievement": "Global talent network training software developers and connecting them with international technology companies."
            },
            {
              "name": "Abt Oasis",
              "image": "/images/edutech/abtoasis.png",
              "country": "Kenya",
              "achievement": "Educational consultancy providing training and development solutions for schools and educational institutions."
            },
            {
              "name": "Moringa School",
              "image": "/images/edutech/moringa.png",
              "country": "Kenya",
              "achievement": "Coding bootcamp and technology training institute preparing students for careers in software development and data science."
            },
            {
              "name": "BRCK",
              "image": "/images/edutech/brck.png",
              "country": "Kenya",
              "achievement": "Hardware and connectivity solutions provider developing internet infrastructure for educational institutions in Africa."
            },
            {
              "name": "Ubongo",
              "image": "/images/edutech/ubongo.png",
              "country": "Tanzania",
              "achievement": "Educational entertainment company creating localized learning content through animated shows and interactive media."
            },
            {
              "name": "M-Shule",
              "image": "/images/edutech/mshule.png",
              "country": "Kenya",
              "achievement": "AI-powered learning platform delivering educational content via SMS and mobile applications without internet requirements."
            },
            {
              "name": "Eneza Education",
              "image": "/images/edutech/eneza.png",
              "country": "Kenya",
              "achievement": "Mobile learning platform providing curriculum-based educational content and assessment tools via SMS and mobile apps."
            },
            {
              "name": "Arifu",
              "image": "/images/edutech/arifu.png",
              "country": "Kenya",
              "achievement": "Mobile-based learning platform delivering bite-sized educational content and skills training through SMS and chatbots."
            },
            {
              "name": "Chalkboard Education",
              "image": "/images/edutech/chalkboard.png",
              "country": "Uganda",
              "achievement": "Digital learning platform providing interactive educational content and classroom management tools for African schools."
            }
          ]
        },
        {
          "title": "Best EduTech Established Company in East Africa",
          "description": "Honors established educational technology companies with significant impact in East Africa.",
          "nominees": [
            {
              "name": "KYTABU",
              "image": "/images/edutech/kytabu.png",
              "country": "Kenya",
              "achievement": "Leading digital textbook provider offering comprehensive educational content library and learning analytics platform."
            },
            {
              "name": "Andela",
              "image": "/images/edutech/andela.png",
              "country": "Kenya",
              "achievement": "Established global talent network with proven track record of training and placing African developers internationally."
            },
            {
              "name": "Abt Oasis",
              "image": "/images/edutech/abtoasis.png",
              "country": "Kenya",
              "achievement": "Established educational consultancy providing comprehensive training solutions and capacity building programs."
            },
            {
              "name": "Moringa School",
              "image": "/images/edutech/moringa.png",
              "country": "Kenya",
              "achievement": "Premier technology training institute with established curriculum and strong industry partnerships for job placement."
            },
            {
              "name": "BRCK",
              "image": "/images/edutech/brck.png",
              "country": "Kenya",
              "achievement": "Established hardware solutions provider with proven connectivity infrastructure for educational institutions across Africa."
            },
            {
              "name": "Ubongo",
              "image": "/images/edutech/ubongo.png",
              "country": "Tanzania",
              "achievement": "Leading educational entertainment company with established content distribution across multiple African countries."
            },
            {
              "name": "M-Shule",
              "image": "/images/edutech/mshule.png",
              "country": "Kenya",
              "achievement": "Established AI-driven learning platform with proven impact in delivering accessible education through mobile technology."
            },
            {
              "name": "Eneza Education",
              "image": "/images/edutech/eneza.png",
              "country": "Kenya",
              "achievement": "Leading mobile education provider with established presence across multiple East African countries."
            },
            {
              "name": "Arifu",
              "image": "/images/edutech/arifu.png",
              "country": "Kenya",
              "achievement": "Established mobile learning platform with proven methodology for delivering skills training at scale."
            },
            {
              "name": "Chalkboard Education",
              "image": "/images/edutech/chalkboard.png",
              "country": "Uganda",
              "achievement": "Established digital education provider offering comprehensive learning management systems for schools."
            }
          ]
        },
        {
          "title": "Best EduTech Social Impact Initiative in East Africa",
          "description": "Recognizes educational technology initiatives with significant social impact in East Africa.",
          "nominees": [
            {
              "name": "Teach for Uganda",
              "image": "/images/edutech/teachuganda.png",
              "country": "Uganda",
              "achievement": "Educational leadership program training and placing young professionals in underserved schools to improve learning outcomes."
            },
            {
              "name": "Arifu",
              "image": "/images/edutech/arifu.png",
              "country": "Kenya",
              "achievement": "Social impact mobile learning platform providing skills training and livelihood programs to underserved communities."
            },
            {
              "name": "Chalkboard Education",
              "image": "/images/edutech/chalkboard.png",
              "country": "Uganda",
              "achievement": "Social impact educational technology initiative providing low-cost digital learning solutions to rural schools."
            },
            {
              "name": "BRCK",
              "image": "/images/edutech/brck.png",
              "country": "Kenya",
              "achievement": "Digital inclusion initiative providing internet connectivity and educational content to remote and underserved schools."
            },
            {
              "name": "Eneza Education",
              "image": "/images/edutech/eneza.png",
              "country": "Kenya",
              "achievement": "Educational equity program providing affordable learning resources to students from low-income families across East Africa."
            },
            {
              "name": "M-Shule",
              "image": "/images/edutech/mshule.png",
              "country": "Kenya",
              "achievement": "Inclusive education initiative providing SMS-based learning to students without access to internet or smartphones."
            },
            {
              "name": "DOT (Digital Opportunity Trust)",
              "image": "/images/edutech/dot.png",
              "country": "Kenya",
              "achievement": "Youth empowerment program training young people to become digital leaders and technology mentors in their communities."
            },
            {
              "name": "EFAC (Education for a Child)",
              "image": "/images/edutech/efac.png",
              "country": "Kenya",
              "achievement": "Educational access initiative using technology to provide learning opportunities for out-of-school children."
            },
            {
              "name": "Teach for Uganda",
              "image": "/images/edutech/teachuganda.png",
              "country": "Uganda",
              "achievement": "Teacher training and deployment program using innovative teaching methods to improve educational quality in rural areas."
            },
            {
              "name": "Youth for Technology Foundation (YTF)",
              "image": "/images/edutech/ytf.png",
              "country": "Kenya",
              "achievement": "Youth development program providing technology training and digital skills development for career advancement."
            }
          ]
        }
      ]
    },
    {
      "name": "Central Africa",
      "subCategories": [
        {
          "title": "Best EduTech Startup in Central Africa",
          "description": "Recognizes innovative educational technology startups in Central Africa.",
          "nominees": [
            {
              "name": "Andela",
              "image": "/images/edutech/andela.png",
              "country": "DRC",
              "achievement": "Software development training program providing coding education and connecting local developers with global opportunities."
            },
            {
              "name": "Tech Talent Lab",
              "image": "/images/edutech/techtalent.png",
              "country": "Chad",
              "achievement": "Technology skills development initiative providing training and mentorship for young programmers and digital creators."
            },
            {
              "name": "uLesson",
              "image": "/images/edutech/ulesson.png",
              "country": "Benin",
              "achievement": "Interactive mobile learning platform offering curriculum-aligned educational content for students across Central Africa."
            },
            {
              "name": "Ubongo",
              "image": "/images/edutech/ubongo.png",
              "country": "DRC",
              "achievement": "Educational entertainment startup creating localized animated content and learning games for children."
            },
            {
              "name": "BRCK",
              "image": "/images/edutech/brck.png",
              "country": "Cameroon",
              "achievement": "Educational connectivity solutions provider developing internet infrastructure and digital learning tools for schools."
            },
            {
              "name": "Edukoya",
              "image": "/images/edutech/edukoya.png",
              "country": "Rwanda",
              "achievement": "Social learning platform enabling collaborative study experiences and peer-to-peer knowledge sharing among students."
            },
            {
              "name": "M-Shule",
              "image": "/images/edutech/mshule.png",
              "country": "Cameroon",
              "achievement": "SMS-based learning platform providing educational content accessible through basic mobile phones without internet."
            },
            {
              "name": "Eneza Education",
              "image": "/images/edutech/eneza.png",
              "country": "Madagascar",
              "achievement": "Mobile learning startup delivering curriculum-based content and assessments through SMS and mobile applications."
            },
            {
              "name": "Afrilearn",
              "image": "/images/edutech/afrilearn.png",
              "country": "DRC",
              "achievement": "Digital learning platform providing video-based lessons and interactive educational content for African students."
            }
          ]
        },
        {
          "title": "Best EduTech Established Company in Central Africa",
          "description": "Honors established educational technology companies with significant impact in Central Africa.",
          "nominees": [
            {
              "name": "Khan Academy",
              "image": "/images/edutech/khanacademy.png",
              "country": "DRC",
              "achievement": "Global educational platform providing free, comprehensive learning resources and personalized education experiences."
            },
            {
              "name": "PrepClass",
              "image": "/images/edutech/prepclass.png",
              "country": "Cameroon",
              "achievement": "Exam preparation platform offering comprehensive study materials and practice tests for standardized examinations."
            },
            {
              "name": "Girls in Tech",
              "image": "/images/edutech/girlsintech.png",
              "country": "Rwanda",
              "achievement": "Technology empowerment organization providing coding education and digital skills training for women and girls."
            },
            {
              "name": "Eneza Education",
              "image": "/images/edutech/eneza.png",
              "country": "Cameroon",
              "achievement": "Established mobile learning provider offering educational content delivery and student assessment tools."
            },
            {
              "name": "Tuteria",
              "image": "/images/edutech/tuteria.png",
              "country": "Madagascar",
              "achievement": "Online tutoring marketplace connecting students with qualified instructors for personalized learning experiences."
            },
            {
              "name": "Youth Empowerment Foundation",
              "image": "/images/edutech/youthempowerment.png",
              "country": "DRC",
              "achievement": "Educational foundation providing technology training and digital literacy programs for young people."
            },
            {
              "name": "PrepClass",
              "image": "/images/edutech/prepclass.png",
              "country": "Madagascar",
              "achievement": "Educational services provider offering test preparation resources and academic support for students."
            },
            {
              "name": "Teesas",
              "image": "/images/edutech/teesas.png",
              "country": "DRC",
              "achievement": "Educational technology solutions provider offering digital learning platforms and content management systems."
            },
            {
              "name": "Edmodo",
              "image": "/images/edutech/edmodo.png",
              "country": "Cameroon",
              "achievement": "Social learning platform connecting educators, students, and parents through collaborative digital classroom environments."
            },
            {
              "name": "KYTABU",
              "image": "/images/edutech/kytabu.png",
              "country": "Rwanda",
              "achievement": "Digital textbook platform providing affordable access to educational content through mobile and tablet devices."
            }
          ]
        },
        {
          "title": "Best EduTech Social Impact Initiative in Central Africa",
          "description": "Recognizes educational technology initiatives with significant social impact in Central Africa.",
          "nominees": [
            {
              "name": "Funda",
              "image": "/images/edutech/funda.png",
              "country": "DRC",
              "achievement": "Educational foundation providing technology access and digital literacy training to underserved communities."
            },
            {
              "name": "PrepClass",
              "image": "/images/edutech/prepclass.png",
              "country": "Cameroon",
              "achievement": "Educational equity initiative offering free and subsidized learning resources to students from disadvantaged backgrounds."
            },
            {
              "name": "Girls in Tech",
              "image": "/images/edutech/girlsintech.png",
              "country": "Rwanda",
              "achievement": "Gender equality program providing technology education and career development opportunities for women."
            },
            {
              "name": "Achieve!",
              "image": "/images/edutech/achieve.png",
              "country": "Cameroon",
              "achievement": "Youth empowerment initiative focusing on educational achievement and skills development through technology training."
            },
            {
              "name": "MyChild",
              "image": "/images/edutech/mychild.png",
              "country": "Madagascar",
              "achievement": "Child development program connecting parents with educational resources and child development monitoring tools."
            },
            {
              "name": "Youth Empowerment Foundation",
              "image": "/images/edutech/youthempowerment.png",
              "country": "DRC",
              "achievement": "Community development program providing education, training, and mentorship for young people in Central Africa."
            },
            {
              "name": "M-Shule",
              "image": "/images/edutech/mshule.png",
              "country": "Madagascar",
              "achievement": "Inclusive education initiative providing SMS-based learning to students in remote areas without internet access."
            },
            {
              "name": "Learnable",
              "image": "/images/edutech/learnable.png",
              "country": "DRC",
              "achievement": "Skills development platform offering coding and digital literacy training to bridge the technology gap."
            },
            {
              "name": "uLesson",
              "image": "/images/edutech/ulesson.png",
              "country": "Cameroon",
              "achievement": "Educational access program providing high-quality learning content to students across different socioeconomic levels."
            },
            {
              "name": "Edukoya",
              "image": "/images/edutech/edukoya.png",
              "country": "Rwanda",
              "achievement": "Community learning initiative fostering collaborative education and peer support networks among students."
            }
          ]
        }
      ]
    }
  ]
},
    {
      "title": "Overall best educational friendly state in Nigeria 2024",
      "description": "Awards the tertiary institution that stands out in academic excellence, community engagement, and student support with notable ICT infrastructure.",
      "subCategories": [
        {
          "title": "Best Education Initiative in North Central Zone",
          "description": "Honors educational initiatives in the North Central region of Nigeria.",
          "nominees": [
            {
              "name": "Kogi State",
              "state": "Kogi",
              "country": "Nigeria",
              "image": "/images/friendlystate/kogi-state.png",
              "achievement": "Logo shows three figures and text 'Kogi State'"
            },
            {
              "name": "Kwara State",
              "state": "Kwara",
              "country": "Nigeria",
              "image": "/images/friendlystate/kwara-state.png",
              "achievement": "Logo with horse head and text 'State of Harmony'"
            },
            {
              "name": "Benue State",
              "state": "Benue",
              "country": "Nigeria",
              "image": "/images/friendlystate/benue-state.png",
              "achievement": "Logo with shield and text 'Benue State'"
            },
            {
              "name": "Nasarawa State",
              "state": "Nasarawa",
              "country": "Nigeria",
              "image": "/images/friendlystate/nasarawa-state.png",
              "achievement": "Circular logo with text 'Nasarawa State Government'"
            },
            {
              "name": "Niger State",
              "state": "Niger",
              "country": "Nigeria",
              "image": "/images/friendlystate/niger-state.png",
              "achievement": "Map outline with text 'Niger State'"
            },
            {
              "name": "Plateau State",
              "state": "Plateau",
              "country": "Nigeria",
              "image": "/images/friendlystate/plateau-state.png",
              "achievement": "Logo with hills and text 'Plateau State'"
            },
            {
              "name": "Federal Capital Territory",
              "state": "FCT",
              "country": "Nigeria",
              "image": "/images/friendlystate/federal-capital-territory.png",
              "achievement": "Nigerian coat of arms"
            },
            {
              "name": "Kaduna State",
              "state": "Kaduna",
              "country": "Nigeria",
              "image": "/images/friendlystate/kaduna-state.png",
              "achievement": "Logo with shield and text 'Kaduna'"
            },
            {
              "name": "Kebbi State",
              "state": "Kebbi",
              "country": "Nigeria",
              "image": "/images/friendlystate/kebbi-state.png",
              "achievement": "Circular logo with horse head"
            },
            {
              "name": "Sokoto State",
              "state": "Sokoto",
              "country": "Nigeria",
              "image": "/images/friendlystate/sokoto-state.png",
              "achievement": "Circular logo with horse head"
            },
           
           
          ]
        },
        {
          "title": "Best Education Initiative in North East Zone",
          "description": "Recognizes outstanding educational initiatives in the North East region of Nigeria.",
          "nominees": [
            {
              "name": "Adamawa State",
              "state": "Adamawa",
              "country": "Nigeria",
              "image": "/images/friendlystate/adamawa-state.png",
              "achievement": "Circular logo with sun rays and text 'Adamawa State'"
            },
            {
              "name": "Bauchi State",
              "state": "Bauchi",
              "country": "Nigeria",
              "image": "/images/friendlystate/bauchi-state.png",
              "achievement": "Logo with shield and text 'Bauchi State'"
            },
            {
              "name": "Gombe State",
              "state": "Gombe",
              "country": "Nigeria",
              "image": "/images/friendlystate/gombe-state.png",
              "achievement": "Circular logo with sun and text 'Gombe State'"
            },
            {
              "name": "Taraba State",
              "state": "Taraba",
              "country": "Nigeria",
              "image": "/images/friendlystate/taraba-state.png",
              "achievement": "Logo with shield and text 'Taraba State'"
            },
            {
              "name": "Yobe State",
              "state": "Yobe",
              "country": "Nigeria",
              "image": "/images/friendlystate/yobe-state.png",
              "achievement": "Circular logo with sun and text 'Yobe State'"
            },
            {
              "name": "Yobe State Government",
              "state": "Yobe",
              "country": "Nigeria",
              "image": "/images/friendlystate/yobe-state-government.png",
              "achievement": "Logo with sun and text 'Yobe State Government'"
            },
            {
              "name": "Jigawa State",
              "state": "Jigawa",
              "country": "Nigeria",
              "image": "/images/friendlystate/jigawa-state.png",
              "achievement": "Circular logo with elephant and text 'Borno State'"
            },
            {
              "name": "Kano State",
              "state": "Kano",
              "country": "Nigeria",
              "image": "/images/friendlystate/Kano-state .png",
              "achievement": "Logo with shield and text 'Adamawa State'"
            },
            {
              "name": "Katsina State",
              "state": "Katsina",
              "country": "Nigeria",
              "image": "/images/friendlystate/katsina-state-2.png",
              "achievement": "Logo with shield and text 'Bauchi State'"
            },
            {
              "name": "Zamfara State",
              "state": "Zamfara",
              "country": "Nigeria",
              "image": "/images/friendlystate/Zamfara-state.png",
              "achievement": "Logo with shield and text 'Gombe State'"
            }
          ]
        },

        {
          "title": "Best Education Initiative in North West Zone",
          "description": "Celebrates exceptional educational initiatives in the North West region of Nigeria.",
          "nominees": [
            {
              "name": "Kaduna State",
              "state": "Kaduna",
              "country": "Nigeria",
              "image": "/images/friendlystate/kaduna-state.png",
              "achievement": "Logo with shield and text 'Kaduna State'"
            },
            {
              "name": "Kano State",
              "state": "Kano",
              "country": "Nigeria",
              "image": "/images/friendlystate/kano-state.png",
              "achievement": "Circular logo with text 'Kano State'"
            },
            {
              "name": "Kebbi State",
              "state": "Kebbi",
              "country": "Nigeria",
              "image": "/images/friendlystate/kebbi-state.png",
              "achievement": "Logo with shield and text 'Kebbi State'"
            },
            {
              "name": "Sokoto State",
              "state": "Sokoto",
              "country": "Nigeria",
              "image": "/images/friendlystate/sokoto-state.png",
              "achievement": "Logo with shield and text 'Sokoto State'"
            },
            {
              "name": "Jigawa State",
              "state": "Jigawa",
              "country": "Nigeria",
              "image": "/images/friendlystate/jigawa-state.png",
              "achievement": "Circular logo with sun and text 'Jigawa State'"
            },
            {
              "name": "Zamfara State",
              "state": "Zamfara",
              "country": "Nigeria",
              "image": "/images/friendlystate/zamfara-state.png",
              "achievement": "Logo with shield and text 'Zamfara State'"
            },
            {
              "name": "Katsina State",
              "state": "Katsina",
              "country": "Nigeria",
              "image": "/images/friendlystate/katsina-state.png",
              "achievement": "Logo with shield and text 'Katsina State'"
            },
            {
              "name": "Borno State",
              "state": "Borno",
              "country": "Nigeria",
              "image": "/images/friendlystate/borno-state.png",
              "achievement": "Logo with shield and text 'Kano State'"
            },
            {
              "name": "Yobe State Government",
              "state": "Yobe",
              "country": "Nigeria",
              "image": "/images/friendlystate/yobe-state-government.png",
              "achievement": "Logo with sun and text 'Yobe State Government'"
            },
            {
              "name": "Bauchi State",
              "state": "Bauchi",
              "country": "Nigeria",
              "image": "/images/friendlystate/bauchi-state.png",
              "achievement": "Logo with elephant and text 'Borno State'"
            }
          ]
        },
        {
          "title": "Best Education Initiative in South East Zone",
          "description": "Honors outstanding educational initiatives in the South East region of Nigeria.",
          "nominees": [
            {
              "name": "Abia State",
              "state": "Abia",
              "country": "Nigeria",
              "image": "/images/friendlystate/abia-state.png",
              "achievement": "Circular logo with text 'Government of Abia State'"
            },
            {
              "name": "Anambra State",
              "state": "Anambra",
              "country": "Nigeria",
              "image": "/images/friendlystate/anambra-state.png",
              "achievement": "Logo with shield and text 'Anambra State'"
            },
            {
              "name": "Ebonyi State",
              "state": "Ebonyi",
              "country": "Nigeria",
              "image": "/images/friendlystate/ebonyi-state.png",
              "achievement": "Logo with shield and text 'Ebonyi State'"
            },
            {
              "name": "Enugu State Government",
              "state": "Enugu",
              "country": "Nigeria",
              "image": "/images/friendlystate/enugu-state-government.png",
              "achievement": "Map outline with text 'Enugu State Government'"
            },
            {
              "name": "Imo State",
              "state": "Imo",
              "country": "Nigeria",
              "image": "/images/friendlystate/imo-state.png",
              "achievement": "Circular logo with text 'Imo State Nigeria'"
            },
            {
              "name": "Anambra State",
              "state": "Anambra",
              "country": "Nigeria",
              "image": "/images/friendlystate/anambra-state.png",
              "achievement": "Logo with shield and text 'Anambra State'"
            },
            {
              "name": "Akwa Ibom State",
              "state": "Akwa Ibom",
              "country": "Nigeria",
              "image": "/images/friendlystate/akwaibom-state.png",
              "achievement": "Circular logo with text 'Government of Abia State'"
            },
            {
              "name": "Rivers  State",
              "state": "Rivers",
              "country": "Nigeria",
              "image": "/images/friendlystate/rivers-state.png",
              "achievement": "Logo with shield and text 'Rivers  State'"
            },
            {
              "name": "Bayelsa State",
              "state": "Bayelsa",
              "country": "Nigeria",
              "image": "/images/friendlystate/bayelsa-state.png",
              "achievement": "Logo with shield and text 'Enugu State'"
            },
            {
              "name": "Delta State",
              "state": "Delta",
              "country": "Nigeria",
              "image": "/images/friendlystate/delta-state.png",
              "achievement": "Logo with palm tree and text 'Imo State'"
            }
          ]
        },

        {
          "title": "Best Education Initiative in South South Zone",
          "description": "Recognizes exceptional educational initiatives in the South South region of Nigeria.",
          "nominees": [
            {
              "name": "Akwa Ibom State",
              "state": "Akwa Ibom",
              "country": "Nigeria",
              "image": "/images/friendlystate/akwaibom-state.png",
              "achievement": "Circular logo with text 'Akwa Ibom State'"
            },
            {
              "name": "Bayelsa State",
              "state": "Bayelsa",
              "country": "Nigeria",
              "image": "/images/friendlystate/bayelsa-state.png",
              "achievement": "Logo with shield and text 'Bayelsa State'"
            },
            {
              "name": "Cross River State",
              "state": "Cross River",
              "country": "Nigeria",
              "image": "/images/friendlystate/cross-river-state.png",
              "achievement": "Logo with leopard and text 'Cross River State'"
            },
            {
              "name": "Delta State",
              "state": "Delta",
              "country": "Nigeria",
              "image": "/images/friendlystate/delta-state.png",
              "achievement": "Circular logo with text 'Delta State'"
            },
            {
              "name": "Edo State",
              "state": "Edo",
              "country": "Nigeria",
              "image": "/images/friendlystate/edo-state.png",
              "achievement": "Logo with shield and text 'Edo State'"
            },
            {
              "name": "Rivers State",
              "state": "Rivers",
              "country": "Nigeria",
              "image": "/images/friendlystate/rivers-state.png",
              "achievement": "Circular logo with text 'Rivers State'"
            },
            {
              "name": "Anambra State",
              "state": "Anambra",
              "country": "Nigeria",
              "image": "/images/friendlystate/anambra.png",
              "achievement": "Logo with shield and text 'Akwa Ibom State'"
            },
            {
              "name": "Abia State",
              "state": "Abia",
              "country": "Nigeria",
              "image": "/images/friendlystate/abia-state.png",
              "achievement": "Logo with leopard and text 'Cross River State'"
            },
            {
              "name": "Imo State",
              "state": "Delta",
              "country": "Nigeria",
              "image": "/images/friendlystate/imo-state.png",
              "achievement": "Logo with shield and text 'Delta State'"
            },
            {
              "name": "Enugu State Government",
              "state": "Enugu",
              "country": "Nigeria",
              "image": "/images/friendlystate/enugu-state-government.png",
              "achievement": "Map outline with text 'Enugu State Government'"
            }
          ]
        },
        {
          "title": "Best Education Initiative in South West Zone",
          "description": "Celebrates outstanding educational initiatives in the South West region of Nigeria.",
          "nominees": [
            {
              "name": "Ekiti State",
              "state": "Ekiti",
              "country": "Nigeria",
              "image": "/images/friendlystate/ekiti-state.png",
              "achievement": "Logo with hills and text 'Ekiti State'"
            },
            {
              "name": "Lagos State",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/friendlystate/lagos-state.png",
              "achievement": "Logo with text 'Lagos State'"
            },
            {
              "name": "Ogun State",
              "state": "Ogun",
              "country": "Nigeria",
              "image": "/images/friendlystate/ogun-state.png",
              "achievement": "Logo with text 'Ogun State'"
            },
            {
              "name": "Ondo State",
              "state": "Ondo",
              "country": "Nigeria",
              "image": "/images/friendlystate/ondo-state.png",
              "achievement": "Logo with text 'Ondo State'"
            },
            {
              "name": "Osun State",
              "state": "Osun",
              "country": "Nigeria",
              "image": "/images/friendlystate/osun-state.png",
              "achievement": "Logo with text 'State of Osun'"
            },
            {
              "name": "Oyo State",
              "state": "Oyo",
              "country": "Nigeria",
              "image": "/images/friendlystate/oyo-state.png",
              "achievement": "Logo with text 'Oyo State'"
            },
            {
              "name": "Kogi State",
              "state": "Kogi",
              "country": "Nigeria",
              "image": "/images/friendlystate/kogi-state.png",
              "achievement": "Logo with text 'Ogun State'"
            },
            {
              "name": "Niger State",
              "state": "Niger",
              "country": "Nigeria",
              "image": "/images/friendlystate/niger-state.png",
              "achievement": "Logo with text 'Lagos State'"
            },
            {
              "name": "Kwara State",
              "state": "Kwara",
              "country": "Nigeria",
              "image": "/images/friendlystate/kwara-state.png",
              "achievement": "Logo with horse head and text 'Kwara State'"
            },
            {
              "name": "Nasarawa State",
              "state": "Nasarawa",
              "country": "Nigeria",
              "image": "/images/friendlystate/nasarawa-state.png",
              "achievement": "Map outline with text 'Niger State'"}
            ]
          }
        ]
      },
  {
      "title": "The best library in Nigerian tertiary institutions award 2024",
      "description": "Recognizes libraries that have made exceptional contributions and excellence to educational research and innovation, thus shaping future educational strategies.",
      "subCategories": [
        {
          "title": "Best University Library in Nigeria (Public)",
          "description": "This category celebrates outstanding public university libraries that have demonstrated excellence in supporting academic research and learning.",
          "nominees": [
            {
              "name": "University of Lagos Library",
              "achievement": "Exceptional collection and innovative services supporting diverse academic programs.",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/libraries/University_of_Lagos_Library.png"
            },
            {
              "name": "Ahmadu Bello University Library",
              "achievement": "Extensive research resources and digital innovation in library services.",
              "state": "Kaduna",
              "country": "Nigeria",
              "image": "/images/libraries/Ahmadu_Bello_University_Library.png"
            },
            {
              "name": "University of Ibadan Library",
              "achievement": "Rich historical collection and modern facilities supporting academic excellence.",
              "state": "Oyo",
              "country": "Nigeria",
              "image": "/images/libraries/University_of_Ibadan_Library.png"
            },
            {
              "name": "Obafemi Awolowo University Library",
              "achievement": "Cutting-edge digital resources and collaborative learning spaces.",
              "state": "Osun",
              "country": "Nigeria",
              "image": "/images/libraries/Obafemi_Awolowo_University_Library.png"
            },
            {
              "name": "Federal University of Technology Akure Library",
              "achievement": "Specialized technology-focused collections and innovative research support.",
              "state": "Ondo",
              "country": "Nigeria",
              "image": "/images/libraries/Federal_University_of_Technology_Akure_Library.png"
            },
            {
              "name": "University of Nigeria, Nsukka Library",
              "achievement": "Comprehensive academic resources and cultural preservation initiatives.",
              "state": "Enugu",
              "country": "Nigeria",
              "image": "/images/libraries/University_of_Nigeria_Nsukka_Library.png"
            },
            {
              "name": "University of Ilorin Library",
              "achievement": "Advanced e-learning resources and user-centered service innovations.",
              "state": "Kwara",
              "country": "Nigeria",
              "image": "/images/libraries/University_of_Ilorin_Library.png"
            },
            {
              "name": "Nnamdi Azikiwe University Library",
              "achievement": "Emerging research hub with rapidly expanding digital and physical collections.",
              "state": "Jigawa",
              "country": "Nigeria",
              "image": "/images/libraries/Nnamdi_Azikiwe_University_Library.png"
            },
            {
              "name": "Bayero University, Kano Library",
              "achievement": "Diverse multilingual collections supporting interdisciplinary research.",
              "state": "Kano",
              "country": "Nigeria",
              "image": "/images/libraries/Bayero_University_Kano_Library.png"
            },
            {
              "name": "University of Port Harcourt Library",
              "achievement": "Extensive resources supporting oil and gas research and general academics.",
              "state": "Rivers",
              "country": "Nigeria",
              "image": "/images/libraries/University_of_Port_Harcourt_Library.png"
            },
          ]
        },
        {
          "title": "Best University Library in Nigeria (Private)",
          "description": "This category recognizes private university libraries that have shown outstanding commitment to enhancing academic resources and student learning experiences.",
          "nominees": [
            {
              "name": "Covenant University Library",
              "achievement": "State-of-the-art facilities and comprehensive digital resources.",
              "state": "Ogun",
              "country": "Nigeria",
              "image": "/images/libraries/Covenant_University_Library.png"
            },
            {
              "name": "Babcock University Library",
              "achievement": "Extensive collection supporting diverse academic programs.",
              "state": "Ogun",
              "country": "Nigeria",
              "image": "/images/libraries/Babcock_University_Library.png"
            },
            {
              "name": "American University Library",
              "achievement": "International standards in academic resources and research support.",
              "state": "Adamawa",
              "country": "Nigeria",
              "image": "/images/libraries/American_University_Library.png"
            },
            {
              "name": "Afe Babalola University Library",
              "achievement": "Innovative learning spaces and cutting-edge technology integration.",
              "state": "Ekiti",
              "country": "Nigeria",
              "image": "/images/libraries/Afe_Babalola_University_Library.png"
            },
            {
              "name": "Landmark University Library",
              "achievement": "Specialized collections supporting entrepreneurship and innovation.",
              "state": "Edo",
              "country": "Nigeria",
              "image": "/images/libraries/Landmark_University_Library.png"
            },
            {
              "name": "Pan-Atlantic University Library",
              "achievement": "Focused resources supporting business and media studies.",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/libraries/Pan-Atlantic_University_Library.png"
            },
            {
              "name": "Redeemer's University Library",
              "achievement": "Extensive e-resources and collaborative research spaces.",
              "state": "Osun",
              "country": "Nigeria",
              "image": "/images/libraries/Redeemers_University_Library.png"
            },
            {
              "name": "Bowen University Library",
              "achievement": "Rich collection supporting health sciences and general academics.",
              "state": "Osun",
              "country": "Nigeria",
              "image": "/images/libraries/Bowen_University_Library.png"
            },
            {
              "name": "Bells University of Technology Library",
              "achievement": "Specialized resources for technology and engineering studies.",
              "state": "Ogun",
              "country": "Nigeria",
              "image": "/images/libraries/Bells_University_of_Technology_Library.png"
            },
            {
              "name": "Joseph Ayo Babalola University Library",
              "achievement": "Diverse collection supporting multidisciplinary research and learning.",
              "state": "Oyo",
              "country": "Nigeria",
              "image": "/images/libraries/Joseph_Ayo Babalola_University_Library.png"
            }
          ]
        },
        {
          "title": "Best Polytechnic Library in Nigeria",
          "description": "This category honors polytechnic libraries that excel in providing resources and services tailored to technical and vocational education.",
          "nominees": [
            {
              "name": "Yaba College of Technology Library",
              "achievement": "Comprehensive technical resources and innovative maker spaces.",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/libraries/Yaba_College_of_Technology_Library.png"
            },
            {
              "name": "Kaduna Polytechnic Library",
              "achievement": "Extensive collection supporting diverse technical programs.",
              "state": "Kaduna",
              "country": "Nigeria",
              "image": "/images/libraries/Kaduna_Polytechnic_Library.png"
            },
            {
              "name": "Federal Polytechnic, Nekede Library",
              "achievement": "Advanced digital resources for technical and vocational studies.",
              "state": "Imo",
              "country": "Nigeria",
              "image": "/images/libraries/Federal_Polytechnic_Nekede_Library.png"
            },
            {
              "name": "Auchi Polytechnic Library",
              "achievement": "Specialized collections supporting applied sciences and technology.",
              "state": "Edo",
              "country": "Nigeria",
              "image": "/images/libraries/Auchi_Polytechnic_Library.png"
            },
            {
              "name": "Federal Polytechnic, Ilaro Library",
              "achievement": "Innovative learning spaces and technical resource centers.",
              "state": "Ogun",
              "country": "Nigeria",
              "image": "/images/libraries/Federal_Polytechnic_Ilaro_Library.png"
            },
            {
              "name": "Lagos State Polytechnic Library",
              "achievement": "Comprehensive resources supporting diverse technical programs.",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/libraries/Lagos_State_Polytechnic_Library.png"
            },
            {
              "name": "Ibadan Polytechnic Library",
              "achievement": "Extensive e-learning resources for technical education.",
              "state": "Ogun",
              "country": "Nigeria",
              "image": "/images/libraries/Ibadan_Polytechnic_Library.png"
            },
            {
              "name": "Rufus Giwa Polytechnic Library",
              "achievement": "Specialized collections supporting technology and innovation.",
              "state": "Ekiti",
              "country": "Nigeria",
              "image": "/images/libraries/Rufus_Giwa_Polytechnic_Library.png"
            },
            {
              "name": "Federal Polytechnic, Bida Library",
              "achievement": "Rich resources supporting technical and vocational programs.",
              "state": "Niger",
              "country": "Nigeria",
              "image": "/images/libraries/Federal_Polytechnic_Bida_Library.png"
            },
            {
              "name": "Federal Polytechnic, Oko Library",
              "achievement": "Advanced digital resources and technical research support.",
              "state": "Anambra",
              "country": "Nigeria",
              "image": "/images/libraries/Federal_Polytechnic_Oko_Library.png"
             
          },
        ]
      },
            {
              "title": "Best College of Nursing Library in Nigeria (Public)",
              "description": "This category honors public nursing college libraries that have demonstrated excellence in supporting nursing education and research.",
              "nominees": [
                {
                  "name": "Lagos State College of Nursing Library",
                  "achievement": "Exceptional support for nursing education and research.",
                  "state": "Lagos State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Lagos_State_College_of_Nursing_Library.png"
                },
                {
                  "name": "Oyo State College of Nursing Library",
                  "achievement": "Outstanding resources for nursing students and faculty.",
                  "state": "Oyo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Oyo_State_College_of_Nursing_Library.png"
                },
                {
                  "name": "School of Nursing, University of Uyo",
                  "achievement": "Innovative library services supporting nursing education.",
                  "state": "Akwa Ibom State",
                  "country": "Nigeria",
                  "image": "/images/libraries/School_of_Nursing_University_of_Uyo.png"
                },
                {
                  "name": "School of Nursing, Lagos University",
                  "achievement": "Comprehensive nursing research support and resources.",
                  "state": "Lagos State",
                  "country": "Nigeria",
                  "image": "/images/libraries/School_of_Nursing_Lagos_University.png"
                },
                {
                  "name": "School of Nursing, University College Hospital",
                  "achievement": "Excellent collection of nursing and medical literature.",
                  "state": "Oyo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/School_of_Nursing_University_College_Hospital.png"
                },
                {
                  "name": "School of Nursing, Obafemi Awolowo University",
                  "achievement": "Cutting-edge digital resources for nursing students.",
                  "state": "Osun State",
                  "country": "Nigeria",
                  "image": "/images/libraries/School_of_Nursing_Obafemi_Awolowo_University.png"
                },
                {
                  "name": "School of Nursing, University of Nigeria",
                  "achievement": "Exceptional support for nursing research and education.",
                  "state": "Enugu State",
                  "country": "Nigeria",
                  "image": "/images/libraries/School_of_Nursing_University_of_Nigeria.png"
                },
                {
                  "name": "School of Nursing, Ahmadu Bello University",
                  "achievement": "Outstanding nursing education resources and services.",
                  "state": "Kaduna State",
                  "country": "Nigeria",
                  "image": "/images/libraries/School_of_Nursing_Ahmadu_Bello_University.png"
                },
                {
                  "name": "School of Nursing, University of  Nigeria.",
                  "achievement": "Innovative library programs supporting nursing students.",
                  "state": "Edo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/School_of_Nursing_University_of_Nigeria.png"
                },
                {
                  "name": "School of Nursing, Federal Medical Centre",
                  "achievement": "Exceptional nursing and medical library resources.",
                  "state": "Imo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/School_of_Nursing_Federal_Medical_Centre.png"
                }
              ]
            },
            {
              "title": "Best Polytechnic Library in Nigeria (Private)",
              "description": "This category recognizes private polytechnic libraries that have shown outstanding support for technical and vocational education.",
              "nominees": [
                {
                  "name": "Wavecrest College of Hospitality Library",
                  "achievement": "Exceptional library resources for hospitality education.",
                  "state": "Lagos State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Wavecrest_College_of_Hospitality.png"
                },
                {
                  "name": "Heritage Polytechnic Library",
                  "achievement": "Comprehensive technical education resources and services.",
                  "state": "Akwa Ibom State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Heritage_Polytechnic_Library.png"
                },
                {
                  "name": "Dorben Polytechnic Library",
                  "achievement": "Innovative library programs supporting vocational studies.",
                  "state": "Ogun State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Dorben_Polytechnic_Library.png"
                },
                {
                  "name": "Crown Polytechnic Library",
                  "achievement": "Outstanding support for technical research and education.",
                  "state": "Ondo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Crown_Polytechnic_Library.png"
                },
                {
                  "name": "Temple Gate Polytechnic Library",
                  "achievement": "Excellent digital resources for polytechnic students.",
                  "state": "Lagos State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Temple_Polytechnic_Library.png"
                },
                {
                  "name": "Calvary Polytechnic Library",
                  "achievement": "Comprehensive collection supporting various technical fields.",
                  "state": "Benue State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Calvary_Polytechnic_Library.png"
                },
                {
                  "name": "Wolex Polytechnic Library",
                  "achievement": "Innovative library services for vocational education.",
                  "state": "Edo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Wolex_Polytechnic_Library.png"
                },
              
                {
                  "name": "Allover Central Polytechnic Library",
                  "achievement": "Outstanding support for polytechnic research and learning.",
                  "state": "Ogun State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Allover_Central_Polytechnic_Library.png"
                },
                {
                  "name": "Grace Polytechnic Library",
                  "achievement": "Comprehensive library services for technical education.",
                  "state": "Abia State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Grace_Polytechnic_Library.png"
                }
              ]
            },
            {
              "title": "Best College of Education Library in Nigeria (Private)",
              "description": "This category honors private college of education libraries that have excelled in supporting teacher training and educational research.",
              "nominees": [
                {
                  "name": "Michael Otedola College of Primary Education Library",
                  "achievement": "Exceptional resources for primary education training.",
                  "state": "Enugu State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Michael_Otedola_College_Primary_Education Library.png"
                },
                {
                  "name": "Alvan Ikoku College of Education Library",
                  "achievement": "Comprehensive support for teacher education programs.",
                  "state": "Oyo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Alvanikoku_College_of_Education_Library.png"
                },
                {
                  "name": "Emmanuel Alayande College of Education Library",
                  "achievement": "Innovative library services for education students.",
                  "state": "Enugu State",
                  "country": "Nigeria",
                  "image": "/images/libraries/EmmanuelAlayande_College_of_Education_Library.png"
                },
                {
                  "name": "Tai Solarin College of Education Library",
                  "achievement": "Outstanding collection supporting educational research.",
                  "state": "Akwa Ibom State",
                  "country": "Nigeria",
                  "image": "/images/libraries/TaiSolarin_College_of_Education_Library.png"
                },
                {
                  "name": "Nwafor Orizu College of Education Library",
                  "achievement": "Excellent digital resources for teacher training.",
                  "state": "Lagos State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Nwafor_Orizu_College_of_Education_Library.png"
                },
                {
                  "name": "Bishop Ajayi Crowther College of Education Library",
                  "achievement": "Comprehensive support for educational studies.",
                  "state": "Ogun State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Bishop_Ajayi_Crowther_College_of_Education_Library.png"
                },
                {
                  "name": "St. Augustine College of Education Library",
                  "achievement": "Innovative programs supporting education students.",
                  "state": "Kano State",
                  "country": "Nigeria",
                  "image": "/images/libraries/St_Augustine_College_of_Education_Library.png"
                },
                {
                  "name": "Cornerstone College of Education Library",
                  "achievement": "Exceptional resources for teacher education and research.",
                  "state": "Oyo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Cornerstone_College_of_Education_Library.png"
                },
                {
                  "name": "Jigawa State College of Education Library",
                  "achievement": "Outstanding support for educational technology and research.",
                  "state": "Lagos State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Jigawa_State_College_of_Education_Library.png"
                },
                {
                  "name": "Adamu Augie College of Education Library",
                  "achievement": "Comprehensive library services for education students.",
                  "state": "Ondo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Adamu_Augie_College_of_Education_Library.png"
                }
              ]
            },
            {
              "title": "Best College of Nursing Library in Nigeria (Private)",
              "description": "This category recognizes private nursing college libraries that have demonstrated excellence in supporting nursing education and research.",
              "nominees": [
                {
                  "name": "Babcock University School of Nursing Library",
                  "achievement": "Exceptional nursing education resources and services.",
                  "state": "Edo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Babcock_University_School_of_Nursing_Library.png"
                },
                {
                  "name": "Afe Babalola University School of Nursing Library",
                  "achievement": "Comprehensive support for nursing research and education.",
                  "state": "Ekiti State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Afe_Babalola_University_School_of_Nursing_Library.png"
                },
                {
                  "name": "Bowen University School of Nursing Library",
                  "achievement": "Innovative library services for nursing students.",
                  "state": "Osun State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Bowen_University_School_of_Nursing_Library.png"
                },
        
                {
                  "name": "Achievers University School of Nursing Library",
                  "achievement": "Comprehensive collection supporting nursing research.",
                  "state": "Ondo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Achievers_University_School_of_Nursing_Library.png"
                },
                {
                  "name": "Igbinedion University College of Health Sciences Library",
                  "achievement": "Innovative programs supporting nursing students.",
                  "state": "Edo State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Igbinedion_University_College_of_Health_Sciences_Library.png"
                },
                
                {
                  "name": "Madonna University School of Nursing Library",
                  "achievement": "Outstanding nursing education resources and services.",
                  "state": "Anambra State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Madonna_University_School_of_Nursing_Library.png"
                },
                {
                  "name": "Lead City University School of Nursing Library",
                  "achievement": "Comprehensive library services for nursing students.",
                  "state": "Ogun State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Lead_City_University_School_of_Nursing_Library.png"
                },
                {
                  "name": "Benson Idahosa University School of Nursing Library",
                  "achievement": "Comprehensive library services for nursing students.",
                  "state": "Ogun State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Benson_Idahosa_University_School_of_Nursing_Library.png"
                },
                {
                  "name": "Novena University School of Nursing Library",
                  "achievement": "Comprehensive library services for nursing students.",
                  "state": "Ogun State",
                  "country": "Nigeria",
                  "image": "/images/libraries/Novena_University_School_of_Nursing_Library.png"
                }
              ]
          
        },
        {
          "title": "Best College Of Education Library in Nigeria (public)",
          "description": "This category recognizes libraries in Colleges of Education that have excelled in supporting teacher training and educational research.",
          "nominees": [
            {
              "name": "Adeyemi College of Education Library",
              "achievement": "Comprehensive resources supporting teacher education and research.",
              "state": "Ondo",
              "country": "Nigeria",
              "image": "/images/libraries/Adeyemi_College_of_Education_Library.png"
            },
            {
              "name": "Federal College of Education Library",
              "achievement": "Extensive collection supporting diverse education programs.",
              "state": "Kano",
              "country": "Nigeria",
              "image": "/images/libraries/Federal_College_of_Education_Library.png"
            },
            {
              "name": "College of Education Oyo Library",
              "achievement": "Innovative resources for modern teacher training.",
              "state": "Ekiti",
              "country": "Nigeria",
              "image": "/images/libraries/College_of_Education_Oyo_Library.png"
            },
            {
              "name": "Federal College of Education Library",
              "achievement": "Rich collection supporting educational research and practice.",
              "state": "Akoka",
              "country": "Nigeria",
              "image": "/images/libraries/Federal_College_of_Education_Library.png"
            },
            {
              "name": "College of Education, Gindiri Library",
              "achievement": "Specialized resources for technical education and teacher training.",
              "state": "Akoka",
              "country": "Nigeria",
              "image": "/images/libraries/College_of_Education_Gindiri_Library.png"
            },
            {
              "name": "Federal College of Education Library",
              "achievement": "Modern facilities supporting educational technology integration.",
              "state": "FCT",
              "country": "Nigeria",
              "image": "/images/libraries/Federal_College_of_Education_Library.png"
            },
    
            {
              "name": "College of Education, Ekiadolor Libra",
              "achievement": "Innovative learning spaces for future educators.",
              "state": "Benin",
              "country": "Nigeria",
              "image": "/images/libraries/College_of_Education_Ekiadolor_Libra.png"
            },
            {
              "name": "College of Education, Warri Library",
              "achievement": "Rich resources supporting educational research and practice.",
              "state": "Delta",
              "country": "Nigeria",
              "image": "/images/libraries/College_of_Education_Warri_Library.png"}
            ]
          }
        ]
      },
    {
      "title": "The Overall Best Research and Development Contribution by Research Institutes in Achieving  Education for all.",
      "description": "Recognizing media role in educational awareness and innovation. Awards media houses and organizations that effectively contribute to educational development.",
      "subCategories": [
        {
          "title": "Best Agricultural Research Institute in Nigeria",
          "description": "Honors institutions that have made significant contributions to agricultural research in Nigeria.",
          "nominees": [
            { "name": "IITA (International Institute of Tropical Agriculture)", "state": "Ibadan, Nigeria", "image": "/images/research-development/IITA.png", "achievement": "Pioneered research in tropical agriculture, including the development of disease-resistant crop varieties. Improved food security." },
            { "name": "NRCRI (National Root Crops Research Institute)", "state": "Umudike, Nigeria", "image": "/images/research-development/NRCRI.png", "achievement": "Focused on research to improve the production and utilization of root crops like cassava and yam. Enhanced the livelihoods of rural farmers." },
            { "name": "IAR (Institute for Agricultural Research)", "state": "Zaria, Nigeria", "image": "/images/research-development/IAR.png", "achievement": "Developed innovative agricultural practices and crop varieties suitable for arid regions. Supported sustainable agriculture in Northern Nigeria." },
            { "name": "NIFOR (Nigerian Institute for Oil Palm Research)", "state": "Benin City, Nigeria", "image": "/images/research-development/NIFOR.png", "achievement": "Conducted research on improving oil palm production and processing techniques. Boosted Nigeria's palm oil industry, contributing to economic growth." },
            { "name": "NCRI (National Cereals Research Institute)", "state": "Badeggi, Nigeria", "image": "/images/research-development/NCRI_Cereals.png", "achievement": "Focused on cereal crop research, including rice and maize, to enhance productivity and disease resistance. Increased cereal crop yields." },
            { "name": "CRIN (Cocoa Research Institute of Nigeria)", "state": "Ibadan, Nigeria", "image": "/images/research-development/CRIN.png", "achievement": "Advanced research on cocoa production and disease management. Supported the revitalization of Nigeria's cocoa industry, boosting exports." },
            { "name": "NAPRI (National Animal Production Research Institute)", "state": "Zaria, Nigeria", "image": "/images/research-development/NAPRI.png", "achievement": "Developed strategies for improving livestock production and management. Enhanced livestock productivity, contributing to food security." },
            { "name": "IAR&T (Institute of Agricultural Research & Training)", "state": "Ibadan, Nigeria", "image": "/images/research-development/IAR&T.png", "achievement": "Integrated research and training to improve agricultural practices and farmer education. Provided training and resources to farmers." },
            { "name": "RRIN (Rubber Research Institute of Nigeria)", "state": "Benin City, Nigeria", "image": "/images/research-development/RRIN.png", "achievement": "Conducted research to improve rubber production and processing. Supported the growth of Nigeria's rubber industry, creating economic opportunities." },
            { "name": "NIHORT (National Horticultural Research Institute)", "state": "Ibadan, Nigeria", "image": "/images/research-development/NIHORT.png", "achievement": "Focused on research to improve horticultural crop production, including fruits and vegetables. Enhanced food diversity and rural economies." }
          ]
        },
        {
          "title": "Best Pharmaceutical And Drug Research Institute in Nigeria",
          "description": "Recognizes institutions that have excelled in pharmaceutical and drug research in Nigeria.",
          "nominees": [
            { "name": "NIPRD (National Institute for Pharmaceutical Research and Development)", "state": "Abuja, Nigeria", "image": "/images/research-development/NIPRD.png", "achievement": "Conducted groundbreaking research in drug development and traditional medicine. Contributed to the development of affordable medicines." },
            { "name": "NIMR (Nigerian Institute of Medical Research)", "state": "Lagos, Nigeria", "image": "/images/research-development/NIMR.png", "achievement": "Focused on research in public health, infectious diseases, and drug development. Played a critical role in improving disease management." },
            { "name": "NAFDAC (National Agency for Food and Drug Administration and Control)", "state": "Lagos, Nigeria", "image": "/images/research-development/NAFDAC.png", "achievement": "Conducted extensive research in pharmacology, toxicology, and pharmaceutical chemistry. Contributed to the safety of drugs and food products." },
            { "name": "Faculty of Pharmacy, University of Ibadan", "state": "Ibadan, Nigeria", "image": "/images/research-development/Faculty_of_Pharmacy_University_of_Ib.png", "achievement": "Conducted extensive research in pharmacology, toxicology, and pharmaceutical chemistry. Contributed to the development of new drugs." },
            { "name": "Faculty of Pharmaceutical Sciences", "state": "Nsukka, Nigeria", "image": "/images/research-development/Faculty_of_Pharmaceutical_Sciences.png", "achievement": "Advanced research in drug formulation, natural products, and pharmacokinetics. Improved drug delivery systems and contributed to pharmaceutical innovations." },
            { "name": "Faculty of Pharmacy, Ahmadu Bello University", "state": "Zaria, Nigeria", "image": "/images/research-development/Faculty_of_Pharmacy_Ahmadu_Bello.png", "achievement": "Focused on the development of herbal medicines and the study of traditional remedies. Supported the integration of traditional and modern medicine." },
            { "name": "NIST (Nigerian Institute of Science and Technology)", "state": "Abuja, Nigeria", "image": "/images/research-development/NIST.png", "achievement": "Led research in laboratory technology and quality control in pharmaceuticals. Enhanced laboratory standards and drug testing capabilities." },
            { "name": "Department of Pharmacognosy, University of Lagos", "state": "Lagos, Nigeria", "image": "/images/research-development/Department_of_Pharmacognosy_Uni.png", "achievement": "Specialized in the study of medicinal plants and natural products. Contributed to the discovery of new plant-based drugs and therapies." },
            { "name": "Faculty of Pharmacy, Obafemi Awolowo University", "state": "Ile-Ife, Nigeria", "image": "/images/research-development/Faculty_of_Pharmacy_Obafemi_Awo.png", "achievement": "Focused on pharmaceutical research and the development of new drug formulations. Advanced the field of pharmacy through innovative research." },
            { "name": "Department of Pharmacology, University of Benin", "state": "Benin City, Nigeria", "image": "/images/research-development/Department_of_Pharmacology_Uni.png", "achievement": "Conducted research on drug interactions, side effects, and pharmacovigilance. Improved drug safety and contributed to the development of treatment protocols." }
          ]
        },
        {
          "title": "Best Environmental And Ecological Research Institute",
          "description": "Honors institutions that have made significant contributions to environmental and ecological research.",
          "nominees": [
            { "name": "NEST (Nigerian Environmental Study/Action Team)", "state": "Ibadan, Nigeria", "image": "/images/research-development/NEST.png", "achievement": "Conducted research on environmental sustainability and climate change adaptation. Influenced environmental policy and public awareness." },
            { "name": "FRIN (Forestry Research Institute of Nigeria)", "state": "Ibadan, Nigeria", "image": "/images/research-development/FRIN.png", "achievement": "Led research in forest conservation, reforestation, and sustainable forest management. Contributed to the preservation of Nigeria's forest resources." },
            { "name": "NCERD (National Centre for Energy Research and Development)", "state": "Nsukka, Nigeria", "image": "/images/research-development/NCERD.png", "achievement": "Focused on renewable energy research and its environmental impact. Promoted the use of renewable energy sources and reduced environmental degradation." },
            { "name": "Centre for Environmental Studies and Sustainable Development", "state": "Lagos, Nigeria", "image": "/images/research-development/Centre_for_Environmental_Studies_a.png", "achievement": "Advanced research in environmental management and sustainable development practices. Supported the integration of sustainable practices in urban planning." },
            { "name": "Institute of Ecology and Environmental Studies", "state": "Ile-Ife, Nigeria", "image": "/images/research-development/Institute_of_Ecology_and_Environme.png", "achievement": "Conducted extensive research on ecological conservation and environmental management. Enhanced understanding of Nigeria's ecosystems." },
            { "name": "NCF (Nigerian Conservation Foundation)", "state": "Lagos, Nigeria", "image": "/images/research-development/NCF.png", "achievement": "Led efforts in wildlife conservation and environmental education. Protected endangered species and promoted environmental awareness." },
            { "name": "Centre for Climate Change and Freshwater Resources", "state": "Minna, Nigeria", "image": "/images/research-development/Centre_for_Climate_Change_and_Fre.png", "achievement": "Focused on research in climate change impacts and freshwater resource management. Supported sustainable water management practices." },
            { "name": "Centre for Environmental Management and Control", "state": "Nsukka, Nigeria", "image": "/images/research-development/Centre_for_Environmental_Manage.png", "achievement": "Focused on research in climate change impacts and freshwater resource management. Supported sustainable water management practices." },
            { "name": "Department of Environmental Sciences", "state": "Zaria, Nigeria", "image": "/images/research-development/Department_of_Environmental_Scie.png", "achievement": "Specialized in research on environmental hazards and disaster management. Improved disaster preparedness and environmental risk assessment." },
            { "name": "Institute for Environmental Research", "state": "Ibadan, Nigeria", "image": "/images/research-development/Institute_for_Environmental_Researc.png", "achievement": "Conducted research on environmental health and safety, focusing on pollution control and waste management. Enhanced environmental monitoring capabilities." }
          ]
        }
      ]
    },
  

  
  
    {
      "title": "The Overall Best Media Organization in Nigeria with Outstanding Education Focus",
      "description": "Honors exceptional media/news award programs for educational collaborations and contributes to Nigeria educational development.",
      "subCategories": [
        {
          "title": "Best Print Media Educational Advocacy Award",
          "description": "Recognizes newspapers, magazines, and other print media houses for outstanding educational journalism, articles, and features.",
          "nominees": [
            { "name": "The Guardian Nigeria", "image": "/images/media/the-guardian.png", "achievement": "Published in-depth analyses and reports on educational reforms and policies in Nigeria. Influenced public discourse on educational..." },
            { "name": "The Punch Newspaper", "image": "/images/media/punch.png", "achievement": "Regularly featured stories on educational innovations and challenges, with a focus on grassroots education. Raised awareness ab..." },
            { "name": "ThisDay Newspaper", "image": "/images/media/thisday.png", "achievement": "Produced special reports on higher education and the state of Nigerian universities. Promoted discussions on improving educ..." },
            { "name": "Vanguard Newspaper", "image": "/images/media/vanguard.png", "achievement": "Focused on the intersection of education and technology, promoting digital literacy. Encouraged integration of technology into N..." },
            { "name": "Daily Trust", "image": "/images/media/daily-trust.png", "achievement": "Highlighted the educational needs of Northern Nigeria, with a focus on girls' education. Advocated for increased access..." },
            { "name": "The Nation Newspaper", "image": "/images/media/the-nation.png", "achievement": "Investigated and reported on funding gaps in the Nigerian education system. Brought attention to the need for increased educatio..." },
            { "name": "Leadership Newspaper", "image": "/images/media/leadership.png", "achievement": "Published thought leadership pieces on education reforms and policy development. Influenced policymakers and stakeholders i..." },
            { "name": "BusinessDay", "image": "/images/media/businessday.png", "achievement": "Explored the economic aspects of education, including funding and investment in education. Promoted the importance of inve..." },
            { "name": "Nigerian Tribune", "image": "/images/media/nigerian-tribune.png", "achievement": "Focused on educational history and heritage, highlighting Nigeria's educational milestones. Fostered a greater appreciatio..." },
            { "name": "Premium Times", "image": "/images/media/times.png", "achievement": "Investigated and exposed corruption in the education sector, advocating for transparency. Played a crucial role in promo..." }
          ]
        },
        {
          "title": "Radio Educational Program Excellence Award",
          "description": "Honors radio stations, TV stations, and broadcasters for impactful educational programs, discussions, and campaigns.",
          "nominees": [
            { "name": "Wazobia FM", "image": "/images/media/wazobia-fm.png", "achievement": "Offered educational content in local languages, making learning accessible to a broader audience. Promoted inclusive educ..." },
            { "name": "Cool FM", "image": "/images/media/cool-fm.png", "achievement": "Aired programs focusing on career guidance and educational advice for youth. Helped young Nigerians make informed decisions a..." },
            { "name": "Radio Nigeria", "image": "/images/media/radio-nigeria.png", "achievement": "Broadcasted educational content aimed at rural communities, covering topics from basic literacy to health education. Bridged t..." },
            { "name": "Rhythm FM", "image": "/images/media/rhythm-fm.png", "achievement": "Hosted educational talk shows and debates on national education issues. Engaged listeners in meaningful discussions on impro..." },
            { "name": "Inspiration FM", "image": "/images/media/inspiration-fm.png", "achievement": "Provided educational news segments that highlighted achievements and challenges in Nigeria's education sector. Kept the pu..." }
          ]
        },
        {
          "title": "Television Educational Content Award",
          "description": "Recognizes television stations for their outstanding educational programming and content.",
          "nominees": [
            { "name": "Channels Television", "image": "/images/media/channels.png", "achievement": "Created educational programs in Pidgin English, making learning accessible to a wider audience. Increased educational cont..." },
            { "name": "NTA (Nigerian Television Authority)", "image": "/images/media/nta.png", "achievement": "Aired programs focusing on career guidance and educational advice for youth. Helped young Nigerians make informed decisions a..." },
            { "name": "AIT (Africa Independent Television)", "image": "/images/media/ait.png", "achievement": "Produced in-depth programs on educational policies, featuring expert analyses and discussions. Provided valuable insights..." },
            { "name": "TVC News", "image": "/images/media/tvc-news.png", "achievement": "Produced regular segments on education policies and their implications for the Nigerian populace. Provided clarity on educ..." },
            { "name": "Wazobia TV", "image": "/images/media/wazobia-fm.png", "achievement": "Offered educational content in local languages, making learning accessible to a broader audience. Promoted inclusive educ..." },
            { "name": "Silverbird Television", "image": "/images/media/silverbird.png", "achievement": "Aired educational documentaries and features on various social issues impacting education. Raised awareness about the soc..." },
            { "name": "Galaxy TV", "image": "/images/media/galaxy-tv.png", "achievement": "Featured educational programs that address national educational challenges and propose solutions. Contributed to the nati..." },
            { "name": "Nigezie TV", "image": "/images/media/nigezie-tv.png", "achievement": "Focused on youth-oriented educational content, including entrepreneurship and vocational training. Provided practical know..." },
            { "name": "EbonyLife TV", "image": "/images/media/ebonylife-tv.png", "achievement": "Produced educational content that addresses contemporary social issues and their impact on education. Raised awareness a..." },
            { "name": "Rave TV", "image": "/images/media/rave-tv.png", "achievement": "Aired innovative educational programs that combine entertainment with learning. Made learning engaging and accessible to..." }
          ]
        },
        {
          "title": "Best Digital Media Educational Advocacy Award",
          "description": "Honors online media platforms for innovative educational content, e-learning initiatives, and digital campaigns.",
          "nominees": [
            { "name": "Sahara Reporters", "image": "/images/media/sahara-reporters.png", "achievement": "Published investigative reports and features on educational reforms and corruption in the education sector. Advocated for transpa..." },
            { "name": "Pulse Nigeria", "image": "/images/media/pulse.png", "achievement": "Developed and shared digital content focused on youth education, career guidance, and personal development. Engaged..." },
            { "name": "BellaNaija", "image": "/images/media/bellanaija.png", "achievement": "Promoted educational stories, scholarship opportunities, and success stories in the Nigerian education sector. Inspired and infor..." },
            { "name": "Naij.com", "image": "/images/media/naij.png", "achievement": "Provided news and features on education, including student success stories and educational challenges. Kept the public info..." },
            { "name": "The Cable", "image": "/images/media/the-cable.png", "achievement": "Focused on in-depth educational journalism, including analyses of education policies and programs. Influenced public opinion and pol..." },
            { "name": "Legit.ng", "image": "/images/media/legit.png", "achievement": "Delivered educational content, including news, tips, and resources for students and educators. Provided valuable information o..." },
            { "name": "YNaija", "image": "/images/media/ynaija.png", "achievement": "Published content aimed at youth education, leadership, and social impact. Engaged young Nigerians in conversations about edu..." },
            { "name": "TechCabal", "image": "/images/media/techcabal.png", "achievement": "Focused on the intersection of technology and education, highlighting innovations and digital learning trends. Promoted the adopti..." },
            { "name": "Nairametrics", "image": "/images/media/nairametrics.png", "achievement": "Hosted discussions and forums on educational topics, allowing for community-driven knowledge sharing. Created a platfo..." },
            { "name": "Edugist", "image": "/images/media/edugist.png", "achievement": "Dedicated to covering educational news, innovations, and developments in Nigeria and across Africa. Became a go-to source f..." }
          ]
        }
      ]
    },
  

    {
      "title": "Overall Best Global Education Excellence Award for Facilitating the Achievement of Education for All in Nigeria (2020-2024)",
      "description": "Honoring international bodies for their impactful cooperative efforts that significantly impact the educational sector.",
      "subCategories": [
        {
          "title": "Best International Embassy Contribution to Education in Nigeria (2020-2024)",
          "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
          "nominees": [
            {
              "name": "United States Embassy",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/United_States_Embassy.png",
              "achievement": "Provided over 1000 scholarships for Nigerian students to study in the U.S. and facilitated educational exchange programs. Significant..."
            },
            {
              "name": "British High Commission",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/British_High_Commission.png",
              "achievement": "Funded literacy and numeracy programs, improving primary school education for thousands of students. Enhanced literacy an..."
            },
            {
              "name": "Canadian High Commission",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/Canadian_High_Commission.png",
              "achievement": "Launched initiatives to promote girls' education and vocational training in rural areas. Empowered girls and marginalized c..."
            },
            {
              "name": "German Embassy",
              "state": "Enugu",
              "country": "Nigeria",
              "image": "/images/global/German_Embassy.png",
              "achievement": "Supported the establishment of TVET programs and funded educational infrastructure in underserved areas. Address..."
            },
            {
              "name": "French Embassy",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/French_Embassy.png",
              "achievement": "Provided resources and training for French language education and partnered with Nigerian universities on research initiatives. ..."
            },
            {
              "name": "Japanese Embassy",
              "state": "Plateau",
              "country": "Nigeria",
              "image": "/images/global/Japanese_Embassy.png",
              "achievement": "Supported science and technology education initiatives and funded educational infrastructure in rural areas. Promoted innov..."
            },
            {
              "name": "Chinese Embassy",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/Chinese_Embassy.png",
              "achievement": "Offered scholarships and training opportunities in various fields, and collaborated on educational technology pro..."
            },
            {
              "name": "Netherlands Embassy",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/Netherlands_Embassy.png",
              "achievement": "Funded water and sanitation projects in schools and supported agricultural education programs for rural youth. Improv..."
            },
            {
              "name": "Indian High Commission",
              "state": "Kebbi",
              "country": "Nigeria",
              "image": "/images/global/Indian_High_Commission.png",
              "achievement": "Offered scholarships and training in IT and engineering, and supported digital literacy and e-learning initiatives. Built technical exp..."
            },
            {
              "name": "South African High Commission",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/South_African_High_Commission.png",
              "achievement": "Promoted regional educational collaborations and sponsored programs focused on youth leadership and entrepren..."
            }
          ]
        },
        {
          "title": "Best Bilateral Organization Education Support Initiative in Nigeria (2020-2024)",
          "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
          "nominees": [
            {
              "name": "USAID (United States Agency for International Development)",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/USAID.png",
              "achievement": "Implemented literacy programs reaching over 500,000 children and supported teacher training workshops. Improved literacy rates..."
            },
            {
              "name": "DFID (Department for International Development)",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/DFID.png",
              "achievement": "Launched programs to improve girls' education and provided funding for school infrastructure. Enhanced educational enviro..."
            },
            {
              "name": "GIZ (German Agency for International Cooperation)",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/GIZ.png",
              "achievement": "Supported vocational training programs and promoted sustainable agriculture education in schools. Equipped youth with employable..."
            },
            {
              "name": "CIDA (Canadian International Development Agency)",
              "state": "Enugu",
              "country": "Nigeria",
              "image": "/images/global/CIDA.png",
              "achievement": "Implemented early childhood education programs and supported initiatives to improve educational access for marginalized..."
            },
            {
              "name": "AFD (French Development Agency)",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/AFD.png",
              "achievement": "Funded educational infrastructure projects and promoted cultural exchange programs in schools. Improved access to quality educ..."
            },
            {
              "name": "Norad (Norwegian Agency for Development Cooperation)",
              "state": "Plateau",
              "country": "Nigeria",
              "image": "/images/global/Norad.png",
              "achievement": "Promoted gender equality and inclusion in education and supported the integration of technology into classrooms. Addressed edu..."
            },
            {
              "name": "JICA (Japan International Cooperation Agency)",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/JICA.png",
              "achievement": "Supported STEM education initiatives and funded educational infrastructure development in schools. Promoted innovati..."
            },
            {
              "name": "Sida (Swedish International Development Cooperation Agency)",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/Sida.png",
              "achievement": "Promoted inclusive education policies and supported digital literacy initiatives in Nigeria. Expanded access to technology and..."
            },
            {
              "name": "AusAID (Australian Agency for International Development)",
              "state": "Kebbi",
              "country": "Nigeria",
              "image": "/images/global/AusAID.png",
              "achievement": "Implemented programs to improve educational access for indigenous communities and supported vocational edu..."
            },
            {
              "name": "KOICA (Korean International Cooperation Agency)",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/KOICA.png",
              "achievement": "Supported IT education initiatives and funded school infrastructure projects to improve learning environments. Enhanced d..."
            }
          ]
        },
        {
          "title": "Best International NGO Education Support Service in Nigeria (2020-2024)",
          "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
          "nominees": [
            {
              "name": "Save the Children International",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/Save_the_Children_International.png",
              "achievement": "Provided educational resources and support in conflict-affected areas, ensuring continued learning for vulnerable children. S..."
            },
            {
              "name": "Plan International",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/Plan_International.png",
              "achievement": "Implemented gender-focused educational programs and advocated for child rights and education access. Empowered girls and ma..."
            },
            {
              "name": "ActionAid",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/ActionAid.png",
              "achievement": "Advocated for inclusive education policies and empowered communities through educational initiatives. Improved education..."
            },
            {
              "name": "World Vision International",
              "state": "Enugu",
              "country": "Nigeria",
              "image": "/images/global/World_Vision_International.png",
              "achievement": "Provided educational services for vulnerable children and integrated health and nutrition programs into schools. Enhanced the well-b..."
            },
            {
              "name": "CARE International",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/CARE_International.png",
              "achievement": "Implemented comprehensive educational programs addressing poverty and access barriers. Improved educational access and r..."
            },
            {
              "name": "Oxfam International",
              "state": "Plateau",
              "country": "Nigeria",
              "image": "/images/global/Oxfam_International.png",
              "achievement": "Advocated for educational equity and developed innovative learning solutions to improve outcomes. Mobilized communities..."
            },
            {
              "name": "Mercy Corps",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/Mercy_Corps.png",
              "achievement": "Implemented youth empowerment programs and supported conflict resolution initiatives in schools. Promoted peace, stabil..."
            },
            {
              "name": "FHI 360",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/FHI_360.png",
              "achievement": "Integrated education and health programs and promoted technology-enhanced learning solutions. Improved student well-b..."
            },
            {
              "name": "Catholic Relief Services (CRS)",
              "state": "Kebbi",
              "country": "Nigeria",
              "image": "/images/global/Catholic_Relief_Services.png",
              "achievement": "Implemented community-based education programs and enhanced disaster resilience in schools. Ensured continued learning and..."
            },
            {
              "name": "IRC (International Rescue Committee)",
              "state": "Lagos",
              "country": "Nigeria",
              "image": "/images/global/IRC.png",
              "achievement": "Provided education in emergencies and promoted protection and inclusion in schools. Supported displaced and refugee c..."
            }
          ]
        },

      
              {
                "title": "Best Educational Grant-Giving Organization in Nigeria (2020-2024)",
                "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
                "nominees": [
                  {
                    "name": "Bill and Melinda Gates Foundation",
                    "state": "Lagos",
                    "country": "Nigeria",
                    "image": "/images/global/Bill_and_Melinda_Gates_Foundation.png",
                    "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community.'"
                  },
                  {
                    "name": " GPE (Global Partnership for Education.) ",
                    "state": "Lagos",
                    "country": "Nigeria",
                    "image": "/images/global/GPE.png",
                    "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                  },
                  {
                    "name": "Ford Foundation ",
                    "state": "Lagos",
                    "country": "Nigeria",
                    "image": "/images/global/Ford_Foundation.png",
                    "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                  },
                  {
                    "name": "Carnegie Corporation of New York",
                    "state": "Enugu",
                    "country": "Nigeria",
                    "image": "/images/global/Carnegie_Corporation_of_NewYork.png",
                    "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                  },
                  {
                    "name": "Rockefeller Foundation",
                    "state": "Lagos",
                    "country": "Nigeria",
                    "image": "/images/global/Rockefeller_Foundation.png",
                    "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                  },
                  {
                    "name": "MacArthur Foundation",
                    "state": "Plateau",
                    "country": "Nigeria",
                    "image": "/images/global/MacArthur_Foundation.png",
                    "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                  },
                  {
                    "name": "Open Society Foundations",
                    "state": "Lagos",
                    "country": "Nigeria",
                    "image": "/images/global/Open_Society_Foundations.png",
                    "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community"
                  },
                  {
                    "name": "Hewlett Foundation",
                    "state": "Lagos",
                    "country": "Nigeria",
                    "image": "/images/global/Hewlett_Foundation.png",
                    "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                  },
                  {
                    "name": "Packard Foundation",
                    "state": "Kebbi",
                    "country": "Nigeria",
                    "image": "/images/global/Packard_Foundation.png",
                    "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community"
                  },
                  {
                    "name": "Kellogg Foundation ",
                    "state": "Lagos",
                    "country": "Nigeria",
                    "image": "/images/global/Kellogg_Foundation.png",
                    "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community"
                  }
                ]
                
                },
                {
                  "title": "Best International Airline Education Support Initiative in Nigeria (2020-2024)",
                  "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
                  "nominees": [
                    {
                      "name": "Emirates Airlines",
                      "state": "Lagos",
                      "country": "Nigeria",
                      "image": "/images/global/Emirates_Airlines.png",
                      "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community.'"
                    },
                    {
                      "name": "British Airways",
                      "state": "Lagos",
                      "country": "Nigeria",
                      "image": "/images/global/British_Airways.png",
                      "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                    },
                    {
                      "name": "Qatar Airways",
                      "state": "Lagos",
                      "country": "Nigeria",
                      "image": "/images/global/Qatar_Airways.png",
                      "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                    },
                    {
                      "name": "Turkish Airlines",
                      "state": "Enugu",
                      "country": "Nigeria",
                      "image": "/images/global/Turkish_Airlines.png",
                      "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                    },
                    {
                      "name": "Ethiopian Airlines",
                      "state": "Lagos",
                      "country": "Nigeria",
                      "image": "/images/global/Ethiopian_Airlines.png",
                      "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                    },
                    {
                      "name": "Delta Airlines",
                      "state": "Plateau",
                      "country": "Nigeria",
                      "image": "/images/global/Delta_Airlines.png",
                      "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                    },
                    {
                      "name": "Lufthansa",
                      "state": "Lagos",
                      "country": "Nigeria",
                      "image": "/images/global/Lufthansa.png",
                      "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community"
                    },
                    {
                      "name": "Air France",
                      "state": "Lagos",
                      "country": "Nigeria",
                      "image": "/images/global/Air_France.png",
                      "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community'"
                    },
                    {
                      "name": "Kenya Airways",
                      "state": "Kebbi",
                      "country": "Nigeria",
                      "image": "/images/global/Kenya_Airways.png",
                      "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community"
                    },
                    {
                      "name": " KLM Royal Dutch Airlines",
                      "state": "Lagos",
                      "country": "Nigeria",
                      "image": "/images/global/KLM_Royal_Dutch_Airlines.png",
                      "achievement": "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community"
                    }
                  ]
                  
                  },
                  {
                    "title": "Best Leadership Training Organization in Nigeria (2020-2024)",
                    "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
                    "nominees": [
                      {
                        "name": "Leadership Initiative for Transformation and Empowerment (LITE Africa)",
                        "state": "Lagos",
                        "country": "Nigeria",
                        "image": "/images/global/Leadership_Initiative_for_Transformation_and_Empowerment.png",
                        "achievement": "Provided leadership and civic education training programs for youth and community leaders across Nigeria. Empowered over 20,000 individuals with leadership skills and civic responsibility."
                      },
                      {
                        "name": "African Leadership Academy (ALA)",
                        "state": "Lagos",
                        "country": "Nigeria",
                        "image": "/images/global/African_Leadership_Academy.png",
                        "achievement": "Delivered leadership training and entrepreneurship programs for young Nigerians with high potential. Cultivated a new generation of leaders prepared to drive change in their communities. Year(s) of Contribution: 2020-2024."
                      },
                      {
                        "name": "The Bridge Leadership Foundation",
                        "state": "Lagos",
                        "country": "Nigeria",
                        "image": "/images/global/The_Bridge_Leadership_Foundation.png",
                        "achievement": "Implemented leadership and career development programs for young professionals and students in Nigeria. Enhanced leadership capacity and career readiness for thousands of Nigerian youth."
                      },
                      {
                        "name": "LEAP Africa",
                        "state": "Enugu",
                        "country": "Nigeria",
                        "image": "/images/global/LEAP_Africa.png",
                        "achievement": "Provided leadership training and ethics education for secondary school students and young professionals. Developed ethical leaders with a strong sense of social responsibility."
                      },
                      {
                        "name": "Young African Leaders Initiative (YALI) Nigeria",
                        "state": "Lagos",
                        "country": "Nigeria",
                        "image": "/images/global/Young_African_Leaders_Initiative_Nigeria.png",
                        "achievement": "Offered leadership and professional development training to young Nigerians through various programs and workshops. Trained over 50,000 young leaders, enhancing their leadership skills and civic engagement."
                      },
                      {
                        "name": "Centre for Values in Leadership (CVL)",
                        "state": "Plateau",
                        "country": "Nigeria",
                        "image": "/images/global/Centre_for_Values_in_Leadership.png",
                        "achievement": "Provided leadership development programs focusing on values-based leadership for professionals and public servants. Instilled ethical leadership principles and improved governance practices in Nigeria."
                      },
                      {
                        "name": "Rise Network",
                        "state": "Lagos",
                        "country": "Nigeria",
                        "image": "/images/global/Rise_Network.png",
                        "achievement": "Conducted leadership training, mentorship, and life skills programs for Nigerian youth. Empowered thousands of young Nigerians with leadership and life skills for personal and professional growth."
                      },
                      {
                        "name": "Junior Chamber International (JCI) Nigeria",
                        "state": "Lagos",
                        "country": "Nigeria",
                        "image": "/images/global/Junior_Chamber_International_Nigeria.png",
                        "achievement": "Implemented leadership development programs and community service projects, fostering active citizenship among youth. Developed responsible leaders committed to positive change in their communities."
                      },
                      {
                        "name": "The Tony Elumelu Foundation",
                        "state": "Kebbi",
                        "country": "Nigeria",
                        "image": "/images/global/The_Tony_Elumelu_Foundation.png",
                        "achievement": "Provided leadership and entrepreneurship training for emerging African entrepreneurs, including Nigerians. Empowered over 15,000 young entrepreneurs with the skills to lead and innovate in their businesses."
                      },
                      {
                        "name": "Global Shapers Community Lagos Hub",
                        "state": "Lagos",
                        "country": "Nigeria",
                        "image": "/images/global/Global_Shapers_Community_Lagos_Hub.png",
                        "achievement": "Delivered leadership and community development programs for young Nigerians, focusing on social impact and sustainability. Fostered a network of young leaders dedicated to making a positive impact in society."
                      }
                    ]
                  },
                ]
              },
              {
                "title": "Christian faith organization Educational Champion of the Decade Award",
                "description": "Recognizing Christian faith-based organizations for their outstanding contributions to education advancement.",
                "subCategories": [
                  {
                    "title": "Best Advocacy for Educational Reforms and Awareness Campaigns by a Christian Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
                    "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
                    "nominees": [
                      { name: "RCCG (Redeemed Christian Chur)", image: "/images/christain/RCCG.png", achievement: "Led nationwide campaigns for education reform, including initiatives to improve access to education in rural areas. Successfully..." },
                      { name: "Deeper Life Bible Church", image: "/images/christain/Deeper_Life_Bible_Church.png", achievement: "Advocated for educational reforms through community outreach and partnerships with government agencies. Increased community..." },
                      { name: "Living Faith Church Worldwide", image: "/images/christain/Living_Faith_Church_Worldwide.png", achievement: "Through the Education Commission, led efforts to reform educational policies and improve school curricula nationwide. Contri..." },
                      { name: "Christ Embassy", image: "/images/christain/Christ_Embassy.png", achievement: "Conducted awareness campaigns focused on digital education and the integration of technology in schools. Increased adoption o..." },
                      { name: "Catholic Church Nigeria", image: "/images/christain/Catholic_Church_Nigeria.png", achievement: "Led advocacy campaigns for inclusive education and the rights of children with disabilities to receive quality education. Pro..." },
                      { name: "Methodist Church Nigeria", image: "/images/christain/Methodist_Church_Nigeria.png", achievement: "Engaged in campaigns for educational equity and the improvement of public school systems. Enhanced public school infrastr..." },
                      { name: "Anglican Church Nigeria", image: "/images/christain/Anglican_Church_Nigeria.png", achievement: "Advocated for educational reforms, focusing on curriculum development and teacher training programs. Influenced curriculum..." },
                      { name: "The Apostolic Church Nigeria", image: "/images/christain/The_Apostolic_Church_Nigeria.png", achievement: "Launched campaigns for educational access in underserved regions, particularly in the northern states. Increased educational o..." },
                      { name: "Assemblies of God Nigeria", image: "/images/christain/Assemblies_of_God_Nigeria.png", achievement: "Led advocacy for improved educational standards in rural schools, focusing on teacher quality and infrastructure developm..." },
                      { name: "The Lord's Chosen Charismatic", image: "/images/christain/The_Lord's_Chosen_Charismatic.png", achievement: "Promoted campaigns for adult education and literacy, particularly among women and vulnerable groups. Increased literacy rates..." }
                    ]
                  },
                  {
                    "title": "Best Educational Infrastructure Development By A Christian Organization Contribution To Achieving Education For All In Nigeria NESA-Award/Nigeria 2024",
                    "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
                    "nominees": [
                      { name: "Living Faith Church Worldwide", image: "/images/christain/Living_Faith_Church_Worldwide.png", achievement: "Established Covenant University, Faith Academy, and multiple secondary schools nationwide. Over 30,000 students benefited..." },
                      { name: "RCCG (Redeemed Christian Chur)", image: "/images/christain/RCCG.png", achievement: "Developed Redeemer's University, several primary and secondary schools across Nigeria, and extensive educational facilities i..." },
                      { name: "Christ Embassy", image: "/images/christain/Christ_Embassy.png", achievement: "Established Loveworld Schools and contributed to the construction of educational centers in underserved commu..." },
                      { name: "Deeper Life Bible Church", image: "/images/christain/Deeper_Life_Bible_Church.png", achievement: "Built Anchor University and multiple primary and secondary schools with modern educational facilities. Over 15,000 students r..." },
                      { name: "Catholic Church Nigeria", image: "/images/christain/Catholic_Church_Nigeria.png", achievement: "Established and renovated numerous schools, including Veritas University and several mission schools across Nigeria. Impr..." },
                      { name: "Methodist Church Nigeria", image: "/images/christain/Methodist_Church_Nigeria.png", achievement: "Developed Methodist High Schools and contributed to the renovation of older mission schools. Enhanced learning environ..." },
                      { name: "Seventh-day Adventist Church Nig,", image: "/images/christain/Seventh-day_Adventist_Church_Nig.png", achievement: "Established Babcock University and several secondary schools, focusing on health education and holistic development. Over 12..." },
                      { name: "Anglican Church Nigeria", image: "/images/christain/Anglican_Church_Nigeria.png", achievement: "Built Ajayi Crowther University and several Anglican-run schools, improving access to quality education. Provided quality educatio..." },
                      { name: "The Apostolic Church Nigeria", image: "/images/christain/The_Apostolic_Church_Nigeria.png", achievement: "Constructed numerous primary and secondary schools, particularly in rural areas. Improved access to education for over 10,0..." },
                      { name: "The Lord's Chosen Charismatic", image: "/images/christain/The_Lord's_Chosen_Charismatic.png", achievement: "Developed educational infrastructure, including schools and vocational training centers, especially in rural areas. Provided e..." }
                    ]
                  },
                  {
                    "title": "Best Scholarship Program by a Christian Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
                    "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
                    "nominees": [
                      { name: "Living Faith Church Worldwide", image: "/images/christain/Living_Faith_Church_Worldwide.png", achievement: "Through the David Oyedepo Foundation, awarded scholarships to thousands of students across Africa, including Nigeria. Su..." },
                      { name: "RCCG (Redeemed Christian Chur)", image: "/images/christain/RCCG.png", achievement: "Awarded over 5,000 scholarships annually to students at various educational levels across Nigeria. Enabled access to education for..." },
                      { name: "Christ Embassy", image: "/images/christain/Christ_Embassy.png", achievement: "Established the Loveworld Scholarship Fund, providing financial aid to students in need. Assisted over 1,500 students annually in acc..." },
                      { name: "Deeper Life Bible Church", image: "/images/christain/Deeper_Life_Bible_Church.png", achievement: "Provided scholarships for thousands of students through the Deeper Life Scholarship Scheme, focusing on academic excellence..." },
                      { name: "Catholic Church Nigeria", image: "/images/christain/Catholic_Church_Nigeria.png", achievement: "Provided scholarships through various dioceses, supporting education for thousands of students from marginalized co..." },
                      { name: "Methodist Church Nigeria", image: "/images/christain/Methodist_Church_Nigeria.png", achievement: "Offered scholarships and financial aid programs to students, particularly in rural areas. Over 2,000 students supported annua..." },
                      { name: "Seventh-day Adventist Church Nig,", image: "/images/christain/Seventh-day_Adventist_Church_Nig.png", achievement: "Established Babcock University and several secondary schools, focusing on health education and holistic development. Over 12..." },
                      { name: "Anglican Church Nigeria", image: "/images/christain/Anglican_Church_Nigeria.png", achievement: "Provided scholarships and bursaries to deserving students, ensuring continued education for many who might otherwise dr..." },
                      { name: "The Apostolic Church Nigeria", image: "/images/christain/The_Apostolic_Church_Nigeria.png", achievement: "Implemented scholarship programs for students in primary, secondary, and tertiary institutions, focusing on educational equity..." },
                      { name: "The Lord's Chosen Charismatic", image: "/images/christain/The_Lord's_Chosen_Charismatic.png", achievement: "Offered scholarships and financial support to students across Nigeria, focusing on those in rural areas. Enabled over 1,000 students..." }
                    ]
                  },
                  {
                    "title": "Best Holistic Educational Support By A Christian Organization Contribution To Achieving Education For All In Nigeria NESA-Award/Nigeria 2024",
                    "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
                    "nominees": [
                      { name: "Catholic Church Nigeria", image: "/images/christain/Catholic_Church_Nigeria.png", achievement: "Provided holistic education through schools that offer academic, spiritual, and vocational training, along with community health servic..." },
                      { name: "Methodist Church Nigeria", image: "/images/christain/Methodist_Church_Nigeria.png", achievement: "Developed programs that integrate education, vocational training, and community outreach, focusing on holistic d..." },
                      { name: "Anglican Church Nigeria", image: "/images/christain/Anglican_Church_Nigeria.png", achievement: "Implemented programs that combine academic education with life skills, vocational training, and moral instruction. E..." },
                      { name: "Salvation Army Nigeria", image: "/images/christain/Salvation_Army_Nigeria.png", achievement: "Provided education and support services, including health care, vocational training, and disaster relief, particularly in underserve..." },
                      { name: "Nigerian Baptist Convention", image: "/images/christain/Nigerian_Baptist_Convention.png", achievement: "Offered programs that support academic achievement, vocational training, and leadership development, fostering holistic gr..." },
                      { name: "Seventh-day Adventist Church Nig,", image: "/images/christain/Seventh-day_Adventist_Church_Nig.png", achievement: "Delivered holistic education that includes spiritual development, health education, and vocational training, particularly through Bab..." },
                      { name: "Evangelical Church Winning All", image: "/images/christain/Evangelical_Church_Winning_All.png", achievement: "Provided educational and community support programs, including health services, vocational training, and leadership develop..." },
                      { name: "Nigerian Fellowship of Evangelical", image: "/images/christain/Nigerian_Fellowship_of_Evangelical.png", achievement: "Focused on student mentoring, leadership training, and academic support, particularly within tertiary institutions. Assisted over 7,00..." },
                      { name: "Nigeria Christian Graduate Fellowship", image: "/images/christain/Nigeria_Christian_Graduate_Fellowship.png", achievement: "Offered mentoring, vocational training, and community development projects, supporting both academic and personal gr..." },
                      { name: "Living Faith Church Worldwide", image: "/images/christain/Living_Faith_Church_Worldwide.png", achievement: "Through its network of schools and universities, provided holistic education that combines academics with spiritual and mor..." }
                    ]
                  }
                ]
              },
              {
                title: "Islamic faith organization Educational Champion of the Decade Award in Nigeria (2013-2024)",
                description: "Celebrating Islamic faith-based organizations for their crucial role in advancing and diversifying educational opportunities.",
                subCategories: [
                  {
                    title: "Best Educational Infrastructure Development by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
                    description: "Recognizes educators and institutions employing innovative teaching methods in STEM education",
                    nominees: [
                      { name: "NASFAT (Nasrul-Lahi-L-Fatih soci)", image: "/images/islam/NASFAT.png", achievement: "Established several primary and secondary schools across Nigeria, along with modern libraries and ICT centers. Over 20,000 students benefit annually." },
                      { name: "FOMWAN (Federation of Muslim W)", image: "/images/islam/FOMWAN.png", achievement: "Developed schools, particularly in northern Nigeria, focusing on girls' education and providing necessary infrastructure. Enhanced access to education for thousands." },
                      { name: "Ansar-Ud-Deen Society of Nigeria", image: "/images/islam/Ansar-Ud-Deen_Society_of_Nigeria.png", achievement: "Built and renovated numerous schools and Islamic learning centers across the country, with a focus on underserved communities. Provided modern facilities to enhance learning." },
                      { name: "MSSN (Muslim Students Society of)", image: "/images/islam/MSSN.png", achievement: "Constructed educational facilities within universities and secondary schools to support Muslim students' academic and spiritual growth." },
                      { name: "The Muslim Congress (TMC)", image: "/images/islam/The_Muslim_Congress.png", achievement: "Established schools and vocational training centers across Nigeria, particularly in rural areas, focusing on skill development and education." },
                      { name: "Al-Habibiyyah Islamic Society,", image: "/images/islam/Al-Habibiyyah_Islamic_Society.png", achievement: "Developed several educational centers, including schools and Islamic learning institutes, providing both secular and religious education." },
                      { name: "Islamic Education Trust (IET)", image: "/images/islam/Islamic_Education_Trust.png", achievement: "Constructed and equipped modern educational facilities, including science laboratories and libraries, to enhance learning experiences." },
                      { name: "Islamic Society of Nigeria (ISN)", image: "/images/islam/Islamic_Society_of_Nigeria.png", achievement: "Built schools and renovated existing educational facilities, particularly in northern Nigeria, to support quality education. Enhanced infrastructure in underserved areas." },
                      { name: "Al-Furqan Foundation", image: "/images/islam/Al-Furqan_Foundation.png", achievement: "Established schools and educational centers with a focus on integrating Islamic education with modern curricula. Provided educational infrastructure in underserved areas." },
                      { name: "MUSWEN (Muslim Ummah of South)", image: "/images/islam/MUSWEN.png", achievement: "Developed educational facilities across southwestern Nigeria, focusing on improving access to quality Islamic and secular education." }
                    ]
                  },
                  {
                    title: "Best Scholarship Program by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
                    description: "Recognizes educators and institutions employing innovative teaching methods in STEM education",
                    nominees: [
                      { name: "FOMWAN (Federation of Muslim W)", image: "/images/islam/FOMWAN.png", achievement: "Provided scholarships specifically targeting girls and women, promoting female education in northern Nigeria. Over 3,000 girls benefited." },
                      { name: "NASFAT (Nasrul-Lahi-L-Fatih soci)", image: "/images/islam/NASFAT.png", achievement: "Awarded thousands of scholarships annually to students at various educational levels across Nigeria. Supported the education of underprivileged students." },
                      { name: "Ansar-Ud-Deen Society of Nigeria", image: "/images/islam/Ansar-Ud-Deen_Society_of_Nigeria.png", achievement: "Implemented scholarship programs that supported students in secondary and tertiary institutions, particularly in science and technology fields." },
                      { name: "MSSN (Muslim Students Society of)", image: "/images/islam/MSSN.png", achievement: "Provided financial aid and scholarships to Muslim students in tertiary institutions, ensuring continuity in education. Supported thousands of students." },
                      { name: "The Muslim Congress (TMC)", image: "/images/islam/The_Muslim_Congress.png", achievement: "Awarded scholarships to students across Nigeria, with a focus on those pursuing technical and vocational education. Over 2,000 students benefited." },
                      { name: "Al-Habibiyyah Islamic Society,", image: "/images/islam/Al-Habibiyyah_Islamic_Society.png", achievement: "Offered scholarships to orphans and underprivileged students, enabling them to access both Islamic and secular education. Hundreds of students benefited." },
                      { name: "Islamic Education Trust (IET)", image: "/images/islam/Islamic_Education_Trust.png", achievement: "Provided scholarships to students in higher education, particularly in science and technology disciplines. Assisted over 2,000 students." },
                      { name: "Islamic Society of Nigeria (ISN)", image: "/images/islam/Islamic_Society_of_Nigeria.png", achievement: "Implemented a comprehensive scholarship program targeting students from low-income families, ensuring they have access to quality education." },
                      { name: "Al-Furqan Foundation", image: "/images/islam/Al-Furqan_Foundation.png", achievement: "Provided scholarships focused on supporting students in Islamic studies and sciences, bridging religious and modern education. Hundreds of students benefited." },
                      { name: "MUSWEN (Muslim Ummah of South)", image: "/images/islam/MUSWEN.png", achievement: "Offered scholarships and financial support to students, particularly those in tertiary education, across southwestern Nigeria. Supported hundreds of students." }
                    ]
                  },
                  {
                    title: "Best Holistic Educational Support by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
                    description: "Recognizes educators and institutions employing innovative teaching methods in STEM education",
                    nominees: [
                      { name: "NASFAT (Nasrul-Lahi-L-Fatih soci)", image: "/images/islam/NASFAT.png", achievement: "Offered comprehensive educational programs, including academic tutoring, health services, and vocational training. Benefited thousands of students." },
                      { name: "FOMWAN (Federation of Muslim W)", image: "/images/islam/FOMWAN.png", achievement: "Provided holistic support through educational programs, health services, and vocational training, particularly for girls and women in northern Nigeria." },
                      { name: "Ansar-Ud-Deen Society of Nigeria", image: "/images/islam/Ansar-Ud-Deen_Society_of_Nigeria.png", achievement: "Implemented programs that combined academic support with community service, leadership training, and vocational skills development." },
                      { name: "MSSN (Muslim Students Society of)", image: "/images/islam/MSSN.png", achievement: "Provided holistic support for Muslim students in secondary and tertiary institutions, including academic mentoring and community engagement." },
                      { name: "The Muslim Congress (TMC)", image: "/images/islam/The_Muslim_Congress.png", achievement: "Offered comprehensive support through education, vocational training, and community engagement, particularly in rural areas." },
                      { name: "Al-Habibiyyah Islamic Society,", image: "/images/islam/Al-Habibiyyah_Islamic_Society.png", achievement: "Offered a range of support services, including education, health, and vocational training to underprivileged communities. Benefited over 10,000 individuals." },
                      { name: "Islamic Education Trust (IET)", image: "/images/islam/Islamic_Education_Trust.png", achievement: "Implemented holistic educational programs that included academic support, vocational training, and health services, particularly in rural areas." },
                      { name: "Islamic Society of Nigeria (ISN)", image: "/images/islam/Islamic_Society_of_Nigeria.png", achievement: "Offered comprehensive support programs, including educational, health, and community services, to enhance the lives of Muslim communities." },
                      { name: "Al-Furqan Foundation", image: "/images/islam/Al-Furqan_Foundation.png", achievement: "Provided holistic support through integrated educational programs, focusing on academic excellence and personal development." },
                      { name: "MUSWEN (Muslim Ummah of South)", image: "/images/islam/MUSWEN.png", achievement: "Offered comprehensive educational and community support programs, including academic mentoring, vocational training, and health services." }
                    ]
                  },
                  {
                    title: "Best Advocacy for Educational Reforms and Awareness Campaigns by an Islamic Organization Contribution to Achieving Education for All in Nigeria NESA-Award/Nigeria 2024",
                    description: "Recognizes educators and institutions employing innovative teaching methods in STEM education",
                    nominees: [
                      { name: "NASFAT (Nasrul-Lahi-L-Fatih soci)", image: "/images/islam/NASFAT.png", achievement: "Led national campaigns advocating for girls' education and improved educational standards in public schools. Influenced policies at state and national levels." },
                      { name: "FOMWAN (Federation of Muslim W)", image: "/images/islam/FOMWAN.png", achievement: "Spearheaded educational reforms focused on female education and rights, particularly in northern Nigeria. Played a key role in policy-making and awareness." },
                      { name: "Ansar-Ud-Deen Society of Nigeria", image: "/images/islam/Ansar-Ud-Deen_Society_of_Nigeria.png", achievement: "Engaged in advocacy campaigns for educational reforms, focusing on curriculum development and teacher training. Contributed to national education policies." },
                      { name: "MSSN (Muslim Students Society of)", image: "/images/islam/MSSN.png", achievement: "Conducted awareness campaigns on the importance of education and engaged in policy advocacy for student rights and educational reforms." },
                      { name: "The Muslim Congress (TMC)", image: "/images/islam/The_Muslim_Congress.png", achievement: "Led initiatives advocating for educational reforms and the integration of moral and ethical education into school curricula. Contributed to policy changes." },
                      { name: "Al-Habibiyyah Islamic Society,", image: "/images/islam/Al-Habibiyyah_Islamic_Society.png", achievement: "Promoted campaigns for educational equity and access, particularly in marginalized communities. Influenced local policies through advocacy efforts." },
                      { name: "Islamic Education Trust (IET)", image: "/images/islam/Islamic_Education_Trust.png", achievement: "Advocated for the adoption of modern educational practices in Islamic schools across Nigeria. Improved the quality of Islamic education nationwide." },
                      { name: "Islamic Society of Nigeria (ISN)", image: "/images/islam/Islamic_Society_of_Nigeria.png", achievement: "Conducted campaigns focused on educational reforms and the promotion of inclusive education for all. Influenced national education policies." },
                      { name: "Al-Furqan Foundation", image: "/images/islam/Al-Furqan_Foundation.png", achievement: "Led advocacy efforts to promote education in rural areas, focusing on infrastructure development and educational access. Contributed to policy changes." },
                      { name: "MUSWEN (Muslim Ummah of South)", image: "/images/islam/MUSWEN.png", achievement: "Advocated for educational reforms in southwestern Nigeria, focusing on improving public school systems and teacher training programs." }
                    ]
                  }
                ]
              },
    {
      title: "Political Leaders in Nigeria 2024 Recognition Award for the Best Educational Support Services",
      description: "This award recognizes political leaders at both state and federal levels who have made outstanding contributions to education in Nigeria through various initiatives, policies, and support programs that advance quality education for all.",
      subCategories: [
        {
          title: "Outstanding Scholarship Program for Both Vocational and Formal Education by a Politician",
          description: "Recognizes political leaders who have established or significantly supported scholarship programs that provide educational opportunities for both vocational and formal education pathways, helping to bridge the skills gap and promote inclusive education.",
          nominees: [
            { name: "Babajide Sanwo-Olu", image: "/images/political/babajide-sanwo-olu.png", achievement: "Established the Lagos State Scholarship Board providing over 10,000 scholarships annually for both vocational and university education.", state: "Lagos", country: "Nigeria" },
            { name: "Nyesom Wike", image: "/images/political/nyesom-wike.png", achievement: "Created the Rivers State Scholarship Scheme supporting over 5,000 students in technical and university programs annually.", state: "Rivers", country: "Nigeria" },
            { name: "Godwin Obaseki", image: "/images/political/godwin-obaseki.png", achievement: "Launched the Edo State Skills Development Agency providing vocational training and scholarships to over 15,000 youths.", state: "Edo", country: "Nigeria" },
            { name: "Seyi Makinde", image: "/images/political/seyi-makinde.png", achievement: "Implemented free education policy and established technical colleges with scholarship programs benefiting over 20,000 students.", state: "Oyo", country: "Nigeria" },
            { name: "Dapo Abiodun", image: "/images/political/dapo-abiodun.png", achievement: "Created the Ogun State Education Trust Fund providing scholarships and vocational training to over 8,000 beneficiaries.", state: "Ogun", country: "Nigeria" },
            { name: "Ifeanyi Ugwuanyi", image: "/images/political/ifeanyi-ugwuanyi.png", achievement: "Established the Enugu State Education Development Fund supporting both formal and vocational education for over 12,000 students.", state: "Enugu", country: "Nigeria" },
            { name: "Ahmadu Fintiri", image: "/images/political/ahmadu-fintiri.png", achievement: "Launched the Adamawa State Education Scholarship Scheme focusing on technical and university education for over 6,000 students.", state: "Adamawa", country: "Nigeria" },
            { name: "Bello Matawalle", image: "/images/political/bello-matawalle.png", achievement: "Created vocational training centers and scholarship programs benefiting over 10,000 youths in Zamfara State.", state: "Zamfara", country: "Nigeria" },
            { name: "Abdullahi Ganduje", image: "/images/political/abdullahi-ganduje.png", achievement: "Established the Kano State Scholarship Board providing educational support to over 25,000 students in various fields.", state: "Kano", country: "Nigeria" },
            { name: "Nasir El-Rufai", image: "/images/political/nasir-el-rufai.png", achievement: "Implemented comprehensive education reforms including scholarship programs for over 15,000 students in technical and formal education.", state: "Kaduna", country: "Nigeria" }
          ]
        },
        {
          title: "Exemplary Infrastructure Development and Donations for Education by a Politician",
          description: "Honors political leaders who have championed the development of educational infrastructure, including school buildings, libraries, laboratories, technology centers, and other facilities that enhance the learning environment.",
          nominees: [
            { name: "Babajide Sanwo-Olu", image: "/images/political/babajide-sanwo-olu.png", achievement: "Constructed over 100 new schools and renovated 500+ existing schools, including state-of-the-art science laboratories and ICT centers.", state: "Lagos", country: "Nigeria" },
            { name: "Godwin Obaseki", image: "/images/political/godwin-obaseki.png", achievement: "Built 200+ new classrooms and established digital learning centers in all 192 wards of Edo State through the EdoBEST program.", state: "Edo", country: "Nigeria" },
            { name: "Seyi Makinde", image: "/images/political/seyi-makinde.png", achievement: "Constructed 300+ new classrooms, renovated 1,000+ schools, and built modern libraries across Oyo State.", state: "Oyo", country: "Nigeria" },
            { name: "Ifeanyi Okowa", image: "/images/political/ifeanyi-okowa.png", achievement: "Built 50+ new secondary schools and established technical colleges with modern workshops and laboratories in Delta State.", state: "Delta", country: "Nigeria" },
            { name: "Willie Obiano", image: "/images/political/willie-obiano.png", achievement: "Constructed over 80 new schools and established the Anambra State University of Technology with world-class facilities.", state: "Anambra", country: "Nigeria" },
            { name: "Dave Umahi", image: "/images/political/dave-umahi.png", achievement: "Built 50+ model schools with modern facilities and established the King David University of Medical Sciences.", state: "Ebonyi", country: "Nigeria" },
            { name: "Ben Ayade", image: "/images/political/ben-ayade.png", achievement: "Established multiple technical institutes and built modern school facilities across Cross River State.", state: "Cross River", country: "Nigeria" },
            { name: "Douye Diri", image: "/images/political/douye-diri.png", achievement: "Constructed new schools and renovated existing facilities, focusing on flood-resistant infrastructure in Bayelsa State.", state: "Bayelsa", country: "Nigeria" },
            { name: "Hope Uzodimma", image: "/images/political/hope-uzodimma.png", achievement: "Built new schools and established vocational training centers with modern equipment across Imo State.", state: "Imo", country: "Nigeria" },
            { name: "Rotimi Akeredolu", image: "/images/political/rotimi-akeredolu.png", achievement: "Constructed multiple schools and established the Ondo State University of Medical Sciences with state-of-the-art facilities.", state: "Ondo", country: "Nigeria" }
          ]
        },
        {
          title: "Advocacy and Policy Development for Education by a Politician",
          description: "Celebrates political leaders who have been instrumental in developing and advocating for educational policies that have positively impacted the Nigerian education system, including legislative reforms, policy initiatives, and advocacy efforts.",
          nominees: [
            { name: "Femi Gbajabiamila", image: "/images/political/femi-gbajabiamila.png", achievement: "As Speaker of the House of Representatives, championed the passage of multiple education bills and increased budgetary allocation to education.", state: "Lagos", country: "Nigeria" },
            { name: "Ahmad Lawan", image: "/images/political/ahmad-lawan.png", achievement: "As Senate President, led legislative efforts to improve education funding and policy reforms at the federal level.", state: "Yobe", country: "Nigeria" },
            { name: "Adamu Adamu", image: "/images/political/adamu-adamu.png", achievement: "As Minister of Education, implemented key policy reforms including the National Policy on Education and improved JAMB processes.", state: "Bauchi", country: "Nigeria" },
            { name: "Lai Mohammed", image: "/images/political/lai-mohammed.png", achievement: "Advocated for digital literacy policies and promoted the integration of technology in education across Nigeria.", state: "Kwara", country: "Nigeria" },
            { name: "Zainab Ahmed", image: "/images/political/zainab-ahmed.png", achievement: "As Minister of Finance, advocated for increased education budget allocation and transparent funding mechanisms.", state: "Kaduna", country: "Nigeria" },
            { name: "Abubakar Malami", image: "/images/political/abubakar-malami.png", achievement: "Championed legal frameworks for education rights and anti-corruption measures in the education sector.", state: "Kebbi", country: "Nigeria" },
            { name: "Boss Mustapha", image: "/images/political/boss-mustapha.png", achievement: "Coordinated inter-ministerial efforts for education policy implementation and COVID-19 education response strategies.", state: "Adamawa", country: "Nigeria" },
            { name: "Hadi Sirika", image: "/images/political/hadi-sirika.png", achievement: "Promoted aviation education and established training programs for technical skills in the aviation sector.", state: "Katsina", country: "Nigeria" },
            { name: "Osagie Ehanire", image: "/images/political/osagie-ehanire.png", achievement: "Advocated for health education policies and medical training programs to improve healthcare education.", state: "Edo", country: "Nigeria" },
            { name: "Babatunde Fashola", image: "/images/political/babatunde-fashola.png", achievement: "Promoted policies for technical education and infrastructure development supporting educational advancement.", state: "Lagos", country: "Nigeria" }
          ]
        }
      ]
    },

    
    {
      title: "Creative Arts Industry Contribution to Education in Nigeria 2024",
      description: "Recognizing efforts towards advancing education through creative arts and dedication to achieving quality education under SDG 4 objectives.",
      subCategories: [
        {
          title: "Best Nollywood Production and Artiste for Educational Content Award",
          description: "This category celebrates Nollywood productions and artistes that have created significant educational content, advancing the quality of education and awareness in Nigeria.",
          nominees: [
            { name: "Kunle Afolayan", image: "/images/creativeart/Kunle_Afolayan.png", achievement: "Created a film that addresses Nigeria's colonial history and its impact on society. Used historical narratives to educate audiences." },
            { name: "Genevieve Nnaji", image: "/images/creativeart/Genevieve_Nnaji.png", achievement: "Directed and starred in a film that highlights gender equality and entrepreneurship in Nigeria. Promoted educational themes of female empowerment." },
            { name: "Tunde Kelani", image: "/images/creativeart/Tunde_Kelani.png", achievement: "Produced a film that educates audiences on Yoruba culture and the life of a Nigerian musician, Ayinla Omowura. Preserved and promoted cultural heritage." },
            { name: "Ijeoma Grace Agu", image: "/images/creativeart/Ijeoma_Grace_Agu.png", achievement: "Acted in a film that discusses migration, identity, and self-discovery. Relevant to educational and social discussions. Engaged audiences in critical thinking." },
            { name: "Femi Odugbemi", image: "/images/creativeart/Femi_Odugbemi.png", achievement: "Directed a film that explores the lives of young people in Lagos, focusing on issues of social mobility and education. Used storytelling to inspire change." },
            { name: "Niyi Akinmolayan", image: "/images/creativeart/Niyi_Akinmolayan.png", achievement: "Directed a film that addresses corporate ethics, law, and gender issues in the workplace. Educated audiences on the complexities of professional life." },
            { name: "Kemi Adetiba", image: "/images/creativeart/Kemi_Adetiba.png", achievement: "Directed a film that explores themes of power, leadership, and societal structures in Nigeria. Engaged viewers in critical discussions about governance." },
            { name: "Bolanle Austen-Peters", image: "/images/creativeart/Bolanle_Austen-Peters.png", achievement: "Directed a film that highlights the intersection of wealth, education, and societal expectations in Lagos. Provided educational insights into social dynamics." },
            { name: "Ramsey Nouah", image: "/images/creativeart/Ramsey_Nouah.png", achievement: "Directed and acted in a film that explores themes of greed, ambition, and the consequences of unethical decisions. Educated audiences on moral dilemmas." },
            { name: "Adesua Etomi", image: "/images/creativeart/Adesua_Etomi.png", achievement: "Starred in a film that addresses education, cultural diversity, and the importance of youth empowerment in Northern Nigeria. Used her platform to promote social change." }
          ]
        },
        {
          title: "Best Music Industry Contribution to Education Award",
          description: "This award honors musicians and organizations in the music industry that have made significant contributions to education, either through educational content or advocacy for educational reforms.",
          nominees: [
            { name: "Asa", image: "/images/creativeart/Asa.png", achievement: "Created a song that addresses social issues, including the importance of education in achieving societal progress. Raised awareness about education's role in development." },
            { name: "2Baba (2Face Idibia)", image: "/images/creativeart/2Baba.png", achievement: "Produced music that promotes peace, unity, and the importance of education in achieving these goals. Engaged audiences in discussions about social progress." },
            { name: "Yemi Alade", image: "/images/creativeart/Yemi_Alade.png", achievement: "Created music that celebrates African identity and the importance of education in cultural preservation. Promoted the value of education in maintaining heritage." },
            { name: "Falz", image: "/images/creativeart/Falz.png", achievement: "Produced a song that critically examines Nigeria's social and educational challenges. Used music to spark conversations about educational reform." },
            { name: "Simi", image: "/images/creativeart/Simi.png", achievement: "Created music that highlights the role of education in women's empowerment and societal progress. Encouraged the education and advancement of women." },
            { name: "Teni", image: "/images/creativeart/Teni.png", achievement: "Released a song that celebrates personal achievement through hard work and education. Inspired young people to pursue education." },
            { name: "Burnaboy", image: "/images/creativeart/Burna_Boy.png", achievement: "Produced music that addresses economic challenges and the role of education in achieving financial independence. Encouraged youth to value education." },
            { name: "Banky W", image: "/images/creativeart/Banky_W.png", achievement: "Created music that advocates for the importance of education in building strong, resilient communities. Promoted education as a tool for social change." },
            { name: "Cobhams Asuquo", image: "/images/creativeart/Cobhams_Asuquo.png", achievement: "Produced a song that emphasizes the value of education in overcoming life's challenges. Motivated young people to pursue education despite obstacles." },
            { name: "Darey Art Alade", image: "/images/creativeart/Darey_Art_Alade.png", achievement: "Released music that tells stories of struggle and success, highlighting the role of education. Encouraged resilience and perseverance in educational pursuits." }
          ]
        },
        {
          title: "Best Literature and Art Works for Education Award",
          description: "Recognizes writers, literary organizations, and visual artists whose work has significantly contributed to education, particularly in promoting reading, historical understanding, and cultural awareness.",
          nominees: [
            { name: "Chimamanda Ngozi Adichie", image: "/images/creativeart/Chimamanda_Ngozi_Adichie.png", achievement: "Authored a novel that educates readers about the Nigerian Civil War and its impact on society. Used literature to foster a deeper understanding of history." },
            { name: "Wole Soyinka", image: "/images/creativeart/Wole_Soyinka.png", achievement: "Wrote plays that explore African culture, colonialism, and the role of education in societal change. Educated global audiences about Nigerian history and culture." },
            { name: "Chinelo Okparanta", image: "/images/creativeart/Chinelo_Okparanta.png", achievement: "Authored a novel that addresses issues of identity, education, and social change in Nigeria. Promoted critical thinking about the role of education in society." },
            { name: "Helon Habila", image: "/images/creativeart/Helon_Habila.png", achievement: "Wrote a novel that discusses environmental degradation and its impact on education in the Niger Delta. Used storytelling to raise awareness about environmental issues." },
            { name: "Sefi Atta", image: "/images/creativeart/Sefi_Atta.png", achievement: "Authored a novel that explores gender roles, education, and personal growth in Nigeria. Encouraged discussions about the importance of education for women." },
            { name: "Nnedi Okorafor", image: "/images/creativeart/Nnedi_okorafor.png", achievement: "Wrote a novel that blends African folklore with modern educational themes. Promoted African culture and the importance of education through storytelling." },
            { name: "Lola Shoneyin", image: "/images/creativeart/Lola_Shoneyin.png", achievement: "Authored a novel that addresses gender issues, education, and societal norms in Nigeria. Used literature to highlight the role of education in challenging social norms." },
            { name: "Teju Cole", image: "/images/creativeart/Teju_Cole.png", achievement: "Wrote a novel that explores themes of identity, migration, and education in a globalized world. Encouraged critical thinking about the role of education in shaping identity." },
            { name: "Chris Abani", image: "/images/creativeart/Chris_Abani.png", achievement: "Authored a novel that discusses urban life, education, and survival in Lagos. Used storytelling to raise awareness about the challenges facing urban youth." },
            { name: "Elnathan John", image: "/images/creativeart/Elnathan_John.png", achievement: "Wrote a novel that examines religious extremism, education, and social issues in Northern Nigeria. Promoted discussions on the role of education in combating extremism." }
          ]
        },
        {
          title: "Best Visual Arts and Educational Impact Award",
          description: "This award honors visual artists and sculptors whose work has had a significant educational impact, either through the themes they explore or their contributions to educational institutions.",
          nominees: [
            { name: "Bruce Onobrakpeya", image: "/images/creativeart/Bruce_Onobrakpeya.png", achievement: "Created art that reflects Nigeria's cultural heritage and educational themes. Used visual arts to educate audiences about Nigerian history and traditions." },
            { name: "Nike Davies-Okundaye", image: "/images/creativeart/Nike_Davies-Okundaye.png", achievement: "Promoted traditional Nigerian textile arts and their educational significance. Educated communities and students on the importance of preserving cultural heritage." },
            { name: "Peju Alatise", image: "/images/creativeart/Peju_Alatise.png", achievement: "Created artwork that addresses the education and empowerment of young girls in Nigeria. Raised awareness about the importance of education in addressing social issues." },
            { name: "Ndidi Dike", image: "/images/creativeart/Ndidi_Dike.png", achievement: "Used mixed media to explore the impact of global trade on education and society. Educated audiences on the connections between economics, education, and social progress." },
            { name: "Victor Ehikhamenor", image: "/images/creativeart/Victor_Ehikhamenor.png", achievement: "Created an exhibition that blends contemporary art with Nigerian folklore and education. Used visual arts to promote cultural education and preservation." },
            { name: "Diseye Tantua", image: "/images/creativeart/Diseye_Tantua.png", achievement: "Produced art that celebrates African pop culture and its educational influence on youth. Engaged young audiences in discussions about the role of popular culture in education." },
            { name: "Osi Audu", image: "/images/creativeart/Osi_Audu.png", achievement: "Created abstract art that explores themes of identity, education, and self-awareness. Promoted introspection and critical thinking through visual arts." },
            { name: "Laolu Senbanjo", image: "/images/creativeart/Laolu_Senbanjo.png", achievement: "Combined traditional Yoruba art with contemporary education on African spirituality. Educated global audiences on Yoruba culture and its relevance to modern education." },
            { name: "Olalekan Jeyifous", image: "/images/creativeart/Olalekan_Jeyifous.png", achievement: "Created public art that examines urban development, education, and social issues. Used art to spark conversations about the role of education in urban planning." },
            { name: "Olu Amoda", image: "/images/creativeart/Olu_Amoda.png", achievement: "Created sculptures that address themes of energy, sustainability, and education. Promoted education on renewable energy and environmental conservation through art." }
          ]
        },
        {
          title: "Best Performing Arts and Education Enrichment Award",
          description: "This category recognizes performers and institutions in the performing arts who have significantly contributed to education, particularly in raising awareness of social issues through theatre, dance, and other performances.",
          nominees: [
            { name: "Bolanle Austen-Peters", image: "/images/creativeart/Bolanle_Austen_Peters.png", achievement: "Produced a musical that educates audiences about Fela Kuti's life and his impact on Nigerian society. Promoted cultural education through theatrical productions." },
            { name: "Segun Adefila", image: "/images/creativeart/Segun_Adefila.png", achievement: "Founded a theater troupe that uses performance to educate communities on social and educational issues. Engaged audiences in discussions about societal challenges." },
            { name: "Ijeoma Grace Agu", image: "/images/creativeart/Ijeoma_Grace_Agu.png", achievement: "Acted in plays that address gender, education, and social justice. Educated audiences on the importance of education in addressing societal issues." },
            { name: "Kunle Afolayan", image: "/images/creativeart/Kunle.png", achievement: "Directed a film that highlights vocational education and its importance in Nigeria. Promoted the value of vocational education and skills development." },
            { name: "Adesua Etomi", image: "/images/creativeart/Adesua_Etomi.png", achievement: "Acted in a series that educates viewers about sexual health, education, and youth empowerment. Used television to promote educational messages." },
            { name: "Lala Akindoju", image: "/images/creativeart/Lala_Akindoju.png", achievement: "Acted in and produced plays that address women's rights and education. Engaged audiences in discussions about gender equality and education." },
            { name: "Wale Ojo", image: "/images/creativeart/Wale_Ojo.png", achievement: "Starred in films that address communication, culture, and education. Used cinema to promote cultural education and understanding." },
            { name: "Tope Oshin", image: "/images/creativeart/Tope_Oshin.png", achievement: "Directed films that explore themes of education, wealth, and social mobility. Educated audiences on the role of education in societal advancement." },
            { name: "Kemi Lala Akindoju", image: "/images/creativeart/Kemi_Lala.png", achievement: "Produced and acted in plays that highlight educational and social issues in Nigeria. Promoted education on societal issues through theater." },
            { name: "Femi Odugbemi", image: "/images/creativeart/Femi_Odugbemi.png", achievement: "Directed a series that explores family dynamics, education, and social challenges. Used television to educate audiences on complex social issues." }
          ]
        },
        {
          title: "Best Film and Media for Educational Advancement Award",
          description: "This award recognizes individuals and organizations that have used film and media to enhance educational practices, resources, and accessibility.",
          nominees: [
            { name: "Femi Odugbemi", image: "/images/creativeart/Femi_Odugbemi.png", achievement: "Produced documentaries focusing on educational reform and advocacy in Nigeria." },
            { name: "Jade Osiberu", image: "/images/creativeart/Jade_Osiberu.png", achievement: "Used her filmmaking skills to highlight educational challenges and inspire change." },
            { name: "Tunde Kelani", image: "/images/creativeart/Tunde_Kelani.png", achievement: "Contributed to cultural education through film, preserving and promoting indigenous languages and traditions." },
            { name: "Kunle Afolayan", image: "/images/creativeart/Kunle_Afolayan.png", achievement: "Created impactful educational films that highlight societal issues and promote education." },
            { name: "Kemi Adetiba", image: "/images/creativeart/Kemi_Adetiba.png", achievement: "Directed films that address gender inequality and advocate for girls' education." },
            { name: "Izu Ojukwu", image: "/images/creativeart/Izu_Ojukwu.png", achievement: "Used historical films to educate audiences about Nigerian heritage and promote cultural awareness." },
            { name: "Mildred Okwo", image: "/images/creativeart/Mildred_Okwo.png", achievement: "Produced films that address social issues and promote educational awareness." },
            { name: "Moses Inwang", image: "/images/creativeart/Moses_Inwang.png", achievement: "Created films that tackle educational challenges and inspire youth empowerment." },
            { name: "Blessing Egbe", image: "/images/creativeart/Blessing_Egbe.png", achievement: "Used her productions to highlight the importance of education, especially for girls." },
            { name: "Akin Omotoso", image: "/images/creativeart/Akin_Omotoso.png", achievement: "Directed films that explore themes of education and social justice in Nigeria." }
          ]
        },
        {
          title: "Best Creative Advocacy and Educational Campaigns Award",
          description: "This category celebrates organizations that have used creative campaigns to promote education, making learning more engaging and accessible.",
          nominees: [
            { name: "ONE Campaign", image: "/images/creativeart/ONE_Campaign.png", achievement: "Led impactful campaigns advocating for education access and quality in Nigeria." },
            { name: "Girl Rising Nigeria", image: "/images/creativeart/Girl_Rising_Nigeria.png", achievement: "Championed girls' education through powerful storytelling and media campaigns." },
            { name: "Teach For Nigeria", image: "/images/creativeart/Teach_Nigeria.png", achievement: "Recruited and placed outstanding graduates in underserved schools to improve education quality." },
            { name: "Youth for Technology Foundation", image: "/images/creativeart/Youth_Foundation.png", achievement: "Empowered youth through technology education and entrepreneurship programs." },
            { name: "African Leadership Academy", image: "/images/creativeart/African_Leadership.png", achievement: "Developed young leaders through innovative education programs focused on African development." },
            { name: "Education as a Vaccine (EVA)", image: "/images/creativeart/Education_Vaccine.png", achievement: "Promoted youth-friendly health education and services across Nigeria." },
            { name: "Stand to End Rape Initiative (STER)", image: "/images/creativeart/Stand-Initiative.png", achievement: "Advocated for comprehensive sexuality education to prevent sexual violence." },
            { name: "CAMFED (Campaign for Female E..)", image: "/images/creativeart/CAMFED.png", achievement: "Supported girls' education and women's empowerment through community-driven initiatives." },
            { name: "Connected Development (CODE)", image: "/images/creativeart/Connected_Development.png", achievement: "Used technology to track education projects and promote accountability in the sector." },
            { name: "HACEY Health Initiative", image: "/images/creativeart/HACEY_Health.png", achievement: "Implemented health education programs targeting young people and vulnerable communities." }
          ]
        }
      ]
    },
      
    {
      "title": "Support for education in STEM in Nigeria 2024",
      "description": "Celebrating initiatives by any organization for creative arts role in education and promoting hands-on learning experiences.",
      "subCategories": [
        {
          "title": "The Best Innovative STEM Curriculum Development in Nigeria",
          "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
          "nominees": [
            { "name": "University of Lagos", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/university_of_lagos.png", "achievement": "Developed a multidisciplinary STEM curriculum focusing on practical applications and research. Enhanced STEM education for students." },
            { "name": "Covenant University", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Covenant_University.png", "achievement": "Introduced an innovative engineering curriculum integrating industry practices. Prepared over 3,000 students for careers in engineering." },
            { "name": "Lagos State Model College", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Lagos_State_Model_College.png", "achievement": "Implemented a specialized STEM program for secondary students, emphasizing real-world problem-solving. Improved student performance in STEM subjects." },
            { "name": "Federal Government College Enugu", "state": "Enugu", "country": "Nigeria", "image": "/images/stem/Federal_Government_College_Enugu.png", "achievement": "Developed a STEM curriculum with a focus on renewable energy and environmental sciences. Trained over 2,500 students in sustainable technologies." },
            { "name": "Nigerian Turkish International Coll", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Nigerian_Turkish_International_Coll.png", "achievement": "Introduced advanced STEM subjects, including robotics and coding, into the school curriculum. Achieved top rankings in international STEM competitions." },
            { "name": "British International School Lagos", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/British_International_School_Lagos.png", "achievement": "Integrated STEM across all grade levels, with an emphasis on technology and engineering. Produced high-achieving students in STEM fields internationally." },
            { "name": "University of Nigeria, Nsukka", "state": "Enugu", "country": "Nigeria", "image": "/images/stem/University_of_Nigeria_Nsukka.png", "achievement": "Developed a comprehensive STEM curriculum with a strong research component. Facilitated groundbreaking research in various STEM fields." },
            { "name": "STEM Nigeria Initiative", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/STEM_Nigeria_Initiative.png", "achievement": "Designed a national STEM curriculum that incorporates local context and resources. Benefited over 10,000 students across multiple schools." },
            { "name": "Centre for Mathematics and Science", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Centre_for_Mathematics_and_Science.png", "achievement": "Developed a STEM curriculum focusing on mathematics and science literacy. Improved mathematical proficiency among secondary school students." },
            { "name": "Nigerian Educational Research and", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Nigerian_Educational_Research.png", "achievement": "Led the national development of STEM curriculum guidelines and standards. Standardized STEM education across the country." }
          ]
        },
        {
          "title": "The Best STEM Outreach and Community Engagement in Nigeria",
          "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
          "nominees": [
            { "name": "STEM Café", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/STEM_Café.png", "achievement": "Established interactive STEM learning centers in underserved communities. Engaged over 20,000 students in hands-on STEM activities." },
            { "name": "Junior Achievement Nigeria", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Junior_Achievement_Nigeria.png", "achievement": "Implemented STEM programs that focus on entrepreneurship and innovation. Reached over 50,000 students across Nigeria." },
            { "name": "Teach for Nigeria", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Teach_for_Nigeria.png", "achievement": "Promoted STEM education through teaching fellowships in underserved areas. Improved STEM literacy among 30,000 students in rural communities." },
            { "name": "Abuja Science and Technology Park", "state": "Abuja", "country": "Nigeria", "image": "/images/stem/Abuja_Science_and_Technology_Park.png", "achievement": "Organized community-based STEM workshops and competitions. Engaged 15,000 students and community members in STEM activities." },
            { "name": "Yaba College of Technology", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Yaba_College_of_Technology.png", "achievement": "Conducted STEM outreach programs targeting secondary school students. Enhanced STEM skills for over 10,000 students through workshops." },
            { "name": "TechQuest STEM Academy", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/TechQuest_STEM_Academy.png", "achievement": "Provided STEM education through coding and robotics workshops in low-income areas. Trained over 25,000 students in digital skills." },
            { "name": "Lagos State Ministry of Education", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Lagos_State_Ministry_of_Education.png", "achievement": "Launched state-wide STEM initiatives to promote science and technology education. Improved STEM education in over 500 schools across Lagos State." },
            { "name": "SkillNG", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/SkillNG.png", "achievement": "Offered STEM training and career guidance for youths in technology fields. Empowered over 15,000 young people with STEM skills." },
            { "name": "Nigerian Society of Engineers", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Nigerian_Society_of_Engineers.png", "achievement": "Led community STEM projects focusing on engineering education and awareness. Reached over 10,000 students and young professionals." },
            { "name": "African Science Academy", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/African_Science_Academy.png", "achievement": "Established STEM programs for girls in rural areas, focusing on science education and leadership. Empowered over 5,000 girls with STEM skills." }
          ]
        },
        {
          "title": "The Best Technology Integration in STEM Education in Nigeria",
          "description": "Recognizes educators and institutions employing innovative teaching methods in STEM education",
          "nominees": [
            { "name": "American University of Nigeria", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/American_University_of_Nigeria.png", "achievement": "Implemented technology-enhanced STEM programs with a focus on digital learning. Provided tech-driven education to over 5,000 students." },
            { "name": "Green Springs School", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Green_Springs_School.png", "achievement": "Integrated advanced technology tools into STEM curriculum, including virtual labs and online simulations. Enhanced learning experience for students." },
            { "name": "Obafemi Awolowo University", "state": "Osun", "country": "Nigeria", "image": "/images/stem/Obafemi_Awolowo_University.png", "achievement": "Developed a robust e-learning platform for STEM courses. Increased access to STEM education for over 10,000 students." },
            { "name": "University of Ibadan", "state": "Oyo", "country": "Nigeria", "image": "/images/stem/University_of_Ibadan.png", "achievement": "Integrated cutting-edge technology into STEM research and education. Facilitated research and learning for over 15,000 students." },
            { "name": "Afe Babalola University", "state": "Ekiti", "country": "Nigeria", "image": "/images/stem/Afe_Babalola_University.png", "achievement": "Launched a tech-driven STEM program with a focus on innovation and entrepreneurship. Empowered 3,000 students with digital skills." },
            { "name": "Bridge International Academies", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Bridge_International_Academies.png", "achievement": "Utilized educational technology to deliver STEM education in low-income areas. Improved STEM literacy for over 100,000 students." },
            { "name": "CodeLagos", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/CodeLagos.png", "achievement": "Implemented a state-wide coding and technology program for students. Trained over 100,000 students in coding and digital literacy." },
            { "name": "Edves", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Edves.png", "achievement": "Developed and deployed a technology platform to manage and enhance STEM education in schools. Supported over 500 schools in Nigeria." },
            { "name": "Andela Learning Community", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/Andela_Learning_Community.png", "achievement": "Provided online and offline technology training to students and professionals. Trained over 20,000 individuals in software development." },
            { "name": "STEM METS Resources", "state": "Lagos", "country": "Nigeria", "image": "/images/stem/STEM_METS_Resources.png", "achievement": "Offered STEM kits and technology resources for hands-on learning in schools. Enhanced STEM education for over 30,000 students across Nigeria." }
          ]
        }
      ]
    }
  ]
