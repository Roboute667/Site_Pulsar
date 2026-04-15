import fs from 'fs'
import path from 'path'

export interface TeamMember {
  name: string
  role: string
  specialty: string
  bio: string
  image?: string
}

export interface FAQItem {
  question: string
  answer: string
  category: 'fundamentals' | 'strategy' | 'operations' | 'compliance'
}

export interface AboutContent {
  mission: string
  approach: {
    title: string
    description: string
  }[]
  risk: {
    title: string
    description: string
  }[]
  location: string
}

const contentDir = path.join(process.cwd(), 'content')

export async function getAboutContent(): Promise<AboutContent> {
  try {
    const filePath = path.join(contentDir, 'about.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error loading about content:', error)
    return {
      mission: 'Loading...',
      approach: [],
      risk: [],
      location: 'London, UK'
    }
  }
}

export async function getTeamContent(): Promise<TeamMember[]> {
  try {
    const filePath = path.join(contentDir, 'team.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error loading team content:', error)
    return []
  }
}

export async function getFAQContent(): Promise<FAQItem[]> {
  try {
    const filePath = path.join(contentDir, 'faq.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error loading FAQ content:', error)
    return []
  }
}

export async function getDisclosuresContent(): Promise<string> {
  try {
    const filePath = path.join(contentDir, 'disclosures.md')
    return fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.error('Error loading disclosures content:', error)
    return 'Content loading...'
  }
}
