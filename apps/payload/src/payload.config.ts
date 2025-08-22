import dotenv from 'dotenv'
import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'

// Load environment variables from .env file with explicit path

import sharp from 'sharp' // sharp-import
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Archive } from './collections/Archive'
import { Base } from './collections/Base'
import { Contractor } from './collections/Contractor'
import { Deal } from './collections/Deal'
import { Employee } from './collections/Employee'
import { Finance } from './collections/Finance'
import { Goal } from './collections/Goal'
import { Human } from './collections/Human'
import { Invoice } from './collections/Invoice'
import { Location } from './collections/Location'
import { Message } from './collections/Message'
import { Outreach } from './collections/Outreach'
import { Product } from './collections/Product'
import { Customers } from './collections/Customers'
import { Orders } from './collections/Orders'
import { Instances } from './collections/Instances'
import { Modules } from './collections/Modules'
import { Licenses } from './collections/Licenses'
import { Qualification } from './collections/Qualification'
import { Routine } from './collections/Routine'
import { Text } from './collections/Text'
import { University } from './collections/University'
import { Vote } from './collections/Vote'
import { Wallet } from './collections/Wallet'
import { Yard } from './collections/Yard'
import { Zoo } from './collections/Zoo'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [
    Pages, 
    Posts, 
    Media, 
    Categories, 
    Users,
    Archive,
    Base,
    Contractor,
    Deal,
    Employee,
    Finance,
    Goal,
    Human,
    Invoice,
    Location,
    Message,
    Outreach,
    Product,
    Customers,
    Orders,
    Instances,
    Modules,
    Licenses,
    Qualification,
    Routine,
    Text,
    University,
    Vote,
    Wallet,
    Yard,
    Zoo
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
