# Техническое задание на разработку веб-платформы
Kenya AI Compute Infrastructure Project

## 1. Общее описание проекта
### 1.1 Концепция
Корпоративная веб-платформа для инфраструктурного проекта по строительству датацентра мощностью 1 МВт в Кении, интегрированного с собственной электростанцией. Основной фокус — предоставление вычислительных мощностей для AI/ML задач, включая интеграцию с децентрализованными сетями AI-вычислений (DeFi/DePIN).

### 1.2 Ключевые особенности проекта
- Собственная генерация электроэнергии (низкая стоимость, независимость)
- Экспорт вычислительных мощностей за валюту
- Гибридная модель: 30% GPU, 50% CPU, 20% Storage
- Интеграция с децентрализованными AI-сетями (Render, Akash, io.net, Gensyn и др.)
- Масштабирование: 300 кВт → 1 МВт → 3 МВт
- CAPEX: $20-25 млн, Payback: 5-7 лет

### 1.3 Целевые аудитории
| Приоритет | Аудитория | Ключевые потребности |
| --- | --- | --- |
| 1 | Инвесторы (Китай, международные) | ROI, структура сделки, риски |
| 2 | Покупатели AI-вычислений | Цены, SLA, интеграция |
| 3 | DeFi/DePIN сети | Подключение нод, capacity |
| 4 | Технические партнёры | Спецификации, архитектура |
| 5 | Локальный партнёр (Кения) | Требования, разрешения |
| 6 | Энергетические партнёры | PPA, grid integration |
| 7 | Поставщики оборудования | Тендеры, требования |

## 2. Технический стек
### 2.1 Frontend
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + shadcn/ui
- Animations: Framer Motion
- 3D/Визуализации: Three.js / React Three Fiber
- Графики: Recharts / D3.js
- Формы: React Hook Form + Zod
- i18n: next-intl (EN, ZH, RU)
- State: Zustand

### 2.2 Backend (для портала)
- API: Next.js API Routes / Server Actions
- Auth: NextAuth.js (credentials + OAuth)
- Database: PostgreSQL (Supabase)
- File Storage: Supabase Storage / S3
- Email: Resend

### 2.3 Инфраструктура
- Hosting: Vercel
- CDN: Vercel Edge
- Analytics: Vercel Analytics + GA4 (заготовка)
- Monitoring: Sentry

## 3. Полная структура сайта и контент
### 3.1 Публичная часть
#### 3.1.0 Главная страница /
`/[locale]/`
- Hero Section
  - Headline: "Powering Africa's AI Future"
  - Subheadline: фокус на AI compute + собственная генерация
  - Key metrics (анимированные): 1MW, $0.04/kWh, 99.9% uptime
  - CTA buttons: "Explore Investment" / "Buy Compute" / "Join Network"
  - Background: 3D визуализация датацентра
- Value Proposition Cards
  - For Investors: "Infrastructure asset with 35-50% EBITDA"
  - For AI Companies: "GPU compute at 40% below market"
  - For DePIN Networks: "Certified nodes with green energy"
  - For Partners: "Build Africa's AI infrastructure together"
- Project Overview
  - Interactive map (Kenya location)
  - Key differentiators
  - Phase timeline visualization
- Live Metrics Dashboard (mock data, обновляемый)
  - Current capacity utilization
  - Network uptime
  - Energy efficiency (PUE)
  - Carbon offset
- Supported Networks Section
  - Logos: Render, Akash, io.net, Gensyn, Bittensor и др.
  - "Become a network partner" CTA
- News/Updates Feed
  - Latest 3 items
- Trust Signals
  - Partner logos
  - Certifications
  - Media mentions
- Footer
  - Navigation
  - Language switcher
  - Contact info
  - Legal links

#### 3.1.1 О проекте /about
`/[locale]/about/`
- /vision
  - Mission statement
  - Why Africa needs AI infrastructure
  - The energy arbitrage opportunity
  - Long-term vision (Pan-African AI backbone)
  - UN SDG alignment
- /team
  - Leadership team (с фото, bio, LinkedIn)
    - CEO / Project Initiator
    - CTO / Technical Lead
    - CFO / Financial Lead
    - COO / Operations Lead
  - Advisory Board
    - DC Industry expert
    - Kenya/Africa expert
    - AI/ML expert
    - Investment expert
  - Join the team CTA
- /story
  - Project genesis
  - Key milestones achieved
  - Current status
  - Interactive timeline
- /partners
  - Strategic partners
  - Technology partners
  - Local partners
  - Become a partner CTA
- /roadmap
  - 2024: Feasibility & Planning
  - 2025: Phase 1 (300kW) Construction
  - 2026: Phase 1 Launch + Phase 2 Planning
  - 2027: Phase 2 (1MW) Expansion
  - 2028+: Phase 3 (3MW) + Replication
  - Interactive Gantt chart

#### 3.1.2 Проект /project
`/[locale]/project/`
- /overview
  - Executive summary
  - Key facts & figures
  - Competitive advantages
  - Project structure diagram
- /location/
  - /kenya
    - Why Kenya for AI infrastructure
      - Political stability
      - Tech hub of East Africa
      - Submarine cable connectivity (SEACOM, EASSy, TEAMS)
      - Growing tech ecosystem
      - Government support for digital economy
    - Regulatory environment
    - Investment incentives
      - Special Economic Zones
      - Tax holidays
      - Import duty exemptions
    - Comparison with alternatives (Nigeria, South Africa, Egypt)
  - /site
    - Site selection criteria
    - Location details (region, без точного адреса публично)
    - Land availability & zoning
    - Accessibility & logistics
    - Expansion potential
  - /connectivity
    - Fiber infrastructure
      - Terrestrial fiber routes
      - Submarine cable access
    - Network latency map
      - To Europe: ~80ms
      - To Middle East: ~50ms
      - To Asia: ~120ms
      - To Americas: ~180ms
    - Carrier neutral strategy
    - Peering arrangements
  - /climate
    - Temperature & humidity data
    - Free cooling potential
    - Natural disaster risk assessment
    - Climate impact on PUE
- /energy/
  - /generation
    - Power plant specifications
      - Type: Hybrid (Solar + Gas/Diesel backup)
      - Capacity: 2MW+ (headroom for DC)
      - Redundancy: N+1
    - Cost structure
      - Generation cost: $0.04-0.06/kWh
      - Comparison with grid: $0.15-0.20/kWh
    - Fuel supply & logistics
    - Future: 100% renewable roadmap
  - /efficiency
    - Target PUE: 1.3-1.5
    - Cooling strategy
      - Outside air economizers
      - Evaporative cooling
      - Liquid cooling for GPU racks
    - Energy monitoring systems
    - Efficiency improvement roadmap
  - /sustainability
    - Carbon footprint analysis
    - Renewable energy certificates
    - Carbon offset programs
    - ESG reporting framework
  - /grid
    - Grid connection (backup)
    - Power purchase agreements
    - Future grid export potential
- /phases/
  - /phase-1
    - Capacity: 300kW IT load
    - Timeline: 9-12 months
    - CAPEX: $6-8M
    - Configuration
      - 2x 40ft container modules
      - 100kW GPU, 150kW CPU, 50kW Storage
      - Tier II certification
    - Target customers
    - Revenue projection: $1.5-2.5M/year
  - /phase-2
    - Capacity: 1MW IT load
    - Timeline: +6-9 months after Phase 1
    - CAPEX: $14-17M additional
    - Configuration
      - 6x container modules total
      - 300kW GPU, 500kW CPU, 200kW Storage
      - Tier II+ / simplified Tier III
    - Revenue projection: $5-8M/year
  - /phase-3
    - Capacity: 3MW IT load
    - Timeline: 2028+
    - CAPEX: TBD based on Phase 2 learnings
    - Potential configurations
    - Expansion scenarios

#### 3.1.3 Датацентр /datacenter
`/[locale]/datacenter/`
- /overview
  - Design philosophy
  - Key specifications summary
  - 3D interactive model
  - Virtual tour (optional, Phase 2)
- /architecture/
  - /design
    - Modular/containerized approach
      - Benefits: speed, scalability, cost
      - Container specifications
      - Layout diagrams
    - Building/shelter design
    - Site layout
  - /power
    - Power architecture diagram
    - UPS systems
      - Capacity & redundancy
      - Battery runtime
      - Specifications
    - PDU distribution
    - Generator backup
    - Power monitoring (BMS)
  - /cooling
    - Cooling architecture
    - Precision air conditioning
    - Hot/cold aisle containment
    - Liquid cooling systems (for GPU)
    - Free cooling utilization
    - Redundancy design
  - /network
    - Network topology
    - Core/spine-leaf architecture
    - Carrier interconnections
    - Meet-me rooms
    - Bandwidth capacity
  - /security
    - Physical security
      - Perimeter security
      - Access control
      - CCTV & monitoring
      - Manned security
    - Cybersecurity
      - Network security
      - DDoS protection
      - Security certifications
    - Fire suppression
- /specifications/
  - /tier-level
    - Tier II baseline
    - Tier III elements
    - Uptime targets: 99.9%+
    - Certification roadmap
  - /capacity
    - IT load capacity by phase
    - Rack density options
      - Standard: 5-10kW/rack
      - High density: 15-20kW/rack
      - GPU optimized: 30-40kW/rack
    - Total rack count
  - /redundancy
    - N+1 power
    - N+1 cooling
    - Dual fiber paths
    - Maintenance windows
  - /compliance
    - ISO 27001 (planned)
    - SOC 2 Type II (planned)
    - Uptime Institute (planned)
    - Local certifications
- /equipment/
  - /compute
    - GPU servers
      - NVIDIA A100/H100 (or alternatives)
      - AMD MI250/MI300
      - Intel GPUs
    - CPU servers
      - AMD EPYC
      - Intel Xeon
      - ARM-based options
    - Specifications & benchmarks
  - /storage
    - NVMe flash arrays
    - HDD storage tiers
    - Object storage
    - Capacity planning
  - /networking
    - Switches & routers
    - 100G/400G capabilities
    - Software-defined networking
  - /infrastructure
    - Racks & enclosures
    - Cabling systems
    - Environmental monitoring
- /operations/
  - /noc
    - 24/7 Network Operations Center
    - Monitoring systems
    - Incident response
    - Escalation procedures
  - /maintenance
    - Preventive maintenance schedule
    - Spare parts inventory
    - Vendor support agreements
    - Maintenance windows policy
  - /support
    - Support tiers
    - Response times (SLA)
    - Remote hands services
    - Contact methods
  - /disaster-recovery
    - Business continuity plan
    - Backup power procedures
    - Data backup strategies
    - Recovery time objectives

#### 3.1.4 AI Compute — главный раздел /compute
`/[locale]/compute/`
- /overview
  - AI Infrastructure as a Service
  - Why choose Kenya AI Compute
    - 40% cost advantage
    - Green energy compute
    - Strategic location
    - Flexible deployment
  - Use cases showcase
  - Getting started guide
- /gpu/
  - /training
    - Large model training
    - Available GPU types
      - NVIDIA H100 80GB
      - NVIDIA A100 80GB
      - NVIDIA A100 40GB
      - AMD MI250X
    - Cluster configurations
      - Single node
      - Multi-node (NVLink)
      - Full cluster (InfiniBand)
    - Storage integration
    - Pricing models
      - On-demand: $0.70-1.50/GPU-hour
      - Reserved (1mo): 20% discount
      - Reserved (6mo): 35% discount
      - Reserved (1yr): 50% discount
    - Comparison with cloud providers
  - /inference
    - Low-latency inference
    - Available GPUs
      - NVIDIA L40S
      - NVIDIA T4
      - AMD MI210
    - Pricing
      - Per GPU-hour
      - Per inference (API)
    - Deployment options
  - /rendering
    - 3D rendering workloads
    - Video processing
    - Pricing
  - /fine-tuning
    - Model fine-tuning services
    - Supported frameworks
    - Pricing
- /cpu/
  - /general-compute
    - Virtual machines
    - Instance types
      - Standard (balanced)
      - Compute-optimized
      - Memory-optimized
    - Specifications
    - Pricing: $0.02-0.08/vCPU-hour
  - /bare-metal
    - Dedicated servers
    - Configurations
    - Pricing
  - /edge-inference
    - CPU-based inference
    - Use cases
    - Pricing
- /storage/
  - /block
    - NVMe SSD storage
    - Performance tiers
    - Pricing: $0.10-0.20/GB-month
  - /object
    - S3-compatible storage
    - Use cases
    - Pricing: $0.02-0.05/GB-month
  - /datasets
    - Pre-loaded AI datasets
    - Dataset marketplace
    - Custom data loading
- /networking/
  - /connectivity
    - Public internet
    - Private networking
    - Cross-connect options
  - /bandwidth
    - Included bandwidth
    - Additional bandwidth pricing
    - Burst capabilities
  - /latency
    - Latency to major regions
    - Peering partners
    - Content delivery options
- /depin/ ⭐ КЛЮЧЕВОЙ РАЗДЕЛ
  - /overview
    - What is DePIN (Decentralized Physical Infrastructure)
    - Why DePIN + Kenya AI Compute
      - Low energy costs = higher node profitability
      - Geographic diversification
      - Regulatory-friendly jurisdiction
      - Professional infrastructure
    - Supported networks
  - /render-network
    - About Render Network
    - Our node specifications
    - Expected earnings
    - How to allocate capacity
    - Partnership details
  - /akash-network
    - About Akash
    - Provider setup
    - Pricing strategy
    - Expected utilization
  - /io-net
    - About io.net
    - GPU cluster integration
    - Tokenomics benefits
    - Onboarding process
  - /gensyn
    - About Gensyn
    - Training verification nodes
    - Integration roadmap
  - /bittensor
    - About Bittensor
    - Subnet participation
    - Mining setup
  - /other-networks
    - Ritual
    - Flux
    - Nosana
    - Emerging networks
  - /node-hosting
    - Run your own DePIN node
    - Colocation for node operators
    - Managed node services
    - Pricing
  - /tokenomics
    - Revenue sharing models
    - Token earnings potential
    - Staking opportunities
    - Risk considerations
- /enterprise/
  - /private-cloud
    - Dedicated infrastructure
    - Custom configurations
    - Enterprise SLA
  - /hybrid-cloud
    - Integration with AWS/GCP/Azure
    - Burst capabilities
    - Data residency solutions
  - /managed-services
    - MLOps support
    - Model deployment
    - Consulting services
- /pricing/
  - /calculator ⭐ ИНТЕРАКТИВНЫЙ
    - Select resource type
    - Configure specifications
    - Choose commitment term
    - Calculate total cost
    - Compare with alternatives
  - /plans
    - Pay-as-you-go
    - Reserved instances
    - Spot instances
    - Enterprise agreements
  - /comparison
    - vs AWS
    - vs Google Cloud
    - vs Azure
    - vs Lambda Labs
    - vs CoreWeave
    - vs DePIN alternatives
- /sla/
  - /uptime
    - 99.9% availability guarantee
    - Scheduled maintenance windows
    - Credit policy
  - /support
    - Support tiers
      - Basic (email, 24h response)
      - Standard (chat, 4h response)
      - Premium (phone, 1h response)
      - Enterprise (dedicated TAM)
    - Support channels
  - /security
    - Data protection
    - Compliance certifications
    - Security practices
- /onboarding/
  - /getting-started
    - Account creation
    - Verification process
    - Payment setup
    - First deployment
  - /documentation
    - API reference
    - SDK documentation
    - Tutorials
    - Sample code
  - /migration
    - Migration from cloud providers
    - Migration tools
    - Migration support

#### 3.1.5 Для инвесторов /investors
`/[locale]/investors/`
- /overview
  - Investment thesis
    - The AI infrastructure supercycle
    - Energy arbitrage opportunity
    - Africa digital transformation
    - DePIN network effects
  - Key investment highlights
  - Deal summary
  - CTA: Request investor deck
- /opportunity/
  - /market
    - Global AI infrastructure market
      - Market size: $XX billion (2024)
      - Growth rate: XX% CAGR
      - Key drivers
    - GPU compute demand
      - Training demand
      - Inference demand
      - Supply constraints
    - Africa data center market
      - Current capacity
      - Growth projections
      - Investment flows
    - DePIN market
      - Total value locked
      - Compute networks
      - Growth trajectory
  - /competitive-advantage
    - Energy cost moat
      - $0.04/kWh vs $0.10-0.15 elsewhere
      - 60-70% cost reduction
      - Sustainability premium
    - First-mover in East Africa
    - Vertically integrated model
    - DePIN diversification
    - Scalable modular design
  - /timing
    - Why invest now
    - Market window
    - Competitive dynamics
    - Risk of waiting
  - /comparables
    - Similar transactions
    - Valuation benchmarks
    - Exit multiples
- /financials/
  - /model
    - Financial model overview
    - Key assumptions
    - Revenue model
      - GPU compute revenue
      - CPU compute revenue
      - Storage revenue
      - DePIN token earnings
      - Other services
    - Cost structure
  - /capex
    - Total CAPEX: $20-25M
    - Breakdown
      - Datacenter (building/containers): $3.5-4.5M
      - Power & cooling: included above
      - Servers (GPU/CPU): $14-18M
      - Networking: $2-3M
      - Contingency: $1-2M
    - Phased investment schedule
    - Financing structure
  - /opex
    - Annual OPEX: $2.0-2.8M
    - Breakdown
      - Energy: $0.8-1.2M
      - Personnel: $0.4-0.6M
      - Connectivity: $0.2-0.3M
      - Maintenance: $0.2-0.3M
      - Licenses/software: $0.1-0.2M
      - Other: $0.1-0.2M
    - OPEX scaling with phases
  - /revenue
    - Revenue projections
      - Year 1: $2-3M
      - Year 2: $5-8M
      - Year 3: $8-12M
      - Year 4: $10-15M
      - Year 5: $12-18M
    - Revenue mix evolution
    - Utilization assumptions
  - /scenarios ⭐ ИНТЕРАКТИВНЫЙ
    - Base case
    - Conservative case
    - Optimistic case
    - Sensitivity analysis
      - Utilization sensitivity
      - Pricing sensitivity
      - CAPEX sensitivity
      - OPEX sensitivity
    - Monte Carlo simulation (визуализация)
  - /calculator ⭐ ИНТЕРАКТИВНЫЙ
    - Investment amount input
    - Equity stake calculator
    - IRR projections
    - NPV calculations
    - Cash flow waterfall
    - Exit value scenarios
- /structure/
  - /legal
    - Corporate structure
      - Holding company (jurisdiction TBD)
      - Kenya operating company
      - IP holding (if applicable)
    - Investment vehicle
    - Key legal considerations
  - /equity
    - Equity distribution
      - Founders/Initiators: XX%
      - Investors: XX%
      - Local partner: XX%
      - Technical partner: XX%
      - ESOP reserve: XX%
    - Share classes
    - Anti-dilution provisions
  - /governance
    - Board composition
    - Voting rights
    - Reserved matters
    - Reporting requirements
    - Management team
  - /exit
    - Exit strategies
      - Strategic sale
      - IPO (long-term)
      - Secondary sale
      - Dividend recapitalization
    - Expected timeline: 5-7 years
    - Target returns: 3-5x
- /risks/
  - /analysis
    - Risk matrix (impact vs probability)
    - Risk categories
      - Market risks
      - Operational risks
      - Financial risks
      - Political/regulatory risks
      - Technology risks
      - Execution risks
    - Interactive risk explorer
  - /mitigation
    - Risk mitigation strategies
    - Insurance coverage
    - Contractual protections
    - Contingency plans
  - /kenya-specific
    - Political risk assessment
    - Currency risk
    - Regulatory risk
    - Infrastructure risk
- /due-diligence/
  - /process
    - DD timeline
    - Required steps
    - Key contacts
  - /documents (teaser - full in portal)
    - Executive summary
    - Pitch deck
    - Financial model overview
    - Request full data room access
  - /faq
    - Common investor questions
    - Detailed answers
- /contact
  - Investor relations contact
  - Schedule a call (Calendly integration ready)
  - Request materials form
  - NDA process

#### 3.1.6 Для партнёров /partners
`/[locale]/partners/`
- /overview
  - Partnership philosophy
  - Partner ecosystem map
  - Benefits of partnership
- /kenya-partner/
  - /opportunity
    - Role description
    - Expected contributions
      - Power plant construction
      - DC construction management
      - Local permits & licenses
      - Workforce & staffing
      - Logistics coordination
    - Equity participation
  - /requirements
    - Experience requirements
    - Financial requirements
    - Local presence
    - Track record
  - /benefits
    - Revenue share
    - Equity stake
    - Long-term partnership
    - Technology transfer
  - /apply
    - Application form
    - Next steps
- /technical-partner/
  - /role
    - DC architecture & design
    - Engineering oversight
    - Operations model
    - Ongoing technical support
  - /requirements
    - DC design experience
    - Certifications
    - Regional experience
    - References
  - /engagement-models
    - Consulting only
    - Design-build
    - Equity participation
    - O&M contract
  - /apply
    - RFI form
- /energy-partner/
  - /opportunity
    - Power generation partnership
    - PPA structures
    - Renewable development
  - /requirements
    - Generation capacity
    - Reliability requirements
    - Pricing expectations
    - Term expectations
  - /apply
    - Expression of interest
- /equipment-suppliers/
  - /categories
    - Server & compute
    - Networking
    - Power systems
    - Cooling systems
    - Physical infrastructure
    - Security systems
  - /requirements
    - Technical specifications
    - Quality standards
    - Warranty requirements
    - Support requirements
    - Logistics to Kenya
  - /tender-process
    - Procurement timeline
    - Evaluation criteria
    - Terms & conditions
  - /register
    - Supplier registration form
- /network-partners/ (DePIN networks)
  - /integration
    - How to integrate your network
    - Technical requirements
    - Testing process
  - /benefits
    - Geographic expansion
    - Low-cost compute
    - Reliable infrastructure
  - /apply
    - Network partnership form
- /operations-partner/
  - /noc-services
    - 24/7 NOC requirements
    - Staffing model
    - SLA requirements
  - /maintenance
    - Preventive maintenance
    - Break-fix support
    - Spare parts management
  - /apply
    - Operations partner application

#### 3.1.7 Рынок и аналитика /market
`/[locale]/market/`
- /overview
  - AI infrastructure landscape
  - Key trends
  - Market map visualization
- /ai-compute/
  - /demand
    - Training compute growth
    - Inference explosion
    - Enterprise AI adoption
    - Research demand
  - /supply
    - GPU availability
    - Data center capacity
    - Power constraints
    - Geographic distribution
  - /pricing
    - GPU pricing trends
    - Cloud vs bare metal
    - Price projections
- /africa/
  - /overview
    - Africa digital transformation
    - Internet penetration
    - Tech ecosystem growth
  - /datacenters
    - Current capacity
    - Key players
    - Investment flows
    - Growth projections
  - /kenya
    - Tech hub status
    - Digital infrastructure
    - Government initiatives
    - Competitive landscape
  - /opportunity
    - Gap analysis
    - Addressable market
    - First-mover advantages
- /depin/
  - /overview
    - What is DePIN
    - Market size
    - Growth trajectory
  - /compute-networks
    - Network comparison
    - Token performance
    - Utilization metrics
  - /trends
    - Network growth
    - Enterprise adoption
    - Regulatory landscape
- /research
  - Reports & whitepapers
  - Industry analysis
  - Data sources

#### 3.1.8 Регулирование /regulatory
`/[locale]/regulatory/`
- /kenya/
  - /investment
    - Foreign investment rules
    - Company formation
    - Repatriation of profits
    - Investment incentives
  - /datacenter
    - Licensing requirements
    - Building permits
    - Environmental clearances
    - Safety certifications
  - /energy
    - Power generation licenses
    - Grid connection
    - Renewable incentives
  - /data-protection
    - Kenya Data Protection Act
    - Cross-border data transfer
    - Compliance requirements
  - /taxation
    - Corporate tax
    - VAT
    - Withholding tax
    - Tax incentives (SEZ, etc.)
    - Transfer pricing
- /international/
  - /compliance
    - GDPR considerations
    - US regulations
    - China regulations
  - /certifications
    - ISO standards
    - SOC compliance
    - Uptime Institute
    - Industry certifications
- /crypto-depin/
  - /kenya-status
    - Cryptocurrency regulations
    - Current stance
  - /global
    - Jurisdictional overview
    - Compliance strategies
  - /risk-management
    - Regulatory risk
    - Mitigation approaches

#### 3.1.9 Ресурсы /resources
`/[locale]/resources/`
- /documents/
  - /public
    - Executive summary (PDF)
    - Project overview (PDF)
    - Technical specifications (PDF)
    - ESG report (PDF)
  - /request
    - Full pitch deck
    - Financial model
    - Legal documentation
    - Form to request access
- /case-studies/
  - Similar projects worldwide
  - DePIN success stories
  - Africa DC case studies
- /whitepapers/
  - "The Energy Arbitrage Opportunity in AI Compute"
  - "DePIN: Decentralizing AI Infrastructure"
  - "Africa's AI Future"
  - Download forms
- /faq/
  - /general
  - /investors
  - /customers
  - /partners
  - /technical
- /glossary/
  - Technical terms
  - Financial terms
  - DePIN/crypto terms
- /media/
  - Brand assets
  - Photos
  - Logos
  - Press kit

#### 3.1.10 Новости /news
`/[locale]/news/`
- /updates
  - Project updates
  - Milestones achieved
  - Partnership announcements
- /blog
  - Industry insights
  - Technical articles
  - Market analysis
  - Team perspectives
- /press
  - Press releases
  - Media coverage
  - Press contacts
- /events
  - Upcoming events
  - Conference appearances
  - Webinars

#### 3.1.11 Карьера /careers
`/[locale]/careers/`
- /overview
  - Working with us
  - Mission & values
  - Growth opportunities
- /positions/
  - Engineering
  - Operations
  - Business development
  - Finance
  - Local (Kenya)
- /culture
  - Team culture
  - Benefits
  - Diversity & inclusion
- /apply
  - Application form

#### 3.1.12 Контакты /contact
`/[locale]/contact/`
- /general
  - Contact form
  - Email
  - Office locations
- /investors
  - Investor relations contact
  - Schedule meeting
  - Request materials
- /sales
  - For compute customers
  - Enterprise inquiries
  - DePIN partnerships
- /partners
  - Partnership inquiries
  - Supplier registration
- /media
  - Press inquiries
  - Interview requests

### 3.2 Закрытая часть (Portal) /portal
`/[locale]/portal/`
- /login
  - Email/password
  - Magic link option
  - OAuth (Google, LinkedIn) - заготовка
- /register
  - Registration form
  - Role selection
  - Verification process
- /investor-room/ (роль: investor)
  - /dashboard
    - Investment summary
    - Project status
    - Key metrics
  - /documents
    - Full pitch deck
    - Financial model (Excel)
    - Legal documents
      - Term sheet
      - SHA draft
      - Due diligence checklist
    - Technical documentation
    - Market research
  - /financials
    - Detailed financial model
    - Interactive scenario builder
    - Monthly updates (when available)
    - Cap table
  - /updates
    - Monthly progress reports
    - Milestone updates
    - Meeting recordings
  - /communication
    - Message center
    - Schedule calls
    - Q&A history
- /partner-area/ (роль: partner)
  - /dashboard
    - Partnership status
    - Action items
  - /documents
    - Technical specifications
    - Requirements docs
    - Contract templates
  - /project
    - Timeline & milestones
    - Dependencies
    - Resource planning
  - /communication
    - Message center
    - Meeting scheduling
- /customer-dashboard/ (роль: customer)
  - /overview
    - Active services
    - Usage metrics
    - Billing summary
  - /services
    - Deployed instances
    - Resource management
    - New deployment
  - /billing
    - Current invoice
    - Payment history
    - Payment methods
  - /support
    - Open tickets
    - Create ticket
    - Knowledge base
  - /settings
    - Account settings
    - Team management
    - API keys
- /admin/ (роль: admin)
  - User management
  - Content management
  - Analytics
  - System settings

## 4. Интерактивные компоненты — детальные спецификации
### 4.1 ROI Calculator (Investors)
```typescript
// Inputs
interface ROICalculatorInputs {
  investmentAmount: number; // $100K - $10M slider
  equityStake: number; // auto-calculated or manual
  scenario: 'conservative' | 'base' | 'optimistic';
  exitYear: number; // 3-10 years
  discountRate: number; // 8-20%
}

// Outputs
interface ROICalculatorOutputs {
  irr: number;
  npv: number;
  moic: number; // Multiple on invested capital
  paybackPeriod: number;
  cashFlows: YearlyCashFlow[];
  exitValue: number;
  totalReturn: number;
}

// Visualization
- Cash flow waterfall chart
- IRR sensitivity heatmap
- Exit value scenarios
- Comparison with benchmarks
```

### 4.2 Compute Pricing Calculator
```typescript
// Inputs
interface ComputePricingInputs {
  resourceType: 'gpu' | 'cpu' | 'storage';
  gpuType?: 'H100' | 'A100-80' | 'A100-40' | 'L40S' | 'T4';
  gpuCount?: number;
  cpuCores?: number;
  ramGB?: number;
  storageGB?: number;
  storageType?: 'nvme' | 'ssd' | 'hdd';
  bandwidthTB?: number;
  commitment: 'on-demand' | '1-month' | '6-month' | '1-year';
  duration: number; // hours or months
}

// Outputs
interface ComputePricingOutputs {
  hourlyRate: number;
  monthlyEstimate: number;
  yearlyEstimate: number;
  savingsVsCloud: {
    aws: number;
    gcp: number;
    azure: number;
  };
  breakdown: CostBreakdown;
}

// Visualization
- Price comparison bar chart
- Savings calculator
- TCO analysis
```

### 4.3 DePIN Earnings Estimator
```typescript
// Inputs
interface DePINEstimatorInputs {
  network: 'render' | 'akash' | 'ionet' | 'gensyn' | 'bittensor';
  gpuType: string;
  gpuCount: number;
  hoursPerDay: number;
  utilizationRate: number;
}

// Outputs
interface DePINEstimatorOutputs {
  dailyEarnings: {
    tokens: number;
    usd: number;
  };
  monthlyEarnings: {
    tokens: number;
    usd: number;
  };
  yearlyProjection: {
    tokens: number;
    usd: number;
  };
  roi: number;
  paybackMonths: number;
}

// Visualization
- Earnings projection chart
- Network comparison
- Historical earnings data
```

### 4.4 Interactive Site Map / 3D Model
```typescript
// Features
- 3D visualization of datacenter facility
- Clickable zones:
  - Power generation area
  - Cooling systems
  - Server halls
  - Network room
  - Security perimeter
- Hover tooltips with specifications
- Phase overlay (Phase 1 / 2 / 3)
- Day/night mode
- Zoom and rotate
```

### 4.5 Financial Dashboard (Investors)
```typescript
// Components
- CAPEX breakdown donut chart
- OPEX structure bar chart
- Revenue projection line chart
- Scenario comparison radar chart
- Sensitivity analysis heatmap
- Cash flow waterfall
- IRR distribution histogram
```

### 4.6 Network Latency Map
```typescript
// Features
- World map with Kenya highlighted
- Latency lines to major regions
- Real-time latency simulation
- Submarine cable routes
- Data center locations worldwide
- Comparison mode
```

## 5. Мультиязычность
### 5.1 Поддерживаемые языки
| Код | Язык | Направление | Приоритет |
| --- | --- | --- | --- |
| en | English | LTR | Primary |
| zh | 中文 (Simplified) | LTR | Secondary |
| ru | Русский | LTR | Secondary |

### 5.2 URL структура
```
/en/... — English (default)
/zh/... — Chinese
/ru/... — Russian
```

### 5.3 Требования к переводам
- Все UI элементы
- Весь контент страниц
- SEO metadata (title, description)
- Alt тексты для изображений
- Документы — только ключевые (pitch deck, executive summary)

## 6. SEO требования
### 6.1 Технические требования
- SSR/SSG для всех публичных страниц
- Semantic HTML5
- Schema.org разметка (Organization, Article, FAQPage, Product)
- Open Graph и Twitter Cards
- Canonical URLs
- XML Sitemap
- robots.txt
- Hreflang для мультиязычности
- Core Web Vitals optimization
- Mobile-first design

### 6.2 Контент-требования
- Уникальные title и description для каждой страницы
- H1-H6 иерархия
- Keyword-оптимизированные заголовки
- Internal linking strategy
- Alt тексты для всех изображений
- Readable URLs (slug)

### 6.3 Целевые ключевые слова (примеры)
English:
- ai compute africa
- gpu datacenter kenya
- depin infrastructure
- ai training infrastructure
- gpu cloud africa
- render network node hosting
- akash provider africa

Chinese:
- 非洲AI计算
- 肯尼亚数据中心
- GPU云服务非洲
- AI基础设施投资

## 7. Дизайн-система
### 7.1 Цветовая палитра
```css
/* Primary */
--primary-600: #2563eb; /* Main blue */
--primary-700: #1d4ed8; /* Hover */

/* Secondary */
--secondary-500: #10b981; /* Green accent */

/* Neutral */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-900: #111827;

/* Semantic */
--success: #22c55e;
--warning: #f59e0b;
--error: #ef4444;

/* Accent (DePIN/crypto) */
--accent-purple: #8b5cf6;
--accent-cyan: #06b6d4;
```

### 7.2 Типографика
```css
/* Headings */
font-family: 'Inter', sans-serif;
/* или 'Plus Jakarta Sans' для более современного вида */

/* Body */
font-family: 'Inter', sans-serif;

/* Code/Technical */
font-family: 'JetBrains Mono', monospace;

/* Chinese */
font-family: 'Noto Sans SC', sans-serif;
```

### 7.3 Компоненты (shadcn/ui base)
- Button (primary, secondary, ghost, outline)
- Card (with variants)
- Input, Select, Textarea
- Tabs
- Accordion
- Modal/Dialog
- Toast notifications
- Navigation (header, sidebar, footer)
- Data tables
- Charts
- Progress indicators
- Badges/Tags
- Tooltips
- Forms with validation

## 8. Производительность и качество
### 8.1 Целевые метрики
- Lighthouse Score: >90 (all categories)
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.5s
- Cumulative Layout Shift: <0.1

### 8.2 Оптимизации
- Image optimization (next/image, WebP, AVIF)
- Code splitting
- Lazy loading (компоненты, изображения)
- Font optimization
- Critical CSS inlining
- Caching strategy

## 9. Безопасность
### 9.1 Аутентификация (Portal)
- Email/password with bcrypt hashing
- Magic link authentication
- Session management (JWT)
- Rate limiting
- CSRF protection

### 9.2 Авторизация
- Role-based access control (RBAC)
- Roles: admin, investor, partner, customer
- Resource-level permissions

### 9.3 Общая безопасность
- HTTPS only
- Security headers (CSP, HSTS, etc.)
- Input validation (Zod)
- SQL injection prevention (ORM)
- XSS prevention
- Secure file uploads

## 10. Интеграции (заготовки)
### 10.1 Analytics
```typescript
// Google Analytics 4
// Vercel Analytics
// Custom event tracking

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// Key events to track:
- Page views
- CTA clicks
- Calculator usage
- Document downloads
- Form submissions
- Portal logins
```

### 10.2 CRM (заготовка)
```typescript
// HubSpot or Salesforce integration ready
interface Lead {
  email: string;
  name: string;
  company?: string;
  role: 'investor' | 'customer' | 'partner';
  source: string;
  interests: string[];
}
```

### 10.3 Email (заготовка)
```typescript
// Resend integration
// Templates:
- Welcome email
- Investor inquiry confirmation
- Partner application received
- Document access granted
- Newsletter (заготовка)
```

### 10.4 Scheduling (заготовка)
```typescript
// Calendly embed ready
// Meeting types:
- Investor call (30 min)
- Partnership discussion (45 min)
- Technical demo (60 min)
- Sales call (30 min)
```

## 11. Контент — генерация
### 11.1 Требования к контенту
- SEO-оптимизированный
- Человечный, не "AI-generated" стиль
- Профессиональный но доступный тон
- Конкретные цифры и факты (где возможно)
- Call-to-action на каждой странице
- Storytelling элементы

### 11.2 Контент для генерации
**Основной контент:**
- Все страницы публичной части
- FAQ (минимум 30 вопросов)
- Glossary (минимум 50 терминов)
- Blog posts (5 начальных статей)

**Документы (PDF):**
- Executive Summary (2 страницы)
- Project Overview (5 страниц)
- Technical Specifications (10 страниц)

**Шаблоны:**
- Email templates
- Form confirmation messages
- Error messages

### 11.3 Тон и стиль по аудиториям
| Аудитория | Тон | Фокус |
| --- | --- | --- |
| Инвесторы | Профессиональный, уверенный | ROI, риски, структура |
| AI-клиенты | Технический, практичный | Specs, цены, интеграция |
| DePIN | Web3-native, инновационный | Tokenomics, network effects |
| Партнёры | Деловой, конкретный | Требования, выгоды |

## 12. Файловая структура проекта
```
kenya-ai-compute/
├── app/
│   ├── [locale]/
│   │   ├── (public)/
│   │   │   ├── page.tsx (home)
│   │   │   ├── about/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── vision/page.tsx
│   │   │   │   ├── team/page.tsx
│   │   │   │   ├── story/page.tsx
│   │   │   │   ├── partners/page.tsx
│   │   │   │   └── roadmap/page.tsx
│   │   │   ├── project/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── overview/page.tsx
│   │   │   │   ├── location/
│   │   │   │   │   ├── kenya/page.tsx
│   │   │   │   │   ├── site/page.tsx
│   │   │   │   │   ├── connectivity/page.tsx
│   │   │   │   │   └── climate/page.tsx
│   │   │   │   ├── energy/
│   │   │   │   │   ├── generation/page.tsx
│   │   │   │   │   ├── efficiency/page.tsx
│   │   │   │   │   ├── sustainability/page.tsx
│   │   │   │   │   └── grid/page.tsx
│   │   │   │   └── phases/
│   │   │   │       ├── phase-1/page.tsx
│   │   │   │       ├── phase-2/page.tsx
│   │   │   │       └── phase-3/page.tsx
│   │   │   ├── datacenter/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── architecture/
│   │   │   │   ├── specifications/
│   │   │   │   ├── equipment/
│   │   │   │   └── operations/
│   │   │   ├── compute/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── gpu/
│   │   │   │   ├── cpu/
│   │   │   │   ├── storage/
│   │   │   │   ├── networking/
│   │   │   │   ├── depin/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── render-network/page.tsx
│   │   │   │   │   ├── akash-network/page.tsx
│   │   │   │   │   ├── io-net/page.tsx
│   │   │   │   │   ├── gensyn/page.tsx
│   │   │   │   │   ├── bittensor/page.tsx
│   │   │   │   │   ├── node-hosting/page.tsx
│   │   │   │   │   └── tokenomics/page.tsx
│   │   │   │   ├── enterprise/
│   │   │   │   ├── pricing/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── calculator/page.tsx
│   │   │   │   ├── sla/
│   │   │   │   └── onboarding/
│   │   │   ├── investors/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── opportunity/
│   │   │   │   ├── financials/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── calculator/page.tsx
│   │   │   │   │   └── scenarios/page.tsx
│   │   │   │   ├── structure/
│   │   │   │   ├── risks/
│   │   │   │   ├── due-diligence/
│   │   │   │   └── contact/page.tsx
│   │   │   ├── partners/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── kenya-partner/
│   │   │   │   ├── technical-partner/
│   │   │   │   ├── energy-partner/
│   │   │   │   ├── equipment-suppliers/
│   │   │   │   ├── network-partners/
│   │   │   │   └── operations-partner/
│   │   │   ├── market/
│   │   │   ├── regulatory/
│   │   │   ├── resources/
│   │   │   ├── news/
│   │   │   ├── careers/
│   │   │   └── contact/
│   │   ├── (portal)/
│   │   │   ├── portal/
│   │   │   │   ├── page.tsx (dashboard redirect)
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── register/page.tsx
│   │   │   │   ├── investor-room/
│   │   │   │   ├── partner-area/
│   │   │   │   ├── customer-dashboard/
│   │   │   │   └── admin/
│   │   │   └── layout.tsx (portal layout)
│   │   └── layout.tsx (root layout with locale)
│   ├── api/
│   │   ├── auth/
│   │   ├── contact/
│   │   ├── newsletter/
│   │   └── portal/
│   └── layout.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ValueProps.tsx
│   │   ├── MetricsDashboard.tsx
│   │   └── NetworkLogos.tsx
│   ├── calculators/
│   │   ├── ROICalculator.tsx
│   │   ├── PricingCalculator.tsx
│   │   └── DePINEstimator.tsx
│   ├── visualizations/
│   │   ├── SiteMap3D.tsx
│   │   ├── LatencyMap.tsx
│   │   ├── FinancialCharts.tsx
│   │   └── Timeline.tsx
│   ├── forms/
│   │   ├── ContactForm.tsx
│   │   ├── InvestorInquiry.tsx
│   │   ├── PartnerApplication.tsx
│   │   └── NewsletterSignup.tsx
│   └── portal/
│       ├── Dashboard.tsx
│       ├── DocumentViewer.tsx
│       └── MessageCenter.tsx
├── lib/
│   ├── db.ts (Supabase client)
│   ├── auth.ts (NextAuth config)
│   ├── utils.ts
│   ├── constants.ts
│   └── validations.ts
├── hooks/
│   ├── useCalculator.ts
│   └── useAuth.ts
├── stores/
│   └── useStore.ts (Zustand)
├── content/
│   ├── en/
│   │   ├── home.json
│   │   ├── about.json
│   │   ├── project.json
│   │   ├── datacenter.json
│   │   ├── compute.json
│   │   ├── investors.json
│   │   ├── partners.json
│   │   └── ... (all pages)
│   ├── zh/
│   │   └── ... (translations)
│   └── ru/
│       └── ... (translations)
├── public/
│   ├── images/
│   ├── icons/
│   ├── documents/
│   └── fonts/
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── middleware.ts (i18n routing)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 13. Этапы разработки
### Phase 1: Foundation (Week 1-2)
- Project setup (Next.js, TypeScript, Tailwind)
- Design system implementation
- Layout components (Header, Footer, Navigation)
- i18n setup
- Basic routing structure

### Phase 2: Core Public Pages (Week 2-4)
- Home page with all sections
- About section (all pages)
- Project section (all pages)
- Datacenter section (all pages)
- Basic contact forms

### Phase 3: Compute & DePIN Section (Week 4-5)
- Compute overview and sub-pages
- DePIN section (all networks)
- Pricing calculator
- SLA and onboarding pages

### Phase 4: Investors & Partners (Week 5-6)
- Investors section (all pages)
- ROI calculator
- Financial visualizations
- Partners section (all pages)
- Application forms

### Phase 5: Supporting Sections (Week 6-7)
- Market analysis pages
- Regulatory information
- Resources and documents
- News/blog structure
- Careers pages
- FAQ and glossary

### Phase 6: Portal Development (Week 7-9)
- Authentication system
- Investor data room
- Partner area
- Customer dashboard (basic)
- Admin panel (basic)

### Phase 7: Interactivity & Polish (Week 9-10)
- 3D visualizations
- Advanced calculators
- Animations and transitions
- Performance optimization
- SEO finalization

### Phase 8: Content & Launch (Week 10-11)
- Content generation and review
- Translations (ZH, RU)
- Testing and QA
- Documentation
- Deployment

## 14. Команды для запуска
```bash
# Создание проекта
npx create-next-app@latest kenya-ai-compute --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# Установка зависимостей
cd kenya-ai-compute

# UI Components
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input textarea select tabs accordion dialog toast navigation-menu dropdown-menu avatar badge progress table form

# i18n
npm install next-intl

# Forms
npm install react-hook-form @hookform/resolvers zod

# Charts
npm install recharts

# 3D (optional, можно добавить позже)
npm install three @react-three/fiber @react-three/drei

# Animations
npm install framer-motion

# State
npm install zustand

# Auth
npm install next-auth @auth/prisma-adapter

# Database
npm install @supabase/supabase-js

# Email
npm install resend

# Utils
npm install clsx tailwind-merge lucide-react

# Dev
npm install -D @types/three
```

## 15. Переменные окружения
```env
# App
NEXT_PUBLIC_APP_URL=https://kenyaaicompute.com
NEXT_PUBLIC_APP_NAME="Kenya AI Compute"

# Database (Supabase)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Auth
NEXTAUTH_URL=
NEXTAUTH_SECRET=

# Email
RESEND_API_KEY=

# Analytics (заготовки)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_MIXPANEL_TOKEN=

# CRM (заготовки)
HUBSPOT_API_KEY=

# Feature flags
NEXT_PUBLIC_ENABLE_PORTAL=true
NEXT_PUBLIC_ENABLE_3D=true
```

## 16. Примечания для разработки
### Приоритеты
- Контент — сайт должен быть содержательным, не пустым шаблоном
- SEO — каждая страница должна быть оптимизирована
- Конверсия — чёткие CTA на каждой странице
- Мобильная версия — mobile-first подход
- Производительность — быстрая загрузка критична

### Не критично на первом этапе
- Полная 3D визуализация (можно статичные изображения)
- Интеграции с CRM (только заготовки)
- Customer dashboard функционал
- Admin panel (базовый)

### Контент-генерация
- Использовать реальные данные из презентации как основу
- Расширять с реалистичными деталями
- Проверять на "AI-звучание" — текст должен быть естественным
- SEO-оптимизация без переспама ключевыми словами
