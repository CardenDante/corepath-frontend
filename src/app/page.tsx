import React from 'react'
import Link from 'next/link'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { 
  Globe, 
  Compass, 
  BookOpen, 
  Heart, 
  CheckCircle, 
  Target, 
  Users, 
  Star,
  ShoppingCart,
  GraduationCap,
  Handshake,
  ArrowRight,
  Award,
  BarChart3,
  Quote,
  ChevronRight
} from 'lucide-react'

const primaryFeatures = [
  {
    name: 'Train-Up Cards',
    description: 'Daily practice cards that make values tangible and actionable for children aged 4-18.',
    icon: Star,
  },
  {
    name: 'Corrective & Reward System',
    description: 'Behavioral science-backed approach to guide children through mistakes with grace and celebrate growth.',
    icon: Award,
  },
  {
    name: 'Predisposition-Based Guides',
    description: 'Tailored parenting strategies based on your child\'s unique personality and design.',
    icon: Users,
  },
]

const secondaryFeatures = [
  {
    name: 'International Reach',
    description: 'Supporting families across cultures with universal values that transcend borders and backgrounds.',
    href: '/about',
    icon: Globe,
  },
  {
    name: 'Structured System',
    description: 'Deliberate, guided parenting tools that bring clarity and consistency to your daily routines.',
    href: '/products',
    icon: Compass,
  },
  {
    name: 'Spiritual Foundation',
    description: 'Value-based content rooted in timeless principles and spiritually grounded wisdom.',
    href: '/about',
    icon: BookOpen,
  },
]

const testimonials = [
  [
    [
      {
        body: 'CorePath Impact transformed our family dynamics. The structured approach to values has brought so much clarity and peace to our home.',
        author: {
          name: 'Sarah Mitchell',
          handle: 'sarahmitchell',
          imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        body: 'We struggled with consistency, but CorePath Impact\'s deliberate strategies made all the difference. Our children are now actively living out our family values.',
        author: {
          name: 'David Thompson',
          handle: 'davidthompson',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
  ],
  [
    [
      {
        body: 'The VDC Toolkit gave us practical tools that actually work. My teenager is more engaged and we have meaningful conversations about values daily.',
        author: {
          name: 'Maria Rodriguez',
          handle: 'mariarodriguez',
          imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
    [
      {
        body: 'As a single mom, I needed structure and guidance. CorePath Impact provided exactly what I was looking for - biblical wisdom with practical application.',
        author: {
          name: 'Jennifer Lee',
          handle: 'jenniferlee',
          imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
    ],
  ],
]

const featuredTestimonial = {
  body: 'CorePath Impact revolutionized how we approach parenting. The ATTR method - Affirm, Train, Track, Reward - gave us a clear framework that our whole family understands. Our children are developing genuine character, not just good behavior.',
  author: {
    name: 'Pastor Michael Johnson',
    handle: 'pastormichael',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    logoUrl: '/logos/church-logo.svg',
  },
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function HomePage() {
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
                  id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
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
              <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
            </svg>
            
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
              <div className="lg:flex lg:items-center lg:gap-x-10">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                  <div className="flex">
                    <div className="relative flex items-center gap-x-4 rounded-full bg-white px-4 py-1 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-all">
                      <span className="font-semibold text-blue-600">Now Available</span>
                      <span aria-hidden="true" className="h-4 w-px bg-gray-900/10" />
                      <Link href="/shop" className="flex items-center gap-x-1 hover:text-blue-600 transition-colors">
                        <span aria-hidden="true" className="absolute inset-0" />
                        VDC Toolkit for all ages
                        <ChevronRight aria-hidden="true" className="size-4 text-gray-400" />
                      </Link>
                    </div>
                  </div>
                  
                  <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Shape hearts, not just behavior
                  </h1>
                  <p className="mt-6 text-lg text-gray-600 sm:text-xl">
                    CorePath Impact equips parents with intentional, deliberate, and structured tools to raise children of conviction, compassion, and calling through our proven Values Driven Child (VDC) system.
                  </p>
                  
                  <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <Link
                      href="/shop"
                      className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                    >
                      Get the Toolkit
                    </Link>
                    <Link href="/training" className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      Join a Parenting Class <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
                
                <div className="mt-12 lg:mt-0 lg:shrink-0 lg:grow">
                  <div className="mx-auto w-full max-w-lg lg:max-w-none">
                    <div className="relative">
                      <img
                        src="/images/about_2.jpg"
                        alt="Happy family reading together, demonstrating values-based parenting"
                        className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logo cloud */}
          <div className="py-8 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-8 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                <div className="col-span-1 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-400 font-medium text-sm">Churches</span>
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <Users className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-400 font-medium text-sm">Families</span>
                  </div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-400 font-medium text-sm">Schools</span>
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-1 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-400 font-medium text-sm">Global</span>
                  </div>
                </div>
                <div className="col-span-1 sm:col-span-1 flex items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <Handshake className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-400 font-medium text-sm">Partners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VDC Toolkit Feature section */}
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 sm:rounded-3xl sm:px-12 lg:px-16 lg:py-20">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-0">
                  <div className="lg:max-w-lg">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                      The VDC Toolkit: Your complete parenting system
                    </h2>
                    <p className="mt-6 text-lg text-gray-300">
                      A hands-on system to instill 24 timeless foundational values in children aged 4–18. Every piece is age-aligned, spiritually grounded, and tailored to your child's unique design.
                    </p>
                    
                    <dl className="mt-10 space-y-6 text-base text-gray-300">
                      {primaryFeatures.map((feature) => (
                        <div key={feature.name} className="relative">
                          <dt className="ml-9 inline-block font-semibold text-white">
                            <feature.icon aria-hidden="true" className="absolute left-1 top-1 size-5 text-blue-400" />
                            {feature.name}
                          </dt>{' '}
                          <dd className="inline">{feature.description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  
                  <div className="relative">
                    <img
                      src="/images/home_2.jpg"
                      alt="VDC Toolkit components including cards, charts, and guidebooks for values-driven parenting"
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl shadow-2xl ring-1 ring-white/10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <Award className="w-10 h-10 mb-2" />
                      <p className="text-lg font-semibold">VDC Toolkit</p>
                      <p className="text-blue-200 text-sm">Complete Parenting System</p>
                    </div>
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

          {/* ATTR Method section */}
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold text-blue-600">Proven Method</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Affirm – Train – Track – Reward
                </p>
                <p className="mt-6 text-lg text-gray-600">
                  At the heart of the VDC Toolkit is our simple, powerful four-step system that makes value-based parenting consistent, practical, and effective for every family.
                </p>
              </div>
              
              <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-3">
                  {secondaryFeatures.map((feature) => (
                    <div key={feature.name} className="flex flex-col">
                      <dt className="flex items-center gap-x-3 text-base font-semibold text-gray-900">
                        <feature.icon aria-hidden="true" className="size-5 flex-none text-blue-600" />
                        {feature.name}
                      </dt>
                      <dd className="mt-4 flex flex-auto flex-col text-base text-gray-600">
                        <p className="flex-auto">{feature.description}</p>
                        <p className="mt-6">
                          <Link href={feature.href} className="text-sm font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                            Learn more <span aria-hidden="true">→</span>
                          </Link>
                        </p>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-16 shadow-2xl sm:rounded-3xl sm:px-16 lg:px-24 lg:py-20">
                <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to transform your parenting?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-center text-lg text-gray-300">
                  Join thousands of families who are raising children of conviction, compassion, and calling with our proven VDC system.
                </p>
                
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/shop"
                    className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 transition-colors"
                  >
                    Get the Toolkit
                  </Link>
                  <Link href="/training" className="text-sm font-semibold text-white hover:text-gray-300 transition-colors">
                    Join a Class <span aria-hidden="true">→</span>
                  </Link>
                </div>
                
                <svg
                  viewBox="0 0 1024 1024"
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2"
                >
                  <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                  <defs>
                    <radialGradient
                      r={1}
                      cx={0}
                      cy={0}
                      id="759c1415-0410-454c-8f7c-9a820de03641"
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

          {/* Testimonials section */}
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl sm:text-center">
                <h2 className="text-base font-semibold text-blue-600">Testimonials</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Transforming families worldwide
                </p>
              </div>
              
              <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {/* Featured testimonial */}
                <div className="lg:col-span-2">
                  <figure className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-900/5">
                    <blockquote className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
                      <p>"{featuredTestimonial.body}"</p>
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-x-4">
                      <img
                        alt=""
                        src={featuredTestimonial.author.imageUrl}
                        className="size-10 rounded-full bg-gray-50"
                      />
                      <div className="flex-auto">
                        <div className="font-semibold">{featuredTestimonial.author.name}</div>
                        <div className="text-gray-600">{`@${featuredTestimonial.author.handle}`}</div>
                      </div>
                      <Heart className="h-8 w-8 text-blue-600" />
                    </figcaption>
                  </figure>
                </div>
                
                {/* Other testimonials */}
                <div className="space-y-6">
                  {testimonials[0][0].map((testimonial, idx) => (
                    <figure key={idx} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                      <blockquote className="text-gray-900">
                        <p>"{testimonial.body}"</p>
                      </blockquote>
                      <figcaption className="mt-4 flex items-center gap-x-4">
                        <img
                          alt=""
                          src={testimonial.author.imageUrl}
                          className="size-8 rounded-full bg-gray-50"
                        />
                        <div>
                          <div className="font-semibold text-sm">{testimonial.author.name}</div>
                          <div className="text-gray-600 text-xs">{`@${testimonial.author.handle}`}</div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                  
                  {testimonials[1][0].map((testimonial, idx) => (
                    <figure key={idx} className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
                      <blockquote className="text-gray-900">
                        <p>"{testimonial.body}"</p>
                      </blockquote>
                      <figcaption className="mt-4 flex items-center gap-x-4">
                        <img
                          alt=""
                          src={testimonial.author.imageUrl}
                          className="size-8 rounded-full bg-gray-50"
                        />
                        <div>
                          <div className="font-semibold text-sm">{testimonial.author.name}</div>
                          <div className="text-gray-600 text-xs">{`@${testimonial.author.handle}`}</div>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}