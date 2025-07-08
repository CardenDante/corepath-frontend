import React from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { 
  Heart,
  Target,
  Globe,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Building,
  Compass,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const stats = [
  { id: 1, name: 'Families Equipped', value: '10,000+' },
  { id: 2, name: 'Countries Reached', value: '25+' },
  { id: 3, name: 'Church Partners', value: '500+' },
  { id: 4, name: 'Years of Impact', value: '8+' },
]

const values = [
  {
    name: 'Sacred Stewardship',
    description: 'We believe parenting is a divine assignment to steward a child\'s heart, habits, and destiny - not just a role, but a calling to shape hearts and prepare children for eternal purpose.',
    icon: Heart,
  },
  {
    name: 'Intentional Formation',
    description: 'Parenting is formation, not management. We equip parents to be deliberate and purposeful in raising children of conviction, compassion, and calling.',
    icon: Target,
  },
  {
    name: 'Values Foundation',
    description: 'Values are the foundation of behavior, habits, and character. When children are taught values, they form behaviors grounded in purpose that become lasting habits.',
    icon: Building,
  },
  {
    name: 'Global Impact',
    description: 'We aim to reach every child, every home, every culture with timeless Godly values that transcend borders and transform communities.',
    icon: Globe,
  },
]

const milestones = [
  {
    year: '2016',
    title: 'Foundation',
    description: 'CorePath Impact was founded with a vision to restore the foundation of society through values-driven parenting.',
  },
  {
    year: '2018',
    title: 'VDC Toolkit Launch',
    description: 'Released the first Values Driven Child Toolkit, introducing the ATTR method to families worldwide.',
  },
  {
    year: '2020',
    title: 'Global Expansion',
    description: 'Expanded internationally, reaching families across Africa, Europe, and North America.',
  },
  {
    year: '2022',
    title: 'Digital Platform',
    description: 'Launched comprehensive digital training programs and online parenting courses.',
  },
  {
    year: '2024',
    title: 'Community Impact',
    description: 'Reached over 10,000 families and partnered with 500+ churches and schools globally.',
  },
]

const impactGoals = [
  {
    goal: 'Equip 1 million families',
    description: 'Provide the VDC Toolkit to families worldwide by 2030',
    icon: Users,
  },
  {
    goal: 'Partner with 2,000 organizations',
    description: 'Collaborate with churches, schools, and nonprofits across the globe',
    icon: Building,
  },
  {
    goal: 'Launch digital platform',
    description: 'Create comprehensive online parenting resources and community',
    icon: BookOpen,
  },
  {
    goal: 'Train 100,000 facilitators',
    description: 'Certify parent mentors and coaches in the VDC methodology',
    icon: Award,
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <main>
          {/* Hero section */}
          <div className="relative isolate pt-16 pb-8 sm:pb-12 lg:pb-16">
            <svg
              aria-hidden="true"
              className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            >
              <defs>
                <pattern
                  x="50%"
                  y={-1}
                  id="about-pattern"
                  width={200}
                  height={200}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>
              <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                <path
                  d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                  strokeWidth={0}
                />
              </svg>
              <rect fill="url(#about-pattern)" width="100%" height="100%" strokeWidth={0} />
            </svg>
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
              <div className="lg:flex lg:items-center lg:gap-x-10">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Restoring the foundation of society
                  </h1>
                  <p className="mt-6 text-lg text-gray-600 sm:text-xl">
                    CorePath Impact exists to equip parents to raise children of conviction, compassion, and calling through intentional, deliberate, and structured values-driven parenting. We believe strong families are the cornerstone of thriving societies.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link
                      href="/partnerships"
                      className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                    >
                      Partner With Us
                    </Link>
                    <Link href="/shop" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      Get the Toolkit <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
                
                <div className="mt-12 lg:mt-0 lg:shrink-0 lg:grow">
                  <div className="mx-auto w-full max-w-lg lg:max-w-none">
                    <img
                      src="/images/about_1.jpg"
                      alt="Multi-generational family representing values being passed down through generations"
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Our Global Impact
                </h2>
                <p className="mt-6 text-base text-gray-600">
                  Since our founding, we've been committed to transforming families worldwide through values-driven parenting education and resources.
                </p>
              </div>
              
              <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-16 lg:max-w-none lg:flex-row lg:items-end">
                <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-50 p-8 sm:w-3/5 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
                  <p className="flex-none text-3xl font-bold tracking-tight text-gray-900">10,000+</p>
                  <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                    <p className="text-lg font-semibold tracking-tight text-gray-900">Families Equipped</p>
                    <p className="mt-2 text-base text-gray-600">
                      Families worldwide using our VDC Toolkit to raise values-driven children.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-gray-900 p-8 sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-sm lg:flex-auto lg:flex-col lg:items-start lg:gap-y-44">
                  <p className="flex-none text-3xl font-bold tracking-tight text-white">25+</p>
                  <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                    <p className="text-lg font-semibold tracking-tight text-white">Countries Reached</p>
                    <p className="mt-2 text-base text-gray-400">
                      Nations where CorePath Impact is transforming families and communities.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-blue-600 p-8 sm:w-11/12 sm:max-w-xl sm:flex-row-reverse sm:items-end lg:w-full lg:max-w-none lg:flex-auto lg:flex-col lg:items-start lg:gap-y-28">
                  <p className="flex-none text-3xl font-bold tracking-tight text-white">500+</p>
                  <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
                    <p className="text-lg font-semibold tracking-tight text-white">Partner Organizations</p>
                    <p className="mt-2 text-base text-blue-200">
                      Churches, schools, and nonprofits implementing our values-based programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision section */}
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 sm:rounded-3xl sm:px-12 lg:px-16 lg:py-20">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
                  <div className="lg:max-w-lg">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      Our Mission & Vision
                    </h2>
                    <p className="mt-6 text-lg text-gray-300">
                      <span className="font-semibold text-orange-400">Mission:</span> Transforming families and communities through intentional, values-based parenting.
                    </p>
                    <p className="mt-4 text-lg text-gray-300">
                      <span className="font-semibold text-blue-400">Vision:</span> Every heart anchored on timeless Godly values. To see every generation rise with hearts anchored in timeless Godly values and lives aligned to eternal purpose.
                    </p>
                    
                    <dl className="mt-10 space-y-6 text-base text-gray-300">
                      <div className="relative">
                        <dt className="ml-9 inline-block font-semibold text-white">
                          <Heart aria-hidden="true" className="absolute left-1 top-1 size-5 text-orange-400" />
                          Shape Hearts
                        </dt>{' '}
                        <dd className="inline">We focus on heart transformation, not just behavior modification.</dd>
                      </div>
                      <div className="relative">
                        <dt className="ml-9 inline-block font-semibold text-white">
                          <Target aria-hidden="true" className="absolute left-1 top-1 size-5 text-blue-400" />
                          Build Character
                        </dt>{' '}
                        <dd className="inline">Our tools develop genuine character that lasts a lifetime.</dd>
                      </div>
                      <div className="relative">
                        <dt className="ml-9 inline-block font-semibold text-white">
                          <Globe aria-hidden="true" className="absolute left-1 top-1 size-5 text-green-400" />
                          Transform Communities
                        </dt>{' '}
                        <dd className="inline">Strong families create thriving communities and societies.</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div className="relative">
                    <img
                      src="/images/about_2.jpg"
                      alt="Parent and child in deep conversation, representing intentional values-based parenting"
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-2xl ring-1 ring-white/10"
                    />
                  </div>
                </div>
                
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-12 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-3xl lg:-bottom-48 lg:top-auto lg:translate-y-0"
                >
                  <div
                    style={{
                      clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-25"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Core Values section */}
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold text-blue-600">Our Foundation</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  What Drives Us Forward
                </p>
                <p className="mt-6 text-lg text-gray-600">
                  Our core beliefs shape everything we do and guide how we serve families worldwide. These principles are the foundation of our approach to values-driven parenting.
                </p>
              </div>
              
              <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-2">
                  {values.map((value) => (
                    <div key={value.name} className="flex flex-col">
                      <dt className="flex items-center gap-x-3 text-base font-semibold text-gray-900">
                        <value.icon aria-hidden="true" className="size-5 flex-none text-blue-600" />
                        {value.name}
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base text-gray-600">
                        <p className="flex-auto">{value.description}</p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Timeline section */}
          <div className="py-12 sm:py-16 lg:py-20 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Our Journey
                </h2>
                <p className="mt-6 text-base text-gray-600">
                  From a vision to transform families to a global movement impacting communities worldwide - here's how CorePath Impact has grown.
                </p>
              </div>
              
              <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-1">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="flex gap-x-4 py-4 bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex-none">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600">
                        <CheckCircle className="size-6 text-white" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="flex-auto">
                      <div className="flex items-baseline justify-between gap-x-4">
                        <p className="text-sm font-semibold text-gray-900">{milestone.title}</p>
                        <p className="flex-none text-xs text-gray-600">{milestone.year}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Goals section */}
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 lg:px-24 lg:py-20">
                <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Our 2030 Vision
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-center text-lg text-gray-300">
                  By 2030, we aim to create a global movement of families committed to values-driven parenting. Here are our ambitious goals.
                </p>
                
                <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:mt-16 lg:mx-0 lg:max-w-4xl lg:grid-cols-2">
                  {impactGoals.map((item) => (
                    <div key={item.goal} className="flex gap-x-4 rounded-xl bg-white/5 p-6">
                      <item.icon className="size-8 flex-none text-white" aria-hidden="true" />
                      <div>
                        <h3 className="text-base font-semibold text-white">{item.goal}</h3>
                        <p className="mt-2 text-sm text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 flex justify-center">
                  <Link
                    href="/partnerships"
                    className="flex items-center gap-x-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    Join Our Mission
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
                
                <svg
                  viewBox="0 0 1024 1024"
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2"
                >
                  <circle r={512} cx={512} cy={512} fill="url(#about-radial)" fillOpacity="0.7" />
                  <defs>
                    <radialGradient
                      r={1}
                      cx={0}
                      cy={0}
                      id="about-radial"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(512 512) rotate(90) scale(512)"
                    >
                      <stop stopColor="#7775D6" />
                      <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Theory of Change section */}
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-base font-semibold text-blue-600">Theory of Change</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Building a Better Tomorrow
                </p>
                
                <div className="mt-12 rounded-2xl bg-gray-50 p-8 lg:p-16">
                  <div className="flex flex-col sm:flex-row items-center gap-8 text-center">
                    <div className="flex-1">
                      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-blue-600">
                        <Users className="size-8 text-white" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-gray-900">Equip Parents</h3>
                      <p className="mt-2 text-sm text-gray-600">
                        With practical, values-based tools
                      </p>
                    </div>
                    
                    <ArrowRight className="size-8 text-gray-400 rotate-90 sm:rotate-0" />
                    
                    <div className="flex-1">
                      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-600">
                        <Heart className="size-8 text-white" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-gray-900">Raise Character</h3>
                      <p className="mt-2 text-sm text-gray-600">
                        Children of conviction and compassion
                      </p>
                    </div>
                    
                    <ArrowRight className="size-8 text-gray-400 rotate-90 sm:rotate-0" />
                    
                    <div className="flex-1">
                      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-purple-600">
                        <Building className="size-8 text-white" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-gray-900">Transform Society</h3>
                      <p className="mt-2 text-sm text-gray-600">
                        Communities grounded in Godly values
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="mt-8 text-lg text-gray-600">
                  <span className="font-semibold">If</span> parents are equipped with practical, values-based tools → 
                  <span className="font-semibold"> They will</span> raise children of character and conviction → 
                  <span className="font-semibold"> Who grow into</span> responsible adults → 
                  <span className="font-semibold"> Resulting in</span> families, institutions, and societies grounded in Godly values.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}