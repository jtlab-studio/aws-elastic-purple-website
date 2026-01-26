// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const btn = document.querySelector('.theme-toggle');

    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        btn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

// Language Toggle
const translations = {
    en: {
        // Navigation
        navHome: "Home",
        navExpertise: "Expertise",
        navProjects: "Projects",
        navAbout: "About",
        navWriteUps: "Write-Ups",
        navContact: "Contact",

        // Write-Ups Submenu
        navWriteUpCRC: "Cloud Portfolio",
        navWriteUpSecurity: "AWS Security Automation",
        navWriteUpTerraform: "Terraform State Management",

        // Hero Section
        heroTitle: "ElasticPurple",
        tagline: "Engineering Resilient, Intelligent Systems",
        cyclingTexts: [
            "Welcome to my Cloud Portfolio!",
            "I'm Andrew - Cloud Engineer with a Customer Success background.",
            "Let's connect & build something amazing!"
        ],
        btnPrimary: "View My Work",
        btnSecondary: "See Certifications",

        // About Section Buttons
        btnResume: "📄 Download Resume",
        btnLinkedIn: "🔗 Connect on LinkedIn",

        // Skills
        skillEnglish: "Fluent<br>English",
        skillGerman: "Fluent<br>German",
        skillPortuguese: "Conversational<br>Portuguese",
        skillSpanish: "Conversational<br>Spanish",

        // Cert toggle buttons
        certMore: "+ More",
        certLess: "- Less",

        // Cert descriptions
        certDescSAA: "Designing secure, resilient, and cost-efficient cloud architectures. Covers distributed system design, identity and access management, networking, storage, and high-availability patterns. Focuses on architectural best practices, fault tolerance, and aligning technical solutions with business and security requirements.",
        certDescTerraform: "Automating the provisioning, management, and versioning of cloud infrastructure using Terraform. Covering infrastructure as code principles, state management, modules, and resource orchestration across multiple providers. Focusing on building scalable, reproducible, and maintainable infrastructure while following best practices for collaboration and lifecycle management.",
        certDescCCP: "Foundational AWS cloud concepts, core services, security, architecture, pricing models, and basic understanding of cloud deployment and operations.",
        certDescAIP: "Validates foundational understanding of AI and machine learning concepts on AWS, covering foundational models, generative AI patterns such as retrieval-augmented generation (RAG), and the application of Amazon Bedrock and Amazon SageMaker for building, deploying, and operationalizing AI solutions within the AWS Cloud.",
        certDescAIPM: "Managing AI-enabled products, defining requirements, building roadmaps, designing datasets, and evaluating model performance with focus on business objectives and ethics.",
        certDescACRTP: "Over four weeks of hands-on experience attacking, defending and auditing AWS environments — including simulating breaches, abusing misconfigurations and credentials, lateral movement, IAM exploitations, EC2/Elastic Beanstalk attacks, and also detecting/responding to threats using tools like Splunk, AWS GuardDuty, AWS CloudTrail and AWS Athena.",
        certDescEJPT: "Penetration testing skills covering network, web, and application security, including reconnaissance, vulnerability assessment, and exploitation techniques. The INE eJPT exam duration is 48 hours, during which candidates must complete a hands-on, practical penetration testing challenge in which candidates need to gain admin access in a live lab environment.",
        certDescCISMP: "Comprehensive foundation in information security management covering core concepts, information-lifecycle and risk management, governance and compliance, and security frameworks.",

        // Expertise Section
        expertiseTitle: "Expertise validated through industry-leading certifications",
        expertisePillar1Title: "Security",
        expertisePillar1Desc: "Cloud security architecture, threat modeling, IAM design, and implementing zero-trust principles across AWS infrastructure",
        expertisePillar2Title: "Cloud & IaC",
        expertisePillar2Desc: "Infrastructure automation with Terraform, CI/CD pipelines, serverless architectures, and scalable cloud-native solutions",
        expertisePillar3Title: "AI/ML",
        expertisePillar3Desc: "LLM integration, RAG systems, vector databases, and building AI-powered applications with production-grade MLOps",

        // Projects Section
        projectsTitle: "Projects",
        project1Title: "Serverless 3-Tier Web Application using AWS, Github Actions + Terraform",
        project1Desc: "A serverless web application demonstrating cloud-native architecture, infrastructure as code, and CI/CD practices. Built with AWS services, featuring automated deployments, monitoring, and a visitor counter backed by DynamoDB.",
        project2Title: "Coming Soon",
        project2Desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        project3Title: "Coming soon",
        project3Desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        linkArchitecture: "📐 Architecture",
        linkWriteup: "📝 Write-up",
        linkRepository: "💻 Repository",
        linkReadArticle: "📖 Read Article",

        // Write-Ups Page
        writeUpsTagline: "Deep dives into cloud architecture and security implementations",
        writeUpsTitle: "Technical Write-Ups",
        writeUp1Title: "Building a Serverless 3-Tier Web Application on AWS & Github Actions before migrating it to Terraform",
        writeUp1Desc: "A comprehensive walkthrough of building a serverless portfolio website on AWS. Covers architecture decisions, infrastructure as code with Terraform, CI/CD automation with GitHub Actions, and implementing a DynamoDB-backed visitor counter with Lambda functions.",
        writeUp2Title: "AWS Security Automation with EventBridge",
        writeUp2Desc: "Implementing automated security responses in AWS using EventBridge, Lambda, and SNS. Explores real-time threat detection patterns, automated remediation workflows, and integration with AWS Security Hub for comprehensive security monitoring.",
        writeUp3Title: "Terraform State Management Best Practices",
        writeUp3Desc: "Deep dive into Terraform state management strategies for team environments. Covers remote state backends with S3 and DynamoDB, state locking mechanisms, workspace management, and migration strategies for existing infrastructure.",

        // About Section
        aboutTitle: "About",
        aboutText: "Elastic Purple exists at the intersection of cybersecurity and cloud technology, particularly AWS, combining experience in both blue and red teaming to anticipate and respond to threats. Over the past decade, work across data science and cybersecurity in on-premises and SaaS environments has highlighted the growing role of large language models hosted on cloud infrastructure, used by both legitimate and malicious actors. Recognising the need for scalable, flexible cloud solutions alongside structured security practices led to the creation of Elastic Purple.",

        // Footer
        footerVisitors: "Visitors",
        footerMadeWith: "Made with",
        footerBy: "by",
        footerRights: "All rights reserved.",

        // CRC Article
        backToWriteUps: "Back to Write-Ups",
        crcArticleTitle: "Building a Serverless 3-Tier Web Application on AWS & Github Actions before migrating it to Terraform",
        crcArticleDate: "Published: January 2026",
        crcArticleReadTime: "15 min read",

        // CRC Article Sections
        crcIntroTitle: "Introduction",
        crcIntroPara1: "This article documents my journey building a serverless portfolio website on AWS as part of the Cloud Resume Challenge. The project demonstrates cloud-native architecture, infrastructure as code practices, and automated CI/CD workflows.",
        crcIntroPara2: "Throughout this writeup, I'll cover the architectural decisions, implementation challenges, and lessons learned while building a production-grade serverless application.",

        crcArchTitle: "🏗️ Architecture Overview",
        crcArchPara1: "The architecture follows AWS best practices for serverless web applications with the following components:",
        crcArchFrontendTitle: "Frontend Hosting",
        crcArchFrontend1: "<strong>Amazon S3</strong>: Static website hosting for HTML, CSS, JavaScript, and images",
        crcArchFrontend2: "<strong>Amazon CloudFront</strong>: CDN for global content delivery with HTTPS support",
        crcArchFrontend3: "<strong>AWS Certificate Manager (ACM)</strong>: SSL/TLS certificates for secure connections",
        crcArchFrontend4: "<strong>Amazon Route53</strong>: DNS management for custom domain",
        crcArchBackendTitle: "Backend Services",
        crcArchBackend1: "<strong>AWS Lambda</strong>: Serverless functions for visitor counter logic",
        crcArchBackend2: "<strong>Amazon DynamoDB</strong>: NoSQL database for storing visitor count",
        crcArchBackend3: "<strong>Lambda Function URLs</strong>: Direct HTTPS endpoints for Lambda functions",
        crcArchIacTitle: "Infrastructure as Code",
        crcArchIac1: "<strong>Terraform</strong>: Managing all AWS infrastructure with declarative configuration",
        crcArchIac2: "<strong>Modular Design</strong>: Separated into visitor-counter and website-frontend modules",
        crcArchCicdTitle: "CI/CD Pipeline",
        crcArchCicd1: "<strong>GitHub Actions</strong>: Automated deployment on push to main branch",
        crcArchCicd2: "<strong>CloudFront Invalidation</strong>: Automatic cache clearing for updated content",
        crcArchDiagram: "Architecture Diagram:",
        crcArchPlaceholder: "[Architecture diagram will be added here]",

        crcImplTitle: "⚙️ Implementation Details",
        crcImplVisitorTitle: "Visitor Counter Implementation",
        crcImplVisitorPara: "The visitor counter is implemented using a Lambda function that increments a counter in DynamoDB on each page load. Here's the key architecture decision: using Lambda Function URLs instead of API Gateway for simplicity.",
        crcImplTerraformTitle: "Terraform Module Structure",
        crcImplTerraformPara: "The infrastructure is organized into two main modules:",
        crcImplTerraform1: "<strong>visitor-counter</strong>: Lambda function, DynamoDB table, IAM roles",
        crcImplTerraform2: "<strong>website-frontend</strong>: S3, CloudFront, Route53, ACM certificates",
        crcImplChallengesTitle: "Challenges & Solutions",
        crcImplChallenges1: "<strong>Challenge 1: MIME Type Issues</strong><br>Initial deployment failed to load CSS files properly due to incorrect Content-Type headers in S3.",
        crcImplSolution1: "<strong>Solution:</strong> Configured GitHub Actions to explicitly set Content-Type during S3 sync operations.",
        crcImplChallenges2: "<strong>Challenge 2: Terraform State Drift</strong><br>Importing manually-created resources into Terraform caused configuration drift issues.",
        crcImplSolution2: "<strong>Solution:</strong> Carefully matched Terraform configuration to existing resource attributes, paying attention to IAM role paths and naming conventions.",

        crcRepoTitle: "💻 Source Code & Repository",
        crcRepoPara1: "The complete source code for this project is available on GitHub, including:",
        crcRepo1: "Terraform modules for infrastructure",
        crcRepo2: "Lambda function code (Python)",
        crcRepo3: "Frontend code (HTML, CSS, JavaScript)",
        crcRepo4: "GitHub Actions workflows",
        crcRepo5: "Documentation and setup instructions",
        viewGitHub: "📦 View on GitHub",
        viewArchitecture: "🏗️ View Architecture",

        crcLessonsTitle: "💡 Lessons Learned",
        crcLesson1: "<strong>Infrastructure as Code is Essential</strong>: Terraform made infrastructure reproducible and version-controlled",
        crcLesson2: "<strong>Separation of Concerns</strong>: Keeping infrastructure (Terraform) separate from content deployment (GitHub Actions) provided flexibility",
        crcLesson3: "<strong>Attention to Detail Matters</strong>: Small configuration issues (MIME types, IAM paths) can cause significant problems",
        crcLesson4: "<strong>Modular Design Pays Off</strong>: Organizing Terraform into logical modules made management easier",
        crcLesson5: "<strong>Automation Saves Time</strong>: CI/CD pipeline eliminated manual deployment steps",

        crcConclusionTitle: "🎯 Conclusion",
        crcConclusionPara1: "Building this serverless portfolio was an excellent hands-on experience with AWS services and modern DevOps practices. The project demonstrated the power of cloud-native architectures and infrastructure as code.",
        crcConclusionPara2: "This foundation serves as a solid starting point for more complex serverless applications, and the patterns learned here are applicable to production-grade cloud architectures."
    },
    de: {
        // Navigation
        navHome: "Start",
        navExpertise: "Expertise",
        navProjects: "Projekte",
        navAbout: "Über mich",
        navWriteUps: "Projektartikel",
        navContact: "Kontakt",

        // Write-Ups Submenu
        navWriteUpCRC: "Cloud Portfolio",
        navWriteUpSecurity: "AWS Security Automation",
        navWriteUpTerraform: "Terraform State Management",

        // Hero Section
        heroTitle: "ElasticPurple",
        tagline: "Entwicklung Resilienter, Intelligenter Systeme",
        cyclingTexts: [
            "Willkommen zu meinem Cloud-Portfolio!",
            "Ich bin Andrew - Cloud Engineer mit Customer Success Hintergrund.",
            "Lass uns etwas Großartiges zusammen bauen!"
        ],
        btnPrimary: "Meine Projekte",
        btnSecondary: "Zertifizierungen",

        // About Section Buttons
        btnResume: "📄 Lebenslauf",
        btnLinkedIn: "🔗 Mein LinkedIn",

        // Skills
        skillEnglish: "Fließend<br>Englisch",
        skillGerman: "Fließend<br>Deutsch",
        skillPortuguese: "Konversationsfähig<br>Portugiesisch",
        skillSpanish: "Konversationsfähig<br>Spanisch",

        // Cert toggle buttons
        certMore: "+ Mehr",
        certLess: "- Weniger",

        // Cert descriptions (Neu-Deutsch: German grammar with English technical terms)
        certDescSAA: "Design von sicheren, resilienten und kosteneffizienten Cloud Architectures. Behandelt Distributed System Design, Identity and Access Management, Networking, Storage und High-Availability Patterns. Fokussiert auf Architectural Best Practices, Fault Tolerance und Alignment von Technical Solutions mit Business und Security Requirements.",
        certDescTerraform: "Automatisierung von Provisioning, Management und Versioning der Cloud Infrastructure mit Terraform. Behandelt Infrastructure as Code Principles, State Management, Modules und Resource Orchestration über Multiple Providers. Fokussiert auf Building von Scalable, Reproducible und Maintainable Infrastructure unter Einhaltung von Best Practices für Collaboration und Lifecycle Management.",
        certDescCCP: "Grundlegende AWS Cloud Concepts, Core Services, Security, Architecture, Pricing Models und grundlegendes Verständnis von Cloud Deployment und Operations.",
        certDescAIP: "Validiert grundlegendes Verständnis von AI und Machine Learning Concepts auf AWS, behandelt Foundational Models, Generative AI Patterns wie Retrieval-Augmented Generation (RAG), und die Application von Amazon Bedrock und Amazon SageMaker für Building, Deploying und Operationalizing von AI Solutions innerhalb der AWS Cloud.",
        certDescAIPM: "Management von AI-enabled Products, Defining von Requirements, Building von Roadmaps, Designing von Datasets und Evaluating von Model Performance mit Focus auf Business Objectives und Ethics.",
        certDescACRTP: "Über vier Wochen Hands-on Experience mit Attacking, Defending und Auditing von AWS Environments — inklusive Simulating von Breaches, Abusing von Misconfigurations und Credentials, Lateral Movement, IAM Exploitations, EC2/Elastic Beanstalk Attacks, sowie Detecting/Responding zu Threats mit Tools wie Splunk, AWS GuardDuty, AWS CloudTrail und AWS Athena.",
        certDescEJPT: "Penetration Testing Skills behandelt Network, Web und Application Security, inklusive Reconnaissance, Vulnerability Assessment und Exploitation Techniques. Die INE eJPT Exam Duration beträgt 48 Stunden, in denen Candidates eine Hands-on, Practical Penetration Testing Challenge absolvieren müssen, bei der Candidates Admin Access in einer Live Lab Environment erlangen müssen.",
        certDescCISMP: "Umfassende Foundation in Information Security Management behandelt Core Concepts, Information-Lifecycle und Risk Management, Governance und Compliance, sowie Security Frameworks.",

        // Expertise Section
        expertiseTitle: "Expertise validiert durch branchenführende Zertifizierungen",
        expertisePillar1Title: "Sicherheit",
        expertisePillar1Desc: "Cloud-Sicherheitsarchitektur, Bedrohungsmodellierung, IAM-Design und Implementierung von Zero-Trust-Prinzipien in der AWS-Infrastruktur",
        expertisePillar2Title: "Cloud & IaC",
        expertisePillar2Desc: "Infrastrukturautomatisierung mit Terraform, CI/CD-Pipelines, serverlose Architekturen und skalierbare Cloud-native Lösungen",
        expertisePillar3Title: "AI/ML",
        expertisePillar3Desc: "LLM-Integration, RAG-Systeme, Vektordatenbanken und Entwicklung von KI-gestützten Anwendungen mit produktionsreifen MLOps",

        // Projects Section
        projectsTitle: "Projekte",
        project1Title: "Serverlose 3-Tier-Webanwendung auf AWS & Github Actions + Terraform",
        project1Desc: "Eine serverlose Webanwendung, die Cloud-native Architektur, Infrastructure as Code und CI/CD-Praktiken demonstriert. Entwickelt mit AWS-Services, mit automatisierten Deployments, Monitoring und einem Besucherzähler basierend auf DynamoDB.",
        project2Title: "Demnächst",
        project2Desc: "Lorem Ipsum ist ein einfacher Demo-Text für die Print- und Schriftindustrie. Lorem Ipsum ist in der Industrie bereits der Standard Demo-Text seit 1500, als ein unbekannter Schriftsteller eine Hand voll Wörter nahm und diese durcheinander warf um ein Musterbuch zu erstellen. Es hat nicht nur 5 Jahrhunderte überlebt, sondern auch in Spruch in die elektronische Schriftbearbeitung geschafft (bemerke, nahezu unverändert). Bekannt wurde es 1960, mit dem erscheinen von Letraset, welches Passagen von Lorem Ipsum enhielt, so wie Desktop Software wie Aldus PageMaker - ebenfalls mit Lorem Ipsum.",
        project3Title: "Demnächst",
        project3Desc: "Es ist ein lang erwiesener Fakt, dass ein Leser vom Text abgelenkt wird, wenn er sich ein Layout ansieht. Der Punkt, Lorem Ipsum zu nutzen, ist, dass es mehr oder weniger die normale Anordnung von Buchstaben darstellt und somit nach lesbarer Sprache aussieht. Viele Desktop Publisher und Webeditoren nutzen mittlerweile Lorem Ipsum als den Standardtext, auch die Suche im Internet nach 'lorem ipsum' macht viele Webseiten sichtbar, wo diese noch immer vorkommen. Mittlerweile gibt es mehrere Versionen des Lorem Ipsum, einige zufällig, andere bewusst (beeinflusst von Witz und des eigenen Geschmacks)",
        linkArchitecture: "📐 Architektur",
        linkWriteup: "📝 Artikel",
        linkRepository: "💻 Repository",
        linkReadArticle: "📖 Artikel Lesen",

        // Write-Ups Page
        writeUpsTagline: "Detaillierte Einblicke in Cloud-Architektur und Security-Implementierungen",
        writeUpsTitle: "Technische Projektartikel",
        writeUp1Title: "Erstellen einer serverlosen 3-Tier-Webanwendung auf AWS & Github Actions vor der Migration zu Terraform",
        writeUp1Desc: "Ein umfassender Walkthrough für Building einer Serverless Portfolio Website auf AWS. Behandelt Architecture Decisions, Infrastructure as Code mit Terraform, CI/CD Automation mit GitHub Actions und Implementation eines DynamoDB-backed Visitor Counters mit Lambda Functions.",
        writeUp2Title: "AWS Security Automation mit EventBridge",
        writeUp2Desc: "Implementation von Automated Security Responses in AWS mit EventBridge, Lambda und SNS. Untersucht Real-time Threat Detection Patterns, Automated Remediation Workflows und Integration mit AWS Security Hub für Comprehensive Security Monitoring.",
        writeUp3Title: "Terraform State Management Best Practices",
        writeUp3Desc: "Deep Dive in Terraform State Management Strategies für Team Environments. Behandelt Remote State Backends mit S3 und DynamoDB, State Locking Mechanisms, Workspace Management und Migration Strategies für Existing Infrastructure.",

        // About Section
        aboutTitle: "Über mich",
        aboutText: "Elastic Purple existiert an der Schnittstelle von Cybersicherheit und Cloud-Technologie, insbesondere AWS, und vereint Erfahrung sowohl im Blue- als auch im Red-Teaming, um Bedrohungen vorherzusehen und darauf zu reagieren. In den letzten zehn Jahren hat die Arbeit in Data Science und Cybersicherheit in On-Premises- und SaaS-Umgebungen die wachsende Rolle großer Sprachmodelle auf Cloud-Infrastruktur hervorgehoben, die sowohl von legitimen als auch von böswilligen Akteuren genutzt werden. Die Erkenntnis der Notwendigkeit skalierbarer, flexibler Cloud-Lösungen neben strukturierten Sicherheitspraktiken führte zur Entstehung von Elastic Purple.",

        // Footer
        footerVisitors: "Besucher",
        footerMadeWith: "Erstellt mit",
        footerBy: "von",
        footerRights: "Alle Rechte vorbehalten.",

        // CRC Article
        backToWriteUps: "Zurück zu Projektartikeln",
        crcArticleTitle: "Erstellen einer serverlosen 3-Tier-Webanwendung auf AWS & Github Actions vor der Migration zu Terraform",
        crcArticleDate: "Veröffentlicht: Januar 2026",
        crcArticleReadTime: "15 Min. Lesezeit",

        // CRC Article Sections
        crcIntroTitle: "Einführung",
        crcIntroPara1: "Dieser Artikel dokumentiert meine Journey beim Building einer Serverless Portfolio Website auf AWS als Teil der Cloud Resume Challenge. Das Project demonstriert Cloud-native Architecture, Infrastructure as Code Practices und Automated CI/CD Workflows.",
        crcIntroPara2: "In diesem Writeup behandle ich die Architectural Decisions, Implementation Challenges und Lessons Learned beim Building einer Production-grade Serverless Application.",

        crcArchTitle: "🏗️ Architecture Overview",
        crcArchPara1: "Die Architecture folgt AWS Best Practices für Serverless Web Applications mit folgenden Components:",
        crcArchFrontendTitle: "Frontend Hosting",
        crcArchFrontend1: "<strong>Amazon S3</strong>: Static Website Hosting für HTML, CSS, JavaScript und Images",
        crcArchFrontend2: "<strong>Amazon CloudFront</strong>: CDN für Global Content Delivery mit HTTPS Support",
        crcArchFrontend3: "<strong>AWS Certificate Manager (ACM)</strong>: SSL/TLS Certificates für Secure Connections",
        crcArchFrontend4: "<strong>Amazon Route53</strong>: DNS Management für Custom Domain",
        crcArchBackendTitle: "Backend Services",
        crcArchBackend1: "<strong>AWS Lambda</strong>: Serverless Functions für Visitor Counter Logic",
        crcArchBackend2: "<strong>Amazon DynamoDB</strong>: NoSQL Database für Storing von Visitor Count",
        crcArchBackend3: "<strong>Lambda Function URLs</strong>: Direct HTTPS Endpoints für Lambda Functions",
        crcArchIacTitle: "Infrastructure as Code",
        crcArchIac1: "<strong>Terraform</strong>: Managing von All AWS Infrastructure mit Declarative Configuration",
        crcArchIac2: "<strong>Modular Design</strong>: Separated in Visitor-Counter und Website-Frontend Modules",
        crcArchCicdTitle: "CI/CD Pipeline",
        crcArchCicd1: "<strong>GitHub Actions</strong>: Automated Deployment auf Push zu Main Branch",
        crcArchCicd2: "<strong>CloudFront Invalidation</strong>: Automatic Cache Clearing für Updated Content",
        crcArchDiagram: "Architecture Diagram:",
        crcArchPlaceholder: "[Architecture Diagram wird hier hinzugefügt]",

        crcImplTitle: "⚙️ Implementation Details",
        crcImplVisitorTitle: "Visitor Counter Implementation",
        crcImplVisitorPara: "Der Visitor Counter ist implemented mit einer Lambda Function, die einen Counter in DynamoDB bei jedem Page Load incrementiert. Die Key Architecture Decision: Using von Lambda Function URLs statt API Gateway für Simplicity.",
        crcImplTerraformTitle: "Terraform Module Structure",
        crcImplTerraformPara: "Die Infrastructure ist organized in zwei Main Modules:",
        crcImplTerraform1: "<strong>visitor-counter</strong>: Lambda Function, DynamoDB Table, IAM Roles",
        crcImplTerraform2: "<strong>website-frontend</strong>: S3, CloudFront, Route53, ACM Certificates",
        crcImplChallengesTitle: "Challenges & Solutions",
        crcImplChallenges1: "<strong>Challenge 1: MIME Type Issues</strong><br>Initial Deployment failed bei Loading von CSS Files properly aufgrund von Incorrect Content-Type Headers in S3.",
        crcImplSolution1: "<strong>Solution:</strong> Configured GitHub Actions für Explicitly Setting von Content-Type während S3 Sync Operations.",
        crcImplChallenges2: "<strong>Challenge 2: Terraform State Drift</strong><br>Importing von Manually-created Resources in Terraform caused Configuration Drift Issues.",
        crcImplSolution2: "<strong>Solution:</strong> Carefully matched Terraform Configuration zu Existing Resource Attributes, mit Attention zu IAM Role Paths und Naming Conventions.",

        crcRepoTitle: "💻 Source Code & Repository",
        crcRepoPara1: "Der Complete Source Code für dieses Project ist Available auf GitHub, including:",
        crcRepo1: "Terraform Modules für Infrastructure",
        crcRepo2: "Lambda Function Code (Python)",
        crcRepo3: "Frontend Code (HTML, CSS, JavaScript)",
        crcRepo4: "GitHub Actions Workflows",
        crcRepo5: "Documentation und Setup Instructions",
        viewGitHub: "📦 View on GitHub",
        viewArchitecture: "🏗️ View Architecture",

        crcLessonsTitle: "💡 Lessons Learned",
        crcLesson1: "<strong>Infrastructure as Code is Essential</strong>: Terraform made Infrastructure Reproducible und Version-controlled",
        crcLesson2: "<strong>Separation of Concerns</strong>: Keeping Infrastructure (Terraform) Separate von Content Deployment (GitHub Actions) provided Flexibility",
        crcLesson3: "<strong>Attention to Detail Matters</strong>: Small Configuration Issues (MIME Types, IAM Paths) können Significant Problems verursachen",
        crcLesson4: "<strong>Modular Design Pays Off</strong>: Organizing Terraform in Logical Modules made Management Easier",
        crcLesson5: "<strong>Automation Saves Time</strong>: CI/CD Pipeline eliminated Manual Deployment Steps",

        crcConclusionTitle: "🎯 Conclusion",
        crcConclusionPara1: "Building dieser Serverless Portfolio war eine Excellent Hands-on Experience mit AWS Services und Modern DevOps Practices. Das Project demonstrated die Power von Cloud-native Architectures und Infrastructure as Code.",
        crcConclusionPara2: "Diese Foundation serves als Solid Starting Point für More Complex Serverless Applications, und die Patterns Learned hier sind Applicable zu Production-grade Cloud Architectures."
    }
};

function toggleLanguage() {
    const html = document.documentElement;
    const currentLang = html.getAttribute('lang') || 'en';
    const newLang = currentLang === 'en' ? 'de' : 'en';

    html.setAttribute('lang', newLang);
    localStorage.setItem('language', newLang);

    updateContent(newLang);
}

function updateContent(lang) {
    const t = translations[lang];

    // Navigation and other elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            // Use innerHTML if the translation contains HTML tags (like <br>)
            if (t[key].includes('<')) {
                el.innerHTML = t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });

    // Update cert toggle buttons based on their current state
    document.querySelectorAll('.cert-toggle-small').forEach(button => {
        const certItem = button.closest('.cert-item');
        const description = certItem.querySelector('.cert-description');

        if (description.style.display === 'none' || description.style.display === '') {
            button.textContent = t.certMore;
        } else {
            button.textContent = t.certLess;
        }
    });

    // Update cycling texts
    if (window.currentCyclingTexts) {
        window.currentCyclingTexts = t.cyclingTexts;
    }
}

function loadLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    document.documentElement.setAttribute('lang', savedLang);
    updateContent(savedLang);
}

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (!href) return;

        // Extract just the filename from href (handle index.html#section and write-ups.html)
        const hrefFile = href.split('#')[0].split('/').pop();

        // Remove active class first
        item.classList.remove('active');

        // Check if this nav item matches current page
        if (currentPage === 'write-ups.html' && hrefFile === 'write-ups.html') {
            item.classList.add('active');
        } else if (currentPage === 'crc-article.html' && hrefFile === 'write-ups.html') {
            item.classList.add('active');
        } else if (currentPage === 'index.html' && hrefFile === 'index.html') {
            // Don't highlight on index.html - let scroll-based highlighting handle it
        } else if (currentPage === '' && hrefFile === 'index.html') {
            // Don't highlight on index.html - let scroll-based highlighting handle it
        }
    });
}

// Cycling Welcome Text with Typing Effect
function startCyclingText() {
    const textElement = document.getElementById('cyclingText');
    if (!textElement) return;

    const lang = document.documentElement.getAttribute('lang') || 'en';
    window.currentCyclingTexts = translations[lang].cyclingTexts;

    let currentIndex = 0;
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Mobile: Fade in/out behavior
        function showNextText() {
            // Remove old animation
            textElement.style.animation = 'none';

            // Update text content
            textElement.textContent = window.currentCyclingTexts[currentIndex];

            // Force reflow to restart animation
            void textElement.offsetWidth;

            // Apply animation
            textElement.style.animation = 'textFadeInOut 5s ease-in-out';

            // Move to next sentence
            currentIndex = (currentIndex + 1) % window.currentCyclingTexts.length;
        }

        // Show first sentence
        showNextText();

        // Cycle every 5 seconds
        setInterval(showNextText, 5000);

    } else {
        // Desktop: Typing behavior
        let isTyping = false;

        function typeText(text, callback) {
            if (isTyping) return;
            isTyping = true;

            let charIndex = 0;
            textElement.textContent = '';

            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    textElement.textContent += text[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                    isTyping = false;
                    if (callback) callback();
                }
            }, 50); // 50ms per character
        }

        function cycleSentence() {
            currentIndex = (currentIndex + 1) % window.currentCyclingTexts.length;
            typeText(window.currentCyclingTexts[currentIndex]);
        }

        // Type the first sentence on load
        typeText(window.currentCyclingTexts[0]);

        // Start cycling every 5 seconds
        setInterval(cycleSentence, 5000);
    }
}

// Sidebar Toggle for Mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.querySelector('.hamburger');
    sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Certificate Description Toggle
function toggleDescription(button) {
    const certItem = button.closest('.cert-item');
    const description = certItem.querySelector('.cert-description');
    const currentLang = document.documentElement.getAttribute('lang') || 'en';
    const t = translations[currentLang];

    if (description.style.display === 'none' || description.style.display === '') {
        description.style.display = 'block';
        button.textContent = t.certLess;
    } else {
        description.style.display = 'none';
        button.textContent = t.certMore;
    }
}

// Active Navigation Highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

// Fade out pillar cards when scrolling to expertise section
function handlePillarFade() {
    const pillarsGrid = document.querySelector('.pillars-grid');
    const expertiseSection = document.getElementById('expertise');

    if (!pillarsGrid || !expertiseSection) return;

    const scrollPosition = window.pageYOffset;
    const expertiseSectionTop = expertiseSection.offsetTop;
    const windowHeight = window.innerHeight;

    // Calculate when expertise section is almost at top - very short distance for fast fade (3 scroll nudges ~= 300-400px)
    const fadeStartPoint = expertiseSectionTop - windowHeight + 100;
    const fadeEndPoint = expertiseSectionTop - windowHeight + 400;

    if (scrollPosition >= fadeStartPoint && scrollPosition <= fadeEndPoint) {
        // Calculate opacity based on scroll position
        const fadeProgress = (scrollPosition - fadeStartPoint) / (fadeEndPoint - fadeStartPoint);
        const opacity = 1 - fadeProgress;
        pillarsGrid.style.opacity = opacity;
        pillarsGrid.style.transform = `translateY(-${fadeProgress * 20}px)`;
    } else if (scrollPosition > fadeEndPoint) {
        pillarsGrid.style.opacity = '0';
        pillarsGrid.style.transform = 'translateY(-20px)';
    } else {
        pillarsGrid.style.opacity = '1';
        pillarsGrid.style.transform = 'translateY(0)';
    }
}


// Smooth Scroll for Navigation Links
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-item');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                // If target section exists, scroll to it
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close sidebar on mobile after clicking
                    if (window.innerWidth <= 768) {
                        toggleSidebar();
                    }
                } else {
                    // For placeholder links (project-articles, blog, contact), just prevent default
                    e.preventDefault();
                    console.log(`Section "${targetId}" is a placeholder - not yet implemented`);

                    // Close sidebar on mobile
                    if (window.innerWidth <= 768) {
                        toggleSidebar();
                    }
                }
            }
        });
    });
}

async function updateVisitorCount() {
    const counterElement = document.getElementById('visitorCount');

    try {
        const response = await fetch(
            'https://sv7nz6uz6uc4z65ayjqa2v7vgi0tpmcv.lambda-url.eu-central-1.on.aws/',
            { method: 'GET' }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Lambda Function URL returns the body directly
        const count = data.visits ?? data.count;

        if (typeof count !== 'number') {
            throw new Error('Invalid response format');
        }

        animateCounter(counterElement, 0, count, 1000);

    } catch (error) {
        console.error('Visitor counter error:', error);
        counterElement.textContent = '---';
    }
}


// Animate Counter
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Close sidebar when clicking outside on mobile
function setupOutsideClick() {
    document.addEventListener('click', (e) => {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.querySelector('.hamburger');

        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !hamburger.contains(e.target)) {
            toggleSidebar();
        }
    });
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const btn = document.querySelector('.theme-toggle');

    // Default to dark theme if no preference is saved
    if (!savedTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        btn.textContent = '☀️';
    } else {
        document.documentElement.removeAttribute('data-theme');
        btn.textContent = '🌙';
    }
}

// Image Modal functionality for blog articles
function setupImageModal() {
    // Create modal HTML if it doesn't exist
    if (!document.getElementById('imageModal')) {
        const modalHTML = `
            <div id="imageModal" class="image-modal">
                <span class="image-modal-close">&times;</span>
                <img class="image-modal-content" id="modalImage">
                <div class="image-modal-caption"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.image-modal-caption');
    const closeBtn = document.querySelector('.image-modal-close');

    // Add click handlers to all images in article content
    document.querySelectorAll('.article-section img').forEach(img => {
        // Add magnifying glass on hover
        img.style.cursor = 'zoom-in';

        img.addEventListener('click', function () {
            modal.style.display = 'block';
            modalImg.src = this.src;
            modalCaption.textContent = this.alt || '';
        });
    });

    // Close modal when clicking X or outside image
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadLanguage();
    highlightCurrentPage();
    setupSmoothScroll();
    setupOutsideClick();
    updateVisitorCount();
    startCyclingText();
    setupImageModal();

    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        updateActiveNav();
        handlePillarFade();
    });

    // Initial active nav update
    updateActiveNav();

    // Handle window resize
    window.addEventListener('resize', () => {
        const sidebar = document.getElementById('sidebar');
        const hamburger = document.querySelector('.hamburger');

        // Reset sidebar state on resize to desktop
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards on page load
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cert-item, .project-card, .pillar-card');
    cards.forEach(card => {
        // Skip if element is inside hero-banner (hero should be immediately visible)
        if (card.closest('.hero-banner-section')) {
            return;
        }
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Observe pillar headers for glow effect
    const pillarHeaders = document.querySelectorAll('.pillar-header');
    pillarHeaders.forEach(header => {
        observer.observe(header);
    });
});

// Add glow effect to pillar headers, project cards, and section titles when they come into view
const glowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.target.classList.contains('pillar-header') ||
            entry.target.classList.contains('project-card') ||
            entry.target.classList.contains('section-title')) {
            if (entry.isIntersecting) {
                entry.target.classList.add('glow-active');
            } else {
                entry.target.classList.remove('glow-active');
            }
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
});

// Initialize glow observer
document.addEventListener('DOMContentLoaded', () => {
    const pillarHeaders = document.querySelectorAll('.pillar-header');
    pillarHeaders.forEach(header => {
        glowObserver.observe(header);
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        glowObserver.observe(card);
    });

    const sectionTitles = document.querySelectorAll('#projects .section-title, #about .section-title');
    sectionTitles.forEach(title => {
        glowObserver.observe(title);
    });
});