import { useState } from 'react'
import { ChevronDown, ChevronRight, Search, Printer, Menu } from 'lucide-react'

interface Section {
  id: string
  title: string
  content: string
  subsections?: Section[]
}

interface LegalDocumentProps {
  title: string
  lastUpdated: string
  sections: Section[]
}

export function LegalDocument({ title, lastUpdated, sections }: LegalDocumentProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev: Set<string>) => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const allSections = sections.flatMap(section => [
    section,
    ...(section.subsections || [])
  ])

  const filteredSections = searchQuery
    ? allSections.filter(section =>
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allSections

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileMenuOpen(false)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500 mt-1">Last updated: {lastUpdated}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className={`lg:block w-64 flex-shrink-0 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
            <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Table of Contents */}
              <nav className="space-y-1">
                {sections.map(section => (
                  <div key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {section.title}
                    </button>
                    {section.subsections && section.subsections.length > 0 && (
                      <div className="ml-4 mt-1 space-y-1">
                        {section.subsections.map(subsection => (
                          <button
                            key={subsection.id}
                            onClick={() => scrollToSection(subsection.id)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                              activeSection === subsection.id
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {subsection.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {filteredSections.map(section => (
                <section
                  key={section.id}
                  id={section.id}
                  className="mb-8 scroll-mt-24"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-blue-700 transition-colors mb-3"
                  >
                    {expandedSections.has(section.id) ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                    {section.title}
                  </button>
                  <div
                    className={`prose prose-gray max-w-none ${
                      expandedSections.has(section.id) ? '' : 'hidden'
                    }`}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </section>
              ))}

              {filteredSections.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          aside {
            display: none !important;
          }
          button {
            display: none !important;
          }
          .prose {
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}
