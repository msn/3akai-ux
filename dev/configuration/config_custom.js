define(["config/config"], function(config) {

    // Custom CSS Files to load in
    config.skinCSS = ["/dev/skins/default/skin.css"];

    config.Profile.configuration.defaultConfig = {
        "basic": {
            "label": "Name",
            "required": true,
            "display": true,
            "access": "everybody",
            "modifyacl": false,
            "permission": "anonymous",
            "order": 0,
            "elements": {
                "firstName": {
                    "label": "First name",
                    "required": true,
                    "display": true
                },
                "lastName": {
                    "label": "Last name",
                    "required": true,
                    "display": true
                },
                "preferredName": {
                    "label": "Preferred name",
                    "required": false,
                    "display": true
                }
            }
        },
        "aboutme": {
            "label": "About me",
            "required": true,
            "display": true,
            "access": "everybody",
            "modifyacl": true,
            "permission": "everyone",
            "order": 1,
            "elements": {
                "role": {
                    "label": "Main role",
                    "required": false,
                    "display": true,
                    "type": "select",
                    "select_elements": {
                        "undergraduatestudent": "Undergraduate student",
                        "graduatestudent": "Graduate student",
                        "postgraduatestudent": "Postgraduate student",
                        "phdstudent": "PhD student",
                        "researchassistant": "Research assistant",
                        "seniorresearcher": "Senior Researcher",
                        "reader": "Reader",
                        "lecturer": "Lecturer",
                        "seniorlecturer": "Senior lecturer",
                        "professor": "Professor",
                        "supportstaff": "Support staff",
                        "other": "Other"
                    }
                },
                "summary": {
                    "label": "Biography",
                    "required": false,
                    "display": true,
                    "type": "textarea"
                },
                "languages": {
                    "label": "Languages",
                    "required": false,
                    "display": true,
                    "type": "textarea"
                },
                "websites": {
                    "label": "Websites",
                    "required": false,
                    "display": true,
                    "type": "textarea"
                },
                "tags": {
                    "label": "Keywords",
                    "required": false,
                    "display": true,
                    "type": "textarea",
                    "tagField": true
                }
            }
        },
        "contact": {
            "label": "Contact information",
            "required": true,
            "display": true,
            "access": "everybody",
            "modifyacl": true,
            "permission": "everyone",
            "order": 1,
            "elements": {
                "primarycontactaddress": {
                    "label": "Primary address",
                    "required": false,
                    "display": true,
                    "type": "textarea",
                    "example": "Example: Departmental address & room / College address & room / Personal address"
                },
                "primarycontactphone": {
                    "label": "Primary phone",
                    "required": false,
                    "display": true
                },
                "primarycontactfax": {
                    "label": "Primary fax",
                    "required": false,
                    "display": true
                },
                "primarycontactemail": {
                    "label": "Primary email",
                    "required": true,
                    "display": true,
                    "type": "email"
                },
                "secondarycontactaddress": {
                    "label": "Secondary address",
                    "required": false,
                    "display": true,
                    "type": "textarea"
                },
                "secondarycontactphone": {
                    "label": "Secondary phone",
                    "required": false,
                    "display": true
                },
                "secondarycontactfax": {
                    "label": "Secondary fax",
                    "required": false,
                    "display": true
                },
                "secondarycontactemail": {
                    "label": "Secondary email",
                    "required": false,
                    "display": true,
                    "type": "email"
                },
                "tertiarycontactaddress": {
                    "label": "Tertiary address",
                    "required": false,
                    "display": true,
                    "type": "textarea"
                },
                "tertiarycontactphone": {
                    "label": "Tertiary phone",
                    "required": false,
                    "display": true
                },
                "tertiarycontactfax": {
                    "label": "Tertiary fax",
                    "required": false,
                    "display": true
                },
                "tertiarycontactemail": {
                    "label": "Tertiary email",
                    "required": false,
                    "display": true,
                    "type": "email"
                }
            }
        },
        "academicinterests": {
            "label": "Academic interests",
            "required": true,
            "display": true,
            "access": "everybody",
            "modifyacl": true,
            "permission": "everyone",
            "order": 2,
            "elements": {
                "engineeringdisciplines": {
                    "label": "Engineering discipline",
                    "required": false,
                    "display": true,
                    "type": "select",
                    "select_elements": {
                        "turbomachineryenergyfluidmechanics": "Turbomachinery, energy and fluid mechanics",
                        "electricalengineering": "Electrical engineering",
                        "mechanicsmaterialsdesign": "Mechanics, materials and design",
                        "civilstructuralenvironmental": "Civil, structural and environmental engineering",
                        "manufacturingmanagement": "Manufacturing and management",
                        "informationengineering": "Information engineering"
                    }
                },
                "researchgroup": {
                    "label": "Research group",
                    "required": false,
                    "display": true,
                    "type": "select",
                    "select_elements": {
                        "energy": "Energy",
                        "fluidmechanics": "Fluid Mechanics",
                        "turbomachinery": "Turbomachinery",
                        "solidstateelectronics": "Solid State Electronics and Nanoscale Science",
                        "electronicspowerenergyconversion": "Electronics, Power and Energy Conversion",
                        "photonics": "Photonics Research",
                        "appliedmechanics": "Applied Mechanics",
                        "materialsengineering": "Materials Engineering",
                        "engineeringdesign": "Engineering Design",
                        "geotechnicalenvironmental": "Geotechnical and Environmental",
                        "structures": "Structures",
                        "sustainabledevelopment": "Sustainable Development",
                        "distributedinformationandautomation": "Distributed Information and Automation Laboratory",
                        "decisionsupport": "Decision Support",
                        "economicspolicy": "Economics and Policy",
                        "internationalmanufacturing": "International Manufacturing",
                        "productionprocesses": "Production Processes",
                        "strategyperformance": "Strategy and Performance",
                        "technologymanagement": "Technology Management",
                        "businessresearch": "Business Research",
                        "industrialphotonics": "Industrial Photonics",
                        "innovativemanufacturingresearchcentre": "Innovative Manufacturing Research Centre",
                        "controllaboratory": "Control Laboratory",
                        "machineintelligencelaboratory": "Machine Intelligence Laboratory",
                        "signalprocessingcommunications": "Signal Processing and Communications Laboratory",
                        "computationalbiologicallearning": "Computational and Biological Learning"
                    }
                },
                "strategicthemes": {
                    "label": "Strategic themes",
                    "required": false,
                    "display": true,
                    "type": "select",
                    "select_elements": {
                        "energytransporturbaninfrastructure": "Energy, transport and urban infrastructure",
                        "uncertaintyriskresilience": "Uncertainty, risk and resilience",
                        "engineeringforlifescienceshealthcare": "Engineering for life sciences and health care",
                        "inspiringresearchthroughindustrialcollaboration": "Inspiring research through industrial collaboration"
                    }
                },
                "academicinterests": {
                    "label": "Academic interests",
                    "required": false,
                    "display": true,
                    "type": "textarea"
                },
                "aboutmyresearchteachingstudies": {
                    "label": "About my research/ teaching/ studies",
                    "required": false,
                    "display": true,
                    "type": "textarea"
                }
            }
        },
        "degreesandpositions": {
            "label": "Degrees and positions",
            "required": false,
            "display": true,
            "access": "everybody",
            "modifyacl": true,
            "permission": "everyone",
            "multiple": true,
            "multipleLabel": "degree or position",
            "order": 3,
            "elements": {
                "namestudiesorposition": {
                    "label": "Name of studies OR position/role",
                    "required": true,
                    "display": true,
                    "example": "Example: BSc in Computer Science/ Teaching Assistant/ Professor..."
                },
                "typedegreebusiness": {
                    "label": "Type of degree OR business / department",
                    "required": true,
                    "display": true,
                    "example": "Example: Bachelor/ Master/ PhD/ Microsoft Research Centre"
                },
                "schooluniversityoverarchingorganisation": {
                    "label": "School / University OR overarching organisation ",
                    "required": false,
                    "display": true,
                    "example": "Example: Artevelde University Ghent/ University of Cambridge"
                },
                "country": {
                    "label": "Country",
                    "required": true,
                    "display": true
                },
                "duration": {
                    "label": "Duration",
                    "required": false,
                    "display": true,
                    "example": "Example: 2009-2010"
                }
            }
        },
        "publications": {
            "label": "Publications",
            "required": false,
            "display": true,
            "access": "everybody",
            "modifyacl": true,
            "permission": "everyone",
            "multiple": true,
            "multipleLabel": "publication",
            "order": 4,
            "elements": {
                "mainauthor": {
                    "label": "Main author",
                    "required": true,
                    "display": true,
                    "example": "SURNAME, first name; Example: Lindberg, M."
                },
                "coauthors": {
                    "label": "Co-authors",
                    "required": false,
                    "display": true,
                    "example": "Example: Martin, J., Sukojev, B."
                },
                "bookpaperarticletitle": {
                    "label": "Title of book, paper or article... ",
                    "required": true,
                    "display": true,
                    "example": "Example: Heart disease and rehabilitation"
                },
                "magazinejournaltitle": {
                    "label": "Title of magazine or journal...",
                    "required": false,
                    "display": true,
                    "example": "Example: Horizon / Scientists Magazine"
                },
                "editionnumber": {
                    "label": "Edition number",
                    "required": false,
                    "display": true,
                    "example": "Example: 3rd (not required if it's the first edition)"
                },
                "cityofpublication": {
                    "label": "City of publication",
                    "required": true,
                    "display": true,
                    "example": "Example: Cambridge"
                },
                "publishername": {
                    "label": "Publisher's name",
                    "required": true,
                    "display": true,
                    "example": "Example: Cambridge University Press"
                },
                "yearofpublication": {
                    "label": "Year of publication",
                    "required": true,
                    "display": true
                },
                "numberofpages": {
                    "label": "Number of pages",
                    "required": true,
                    "display": true,
                    "example": "For books / papers: total number of pages; eg. 84p., For articles: pages of article; eg. pp.4-10 or p.6"
                },
                "volumenumber": {
                    "label": "Volume number",
                    "required": false,
                    "display": true,
                    "example": "Example: 7 (ie. number 7 of that year )"
                },
                "honoursawards": {
                    "label": "Honours &amp; awards",
                    "required": false,
                    "display": true,
                    "example": "Example: If you got nominated for this publication, you could mention it here"
                }
            }
        },
        "locations": {
            "label": "Categories",
            "required": false,
            "display": true,
            "access": "everybody",
            "modifyacl": true,
            "permission": "everyone",
            "multiple": true,
            "directory": true,
            "multipleLabel": "Add/remove categories",
            "order": 5,
            "elements": {
                "locationtitle": {
                    "label": "Category",
                    "required": true,
                    "display": true,
                    "type": "location"
                }
            }
        },
        "collegeandsocieties": {
            "label": "College and societies",
            "required": true,
            "display": true,
            "access": "everybody",
            "modifyacl": false,
            "permission": "everyone",
            "order": 6,
            "elements": {
                "college": {
                    "label": "College",
                    "required": true,
                    "display": true
                },
                "societies": {
                    "label": "Societies and organisations",
                    "required": true,
                    "display": true,
                    "type": "textarea",
                    "example": "Example: Queens' college rowing club, member of the Graduate Union"
                },
                "personalinterestsactiviteshobbies": {
                    "label": "Personal interests, activities and hobbies",
                    "required": false,
                    "display": true,
                    "type": "textarea",
                    "example": "Example: reading, classical music, environment and animals, tennis"
                },
                "whereimfrom": {
                    "label": "Where I'm originally from",
                    "required": true,
                    "display": true
                },
                "freetime": {
                    "label": "When I'm not working for half a day, you can find me here",
                    "required": false,
                    "display": true,
                    "type": "textarea",
                    "example": "Example: Listening to Bach whilst laying in Midsummer Common"
                }
            }
        }
    }

    return config;
});
