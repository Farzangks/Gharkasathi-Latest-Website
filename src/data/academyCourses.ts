import { TrainingCourse } from '../types';

export const ACADEMY_COURSES: TrainingCourse[] = [
  {
    id: 'GK-STD-001',
    category: 'Standard SOP',
    isCommonStandard: true,
    titleEn: 'Gharkasathi Professional Standards & Service SOP',
    titleHi: 'घरकासाथी पेशेवर मानक और सेवा कार्यप्रणाली',
    descriptionEn: 'Mandatory core certification for all partners covering customer etiquettes, Gharkasathi digital app workflows, safety protocols, and quality handover.',
    descriptionHi: 'सभी सेवा साथियों के लिए अनिवार्य मानक प्रशिक्षण — ग्राहक व्यवहार, डिजिटल ऐप प्रक्रिया, सुरक्षा प्रोटोकॉल और गुणवत्ता सत्यापन।',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    passingScore: 80,
    maxAttempts: 3,
    cooldownHours: 6,
    practicalRequired: false,
    validityMonths: 24,
    modules: [
      {
        id: 'MOD-STD-1',
        titleEn: 'Module 1 — Customer Experience & Professional Conduct',
        titleHi: 'मॉड्यूल 1 — ग्राहक अनुभव और पेशेवर आचरण',
        descriptionEn: 'Respectful behavior, dress code, privacy, and clear communication in Hindi and regional dialects.',
        descriptionHi: 'सम्मानजनक व्यवहार, ड्रेस कोड, गोपनीयता और स्पष्ट भाषा संवाद।',
        lessons: [
          {
            id: 'LES-STD-101',
            titleEn: 'Arrival Greeting, Identity Verification & Shoe Covers',
            titleHi: 'आगमन अभिवादन, आईडी सत्यापन और शू कवर का उपयोग',
            type: 'video',
            duration: '4 mins',
            contentEn: 'Always wear your Gharkasathi ID badge. Greet the customer with "Namaste / Good Day". Ask permission before entering and wear clean shoe covers or remove footwear.',
            contentHi: 'हमेशा अपना घरकासाथी आईडी कार्ड पहनें। "नमस्ते" कहकर अभिवादन करें। घर में प्रवेश करने से पहले अनुमति लें और शू-कवर का उपयोग करें।'
          },
          {
            id: 'LES-STD-102',
            titleEn: 'Customer Privacy & Property Protection',
            titleHi: 'ग्राहक गोपनीयता और सामान की सुरक्षा',
            type: 'reading',
            duration: '5 mins',
            contentEn: 'Never enter private rooms without permission. Never touch personal belongings. Protect flooring and furniture with drop cloths or sheets before placing tools.',
            contentHi: 'बिना अनुमति के निजी कमरों में न जाएं। ग्राहक के सामान को न छुएं। औजार रखने से पहले फर्श पर सुरक्षा मैट या चादर बिछाएं।'
          }
        ]
      },
      {
        id: 'MOD-STD-2',
        titleEn: 'Module 2 — Gharkasathi Digital App SOP & OTP Verification',
        titleHi: 'मॉड्यूल 2 — घरकासाथी डिजिटल ऐप एसओपी और ओटीपी',
        descriptionEn: 'Accepting jobs, navigating, Start OTP check, and completing work.',
        descriptionHi: 'जॉब स्वीकार करना, नेविगेशन, 4-अंकीय स्टार्ट ओटीपी और कार्य समाप्ति।',
        lessons: [
          {
            id: 'LES-STD-201',
            titleEn: 'Starting the Job: 4-Digit Customer OTP',
            titleHi: 'कार्य प्रारंभ: 4-अंकीय ग्राहक ओटीपी दर्ज करना',
            type: 'reading',
            duration: '6 mins',
            contentEn: 'You CANNOT begin any physical work until the customer shares the 4-digit OTP generated in their Gharkasathi app. This protects both you and the customer from fraudulent claims.',
            contentHi: 'जब तक ग्राहक अपने ऐप में दिख रहा 4-अंकीय ओटीपी न दे, तब तक कार्य शुरू न करें। यह सुरक्षा और भुगतान की गारंटी सुनिश्चित करता है।'
          },
          {
            id: 'LES-STD-202',
            titleEn: 'Additional Work Request & Rate Card Transparency',
            titleHi: 'अतिरिक्त कार्य अनुमोदन और पारदर्शी रेट कार्ड',
            type: 'video',
            duration: '5 mins',
            contentEn: 'If customer requests additional tasks not in original booking, NEVER take unbilled cash. Submit an "Additional Work Request" inside the Partner App for instant customer digital approval.',
            contentHi: 'यदि ग्राहक अतिरिक्त काम की मांग करता है, तो सीधे नकद न लें। पार्टनर ऐप में "अतिरिक्त कार्य अनुरोध" भेजें ताकि ग्राहक के मोबाइल पर डिजिटल स्वीकृति प्राप्त हो सके।'
          }
        ]
      },
      {
        id: 'MOD-STD-3',
        titleEn: 'Module 3 — Safety, PPE & Emergency Protocols',
        titleHi: 'मॉड्यूल 3 — सुरक्षा उपकरण और आपातकालीन प्रक्रियाएं',
        descriptionEn: 'Insulated gloves, safety glasses, main power cut-off, and first aid.',
        descriptionHi: 'इंसुलेटेड ग्लव्स, सुरक्षा चश्मा, मुख्य पावर कट-ऑफ और प्राथमिक चिकित्सा।',
        lessons: [
          {
            id: 'LES-STD-301',
            titleEn: 'Personal Protective Equipment (PPE) Usage',
            titleHi: 'व्यक्तिगत सुरक्षा उपकरण (पीपीई) का अनिवार्य उपयोग',
            type: 'images',
            duration: '4 mins',
            contentEn: 'Check that rubber-insulated safety gloves, safety goggles, and non-slip rubber soled boots are worn during electrical and plumbing interventions.',
            contentHi: 'इलेक्ट्रिकल या प्लंबिंग कार्य के दौरान रबर के इंसुलेटेड ग्लव्स, सेफ्टी गॉगल्स और ग्रिप वाले जूते पहनना अनिवार्य है।'
          }
        ]
      },
      {
        id: 'MOD-STD-4',
        titleEn: 'Module 4 — Quality Handover & Site Cleanup',
        titleHi: 'मॉड्यूल 4 — गुणवत्ता परीक्षण और कार्यस्थल की सफाई',
        descriptionEn: 'Testing before customer, cleaning debris, and before/after photo proof.',
        descriptionHi: 'ग्राहक के सामने परीक्षण, कचरा सफाई और बिफोर-आफ्टर फोटो अपलोड।',
        lessons: [
          {
            id: 'LES-STD-401',
            titleEn: 'Before & After Photo Documentation',
            titleHi: 'कार्य से पहले और बाद की तस्वीरें अपलोड करना',
            type: 'reading',
            duration: '4 mins',
            contentEn: 'Take clear photos of the issue before opening parts, and take photos after completing the fix. Clean all dust, water, and debris before customer signoff.',
            contentHi: 'काम शुरू करने से पहले खराबी की फोटो लें, और काम पूरा होने के बाद साफ जगह की फोटो लें। सभी धूल, मलबा और पानी साफ करके ही हैंडओवर करें।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'Q-STD-1',
        questionEn: 'A customer asks you to replace a damaged switchboard wire that was NOT included in the original booking. What is the mandatory Gharkasathi SOP?',
        questionHi: 'ग्राहक आपसे एक क्षतिग्रस्त स्विचबोर्ड ठीक करने का अनुरोध करता है जो मूल बुकिंग में शामिल नहीं था। सही घरकासाथी एसओपी क्या है?',
        optionsEn: [
          'Take direct cash from customer and fix it immediately without reporting',
          'Submit an Additional Work Request in the Partner App for customer digital approval',
          'Refuse bluntly and leave the premises immediately',
          'Tell the customer to book after 3 days'
        ],
        optionsHi: [
          'ग्राहक से सीधे नकद लें और बिना किसी को बताए काम कर दें',
          'पार्टनर ऐप में "अतिरिक्त कार्य अनुरोध" दर्ज करें और ग्राहक की डिजिटल स्वीकृति लें',
          'गुस्से में मना कर दें और तुरंत बाहर निकल जाएं',
          'ग्राहक से कहें कि 3 दिन बाद नई बुकिंग करें'
        ],
        correctIndex: 1,
        explanationEn: 'All extra services must be registered through the app to maintain warranty, insurance, and transparent billing.',
        explanationHi: 'वारंटी और पारदर्शी बिलिंग के लिए सभी अतिरिक्त काम ऐप के माध्यम से ही दर्ज होने चाहिए।',
        categoryTag: 'SOP & Billing'
      },
      {
        id: 'Q-STD-2',
        questionEn: 'When should a technician physically start the repair work at the customer home?',
        questionHi: 'तकनीशियन को ग्राहक के घर पर काम कब शुरू करना चाहिए?',
        optionsEn: [
          'As soon as they ring the doorbell',
          'After having tea offered by the customer',
          'Only after verifying the customer’s 4-digit Start OTP in the Partner App',
          'Whenever the customer is not watching'
        ],
        optionsHi: [
          'जैसे ही दरवाजे की घंटी बजाएं',
          'ग्राहक द्वारा दी गई चाय पीने के बाद',
          'पार्टनर ऐप में ग्राहक का 4-अंकीय स्टार्ट ओटीपी सत्यापित करने के बाद ही',
          'जब ग्राहक कमरे में न देख रहा हो'
        ],
        correctIndex: 2,
        explanationEn: 'The 4-digit Start OTP validates that the right partner has arrived at the right address.',
        explanationHi: '4-अंकीय स्टार्ट ओटीपी यह सत्यापित करता है कि सही तकनीशियन सही पते पर पहुंचा है।',
        categoryTag: 'App SOP'
      },
      {
        id: 'Q-STD-3',
        questionEn: 'What must you always do before placing heavy or dirty metal tools on a customer’s polished marble floor or bed?',
        questionHi: 'ग्राहक के पॉलिश मार्बल फर्श या बिस्तर पर भारी औजार रखने से पहले क्या करना अनिवार्य है?',
        optionsEn: [
          'Drop the tools directly to test floor strength',
          'Spread a clean tool mat or protective sheet first to prevent scratches',
          'Ask the customer to hold the heavy tools in their hands',
          'Place tools directly on the bed sheets'
        ],
        optionsHi: [
          'फर्श की मजबूती देखने के लिए औजार सीधे पटक दें',
          'खरोंच से बचाने के लिए पहले एक साफ टूल मैट या सुरक्षा शीट बिछाएं',
          'ग्राहक से कहें कि वे औजार अपने हाथों में पकड़कर खड़े रहें',
          'औजार सीधे बिस्तर की चादर पर रख दें'
        ],
        correctIndex: 1,
        explanationEn: 'Protecting customer property with protective mats prevents costly damages and earns 5-star ratings.',
        explanationHi: 'टूल मैट बिछाने से ग्राहक के फर्श को खरोंच नहीं आती और ग्राहक संतुष्टि बढ़ती है।',
        categoryTag: 'Quality Standards'
      },
      {
        id: 'Q-STD-4',
        questionEn: 'Before troubleshooting any electrical distribution panel or open wire fault, what is the first safety rule?',
        questionHi: 'किसी भी बिजली के डिस्ट्रीब्यूशन पैनल या खुले तार को छूने से पहले पहला सुरक्षा नियम क्या है?',
        optionsEn: [
          'Touch the wire with wet hands to check if live',
          'Switch off the Main MCB / Inverter bypass switch and test with a calibrated tester',
          'Ask the customer to hold the switchboard',
          'Ignore the main switch if in a hurry'
        ],
        optionsHi: [
          'गीले हाथों से छूकर देखें कि करंट है या नहीं',
          'मेन एमसीबी/इन्वर्टर बाईपास बंद करें और कैलिब्रेटेड टेस्टर से जांचें',
          'ग्राहक से कहें कि वे स्विच पकड़े रहें',
          'जल्दी में मेन स्विच बंद करने की जरूरत नहीं है'
        ],
        correctIndex: 1,
        explanationEn: 'Always de-energize the circuit at the main MCB and verify with a voltage tester before touching wires.',
        explanationHi: 'तारों को छूने से पहले हमेशा मेन एमसीबी बंद करें और टेस्टर से करंट न होने की पुष्टि करें।',
        categoryTag: 'Safety'
      }
    ]
  },
  {
    id: 'GK-PLM-101',
    category: 'Plumbing',
    titleEn: 'Certified Skilled Plumbing Technician (CSGSP-PL)',
    titleHi: 'प्रमाणित कुशल प्लंबिंग तकनीशियन (CSGSP-PL)',
    descriptionEn: 'Advanced pressurized pipe fitting, CPVC/UPVC joints, concealed leakage detection, fixture installations, and waterproofing standards.',
    descriptionHi: 'प्रेशराइज्ड पाइप फिटिंग, सीपीवीसी/यूपीवीसी जॉइंट्स, लीकेज डिटेक्शन, आधुनिक बाथरूम फिटिंग और सुरक्षा मानक।',
    thumbnail: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80',
    passingScore: 80,
    maxAttempts: 3,
    cooldownHours: 12,
    practicalRequired: true,
    validityMonths: 24,
    modules: [
      {
        id: 'MOD-PLM-1',
        titleEn: 'Module 1 — Pipe Materials, Solvent Bonding & Thread Sealants',
        titleHi: 'मॉड्यूल 1 — पाइप सामग्री, विलायक बॉन्डिंग और थ्रेड सीलेंट',
        descriptionEn: 'Proper application of Teflon tape, CPVC solvent cement, and curing times.',
        descriptionHi: 'टेफ्लॉन टेप, सीपीवीसी सॉल्वेंट सीमेंट और सूखने का सही समय।',
        lessons: [
          {
            id: 'LES-PLM-101',
            titleEn: 'CPVC vs UPVC Pipe Applications & Curing Times',
            titleHi: 'सीपीवीसी और यूपीवीसी पाइप का सही उपयोग व क्योरिंग समय',
            type: 'reading',
            duration: '7 mins',
            contentEn: 'CPVC is rated for both hot and cold water up to 93°C. UPVC is strictly for cold water and drainage. When applying solvent cement, wait at least 15 minutes before handling and 2 hours before pressure testing.',
            contentHi: 'सीपीवीसी गर्म और ठंडे पानी (93°C तक) दोनों के लिए है। यूपीवीसी केवल ठंडे पानी व ड्रेनेज के लिए है। सॉल्वेंट सीमेंट लगाने के बाद कम से कम 15 मिनट बाद हिलाएं और 2 घंटे बाद ही प्रेशर टेस्ट करें।'
          },
          {
            id: 'LES-PLM-102',
            titleEn: 'Teflon Tape Wrapping Direction & Thread Leak Prevention',
            titleHi: 'टेफ्लॉन टेप लपेटने की सही दिशा और थ्रेड लीकेज रोकथाम',
            type: 'video',
            duration: '5 mins',
            contentEn: 'Always wind Teflon tape CLOCKWISE when facing the open end of the pipe thread. Apply 5 to 7 tight layers. Winding counter-clockwise causes the tape to unravel as the fitting is tightened.',
            contentHi: 'थ्रेड पर टेफ्लॉन टेप हमेशा क्लॉकवाइज (घड़ी की दिशा में) लपेटें (5-7 परतें)। उल्टी दिशा में लपेटने से टाइट करते समय टेप खुल जाता है और लीकेज होती है।'
          }
        ]
      },
      {
        id: 'MOD-PLM-2',
        titleEn: 'Module 2 — Concealed Wall Leakage Diagnosis & Diverters',
        titleHi: 'मॉड्यूल 2 — दीवार के अंदर की लीकेज जांच और शावर डायवर्टर',
        descriptionEn: 'Pressure testing, acoustics, and single-lever diverter cartridge maintenance.',
        descriptionHi: 'प्रेशर टेस्टिंग और सिंगल-लीवर डायवर्टर कार्ट्रिज रिपेयर।',
        lessons: [
          {
            id: 'LES-PLM-201',
            titleEn: 'Single Lever Bath Diverter Cartridge Replacement',
            titleHi: 'सिंगल लीवर बाथ डायवर्टर कार्ट्रिज बदलना',
            type: 'practical',
            duration: '8 mins',
            contentEn: 'Turn off line pressure. Use an Allen key to remove the lever screw. Unscrew the chrome flange and brass retaining nut. Clean sediment and seat the new ceramic cartridge with aligning lugs.',
            contentHi: 'लाइन बंद करें। एलन की से लीवर खोलें। ब्रास नट हटाकर पुरानी सेरामिक कार्ट्रिज निकालें, स्लॉट साफ करें और नई कार्ट्रिज को सही खांचे में बैठाकर कसें।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'Q-PLM-1',
        questionEn: 'Which direction should Teflon (PTFE) tape be wrapped around male pipe threads to prevent it from unravelling during tightening?',
        questionHi: 'पाइप कसते समय टेफ्लॉन (पीटीएफई) टेप को किस दिशा में लपेटा जाना चाहिए ताकि वह खुले नहीं?',
        optionsEn: [
          'Clockwise when looking directly into the open pipe end',
          'Counter-clockwise only',
          'Random diagonal criss-cross',
          'Direction does not matter'
        ],
        optionsHi: [
          'पाइप के खुले सिरे की ओर देखते हुए दक्षिणावर्त (क्लॉकवाइज)',
          'केवल वामावर्त (एंटी-क्लॉकवाइज)',
          'तिरछा किसी भी तरफ',
          'दिशा से कोई फर्क नहीं पड़ता'
        ],
        correctIndex: 0,
        explanationEn: 'Wrapping clockwise ensures tightening the female fitting compresses and seals the tape instead of peeling it back.',
        explanationHi: 'क्लॉकवाइज लपेटने से जब फिटिंग कसी जाती है तो टेप थ्रेड में और ज्यादा दबकर वाटरप्रूफ सील बनाता है।',
        categoryTag: 'Pipe Fitting'
      },
      {
        id: 'Q-PLM-2',
        questionEn: 'Can UPVC pipes be used for central solar water heater hot lines?',
        questionHi: 'क्या यूपीवीसी पाइप का उपयोग सोलर वॉटर हीटर की गर्म पानी लाइन में किया जा सकता है?',
        optionsEn: [
          'Yes, UPVC handles boiling water without any issues',
          'No, UPVC deforms above 60°C; CPVC or Composite PPR pipes must be used for hot water',
          'Yes, if wrapped with extra duct tape',
          'Only in winter season'
        ],
        optionsHi: [
          'हाँ, यूपीवीसी उबलते पानी को आसानी से संभालता है',
          'नहीं, यूपीवीसी 60°C से ऊपर पिघल/मुड़ जाता है; गर्म पानी के लिए सीपीवीसी या पीपीआर आवश्यक है',
          'हाँ, यदि ऊपर से डक्ट टेप चिपका दिया जाए',
          'केवल सर्दियों के मौसम में'
        ],
        correctIndex: 1,
        explanationEn: 'UPVC softens under heat. Only CPVC or PPR pipes rated for hot water can be used for geysers and solar systems.',
        explanationHi: 'यूपीवीसी गर्म पानी में मुड़कर फट सकता है। गीजर और सोलर के लिए सीपीवीसी या पीपीआर पाइप ही मान्य हैं।',
        categoryTag: 'Material Standards'
      },
      {
        id: 'Q-PLM-3',
        questionEn: 'When performing a hydrostatic pressure test on newly joined CPVC lines, how long should you wait after applying solvent cement?',
        questionHi: 'नए सीपीवीसी जोड़ों पर पानी का प्रेशर टेस्ट करने से पहले सॉल्वेंट सूखने के लिए कम से कम कितना इंतजार करना चाहिए?',
        optionsEn: [
          'Immediately with full pump pressure',
          'At least 2 hours for standard domestic pressure, 24 hours for heavy commercial pressure',
          '5 seconds is enough',
          '1 week mandatory'
        ],
        optionsHi: [
          'तुरंत फुल प्रेशर पंप चालू कर देना चाहिए',
          'कम से कम 2 घंटे (सामान्य घरेलू प्रेशर के लिए) और 24 घंटे (हैवी प्रेशर के लिए)',
          '5 सेकंड काफी है',
          'कम से कम 1 हफ्ता'
        ],
        correctIndex: 1,
        explanationEn: 'Solvent cement chemically welds the plastic; testing too early ruptures the incomplete bond.',
        explanationHi: 'सॉल्वेंट केमिकल बॉन्ड बनाता है; जल्दी पानी चालू करने से जोड़ लीक हो जाता है।',
        categoryTag: 'Testing & Safety'
      }
    ]
  },
  {
    id: 'GK-ELE-101',
    category: 'Electrical',
    titleEn: 'Certified Skilled Electrical Technician (CSGSP-EL)',
    titleHi: 'प्रमाणित कुशल इलेक्ट्रिकल तकनीशियन (CSGSP-EL)',
    descriptionEn: 'Wiring calculations, MCB/RCCB tripping diagnostics, earthing resistance, phase balancing, inverter/UPS wiring, and shock safety.',
    descriptionHi: 'वायरिंग लोड गणना, एमसीबी/आरसीसीबी ट्रिपिंग जांच, अर्थिंग रेजिस्टेंस, इन्वर्टर वायरिंग और करंट सुरक्षा मानक।',
    thumbnail: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    passingScore: 80,
    maxAttempts: 3,
    cooldownHours: 12,
    practicalRequired: true,
    validityMonths: 24,
    modules: [
      {
        id: 'MOD-ELE-1',
        titleEn: 'Module 1 — RCCB vs MCB Protection & Earth Leakage Testing',
        titleHi: 'मॉड्यूल 1 — आरसीसीबी और एमसीबी सुरक्षा तथा अर्थ लीकेज टेस्टिंग',
        descriptionEn: 'Difference between over-current and life-saving earth leakage trip mechanisms.',
        descriptionHi: 'ओवर-करंट और जानलेवा अर्थ लीकेज सुरक्षा के बीच अंतर।',
        lessons: [
          {
            id: 'LES-ELE-101',
            titleEn: 'How RCCB Protects Human Life from Electric Shock',
            titleHi: 'आरसीसीबी मानव जीवन को करंट लगने से कैसे बचाता है',
            type: 'video',
            duration: '6 mins',
            contentEn: 'An MCB only trips on high overload (e.g. 16A/32A). An RCCB trips on micro-current leakage (30mA) within 30 milliseconds, preventing fatal electrocution. Never bypass an RCCB when nuisance tripping occurs — find the neutral-earth leak.',
            contentHi: 'एमसीबी केवल अधिक लोड या शॉर्ट सर्किट पर गिरता है। आरसीसीबी केवल 30mA के मामूली लीकेज पर 30 मिलीसेकंड में ट्रिप होकर जान बचाता है। ट्रिपिंग होने पर कभी आरसीसीबी को डायरेक्ट न करें, लीकेज ढूंढें।'
          }
        ]
      },
      {
        id: 'MOD-ELE-2',
        titleEn: 'Module 2 — Inverter Neutral Backfeed & Wire Gauge Sizing',
        titleHi: 'मॉड्यूल 2 — इन्वर्टर न्यूट्रल बैकफीड और सही वायर गेज का चयन',
        descriptionEn: 'Wire thickness standards (1.0mm², 1.5mm², 2.5mm², 4.0mm²) and preventing back-feed shock.',
        descriptionHi: 'वायर मोटाई मानक (1.5mm, 2.5mm, 4.0mm) और इन्वर्टर बैकफीड शॉक की रोकथाम।',
        lessons: [
          {
            id: 'LES-ELE-201',
            titleEn: 'Wire Gauge Load Chart for Residential Appliances',
            titleHi: 'घरेलू उपकरणों के लिए वायर गेज लोड चार्ट',
            type: 'reading',
            duration: '8 mins',
            contentEn: 'Use 1.0mm² for light/fan circuits, 1.5mm² for inverter circuits, 2.5mm² for 16A power sockets (fridge/microwave), and 4.0mm² for 1.5-2 Ton AC units and Geysers.',
            contentHi: 'लाइट/पंखा: 1.0mm², इन्वर्टर: 1.5mm², 16A पावर सॉकेट (फ्रिज/माइक्रोवेव): 2.5mm², 1.5/2 टन एसी व गीजर: कम से कम 4.0mm²।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'Q-ELE-1',
        questionEn: 'An RCCB (Residual Current Circuit Breaker) installed in a domestic distribution board trips repeatedly. What is the correct diagnostic procedure?',
        questionHi: 'घर के मेन डिस्ट्रीब्यूशन बोर्ड में लगा आरसीसीबी बार-बार ट्रिप हो रहा है। सही जांच प्रक्रिया क्या है?',
        optionsEn: [
          'Bypass the RCCB with a copper wire so it stops disturbing the customer',
          'Disconnect circuits one by one to isolate the appliance or wire with neutral-to-earth leakage',
          'Hit the RCCB with a screwdriver handle',
          'Replace the 30mA RCCB with a 500A industrial breaker'
        ],
        optionsHi: [
          'आरसीसीबी को तांबे के तार से डायरेक्ट (बाईपास) कर दें ताकि ट्रिप होना बंद हो जाए',
          'एक-एक करके सर्किट अलग करें और न्यूट्रल-से-अर्थ लीकेज वाले उपकरण या तार का पता लगाएं',
          'आरसीसीबी पर पेचकस से मारें',
          '30mA आरसीसीबी की जगह 500A का बड़ा ब्रेकर लगा दें'
        ],
        correctIndex: 1,
        explanationEn: 'Never bypass an RCCB! It trips because there is an active current leak to earth that can cause shock or fire. Identify and isolate the faulty neutral line.',
        explanationHi: 'आरसीसीबी को कभी डायरेक्ट न करें! यह तभी गिरता है जब कहीं करंट लीक हो रहा हो। लीकेज को ढूंढकर ठीक करें।',
        categoryTag: 'Electrical Safety'
      },
      {
        id: 'Q-ELE-2',
        questionEn: 'What minimum copper wire size is mandated by Gharkasathi safety guidelines for a 1.5 Ton Inverter AC or 25L Geyser point?',
        questionHi: 'घरकासाथी सुरक्षा मानकों के अनुसार 1.5 टन एसी या 25L गीजर के लिए कम से कम कितने वर्ग मिमी का कॉपर वायर होना चाहिए?',
        optionsEn: [
          '0.5 mm²',
          '1.0 mm²',
          '4.0 mm² with 16A/20A MCB protection',
          'Telephone flat wire'
        ],
        optionsHi: [
          '0.5 mm²',
          '1.0 mm²',
          'कम से कम 4.0 mm² कॉपर वायर (16A/20A MCB के साथ)',
          'टेलीफोन का पतला तार'
        ],
        correctIndex: 2,
        explanationEn: 'High wattage thermal loads like ACs and geysers pull sustained 8-12A current; undersized wire overheats inside conduits and causes electrical fires.',
        explanationHi: 'एसी और गीजर भारी करंट लेते हैं। 4.0 mm² से कम तार गर्म होकर जल सकता है और आग का कारण बन सकता है।',
        categoryTag: 'Wire Sizing'
      },
      {
        id: 'Q-ELE-3',
        questionEn: 'When testing a 3-pin socket with a digital multimeter, what should be the ideal voltage between Neutral and Earth in a properly earthed house?',
        questionHi: 'मल्टीमीटर से 3-पिन सॉकेट जांचते समय न्यूट्रल और अर्थ के बीच आदर्श वोल्टेज कितना होना चाहिए?',
        optionsEn: [
          'Between 0V and less than 3V AC',
          '230V AC',
          '440V Three-phase',
          'It should always spark loudly'
        ],
        optionsHi: [
          '0V से 3V एसी के बीच (न्यूनतम)',
          '230V एसी',
          '440V थ्री-फेज',
          'हमेशा तेज चिंगारी निकलनी चाहिए'
        ],
        correctIndex: 0,
        explanationEn: 'A healthy earthing system shows < 3V between Neutral and Earth. Anything over 5-10V indicates high earth resistance or broken earthing electrode.',
        explanationHi: 'अच्छी अर्थिंग में न्यूट्रल और अर्थ के बीच 0 से 3 वोल्ट ही होना चाहिए। 5V से अधिक होने पर अर्थिंग खराब मानी जाती है।',
        categoryTag: 'Earthing & Diagnostics'
      }
    ]
  },
  {
    id: 'GK-APP-101',
    category: 'Appliance Repair',
    titleEn: 'Certified Skilled Appliance & AC Technician (CSGSP-AC)',
    titleHi: 'प्रमाणित कुशल अप्लायंस व एसी तकनीशियन (CSGSP-AC)',
    descriptionEn: 'Split AC pressure jet servicing, R32/R410a gas charging safety, refrigerator defrost sensors, inverter PCB diagnosis, and microwave capacitor safety.',
    descriptionHi: 'स्प्लिट एसी प्रेशर जेट सर्विस, R32/R410a गैस चार्जिंग सुरक्षा, फ्रिज डीफ्रॉस्ट सेंसर और इन्वर्टर पीसीबी जांच।',
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    passingScore: 80,
    maxAttempts: 3,
    cooldownHours: 12,
    practicalRequired: true,
    validityMonths: 24,
    modules: [
      {
        id: 'MOD-APP-1',
        titleEn: 'Module 1 — Pressure Jet Servicing & PCB Waterproofing',
        titleHi: 'मॉड्यूल 1 — प्रेशर जेट सर्विस और पीसीबी वाटरप्रूफिंग',
        descriptionEn: 'Using service jacket, covering PCB electronics, and cleaning indoor blower wheels.',
        descriptionHi: 'सर्विस जैकेट लगाना, पीसीबी को पानी से बचाना और ब्लोअर की डीप क्लीनिंग।',
        lessons: [
          {
            id: 'LES-APP-101',
            titleEn: 'Protecting Inverter AC PCB During Jet Cleaning',
            titleHi: 'जेट सर्विस के दौरान इन्वर्टर एसी पीसीबी को सुरक्षित रखना',
            type: 'video',
            duration: '7 mins',
            contentEn: 'Always install a waterproof service bag under the indoor unit. Wrap the right-side electrical box and display PCB with thick polythene sheeting. A single drop of water on the microprocessor board can cause a ₹5,000 PCB replacement.',
            contentHi: 'इंडोर यूनिट के नीचे हमेशा वाटरप्रूफ सर्विस जैकेट लगाएं। दाईं ओर के पीसीबी बॉक्स को पॉलीथिन से अच्छी तरह कवर करें। एक बूंद पानी भी पीसीबी को जला सकती है।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'Q-APP-1',
        questionEn: 'Why is vacuuming mandatory with a two-stage vacuum pump before charging R32 or R410a refrigerant in an inverter split AC?',
        questionHi: 'इन्वर्टर स्प्लिट एसी में R32 या R410a गैस डालने से पहले वैक्यूम पंप चलाना क्यों अनिवार्य है?',
        optionsEn: [
          'To test how loud the vacuum pump is',
          'To remove non-condensable atmospheric air and moisture that causes chemical acid formation and compressor seizure',
          'Vacuuming is optional and not needed if flushed with refrigerant',
          'To make the copper pipe smell good'
        ],
        optionsHi: [
          'वैक्यूम पंप की आवाज जांचने के लिए',
          'तांबे के पाइप से नमी और हवा हटाने के लिए ताकि एसिड न बने और कंप्रेसर जाम न हो',
          'वैक्यूम करना जरूरी नहीं है, थोड़ी गैस उड़ाकर भी काम चल सकता है',
          'पाइप को खुशबूदार बनाने के लिए'
        ],
        correctIndex: 1,
        explanationEn: 'Moisture reacts with POE synthetic oil inside inverter compressors to form hydrofluoric acid, destroying motor winding insulation.',
        explanationHi: 'हवा और नमी कंप्रेसर ऑयल के साथ मिलकर एसिड बनाते हैं जिससे कंप्रेसर जल जाता है। वैक्यूमिंग अनिवार्य है।',
        categoryTag: 'AC Gas Charging'
      }
    ]
  },
  {
    id: 'GK-CRP-101',
    category: 'Carpentry',
    titleEn: 'Certified Skilled Carpentry & Modular Fitting (CSGSP-CR)',
    titleHi: 'प्रमाणित कुशल बढ़ईगीरी व मॉड्यूलर फिटिंग (CSGSP-CR)',
    descriptionEn: 'Soft-close hydraulic hinges, telescopic drawer channels, lock mortising, door alignments, and laminate edge banding.',
    descriptionHi: 'सॉफ्ट-क्लोज हाइड्रोलिक हिंज, टेलिस्कोपिक चैनल, मोर्टिस लॉक फिटिंग और लैमिनेट फिनिशिंग।',
    thumbnail: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    passingScore: 80,
    maxAttempts: 3,
    cooldownHours: 12,
    practicalRequired: true,
    validityMonths: 24,
    modules: [
      {
        id: 'MOD-CRP-1',
        titleEn: 'Module 1 — Soft-Close Auto-Concealed Hinges & Drawer Channels',
        titleHi: 'मॉड्यूल 1 — सॉफ्ट-क्लोज ऑटो-हिंज और ड्रॉअर चैनल फिटिंग',
        descriptionEn: 'Offset adjustments (0-crank, 8-crank, 16-crank) and smooth drawer gliding.',
        descriptionHi: 'हिंज क्रैंक एडजस्टमेंट और चैनल का स्मूथ अलाइनमेंट।',
        lessons: [
          {
            id: 'LES-CRP-101',
            titleEn: '3D Adjustment of Cabinet Auto Hinges',
            titleHi: 'कैबिनेट ऑटो हिंज का 3D स्क्रू एडजस्टमेंट',
            type: 'reading',
            duration: '6 mins',
            contentEn: 'Every Euro hinge has 3 screws: depth adjustment, vertical height adjustment, and lateral door gap adjustment. Learn to align cabinet doors with 2mm uniform gaps.',
            contentHi: 'प्रत्येक ऑटो हिंज में 3 स्क्रू होते हैं: गहराई, ऊंचाई और दोनों दरवाजों के बीच का गैप। दरवाजे के बीच 2mm का एक समान गैप रखना ही पेशेवर फिनिशिंग है।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'Q-CRP-1',
        questionEn: 'When fitting heavy telescopic ball-bearing drawer slides, where must the screw fasteners be driven for maximum weight support?',
        questionHi: 'भारी टेलिस्कोपिक ड्रॉअर चैनल लगाते समय स्क्रू कहाँ कसे जाने चाहिए ताकि अधिक वजन टिक सके?',
        optionsEn: [
          'Into the slotted horizontal and vertical holes first for alignment, followed by round locking holes into solid wood / ply core',
          'Only tape with double sided tape',
          'Only one screw at the very front',
          'Into the laminate skin without touching the plywood core'
        ],
        optionsHi: [
          'अलाइनमेंट के लिए पहले स्लॉट वाले छेद में, फिर सॉलिड प्लाईवुड में राउंड लॉकिंग छेद में',
          'सिर्फ डबल-साइडेड टेप से चिपका दें',
          'सिर्फ आगे एक स्क्रू कसें',
          'प्लाईवुड में बिना घुसाए केवल सनमाइका पर'
        ],
        correctIndex: 0,
        explanationEn: 'Slotted holes permit micro-adjusting level, while round holes lock the slide permanently so it never sags under load.',
        explanationHi: 'स्लॉटेड होल से चैनल को सीधा सेट किया जाता है और गोल छेद में पेंच कसने से चैनल कभी नीचे नहीं झुकता।',
        categoryTag: 'Modular Hardware'
      }
    ]
  },
  {
    id: 'GK-CLN-101',
    category: 'Cleaning',
    titleEn: 'Certified Skilled Deep Cleaning & Chemical Safety (CSGSP-CL)',
    titleHi: 'प्रमाणित कुशल डीप क्लीनिंग व केमिकल सुरक्षा (CSGSP-CL)',
    descriptionEn: 'Acid-free chemical handling, single-disc scrubbing, glass streak-free treatment, grout cleaning, and marble stone care.',
    descriptionHi: 'एसिड-फ्री केमिकल का उपयोग, सिंगल-डिस्क फ्लोर स्क्रबिंग, ग्लास क्लीनिंग और मार्बल देखभाल।',
    thumbnail: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    passingScore: 80,
    maxAttempts: 3,
    cooldownHours: 6,
    practicalRequired: false,
    validityMonths: 12,
    modules: [
      {
        id: 'MOD-CLN-1',
        titleEn: 'Module 1 — Chemical Dilution & Marble Etching Prevention',
        titleHi: 'मॉड्यूल 1 — केमिकल डाइल्यूशन और मार्बल को जलने से बचाना',
        descriptionEn: 'Never use hydrochloric/muriatic acid on Italian or Katni marble floors.',
        descriptionHi: 'इटैलियन या कटनी मार्बल पर कभी तेजाब (एसिड) न डालें।',
        lessons: [
          {
            id: 'LES-CLN-101',
            titleEn: 'Safe Chemical Chart for Home Cleaning',
            titleHi: 'घरेलू सफाई के लिए सुरक्षित केमिकल चार्ट',
            type: 'reading',
            duration: '5 mins',
            contentEn: 'Taski R1 for bathroom, Taski R2 for hard floors, Taski R3 for mirrors. Harsh toilet acids permanently etch marble and ruin chrome tap plating, incurring heavy customer damages.',
            contentHi: 'बाथरूम के लिए Taski R1, फर्श के लिए R2, शीशे के लिए R3। कभी भी टाइल या मार्बल पर सीधे तेजाब न डालें, इससे नल की क्रोम कोटिंग काली पड़ जाती है और फर्श खराब हो जाता है।'
          }
        ]
      }
    ],
    quiz: [
      {
        id: 'Q-CLN-1',
        questionEn: 'What happens if raw muriatic/hydrochloric toilet acid is splashed on a customer’s premium chrome CP bath tap or Italian marble floor?',
        questionHi: 'यदि ग्राहक के प्रीमियम क्रोम बाथ नल या इटैलियन मार्बल पर तेजाब (म्यूरिएटिक एसिड) गिर जाए तो क्या होगा?',
        optionsEn: [
          'The chrome turns golden and shines brighter',
          'The acid permanently corrodes the chrome plating black and leaves irreversible dull etching on the marble surface',
          'Nothing happens at all',
          'The water pressure doubles'
        ],
        optionsHi: [
          'क्रोमियम गोल्डन हो जाएगा और चमकेगा',
          'नल की क्रोम प्लेटिंग हमेशा के लिए काली पड़ जाएगी और मार्बल पर स्थायी गड्ढे/दाग पड़ जाएंगे',
          'कुछ भी नहीं होता',
          'नल का प्रेशर दोगुना हो जाएगा'
        ],
        correctIndex: 1,
        explanationEn: 'Harsh acids permanently destroy chrome plating and dissolve calcium carbonate in natural marble. Only pH-balanced specialty chemicals are allowed.',
        explanationHi: 'तेजाब से नल काले पड़ जाते हैं और मार्बल जल जाता है। घरकासाथी में केवल प्रमाणित न्यूट्रल केमिकल ही अनुमत हैं।',
        categoryTag: 'Chemical Safety'
      }
    ]
  }
];
