import { CaseData } from '../types/case';

export const CASE_LIBRARY: CaseData[] = [
  {
    id: 'case-01',
    caseNumber: 'CV-2026-CRIM-001',
    title: 'State of Kerala vs. Arjun Menon',
    category: 'Criminal',
    courtType: 'District & Sessions Court',
    difficulty: 'Intermediate',
    summary: 'Alleged unauthorized UPI money transfer exceeding ₹4,50,000 using SIM swapping and social engineering fraud.',
    facts: [
      'On 14th January 2026, the Complainant (Ramesh Varma) received a spoofed call purporting to be from his bank customer support.',
      'Within two hours of the call, his registered SIM card stopped receiving cellular signal.',
      '₹4,50,000 was transferred from Ramesh Varma\'s account via UPI to an account registered in the name of the Accused, Arjun Menon.',
      'The Accused claims his phone and identity documents were stolen two days prior and he filed an e-FIR on the state police portal.'
    ],
    issues: [
      'Whether the prosecution has proved beyond reasonable doubt that Arjun Menon knowingly operated the recipient UPI account.',
      'Whether digital evidence obtained from the telecom provider satisfies the admissibility standards under BSA Section 63.',
      'Whether the e-FIR filed by the accused constitutes a valid defense of identity theft.'
    ],
    applicableLaws: [
      {
        act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
        section: 'Section 318(4)',
        formerRef: 'IPC Section 420 (Cheating & Dishonestly Inducing Delivery)',
        summary: 'Pertains to cheating and dishonestly inducing delivery of property.'
      },
      {
        act: 'Bharatiya Sakshya Adhiniyam (BSA), 2023',
        section: 'Section 63',
        formerRef: 'Indian Evidence Act Section 65B',
        summary: 'Special provisions as to admissibility of electronic records with requisite electronic certificate.'
      },
      {
        act: 'Information Technology Act, 2000',
        section: 'Section 66D',
        summary: 'Punishment for cheating by personation by using computer resource.'
      }
    ],
    petitioner: {
      name: 'State Prosecution (Representing Ramesh Varma)',
      counselNotes: 'Focus on IP address logs from the bank application pointing to a device MAC address matching the accused\'s laptop recovered during search.'
    },
    respondent: {
      name: 'Arjun Menon (Defense)',
      counselNotes: 'Highlight the timeline gap between SIM deactivation and e-FIR. Demonstrate that no BSA Sec 63 certificate was submitted for the telecom tower dump.'
    },
    witnesses: [
      {
        id: 'wit-01',
        name: 'Insp. Vikram Rathore',
        role: 'Investigating Officer, Cyber Crime Cell',
        statement: 'I seized the laptop from the accused\'s apartment on Jan 16th. Bank transfer logs match the router IP assigned to his residence.',
        predefinedAnswers: [
          { keywords: ['ip', 'address', 'router'], answer: 'The router IP log matched the timestamp of the transaction within a 12-second window.' },
          { keywords: ['certificate', 'bsa', '63', '65b'], answer: 'The electronic certificate was produced by the Nodal Officer of the telecom service provider.' },
          { keywords: ['fir', 'stolen', 'phone'], answer: 'The e-FIR was filed online 18 hours after the fraudulent transactions were already triggered.' }
        ]
      },
      {
        id: 'wit-02',
        name: 'Ms. Priya Sundaram',
        role: 'Nodal Officer, Telecom Services',
        statement: 'A duplicate SIM request was presented at our authorized store on Jan 14th with a scanned Aadhaar card copy.',
        predefinedAnswers: [
          { keywords: ['aadhaar', 'verification'], answer: 'An OTP was sent to the secondary contact number listed on the application form.' },
          { keywords: ['store', 'cctv'], answer: 'CCTV footage of the store on Jan 14th shows a masked individual making the SIM swap request.' }
        ]
      }
    ],
    evidence: [
      {
        id: 'ex-01',
        title: 'Exhibit A: Bank Transaction Summary',
        type: 'Document',
        description: 'Bank statement showing instant IMPS/UPI transfers totaling ₹4,50,000.',
        previewText: 'A/C No: XXXX-8921 | Transfer Ref: UPI/6014/9921 -> Beneficiary: Arjun Menon'
      },
      {
        id: 'ex-02',
        title: 'Exhibit B: Cyber Forensics IP & MAC Match Report',
        type: 'Forensic Report',
        description: 'Certified report from Cyber Crime Laboratory analyzing seized hardware.',
        previewText: 'Analysis confirms MAC Address 00:1A:2B:3C:4D:5E accessed internet gateway at 14:22:10 IST.'
      },
      {
        id: 'ex-03',
        title: 'Exhibit C: Telecom SIM Replacement Form',
        type: 'Document',
        description: 'Physical application copy submitted for SIM re-issuance.',
        previewText: 'Signature on SIM swap form differs from government ID signature on file.'
      }
    ],
    privateFacts: {
      'Judge / Mentor': ['Key legal hinge: Prosecution lacks original hash-match verification for the router log file.'],
      'Petitioner Counsel': ['The accused sold his second smartphone on OLX 3 days before the incident; do not admit this willingly.'],
      'Respondent Counsel': ['CCTV footage shows a suspect taller than Arjun Menon at the SIM store.'],
      'Witness': ['You suspect the store clerk did not follow mandatory bio-metric verification.']
    },
    learningObjectives: [
      'Master electronic evidence admissibility under BSA Section 63.',
      'Practice cross-examination of cyber investigating officers.',
      'Understand cyber fraud burden of proof standards under BNS.'
    ]
  },
  {
    id: 'case-02',
    caseNumber: 'CV-2026-CIV-002',
    title: 'Mehta Developers Ltd. vs. Green Valley Residents Welfare Association',
    category: 'Civil',
    courtType: 'High Court',
    difficulty: 'Advanced',
    summary: 'Injunction suit regarding disputed encroachment on designated public park area and breach of sanctioned layout plan.',
    facts: [
      'Mehta Developers obtained sanction in 2018 to develop a 15-acre residential colony with 15% mandated green area.',
      'In 2025, Mehta Developers commenced construction of a commercial shopping complex on Plot No. 44, designated as open space in original brochures.',
      'RWA filed a suit for permanent injunction claiming easement rights and breach of trust.'
    ],
    issues: [
      'Whether brochures and initial representations create a binding promissory estoppel against the developer.',
      'Whether the civic municipal authority lawfully modified the layout plan without public consultation under the Municipal Corporation Act.'
    ],
    applicableLaws: [
      {
        act: 'Code of Civil Procedure (CPC), 1908',
        section: 'Order XXXIX Rules 1 & 2',
        summary: 'Temporary injunctions and interlocutory orders to maintain status quo.'
      },
      {
        act: 'Indian Contract Act, 1872',
        section: 'Section 2(d) & Promissory Estoppel',
        summary: 'Enforceability of representations inducing detrimental reliance.'
      },
      {
        act: 'Real Estate (Regulation and Development) Act (RERA), 2016',
        section: 'Section 14',
        summary: 'Adherence to sanctioned plans and project specifications without major alteration.'
      }
    ],
    petitioner: {
      name: 'Mehta Developers Ltd.',
      counselNotes: 'Argue that Plot 44 was officially re-zoned by the Municipal Planning Committee in 2024.'
    },
    respondent: {
      name: 'Green Valley RWA',
      counselNotes: 'RERA Sec 14 requires 2/3rd consent of allottees before modifying common public area usage.'
    },
    witnesses: [
      {
        id: 'wit-03',
        name: 'Mr. Rajesh Mehta',
        role: 'Managing Director, Mehta Developers',
        statement: 'We followed all municipal clearance protocols and obtained modified sanction orders legally.',
        predefinedAnswers: [
          { keywords: ['consent', 'allottee', 'rwa'], answer: 'We notified buyers via newspaper publication, satisfying legal notice requirements.' },
          { keywords: ['brochure', 'promise'], answer: 'Brochures are marketing material and subject to final municipal approval changes.' }
        ]
      }
    ],
    evidence: [
      {
        id: 'ex-04',
        title: 'Exhibit A: 2018 Sanctioned Layout Plan',
        type: 'Document',
        description: 'Original layout blueprint highlighting Plot 44 in green shade labeled "Community Garden".'
      },
      {
        id: 'ex-05',
        title: 'Exhibit B: RERA Registration Brochure',
        type: 'Document',
        description: 'Sales brochure handed to homebuyers highlighting 2.5 acres of dedicated green park.'
      }
    ],
    privateFacts: {
      'Judge / Mentor': ['Check if the temporary injunction balance of convenience favors residents.'],
      'Petitioner Counsel': ['The re-zoning clearance was granted pending environmental impact assessment.'],
      'Respondent Counsel': ['Residents have photographs of construction starting before the re-zoning notice was published.']
    },
    learningObjectives: [
      'Argue interim injunction standards (Prima Facie Case, Balance of Convenience, Irreparable Injury).',
      'Apply RERA Section 14 statutory protections in civil disputes.'
    ]
  },
  {
    id: 'case-03',
    caseNumber: 'CV-2026-CONS-003',
    title: 'Dr. Anita Roy vs. Nova Healthcare & Diagnostics',
    category: 'Consumer',
    courtType: 'Consumer Forum',
    difficulty: 'Beginner',
    summary: 'Complaint seeking compensation for gross medical negligence and misleading laboratory report resulting in emergency surgical trauma.',
    facts: [
      'Dr. Anita Roy underwent routine diagnostic scanning at Nova Diagnostics.',
      'The lab issued a report stating critical organ rupture requiring immediate open surgery.',
      'Second opinion obtained post-surgery confirmed the lab confused her sample with another patient due to missing barcode labels.'
    ],
    issues: [
      'Whether mislabeling diagnostic reports amounts to "deficiency of service" under Consumer Protection Act 2019.',
      'Determining quantum of compensation for physical trauma and mental agony.'
    ],
    applicableLaws: [
      {
        act: 'Consumer Protection Act, 2019',
        section: 'Section 2(11) & Section 85',
        summary: 'Deficiency of service and product/service liability principles.'
      },
      {
        act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
        section: 'Section 106',
        formerRef: 'IPC 304A / Medical Rashness',
        summary: 'Negligent acts endangering human life.'
      }
    ],
    petitioner: {
      name: 'Dr. Anita Roy',
      counselNotes: 'Establish direct chain of custody failure in Nova Diagnostics lab handling.'
    },
    respondent: {
      name: 'Nova Healthcare Ltd.',
      counselNotes: 'Claim third-party automated software error beyond reasonable lab technician control.'
    },
    witnesses: [
      {
        id: 'wit-04',
        name: 'Dr. S. K. Gupta',
        role: 'Independent Chief Radiologist Expert',
        statement: 'Standard NABL protocol requires dual barcode verification prior to issuing critical reports.',
        predefinedAnswers: [
          { keywords: ['barcode', 'nabl', 'standard'], answer: 'Skipping barcode cross-verification violates basic laboratory safety standards.' }
        ]
      }
    ],
    evidence: [
      {
        id: 'ex-06',
        title: 'Exhibit A: Incorrect Diagnostic Scan Report',
        type: 'Document',
        description: 'Lab report issued under Anita Roy\'s patient ID with mismatched blood parameters.'
      },
      {
        id: 'ex-07',
        title: 'Exhibit B: Surgical Discharge Summary',
        type: 'Document',
        description: 'Hospital record noting healthy internal organs found during invasive surgery.'
      }
    ],
    privateFacts: {
      'Judge / Mentor': ['Medical negligence cases require clear proof of breach of reasonable standard of care.'],
      'Petitioner Counsel': ['The lab technician admitted in an internal email that printer barcodes were out of ink.'],
      'Respondent Counsel': ['The patient signed a pre-procedure liability waiver covering diagnostic anomalies.']
    },
    learningObjectives: [
      'Understand "Deficiency of Service" burden of proof in Consumer Commissions.',
      'Examine medical expert witnesses effectively.'
    ]
  },
  {
    id: 'case-04',
    caseNumber: 'CV-2026-CORP-004',
    title: 'Nexus Fintech Ventures vs. Alok Verma & Co.',
    category: 'Corporate',
    courtType: 'High Court',
    difficulty: 'Advanced',
    summary: 'Arbitration appeal challenging emergency award concerning breach of non-compete clause and trade secret misappropriation.',
    facts: [
      'Alok Verma was Co-Founder and CTO of Nexus Fintech under a Shareholders Agreement (SHA).',
      'The SHA contained a 24-month post-resignation non-compete clause across India.',
      'Four months after resigning, Alok Verma launched "ApexPay" offering identical micro-lending API services to rival banks.'
    ],
    issues: [
      'Whether a 24-month post-employment non-compete covenant is void under Section 27 of the Indian Contract Act.',
      'Whether proprietary algorithmic code constitutes trade secrets protected under common law confidentiality duties.'
    ],
    applicableLaws: [
      {
        act: 'Indian Contract Act, 1872',
        section: 'Section 27',
        summary: 'Agreement in restraint of trade is void, subject to narrow statutory exceptions (e.g. sale of goodwill).'
      },
      {
        act: 'Arbitration and Conciliation Act, 1996',
        section: 'Section 9 & Section 34',
        summary: 'Interim measures by Court and grounds for setting aside arbitral award.'
      }
    ],
    petitioner: {
      name: 'Nexus Fintech Ventures',
      counselNotes: 'Focus on trade secret theft (source code commits exported to personal GitHub repository).'
    },
    respondent: {
      name: 'Alok Verma (Ex-CTO)',
      counselNotes: 'Section 27ICA grants negative covenants no enforcement post-termination of employment.'
    },
    witnesses: [
      {
        id: 'wit-05',
        name: 'Mr. Devansh Shah',
        role: 'Chief Information Security Officer',
        statement: 'Git log analysis revealed 142 private repository commits cloned to an unauthorized USB drive on Alok\'s last working day.',
        predefinedAnswers: [
          { keywords: ['git', 'clone', 'usb', 'commit'], answer: 'The encryption keys matched Nexus Fintech internal security fingerprints.' }
        ]
      }
    ],
    evidence: [
      {
        id: 'ex-08',
        title: 'Exhibit A: Shareholders Agreement (SHA)',
        type: 'Document',
        description: 'Executed SHA clause 18 detailing Non-Disclosure and Non-Compete terms.'
      },
      {
        id: 'ex-09',
        title: 'Exhibit B: Code Differential Comparison Audit',
        type: 'Forensic Report',
        description: '91% code similarity found between ApexPay backend core and Nexus repository.'
      }
    ],
    privateFacts: {
      'Judge / Mentor': ['Distinguish between restraint of trade (Section 27 ICA) vs. protection of proprietary trade secrets.'],
      'Petitioner Counsel': ['ApexPay already closed a $2M seed round using the disputed API code.'],
      'Respondent Counsel': ['Alok wrote 80% of the open-source libraries used in the architecture prior to joining Nexus.']
    },
    learningObjectives: [
      'Analyze Section 27 Indian Contract Act vs. Trade Secret Protection jurisprudence.',
      'Navigate Section 9 Arbitration Act interim relief standards.'
    ]
  },
  {
    id: 'case-05',
    caseNumber: 'CV-2026-CONST-005',
    title: 'Citizens for Privacy Union vs. Union of India',
    category: 'Constitutional',
    courtType: 'Supreme Court Simulation',
    difficulty: 'Advanced',
    summary: 'Public Interest Litigation (PIL) challenging state facial recognition surveillance in public transportation hubs under Article 21.',
    facts: [
      'The Ministry of Home Affairs deployed automated Facial Recognition Systems (AFRS) across 45 major railway stations.',
      'The petitioner NGO claims citizen facial biometrics are captured without consent, stored indefinitely, and cross-matched with criminal databases.',
      'State claims AFRS is vital for national security and crime prevention.'
    ],
    issues: [
      'Whether automated facial surveillance passes the Puttaswamy 3-fold proportionality test (Legality, Necessity, Proportionality).',
      'Whether procedural safeguards and independent oversight exist under the Digital Personal Data Protection Act 2023.'
    ],
    applicableLaws: [
      {
        act: 'Constitution of India',
        section: 'Article 21 & Article 14',
        summary: 'Fundamental Right to Life, Personal Liberty & Right to Privacy (Puttaswamy Ruling).'
      },
      {
        act: 'Digital Personal Data Protection Act, 2023',
        section: 'Section 7(b)',
        summary: 'Exemption clauses granted to state research and security agencies.'
      }
    ],
    petitioner: {
      name: 'Citizens for Privacy Union (PIL)',
      counselNotes: 'Argue mass surveillance chilled freedom of assembly under Art 19(1)(b) without statutory backing.'
    },
    respondent: {
      name: 'Union of India (MHA)',
      counselNotes: 'Rely on state security necessity, prevention of human trafficking, and offender identification.'
    },
    witnesses: [
      {
        id: 'wit-06',
        name: 'Prof. K. Subramaniam',
        role: 'AI Ethics & Biometric Expert',
        statement: 'AFRS models exhibit a 18% false-positive rate on minority demographic groups in crowded conditions.',
        predefinedAnswers: [
          { keywords: ['error', 'false positive', 'accuracy'], answer: 'In a crowd of 100,000, thousands of innocent commuters trigger false biometric flags.' }
        ]
      }
    ],
    evidence: [
      {
        id: 'ex-10',
        title: 'Exhibit A: MHA AFRS Operational Manual',
        type: 'Document',
        description: 'Standard Operating Procedure detailing 5-year retention period for unmatched facial vectors.'
      }
    ],
    privateFacts: {
      'Judge / Mentor': ['Apply strict Proportionality Test: Is there a less intrusive measure to achieve law enforcement goals?'],
      'Petitioner Counsel': ['3 innocent law students were wrongfully detained for 6 hours due to AFRS false matches.'],
      'Respondent Counsel': ['AFRS helped rescue 114 missing children at railway platforms in the past 12 months.']
    },
    learningObjectives: [
      'Master Constitutional Law arguments under Article 21 & K.S. Puttaswamy judgment.',
      'Practice Public Interest Litigation (PIL) oral advocacy.'
    ]
  },
  {
    id: 'case-06',
    caseNumber: 'CV-2026-CRIM-006',
    title: 'State vs. Rohan Deshmukh (Hit and Run)',
    category: 'Criminal',
    courtType: 'District & Sessions Court',
    difficulty: 'Intermediate',
    summary: 'Trial for rash driving resulting in fatal injury and failure to report accident under BNS Section 106(2).',
    facts: [
      'At 1:30 AM on Dec 12th, a speeding SUV struck a night security guard on Marine Drive.',
      'Vehicle did not stop and fled the scene. Eyewitness noted partial registration number "MH-01-XX-9000".',
      'Accused was arrested 14 hours later at his residence; blood alcohol content test returned negative.'
    ],
    issues: [
      'Whether BNS Section 106(2) enhanced penalty for escaping accident scene applies.',
      'Whether circumstantial evidence of dented bumper and CCTV footage proves identity of the driver at the time of impact.'
    ],
    applicableLaws: [
      {
        act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
        section: 'Section 106(1) & 106(2)',
        formerRef: 'IPC Section 304A (Causing death by negligence & failure to report)',
        summary: 'Enhanced punishment for rash/negligent act causing death and failing to report to police officer.'
      },
      {
        act: 'Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
        section: 'Section 183',
        formerRef: 'CrPC Section 164',
        summary: 'Recording of statements and confessions by Magistrate.'
      }
    ],
    petitioner: {
      name: 'State Prosecution',
      counselNotes: 'Establish unbroken chain of CCTV footage tracking the vehicle from impact site to accused\'s garage.'
    },
    respondent: {
      name: 'Rohan Deshmukh',
      counselNotes: 'Defense contends the vehicle was driven by his private driver, who has gone missing.'
    },
    witnesses: [
      {
        id: 'wit-07',
        name: 'Suresh Patil',
        role: 'Eyewitness / Taxi Driver',
        statement: 'I was parked 20 meters away. The black SUV was going over 90 km/h and did not brake before hitting the guard.',
        predefinedAnswers: [
          { keywords: ['speed', 'lighting', 'visibility'], answer: 'Streetlights were working brightly; I saw a young man in a white shirt behind the wheel.' }
        ]
      }
    ],
    evidence: [
      {
        id: 'ex-11',
        title: 'Exhibit A: Traffic Camera Footage Screenshot',
        type: 'CCTV / Video',
        description: 'Captured frame 200 meters from crash site showing black SUV registration plate.'
      },
      {
        id: 'ex-12',
        title: 'Exhibit B: Mechanical Inspector Vehicle Audit',
        type: 'Forensic Report',
        description: 'Report showing front bumper dent matching impact height of victim\'s bicycle.'
      }
    ],
    privateFacts: {
      'Judge / Mentor': ['Check if prosecution established who was driving beyond reasonable doubt.'],
      'Petitioner Counsel': ['The accused\'s valet ticket proves he drove the SUV out of the nightclub at 1:15 AM.'],
      'Respondent Counsel': ['Valet key logs show two people entered the car at the parking gate.']
    },
    learningObjectives: [
      'Understand BNS Section 106(2) hit-and-run provisions.',
      'Construct tight circumstantial evidence chains in criminal trials.'
    ]
  },
  {
    id: 'case-07',
    caseNumber: 'CV-2026-IP-007',
    title: 'Aura Spices Pvt. Ltd. vs. Om Aura Foodworks',
    category: 'IP',
    courtType: 'High Court',
    difficulty: 'Intermediate',
    summary: 'Trademark infringement and passing off suit regarding deceptively similar brand name and packaging trade dress.',
    facts: [
      'Aura Spices has registered trademark "AURA KITCHEN" in Class 30 since 2010 with distinctive yellow-gold pouch packaging.',
      'Om Aura Foodworks launched "OM AURA SPICES" in identical yellow-gold pouches with near-identical font styling.',
      'Aura Spices filed for permanent injunction alleging customer confusion and loss of brand goodwill.'
    ],
    issues: [
      'Whether the mark "OM AURA" is deceptively similar to registered trademark "AURA KITCHEN" under Trade Marks Act 1999.',
      'Whether overall trade dress resemblance constitutes passing off in retail consumer markets.'
    ],
    applicableLaws: [
      {
        act: 'Trade Marks Act, 1999',
        section: 'Section 29(1) & Section 29(2)',
        summary: 'Infringement of registered trademark by use of identical/similar mark causing likelihood of confusion.'
      }
    ],
    petitioner: {
      name: 'Aura Spices Pvt. Ltd.',
      counselNotes: 'Highlight visual, phonetic, and structural similarity of packaging targeting illiterate/rural consumers.'
    },
    respondent: {
      name: 'Om Aura Foodworks',
      counselNotes: 'Argue "AURA" is a common dictionary word and descriptive of aroma/quality, incapable of exclusive monopoly.'
    },
    witnesses: [
      {
        id: 'wit-08',
        name: 'Ramanathan Iyer',
        role: 'Retail Grocery Wholesaler',
        statement: 'Customers frequently bring back Om Aura pouches thinking they bought Aura Spices products.',
        predefinedAnswers: [
          { keywords: ['confusion', 'customer', 'return'], answer: 'At least 15 retail buyers complained that spice quality was different thinking it was Aura.' }
        ]
      }
    ],
    evidence: [
      {
        id: 'ex-13',
        title: 'Exhibit A: Physical Packaging Comparison',
        type: 'Image',
        description: 'Side-by-side high-resolution photographic comparison of both packaging pouches.'
      }
    ],
    privateFacts: {
      'Judge / Mentor': ['Apply "Man in the street" test for deceptive similarity in consumer goods.'],
      'Petitioner Counsel': ['Aura Spices holds 40% market share in West India; annual ad spend exceeds ₹12 Crores.'],
      'Respondent Counsel': ['Defendant registered "OM AURA" firm name with GST authorities 3 years ago without opposition.']
    },
    learningObjectives: [
      'Apply tests of deceptive similarity and passing off in Trademark Law.',
      'Present physical and visual comparative evidence in Court.'
    ]
  },
  {
    id: 'case-08',
    caseNumber: 'CV-2026-CONS-008',
    title: 'Kavita Sharma vs. QuickCart E-Commerce Platforms',
    category: 'Consumer',
    courtType: 'Consumer Forum',
    difficulty: 'Beginner',
    summary: 'Complaint against e-commerce platform for dark pattern pricing, non-delivery of flagship smartphone, and refusal of refund.',
    facts: [
      'Kavita ordered a ₹79,999 smartphone during flash sale on QuickCart.',
      'Payment was debited instantly. Delivery was delayed by 3 weeks, and the package received contained a clay brick instead of a phone.',
      'QuickCart rejected refund claim stating "Unboxing video not submitted within 24 hours of delivery".'
    ],
    issues: [
      'Whether imposition of mandatory unboxing video condition constitutes unfair trade practice.',
      'Liability of e-commerce marketplace platform under E-Commerce Rules 2020.'
    ],
    applicableLaws: [
      {
        act: 'Consumer Protection (E-Commerce) Rules, 2020',
        section: 'Rule 5 & Rule 6',
        summary: 'Duties of marketplace e-commerce entities regarding grievance redressal and unfair trade practices.'
      },
      {
        act: 'Consumer Protection Act, 2019',
        section: 'Section 2(47)',
        summary: 'Unfair trade practice definition including misleading conditions.'
      }
    ],
    petitioner: {
      name: 'Kavita Sharma',
      counselNotes: 'Prove that delivery person handed parcel and left immediately before unboxing was possible.'
    },
    respondent: {
      name: 'QuickCart Pvt. Ltd.',
      counselNotes: 'Claim status as pure intermediary protected under IT Act Sec 79; blame third-party seller.'
    },
    witnesses: [
      {
        id: 'wit-09',
        name: 'Manoj Kumar',
        role: 'Delivery Executive',
        statement: 'The box was sealed with QuickCart tape when I collected it from the regional hub.',
        predefinedAnswers: [
          { keywords: ['tape', 'seal', 'weight'], answer: 'The parcel felt heavy like a phone box, I did not open it.' }
        ]
      }
    ],
    evidence: [
      {
        id: 'ex-14',
        title: 'Exhibit A: Payment Invoice & Order Confirmation',
        type: 'Document',
        description: 'Digital invoice issued by QuickCart showing ₹79,999 debited via credit card.'
      },
      {
        id: 'ex-15',
        title: 'Exhibit B: Photographs of Delivered Package & Contents',
        type: 'Image',
        description: 'Timestamped photos showing clay brick sealed with shipping label.'
      }
    ],
    privateFacts: {
      'Judge / Mentor': ['Examine if QuickCart fulfilled seller verification duties under E-Commerce Rules.'],
      'Petitioner Counsel': ['14 other complaints against the same seller "TechZone Deals" were logged on National Consumer Helpline.'],
      'Respondent Counsel': ['QuickCart blacklisted the seller two days after this incident.']
    },
    learningObjectives: [
      'Navigate Consumer Protection E-Commerce Rules 2020.',
      'Distinguish intermediary immunity vs. platform liability.'
    ]
  },
  {
    id: 'case-09',
    caseNumber: 'CV-2026-CIV-009',
    title: 'Suresh Rao vs. Modern Real Estate Developers',
    category: 'Civil',
    courtType: 'District & Sessions Court',
    difficulty: 'Intermediate',
    summary: 'Suit for specific performance of sale agreement for commercial plot and recovery of advance earnest money.',
    facts: [
      'Suresh Rao executed an agreement to sell Plot No. 12 for ₹1.2 Crores and paid ₹30 Lakhs as earnest money.',
      'Developer failed to deliver clear title within agreed 6 months due to pending family partition litigation.',
      'Developer forfeited the ₹30 Lakhs claiming Suresh failed to pay remaining balance on time.'
    ],
    issues: [
      'Whether time was the essence of contract in sale of immovable property.',
      'Whether forfeiture of 25% earnest money is penal and unreasonable under Section 74 Indian Contract Act.'
    ],
    applicableLaws: [
      {
        act: 'Specific Relief Act, 1963',
        section: 'Section 10 & Section 20',
        summary: 'Specific performance of contract regarding immovable property.'
      },
      {
        act: 'Indian Contract Act, 1872',
        section: 'Section 74',
        summary: 'Compensation for breach of contract where penalty stipulated for.'
      }
    ],
    petitioner: {
      name: 'Suresh Rao',
      counselNotes: 'Demonstrate readiness and willingness (bank balance certificate showing ₹90 Lakhs ready).'
    },
    respondent: {
      name: 'Modern Real Estate Developers',
      counselNotes: 'Argue buyer defaulted on payment deadline clause stipulated in time-bound agreement.'
    },
    witnesses: [
      {
        id: 'wit-10',
        name: 'Venkatesh Rao',
        role: 'Notary Public & Witness',
        statement: 'Both parties agreed clear encumbrance certificate was a prerequisite before final balance payment.',
        predefinedAnswers: [
          { keywords: ['encumbrance', 'title', 'clear'], answer: 'The seller promised title clearance within 60 days of agreement.' }
        ]
      }
    ],
    evidence: [
      {
        id: 'ex-16',
        title: 'Exhibit A: Registered Agreement to Sell',
        type: 'Document',
        description: 'Agreement dated Jan 10, 2025 containing payment schedule and title warranty clauses.'
      },
      {
        id: 'ex-17',
        title: 'Exhibit B: Bank Solvency Certificate',
        type: 'Document',
        description: 'Bank letter certifying Suresh Rao held ₹95 Lakhs liquidity on key closing date.'
      }
    ],
    privateFacts: {
      'Judge / Mentor': ['Ordinarily, in contracts for sale of land, time is NOT of the essence unless expressly stipulated with consequences.'],
      'Petitioner Counsel': ['The seller sold Plot 12 to a third party for ₹1.5 Crores while this suit was pending.'],
      'Respondent Counsel': ['Developer needed the cash urgently to pay municipal tax dues.']
    },
    learningObjectives: [
      'Argue "Readiness and Willingness" under Specific Relief Act.',
      'Apply Section 74 ICA principles on earnest money forfeiture.'
    ]
  },
  {
    id: 'case-10',
    caseNumber: 'CV-2026-CRIM-010',
    title: 'State vs. Vikram & Anr. (Corporate Insider Bribery)',
    category: 'Criminal',
    courtType: 'District & Sessions Court',
    difficulty: 'Advanced',
    summary: 'Trial involving corporate espionage, bribery of public official for land allocation, and falsification of accounts under BSA & BNS.',
    facts: [
      'Special Investigation Team raided premises of Zenith Pharma following whistleblower lead.',
      'Seized encrypted flash drives containing confidential municipal tender documents prior to official public release.',
      'Financial audit revealed ₹85 Lakhs paid under fictitious "Consultancy Fees" to shell companies linked to state land officer.'
    ],
    issues: [
      'Admissibility of encrypted digital records seized during search without independent panch witnesses under BNSS Section 185.',
      'Establishing criminal conspiracy under BNS Section 61 between corporate officers and public servant.'
    ],
    applicableLaws: [
      {
        act: 'Bharatiya Nyaya Sanhita (BNS), 2023',
        section: 'Section 61',
        formerRef: 'IPC Section 120B (Criminal Conspiracy)',
        summary: 'Punishment of criminal conspiracy.'
      },
      {
        act: 'Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023',
        section: 'Section 185',
        formerRef: 'CrPC Section 165',
        summary: 'Search by police officer during investigation with mandatory audio-video recording.'
      },
      {
        act: 'Prevention of Corruption Act, 1988',
        section: 'Section 7 & Section 8',
        summary: 'Offences relating to public servant being bribed and commercial organization liability.'
      }
    ],
    petitioner: {
      name: 'State Investigation Agency',
      counselNotes: 'Rely on forensic reconstruction of deleted WhatsApp messages and bank transfer trails.'
    },
    respondent: {
      name: 'Vikram (VP, Zenith Pharma)',
      counselNotes: 'Challenge search legality due to lack of mandatory BNSS videography during raid.'
    },
    witnesses: [
      {
        id: 'wit-11',
        name: 'Mr. Arvind Saxena',
        role: 'Forensic Chartered Accountant',
        statement: 'Shell entity "Alpha Solutions" had no employees or office premises; 100% of revenue was transferred to land officer\'s spouse.',
        predefinedAnswers: [
          { keywords: ['shell', 'consultancy', 'alpha'], answer: 'The invoices lacked GST numbers and described non-existent advisory services.' }
        ]
      }
    ],
    evidence: [
      {
        id: 'ex-18',
        title: 'Exhibit A: Forensic CA Audit Ledger',
        type: 'Forensic Report',
        description: 'Detailed financial flow chart linking Zenith Pharma accounts to shell bank accounts.'
      },
      {
        id: 'ex-19',
        title: 'Exhibit B: WhatsApp Chat Export & BSA Certificate',
        type: 'Document',
        description: 'Chat transcript referencing payment code word "Consultancy parcel ready".'
      }
    ],
    privateFacts: {
      'Judge / Mentor': ['Mandatory BNSS videography requirement during search is a critical procedural safeguard.'],
      'Petitioner Counsel': ['The whistleblower provided the master decryption key via encrypted email.'],
      'Respondent Counsel': ['Search officers forced the defendant to type password under duress.']
    },
    learningObjectives: [
      'Master BNSS search procedural safeguards (mandatory audio-video recording).',
      'Examine financial forensics expert in corporate bribery prosecution.'
    ]
  }
];
