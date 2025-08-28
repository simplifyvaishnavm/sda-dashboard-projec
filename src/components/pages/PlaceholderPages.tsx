import { useState, useMemo } from "react"
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Clock, BarChart3, X, CaretUp, CaretDown, CaretLeft, CaretRight, Columns, MagnifyingGlass, Funnel } from "@phosphor-icons/react"

export function MasterList() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Master List</h1>
          <p className="text-muted-foreground mt-1">Manage all your documents</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <p className="text-muted-foreground">Master List functionality coming soon...</p>
      </div>
    </div>
  )
}

export function Collaborate() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Collaborate</h1>
          <p className="text-muted-foreground mt-1">Work together on documents</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <p className="text-muted-foreground">Collaboration features coming soon...</p>
      </div>
    </div>
  )
}

export function Generate() {
  const [currentTab, setCurrentTab] = useState('generate-collateral')
  const [selectedDocuments, setSelectedDocuments] = useKV('generate-selected-docs', [] as string[])
  const [collateralName, setCollateralName] = useState('')
  const [selectedCollaterals, setSelectedCollaterals] = useKV('generate-selected-collaterals', [] as string[])
  
  // Document grid state with enhanced filtering
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  
  // Column filters for search and filtering
  const [columnFilters, setColumnFilters] = useState({
    documentName: '',
    planType: '',
    egwp: '',
    folderName: '',
    folderVersion: ''
  })
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useKV('generate-visible-columns', {
    documentName: true,
    planType: true,
    egwp: true,
    folderName: true,
    folderVersion: true
  })
  
  // Available columns configuration
  const availableColumns = [
    { key: 'documentName', label: 'Document Name' },
    { key: 'planType', label: 'Plan Type' },
    { key: 'egwp', label: 'EGWP' },
    { key: 'folderName', label: 'Folder Name' },
    { key: 'folderVersion', label: 'Folder Version Number' }
  ]
  
  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((current: any) => ({
      ...current,
      [columnKey]: !current[columnKey]
    }))
  }
  
  // Sample data matching the screenshot
  const collateralOptions = [
    'Medicare ANOC',
    'Medicare EOC',
    'Medicare SB'
  ]
  
  const documents = [
    { id: 'H2406064000', name: 'H2406064000', planType: '', egwp: 'No', folderName: 'H2406064000', folderVersion: '2026_0.01' },
    { id: 'H2406084000', name: 'H2406084000', planType: 'Local PPO', egwp: 'No', folderName: 'H2406084000', folderVersion: '2026_0.01' },
    { id: 'H0169001000', name: 'H0169001000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169001000', folderVersion: '2026_0.01' },
    { id: 'H0169002000', name: 'H0169002000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169002000', folderVersion: '2026_0.01' },
    { id: 'H0169003000', name: 'H0169003000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169003000', folderVersion: '2026_0.01' },
    { id: 'H0169004000', name: 'H0169004000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169004000', folderVersion: '2026_0.01' },
    { id: 'H0169006000', name: 'H0169006000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169006000', folderVersion: '2026_0.01' },
    { id: 'H0169008000', name: 'H0169008000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169008000', folderVersion: '2026_0.01' },
    { id: 'H0169009000', name: 'H0169009000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169009000', folderVersion: '2026_0.01' },
    { id: 'H0169010000', name: 'H0169010000', planType: 'HMO', egwp: 'Yes', folderName: 'H0169010000', folderVersion: '2026_0.01' },
    { id: 'H0169011000', name: 'H0169011000', planType: 'PPO', egwp: 'Yes', folderName: 'H0169011000', folderVersion: '2026_0.01' },
    { id: 'H0169012000', name: 'H0169012000', planType: 'Local PPO', egwp: 'No', folderName: 'H0169012000', folderVersion: '2026_0.02' },
    // Expanded sample data to better showcase pagination
    { id: 'H0169013000', name: 'H0169013000', planType: 'HMO', egwp: 'No', folderName: 'H0169013000', folderVersion: '2026_0.01' },
    { id: 'H0169014000', name: 'H0169014000', planType: 'PPO', egwp: 'Yes', folderName: 'H0169014000', folderVersion: '2026_0.01' },
    { id: 'H0169015000', name: 'H0169015000', planType: 'Local PPO', egwp: 'No', folderName: 'H0169015000', folderVersion: '2026_0.02' },
    { id: 'H0169016000', name: 'H0169016000', planType: 'HMOPOS', egwp: 'Yes', folderName: 'H0169016000', folderVersion: '2026_0.01' },
    { id: 'H0169017000', name: 'H0169017000', planType: 'HMO', egwp: 'No', folderName: 'H0169017000', folderVersion: '2026_0.03' },
    { id: 'H0169018000', name: 'H0169018000', planType: 'PPO', egwp: 'Yes', folderName: 'H0169018000', folderVersion: '2026_0.01' },
    { id: 'H0169019000', name: 'H0169019000', planType: 'Local PPO', egwp: 'No', folderName: 'H0169019000', folderVersion: '2026_0.02' },
    { id: 'H0169020000', name: 'H0169020000', planType: 'HMOPOS', egwp: 'Yes', folderName: 'H0169020000', folderVersion: '2026_0.01' },
    { id: 'H0169021000', name: 'H0169021000', planType: 'HMO', egwp: 'No', folderName: 'H0169021000', folderVersion: '2026_0.01' },
    { id: 'H0169022000', name: 'H0169022000', planType: 'PPO', egwp: 'Yes', folderName: 'H0169022000', folderVersion: '2026_0.02' },
    { id: 'H0169023000', name: 'H0169023000', planType: 'Local PPO', egwp: 'No', folderName: 'H0169023000', folderVersion: '2026_0.01' },
    { id: 'H0169024000', name: 'H0169024000', planType: 'HMOPOS', egwp: 'Yes', folderName: 'H0169024000', folderVersion: '2026_0.03' },
    { id: 'H0169025000', name: 'H0169025000', planType: 'HMO', egwp: 'No', folderName: 'H0169025000', folderVersion: '2026_0.01' },
    { id: 'H0169026000', name: 'H0169026000', planType: 'PPO', egwp: 'Yes', folderName: 'H0169026000', folderVersion: '2026_0.02' },
    { id: 'H0169027000', name: 'H0169027000', planType: 'Local PPO', egwp: 'No', folderName: 'H0169027000', folderVersion: '2026_0.01' },
    { id: 'H0169028000', name: 'H0169028000', planType: 'HMOPOS', egwp: 'Yes', folderName: 'H0169028000', folderVersion: '2026_0.02' },
    { id: 'H0169029000', name: 'H0169029000', planType: 'HMO', egwp: 'No', folderName: 'H0169029000', folderVersion: '2026_0.03' },
    { id: 'H0169030000', name: 'H0169030000', planType: 'PPO', egwp: 'Yes', folderName: 'H0169030000', folderVersion: '2026_0.01' }
  ]
  
  // Filter and sort documents with enhanced filtering
  const filteredAndSortedDocuments = useMemo(() => {
    let filtered = documents.filter(document => {
      // Apply column filters
      if (columnFilters.documentName && !document.name.toLowerCase().includes(columnFilters.documentName.toLowerCase())) {
        return false
      }
      if (columnFilters.planType && !document.planType.toLowerCase().includes(columnFilters.planType.toLowerCase())) {
        return false
      }
      if (columnFilters.egwp && columnFilters.egwp !== 'all' && document.egwp !== columnFilters.egwp) {
        return false
      }
      if (columnFilters.folderName && !document.folderName.toLowerCase().includes(columnFilters.folderName.toLowerCase())) {
        return false
      }
      if (columnFilters.folderVersion && !document.folderVersion.toLowerCase().includes(columnFilters.folderVersion.toLowerCase())) {
        return false
      }
      return true
    })
    
    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField as keyof typeof a] || ''
        const bValue = b[sortField as keyof typeof b] || ''
        
        if (sortDirection === 'asc') {
          return aValue.toString().localeCompare(bValue.toString())
        } else {
          return bValue.toString().localeCompare(aValue.toString())
        }
      })
    }
    
    return filtered
  }, [documents, sortField, sortDirection, columnFilters])
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedDocuments.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageDocuments = filteredAndSortedDocuments.slice(startIndex, endIndex)
  
  // Reset to page 1 when sort or filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [sortField, sortDirection, columnFilters])
  
  const handleDocumentSelect = (docId: string, checked: boolean) => {
    setSelectedDocuments((current: string[]) => 
      checked ? [...current, docId] : current.filter(id => id !== docId)
    )
  }
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allVisibleIds = currentPageDocuments.map(doc => doc.id)
      setSelectedDocuments((current: string[]) => {
        const newSet = new Set([...current, ...allVisibleIds])
        return Array.from(newSet)
      })
    } else {
      const visibleIds = new Set(currentPageDocuments.map(doc => doc.id))
      setSelectedDocuments((current: string[]) => 
        current.filter(id => !visibleIds.has(id))
      )
    }
  }
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const updateColumnFilter = (column: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }))
  }

  const clearColumnFilter = (column: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: ''
    }))
  }

  const clearAllFilters = () => {
    setColumnFilters({
      documentName: '',
      planType: '',
      egwp: '',
      folderName: '',
      folderVersion: ''
    })
  }
  
  const handleCollateralSelect = (collateral: string, checked: boolean) => {
    setSelectedCollaterals((current: string[]) => 
      checked ? [...current, collateral] : current.filter(c => c !== collateral)
    )
  }
  
  const isAllVisibleSelected = currentPageDocuments.length > 0 && 
    currentPageDocuments.every(doc => selectedDocuments.includes(doc.id))
  
  const isSomeVisibleSelected = currentPageDocuments.some(doc => selectedDocuments.includes(doc.id))

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          Generate
        </h1>
        <p className="text-muted-foreground">
          Generate PDF documents and manage collateral
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate-collateral" className="flex items-center gap-2">
            <FileText size={16} />
            Generate Collateral
          </TabsTrigger>
          <TabsTrigger value="queued-collateral" className="flex items-center gap-2">
            <Clock size={16} />
            Queued Collateral
          </TabsTrigger>
          <TabsTrigger value="system-compare" className="flex items-center gap-2">
            <BarChart3 size={16} />
            System Generated Compare
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="generate-collateral" className="mt-6">
          <div className="space-y-6">
            {/* Global Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Effective Year <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="2026">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Print Type <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="regular">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="large-print-16pt">Large Print 16pt</SelectItem>
                        <SelectItem value="large-print-17pt">Large Print 17pt</SelectItem>
                        <SelectItem value="large-print-18pt">Large Print 18pt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Language <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="english">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Version</Label>
                    <Select defaultValue="released">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="released">Released</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">
                      Line of Business <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="both">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="both">Both</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="egwp">EGWP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Main Content Area */}
            <div className="grid grid-cols-[350px_1fr] gap-6">
              {/* Left Panel - Collateral Selection */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    Generate Collaterals List
                    <Button variant="ghost" size="sm">
                      <X size={16} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Collateral Name</Label>
                    <Input
                      value={collateralName}
                      onChange={(e) => setCollateralName(e.target.value)}
                      placeholder="Enter collateral name"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    {collateralOptions.map((collateral) => (
                      <div key={collateral} className="flex items-center space-x-2">
                        <Checkbox
                          id={collateral}
                          checked={selectedCollaterals.includes(collateral)}
                          onCheckedChange={(checked) => 
                            handleCollateralSelect(collateral, checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor={collateral}
                          className="text-sm cursor-pointer flex-1"
                        >
                          {collateral}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Right Panel - Document Selection */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-end gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Columns size={16} />
                          Columns
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        {availableColumns.map((column) => (
                          <DropdownMenuCheckboxItem
                            key={column.key}
                            checked={visibleColumns[column.key]}
                            onCheckedChange={() => toggleColumnVisibility(column.key)}
                          >
                            {column.label}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Queue
                    </Button>
                  </div>
                  
                  <CardTitle className="text-lg mt-4">
                    Select Documents
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {/* Filter Summary and Clear All */}
                  {Object.values(columnFilters).some(filter => filter !== '') && (
                    <div className="flex items-center justify-between mb-4 p-3 bg-blue-50 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Funnel size={16} className="text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          Active Filters: {Object.values(columnFilters).filter(filter => filter !== '').length}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearAllFilters}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Clear All
                      </Button>
                    </div>
                  )}

                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        {/* Column Headers with Sort */}
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-12 border-r">
                            <Checkbox
                              checked={isAllVisibleSelected}
                              onCheckedChange={handleSelectAll}
                              ref={(el) => {
                                if (el) el.indeterminate = isSomeVisibleSelected && !isAllVisibleSelected
                              }}
                            />
                          </TableHead>
                          {visibleColumns.documentName && (
                            <TableHead className="border-r">
                              <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('name')}>
                                Document Name
                                {sortField === 'name' && (
                                  sortDirection === 'asc' ? <CaretUp size={14} /> : <CaretDown size={14} />
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.planType && (
                            <TableHead className="border-r">
                              <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('planType')}>
                                Plan Type
                                {sortField === 'planType' && (
                                  sortDirection === 'asc' ? <CaretUp size={14} /> : <CaretDown size={14} />
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.egwp && (
                            <TableHead className="border-r">
                              <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('egwp')}>
                                EGWP
                                {sortField === 'egwp' && (
                                  sortDirection === 'asc' ? <CaretUp size={14} /> : <CaretDown size={14} />
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.folderName && (
                            <TableHead className="border-r">
                              <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('folderName')}>
                                Folder Name
                                {sortField === 'folderName' && (
                                  sortDirection === 'asc' ? <CaretUp size={14} /> : <CaretDown size={14} />
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.folderVersion && (
                            <TableHead>
                              <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('folderVersion')}>
                                Folder Version Number
                                {sortField === 'folderVersion' && (
                                  sortDirection === 'asc' ? <CaretUp size={14} /> : <CaretDown size={14} />
                                )}
                              </div>
                            </TableHead>
                          )}
                        </TableRow>

                        {/* Filter Row */}
                        <TableRow className="bg-white border-b-2">
                          <TableHead className="p-2 border-r">
                            {/* Empty cell for checkbox column */}
                          </TableHead>
                          {visibleColumns.documentName && (
                            <TableHead className="p-2 border-r">
                              <div className="relative">
                                <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  placeholder="Search documents..."
                                  value={columnFilters.documentName}
                                  onChange={(e) => updateColumnFilter('documentName', e.target.value)}
                                  className="pl-9 h-8 text-sm"
                                />
                                {columnFilters.documentName && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                    onClick={() => clearColumnFilter('documentName')}
                                  >
                                    <X size={12} />
                                  </Button>
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.planType && (
                            <TableHead className="p-2 border-r">
                              <div className="relative">
                                <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  placeholder="Filter plan type..."
                                  value={columnFilters.planType}
                                  onChange={(e) => updateColumnFilter('planType', e.target.value)}
                                  className="pl-9 h-8 text-sm"
                                />
                                {columnFilters.planType && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                    onClick={() => clearColumnFilter('planType')}
                                  >
                                    <X size={12} />
                                  </Button>
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.egwp && (
                            <TableHead className="p-2 border-r">
                              <Select 
                                value={columnFilters.egwp || 'all'} 
                                onValueChange={(value) => updateColumnFilter('egwp', value === 'all' ? '' : value)}
                              >
                                <SelectTrigger className="h-8 text-sm">
                                  <SelectValue placeholder="Filter EGWP" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All</SelectItem>
                                  <SelectItem value="Yes">Yes</SelectItem>
                                  <SelectItem value="No">No</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableHead>
                          )}
                          {visibleColumns.folderName && (
                            <TableHead className="p-2 border-r">
                              <div className="relative">
                                <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  placeholder="Filter folder..."
                                  value={columnFilters.folderName}
                                  onChange={(e) => updateColumnFilter('folderName', e.target.value)}
                                  className="pl-9 h-8 text-sm"
                                />
                                {columnFilters.folderName && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                    onClick={() => clearColumnFilter('folderName')}
                                  >
                                    <X size={12} />
                                  </Button>
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.folderVersion && (
                            <TableHead className="p-2">
                              <div className="relative">
                                <MagnifyingGlass size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  placeholder="Filter version..."
                                  value={columnFilters.folderVersion}
                                  onChange={(e) => updateColumnFilter('folderVersion', e.target.value)}
                                  className="pl-9 h-8 text-sm"
                                />
                                {columnFilters.folderVersion && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                                    onClick={() => clearColumnFilter('folderVersion')}
                                  >
                                    <X size={12} />
                                  </Button>
                                )}
                              </div>
                            </TableHead>
                          )}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentPageDocuments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="text-center py-12 text-muted-foreground">
                              {Object.values(columnFilters).some(filter => filter !== '') 
                                ? "No documents match the current filters" 
                                : "No documents available"
                              }
                            </TableCell>
                          </TableRow>
                        ) : (
                          currentPageDocuments.map((document, index) => (
                            <TableRow 
                              key={document.id} 
                              className={`
                                ${selectedDocuments.includes(document.id) ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/30'}
                                ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                                border-b transition-colors
                              `}
                            >
                              <TableCell className="border-r">
                                <Checkbox
                                  checked={selectedDocuments.includes(document.id)}
                                  onCheckedChange={(checked) => 
                                    handleDocumentSelect(document.id, checked as boolean)
                                  }
                                />
                              </TableCell>
                              {visibleColumns.documentName && (
                                <TableCell className="font-mono text-blue-600 font-medium border-r">
                                  {document.name}
                                </TableCell>
                              )}
                              {visibleColumns.planType && (
                                <TableCell className="border-r">
                                  {document.planType ? (
                                    <Badge variant="outline" className="font-medium">
                                      {document.planType}
                                    </Badge>
                                  ) : (
                                    <span className="text-muted-foreground text-sm italic">—</span>
                                  )}
                                </TableCell>
                              )}
                              {visibleColumns.egwp && (
                                <TableCell className="border-r">
                                  <Badge 
                                    variant={document.egwp === 'Yes' ? 'default' : 'secondary'}
                                    className={document.egwp === 'Yes' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                                  >
                                    {document.egwp}
                                  </Badge>
                                </TableCell>
                              )}
                              {visibleColumns.folderName && (
                                <TableCell className="font-mono text-sm border-r">
                                  {document.folderName}
                                </TableCell>
                              )}
                              {visibleColumns.folderVersion && (
                                <TableCell className="font-mono text-sm">
                                  <Badge variant="outline" className="font-mono text-xs">
                                    {document.folderVersion}
                                  </Badge>
                                </TableCell>
                              )}
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Enhanced Pagination Controls */}
                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>
                        Showing {startIndex + 1} - {Math.min(endIndex, filteredAndSortedDocuments.length)} of {filteredAndSortedDocuments.length}
                        {documents.length !== filteredAndSortedDocuments.length && (
                          <span className="text-blue-600 font-medium">
                            {' '}(filtered from {documents.length} total)
                          </span>
                        )}
                        {selectedDocuments.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {selectedDocuments.length} selected
                          </Badge>
                        )}
                      </span>
                    </div>
                    
                    {totalPages > 1 && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="h-8 w-8 p-0"
                        >
                          <CaretLeft size={14} />
                        </Button>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Page</span>
                          <Input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={currentPage}
                            onChange={(e) => {
                              const page = parseInt(e.target.value)
                              if (page >= 1 && page <= totalPages) {
                                setCurrentPage(page)
                              }
                            }}
                            className="w-16 h-8 text-center text-sm"
                          />
                          <span className="text-sm">of {totalPages}</span>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="h-8 w-8 p-0"
                        >
                          <CaretRight size={14} />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="queued-collateral" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Queued Documents</CardTitle>
              <CardDescription>
                View and manage documents in the generation queue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Queue management interface will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system-compare" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Generated Compare</CardTitle>
              <CardDescription>
                Compare and analyze system-generated documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Comparison tools will be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}



export function Publish() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Publish</h1>
          <p className="text-muted-foreground mt-1">Share and distribute documents</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <p className="text-muted-foreground">Publishing features coming soon...</p>
      </div>
    </div>
  )
}

export function AskBenny() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Ask Benny</h1>
          <p className="text-muted-foreground mt-1">Your AI assistant for document help</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <p className="text-muted-foreground">AI assistant coming soon...</p>
      </div>
    </div>
  )
}

export function AdminSettings() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Admin Settings</h1>
          <p className="text-muted-foreground mt-1">Manage system configuration</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <p className="text-muted-foreground">Admin settings coming soon...</p>
      </div>
    </div>
  )
}

export function DesignStudio() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Design Studio</h1>
          <p className="text-muted-foreground mt-1">Create and manage templates</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-12 text-center">
        <p className="text-muted-foreground">Design studio coming soon...</p>
      </div>
    </div>
  )
}