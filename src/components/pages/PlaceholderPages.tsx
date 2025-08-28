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
import { FileText, Clock, BarChart3, X, CaretUp, CaretDown, CaretLeft, CaretRight, Columns, MagnifyingGlass, Funnel, Download, Eye, Gear, ArrowUp, ArrowDown } from "@phosphor-icons/react"

// QueuedCollateral component implementation
function QueuedCollateral() {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRows, setSelectedRows] = useKV('queued-selected-rows', [] as string[])
  
  // Filter checkboxes state
  const [viewFilters, setViewFilters] = useKV('queued-view-filters', {
    userGeneratedReleased: true,
    userGeneratedInProgress: false,
    systemGenerated: false
  })
  
  // Column filters for search
  const [columnFilters, setColumnFilters] = useState({
    batchId: '',
    source: '',
    mlType: '',
    collateralName: '',
    fontType: '',
    productName: '',
    folderName: '',
    versionNumber: '',
    status: '',
    queuedDate: '',
    processedDate: '',
    userName: ''
  })
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useKV('queued-visible-columns', {
    batchId: true,
    source: true,
    mlType: true,
    collateralName: true,
    fontType: true,
    productName: true,
    folderName: true,
    versionNumber: true,
    status: true,
    queuedDate: true,
    processedDate: true,
    userName: true,
    downloadPdf: true,
    downloadJson: true
  })
  
  // Sample data based on the screenshot
  const queuedData = [
    {
      id: '47730',
      batchId: '47730',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'H4801024000',
      folderName: 'Term_H4801-024_Blue Cross Medic...',
      versionNumber: '2025_1.0',
      status: 'Complete',
      queuedDate: '07/02/2025 02:05 PM',
      processedDate: '07/02/2025 02:10 PM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47710',
      batchId: '47710',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'H9706060000',
      folderName: 'INDV_H9706-006_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/02/2025 10:07 PM',
      processedDate: '07/02/2025 10:09 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47698',
      batchId: '47698',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'H9706005000',
      folderName: 'INDV_H9706-005_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/02/2025 09:04 AM',
      processedDate: '07/02/2025 09:05 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47693',
      batchId: '47693',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'H9706001000',
      folderName: 'INDV_H9706-001_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/02/2025 07:19 AM',
      processedDate: '07/02/2025 07:20 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47605',
      batchId: '47605',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'H8554001000',
      folderName: 'INDV_H8554-001_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/02/2025 12:38 AM',
      processedDate: '07/02/2025 12:39 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47598',
      batchId: '47598',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'H8133005000',
      folderName: 'INDV_H8133-005_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/01/2025 02:19 PM',
      processedDate: '07/01/2025 02:20 PM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47581',
      batchId: '47581',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'H8133001000',
      folderName: 'INDV_H8133-001_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/01/2025 10:27 AM',
      processedDate: '07/01/2025 10:29 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47579',
      batchId: '47579',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'H8133001000',
      folderName: 'INDV_H8133-001_Blue Cross Medic...',
      versionNumber: '2026_2.02',
      status: 'Complete',
      queuedDate: '07/01/2025 10:20 AM',
      processedDate: '07/01/2025 10:22 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47576',
      batchId: '47576',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'H8554003000',
      folderName: 'INDV_H8554-003_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '07/01/2025 09:45 AM',
      processedDate: '07/01/2025 09:47 AM',
      userName: 'fatima.gavandi'
    },
    {
      id: '47243',
      batchId: '47243',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'S5715012000',
      folderName: 'INDV_S5715-012_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '06/26/2025 09:11 AM',
      processedDate: '06/26/2025 09:12 AM',
      userName: 'kaveri.k'
    },
    {
      id: '47241',
      batchId: '47241',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'S5715010000',
      folderName: 'INDV_S5715-010_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '06/26/2025 09:09 AM',
      processedDate: '06/26/2025 09:10 AM',
      userName: 'kaveri.k'
    },
    {
      id: '47145',
      batchId: '47145',
      source: 'CollateralModule',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H1666008000',
      folderName: 'INDV_H1666-008_Blue Cross Medic...',
      versionNumber: '2026_2.02',
      status: 'Complete',
      queuedDate: '06/25/2025 09:34 AM',
      processedDate: '06/25/2025 09:36 AM',
      userName: 'kaveri.k'
    },
    {
      id: '47143',
      batchId: '47143',
      source: 'CollateralModule',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: 'Regular',
      productName: 'H8634019000',
      folderName: 'INDV_H8634-019_Blue Cross Medic...',
      versionNumber: '2025_2.0',
      status: 'Complete',
      queuedDate: '06/25/2025 09:20 AM',
      processedDate: '06/25/2025 09:21 AM',
      userName: 'Arun.Mandal'
    },
    {
      id: '46992',
      batchId: '46992',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare EOC',
      fontType: '',
      productName: 'City of Chicago (PPO MAPD)',
      folderName: 'Group_City of Chicago H8634',
      versionNumber: '2026_0.01',
      status: 'Complete',
      queuedDate: '06/23/2025 03:39 PM',
      processedDate: '06/23/2025 03:40 PM',
      userName: 'vaibhav.kharat'
    },
    {
      id: '46991',
      batchId: '46991',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare ANOC',
      fontType: '',
      productName: 'City of Chicago (PPO MAPD)',
      folderName: 'Group_City of Chicago H8634',
      versionNumber: '2026_0.01',
      status: 'Complete',
      queuedDate: '06/23/2025 03:35 PM',
      processedDate: '06/23/2025 03:37 PM',
      userName: 'vaibhav.kharat'
    },
    {
      id: '46990',
      batchId: '46990',
      source: '',
      mlType: 'Released',
      collateralName: 'Medicare EOC',
      fontType: '',
      productName: 'City of Chicago (PPO MAPD)',
      folderName: 'Group_City of Chicago H8634',
      versionNumber: '2026_0.01',
      status: 'Complete',
      queuedDate: '06/23/2025 03:33 PM',
      processedDate: '06/23/2025 03:35 PM',
      userName: 'vaibhav.kharat'
    },
    {
      id: '44922',
      batchId: '44922',
      source: 'CollateralModule',
      mlType: 'Released',
      collateralName: 'Medicare EOC',
      fontType: 'Regular',
      productName: 'H8554003000',
      folderName: 'INDV_H8554-003_Blue Cross Medic...',
      versionNumber: '2026_2.02',
      status: 'Complete',
      queuedDate: '06/09/2025 10:27 AM',
      processedDate: '06/09/2025 10:30 AM',
      userName: 'Simran Govande'
    }
  ]
  
  // Available columns configuration
  const availableColumns = [
    { key: 'batchId', label: 'BatchId' },
    { key: 'source', label: 'Source' },
    { key: 'mlType', label: 'ML Type' },
    { key: 'collateralName', label: 'Collateral Name' },
    { key: 'fontType', label: 'Font Type' },
    { key: 'productName', label: 'Product Name' },
    { key: 'folderName', label: 'Folder Name' },
    { key: 'versionNumber', label: 'Version Number' },
    { key: 'status', label: 'Status' },
    { key: 'queuedDate', label: 'Queued Date' },
    { key: 'processedDate', label: 'Processed Date' },
    { key: 'userName', label: 'UserName' },
    { key: 'downloadPdf', label: 'Download PDF' },
    { key: 'downloadJson', label: 'Download ...' }
  ]
  
  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = queuedData.filter(item => {
      // Apply column filters
      if (columnFilters.batchId && !item.batchId.toLowerCase().includes(columnFilters.batchId.toLowerCase())) {
        return false
      }
      if (columnFilters.source && !item.source.toLowerCase().includes(columnFilters.source.toLowerCase())) {
        return false
      }
      if (columnFilters.mlType && !item.mlType.toLowerCase().includes(columnFilters.mlType.toLowerCase())) {
        return false
      }
      if (columnFilters.collateralName && !item.collateralName.toLowerCase().includes(columnFilters.collateralName.toLowerCase())) {
        return false
      }
      if (columnFilters.fontType && !item.fontType.toLowerCase().includes(columnFilters.fontType.toLowerCase())) {
        return false
      }
      if (columnFilters.productName && !item.productName.toLowerCase().includes(columnFilters.productName.toLowerCase())) {
        return false
      }
      if (columnFilters.folderName && !item.folderName.toLowerCase().includes(columnFilters.folderName.toLowerCase())) {
        return false
      }
      if (columnFilters.versionNumber && !item.versionNumber.toLowerCase().includes(columnFilters.versionNumber.toLowerCase())) {
        return false
      }
      if (columnFilters.status && !item.status.toLowerCase().includes(columnFilters.status.toLowerCase())) {
        return false
      }
      if (columnFilters.queuedDate && !item.queuedDate.toLowerCase().includes(columnFilters.queuedDate.toLowerCase())) {
        return false
      }
      if (columnFilters.processedDate && !item.processedDate.toLowerCase().includes(columnFilters.processedDate.toLowerCase())) {
        return false
      }
      if (columnFilters.userName && !item.userName.toLowerCase().includes(columnFilters.userName.toLowerCase())) {
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
  }, [queuedData, sortField, sortDirection, columnFilters])
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentPageData = filteredAndSortedData.slice(startIndex, endIndex)
  
  // Reset to page 1 when sort or filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [sortField, sortDirection, columnFilters])
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const handleRowSelect = (rowId: string, checked: boolean) => {
    setSelectedRows((current: string[]) => 
      checked ? [...current, rowId] : current.filter(id => id !== rowId)
    )
  }
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allVisibleIds = currentPageData.map(item => item.id)
      setSelectedRows((current: string[]) => {
        const newSet = new Set([...current, ...allVisibleIds])
        return Array.from(newSet)
      })
    } else {
      const visibleIds = new Set(currentPageData.map(item => item.id))
      setSelectedRows((current: string[]) => 
        current.filter(id => !visibleIds.has(id))
      )
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
  
  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns((current: any) => ({
      ...current,
      [columnKey]: !current[columnKey]
    }))
  }
  
  const toggleViewFilter = (filterKey: string) => {
    setViewFilters((current: any) => ({
      ...current,
      [filterKey]: !current[filterKey]
    }))
  }
  
  const isAllVisibleSelected = currentPageData.length > 0 && 
    currentPageData.every(item => selectedRows.includes(item.id))
  
  const isSomeVisibleSelected = currentPageData.some(item => selectedRows.includes(item.id))
  
  return (
    <div className="space-y-4">
      {/* Header with View Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Collaterals Queued</h2>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Checkbox
              id="view-user-generated-released"
              checked={viewFilters.userGeneratedReleased}
              onCheckedChange={() => toggleViewFilter('userGeneratedReleased')}
            />
            <Label htmlFor="view-user-generated-released" className="cursor-pointer">
              View User Generated - Released ML
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="view-user-generated-progress"
              checked={viewFilters.userGeneratedInProgress}
              onCheckedChange={() => toggleViewFilter('userGeneratedInProgress')}
            />
            <Label htmlFor="view-user-generated-progress" className="cursor-pointer">
              View User Generated - In Progress ML
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="view-system-generated"
              checked={viewFilters.systemGenerated}
              onCheckedChange={() => toggleViewFilter('systemGenerated')}
            />
            <Label htmlFor="view-system-generated" className="cursor-pointer">
              View System Generated
            </Label>
          </div>
        </div>
      </div>
      
      {/* Actions and Column Controls */}
      <div className="flex items-center justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2 h-8">
              <Columns size={14} />
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
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
        
        {/* Action buttons */}
        <Button variant="outline" size="sm" className="h-8">
          <Gear size={14} className="mr-1" />
        </Button>
        <Button variant="outline" size="sm" className="h-8">
          <ArrowDown size={14} className="mr-1" />
        </Button>
        <Button variant="outline" size="sm" className="h-8">
          <ArrowUp size={14} className="mr-1" />
        </Button>
        <Button variant="outline" size="sm" className="h-8">
          <X size={14} className="mr-1" />
        </Button>
        <Button variant="outline" size="sm" className="h-8">
          <Eye size={14} className="mr-1" />
        </Button>
      </div>
      
      {/* Data Grid */}
      <Card>
        <CardContent className="p-0">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                {/* Column Headers with Sort */}
                <TableRow className="bg-muted/50">
                  <TableHead className="w-10 border-r h-10">
                    <Checkbox
                      checked={isAllVisibleSelected}
                      onCheckedChange={handleSelectAll}
                      ref={(el) => {
                        if (el) el.indeterminate = isSomeVisibleSelected && !isAllVisibleSelected
                      }}
                    />
                  </TableHead>
                  {visibleColumns.batchId && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('batchId')}>
                        BatchId
                        {sortField === 'batchId' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.source && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('source')}>
                        Source
                        {sortField === 'source' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.mlType && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('mlType')}>
                        ML Type
                        {sortField === 'mlType' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.collateralName && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('collateralName')}>
                        Collateral Name
                        {sortField === 'collateralName' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.fontType && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('fontType')}>
                        Font Type
                        {sortField === 'fontType' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.productName && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('productName')}>
                        Product Name
                        {sortField === 'productName' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.folderName && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('folderName')}>
                        Folder Name
                        {sortField === 'folderName' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.versionNumber && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('versionNumber')}>
                        Version Number
                        {sortField === 'versionNumber' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.status && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('status')}>
                        Status
                        {sortField === 'status' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.queuedDate && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('queuedDate')}>
                        Queued Date
                        {sortField === 'queuedDate' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.processedDate && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('processedDate')}>
                        Processed Date
                        {sortField === 'processedDate' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.userName && (
                    <TableHead className="border-r h-10">
                      <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('userName')}>
                        UserName
                        {sortField === 'userName' && (
                          sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.downloadPdf && (
                    <TableHead className="border-r h-10 text-center">
                      Download PDF
                    </TableHead>
                  )}
                  {visibleColumns.downloadJson && (
                    <TableHead className="h-10 text-center">
                      Download ...
                    </TableHead>
                  )}
                </TableRow>

                {/* Filter Row */}
                <TableRow className="bg-white border-b-2">
                  <TableHead className="p-1 border-r">
                    {/* Empty cell for checkbox column */}
                  </TableHead>
                  {visibleColumns.batchId && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.batchId}
                          onChange={(e) => updateColumnFilter('batchId', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.batchId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('batchId')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.source && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.source}
                          onChange={(e) => updateColumnFilter('source', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.source && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('source')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.mlType && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.mlType}
                          onChange={(e) => updateColumnFilter('mlType', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.mlType && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('mlType')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.collateralName && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.collateralName}
                          onChange={(e) => updateColumnFilter('collateralName', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.collateralName && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('collateralName')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.fontType && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.fontType}
                          onChange={(e) => updateColumnFilter('fontType', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.fontType && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('fontType')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.productName && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.productName}
                          onChange={(e) => updateColumnFilter('productName', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.productName && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('productName')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.folderName && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.folderName}
                          onChange={(e) => updateColumnFilter('folderName', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.folderName && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('folderName')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.versionNumber && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.versionNumber}
                          onChange={(e) => updateColumnFilter('versionNumber', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.versionNumber && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('versionNumber')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.status && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.status}
                          onChange={(e) => updateColumnFilter('status', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.status && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('status')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.queuedDate && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.queuedDate}
                          onChange={(e) => updateColumnFilter('queuedDate', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.queuedDate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('queuedDate')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.processedDate && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.processedDate}
                          onChange={(e) => updateColumnFilter('processedDate', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.processedDate && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('processedDate')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.userName && (
                    <TableHead className="p-1 border-r">
                      <div className="relative">
                        <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <Input
                          value={columnFilters.userName}
                          onChange={(e) => updateColumnFilter('userName', e.target.value)}
                          className="pl-7 h-7 text-sm"
                        />
                        {columnFilters.userName && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                            onClick={() => clearColumnFilter('userName')}
                          >
                            <X size={10} />
                          </Button>
                        )}
                      </div>
                    </TableHead>
                  )}
                  {visibleColumns.downloadPdf && (
                    <TableHead className="p-1 border-r">
                      {/* Empty for Download PDF column */}
                    </TableHead>
                  )}
                  {visibleColumns.downloadJson && (
                    <TableHead className="p-1">
                      {/* Empty for Download JSON column */}
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentPageData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="text-center py-8 text-muted-foreground">
                      {Object.values(columnFilters).some(filter => filter !== '') 
                        ? "No items match the current filters" 
                        : "No queued items available"
                      }
                    </TableCell>
                  </TableRow>
                ) : (
                  currentPageData.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      className={`
                        ${selectedRows.includes(item.id) ? 'bg-blue-50 border-blue-200' : 'hover:bg-muted/30'}
                        ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}
                        border-b transition-colors h-9
                      `}
                    >
                      <TableCell className="border-r p-2">
                        <Checkbox
                          checked={selectedRows.includes(item.id)}
                          onCheckedChange={(checked) => 
                            handleRowSelect(item.id, checked as boolean)
                          }
                        />
                      </TableCell>
                      {visibleColumns.batchId && (
                        <TableCell className="font-mono text-blue-600 font-medium border-r p-2 text-sm">
                          {item.batchId}
                        </TableCell>
                      )}
                      {visibleColumns.source && (
                        <TableCell className="border-r p-2 text-sm">
                          {item.source || (
                            <span className="text-muted-foreground italic">—</span>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.mlType && (
                        <TableCell className="border-r p-2">
                          <Badge variant="outline" className="text-xs">
                            {item.mlType}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.collateralName && (
                        <TableCell className="border-r p-2 text-sm">
                          {item.collateralName}
                        </TableCell>
                      )}
                      {visibleColumns.fontType && (
                        <TableCell className="border-r p-2 text-sm">
                          {item.fontType || (
                            <span className="text-muted-foreground italic">—</span>
                          )}
                        </TableCell>
                      )}
                      {visibleColumns.productName && (
                        <TableCell className="border-r p-2 text-sm font-mono">
                          {item.productName}
                        </TableCell>
                      )}
                      {visibleColumns.folderName && (
                        <TableCell className="border-r p-2 text-sm font-mono max-w-48 truncate" title={item.folderName}>
                          {item.folderName}
                        </TableCell>
                      )}
                      {visibleColumns.versionNumber && (
                        <TableCell className="border-r p-2">
                          <Badge variant="outline" className="font-mono text-xs">
                            {item.versionNumber}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.status && (
                        <TableCell className="border-r p-2">
                          <Badge variant="default" className="bg-green-100 text-green-800 border-green-300 text-xs">
                            {item.status}
                          </Badge>
                        </TableCell>
                      )}
                      {visibleColumns.queuedDate && (
                        <TableCell className="border-r p-2 text-sm font-mono">
                          {item.queuedDate}
                        </TableCell>
                      )}
                      {visibleColumns.processedDate && (
                        <TableCell className="border-r p-2 text-sm font-mono">
                          {item.processedDate}
                        </TableCell>
                      )}
                      {visibleColumns.userName && (
                        <TableCell className="border-r p-2 text-sm">
                          {item.userName}
                        </TableCell>
                      )}
                      {visibleColumns.downloadPdf && (
                        <TableCell className="border-r p-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-600">
                              <Download size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-orange-600">
                              <Download size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                      {visibleColumns.downloadJson && (
                        <TableCell className="p-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-blue-600">
                              <Download size={14} />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-600">
                              <Download size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Enhanced Pagination Controls */}
          <div className="flex items-center justify-between mt-3 px-3 pb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <span>
                Showing {startIndex + 1} - {Math.min(endIndex, filteredAndSortedData.length)} of {filteredAndSortedData.length}
                {queuedData.length !== filteredAndSortedData.length && (
                  <span className="text-blue-600 font-medium">
                    {' '}(filtered from {queuedData.length} total)
                  </span>
                )}
                {selectedRows.length > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {selectedRows.length} selected
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
                  className="h-7 w-7 p-0"
                >
                  <CaretLeft size={12} />
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
                    className="w-14 h-7 text-center text-sm"
                  />
                  <span className="text-sm">of {totalPages}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-7 w-7 p-0"
                >
                  <CaretRight size={12} />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function MasterList() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Master List</h1>
          <p className="text-muted-foreground mt-1">Manage all your documents</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Master List functionality coming soon...</p>
      </div>
    </div>
  )
}

export function Collaborate() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Collaborate</h1>
          <p className="text-muted-foreground mt-1">Work together on documents</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
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
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-foreground mb-2">
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
        
        <TabsContent value="generate-collateral" className="mt-4">
          <div className="space-y-4">
            {/* Global Filters */}
            <Card>
              <CardContent className="pt-4">
                <div className="grid grid-cols-5 gap-3">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">
                      Effective Year <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="2026">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2024">2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">
                      Print Type <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="regular">
                      <SelectTrigger className="h-9">
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
                  
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">
                      Language <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="english">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="chinese">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Version</Label>
                    <Select defaultValue="released">
                      <SelectTrigger className="h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="released">Released</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">
                      Line of Business <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="both">
                      <SelectTrigger className="h-9">
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
            <div className="grid grid-cols-[320px_1fr] gap-4">
              {/* Left Panel - Collateral Selection */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    Generate Collaterals List
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <X size={14} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium">Collateral Name</Label>
                    <Input
                      value={collateralName}
                      onChange={(e) => setCollateralName(e.target.value)}
                      placeholder="Enter collateral name"
                      className="h-9"
                    />
                  </div>
                  
                  <div className="space-y-2">
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
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-end gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-2 h-8">
                          <Columns size={14} />
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
                    <Button className="bg-blue-600 hover:bg-blue-700 h-8">
                      Queue
                    </Button>
                  </div>
                  
                  <CardTitle className="text-base mt-3">
                    Select Documents
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-3">
                  {/* Filter Summary and Clear All */}
                  {Object.values(columnFilters).some(filter => filter !== '') && (
                    <div className="flex items-center justify-between mb-3 p-2 bg-blue-50 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <Funnel size={14} className="text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          Active Filters: {Object.values(columnFilters).filter(filter => filter !== '').length}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearAllFilters}
                        className="text-blue-600 hover:text-blue-700 h-7"
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
                          <TableHead className="w-10 border-r h-10">
                            <Checkbox
                              checked={isAllVisibleSelected}
                              onCheckedChange={handleSelectAll}
                              ref={(el) => {
                                if (el) el.indeterminate = isSomeVisibleSelected && !isAllVisibleSelected
                              }}
                            />
                          </TableHead>
                          {visibleColumns.documentName && (
                            <TableHead className="border-r h-10">
                              <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('name')}>
                                Document Name
                                {sortField === 'name' && (
                                  sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.planType && (
                            <TableHead className="border-r h-10">
                              <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('planType')}>
                                Plan Type
                                {sortField === 'planType' && (
                                  sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.egwp && (
                            <TableHead className="border-r h-10">
                              <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('egwp')}>
                                EGWP
                                {sortField === 'egwp' && (
                                  sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.folderName && (
                            <TableHead className="border-r h-10">
                              <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('folderName')}>
                                Folder Name
                                {sortField === 'folderName' && (
                                  sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.folderVersion && (
                            <TableHead className="h-10">
                              <div className="flex items-center gap-1 cursor-pointer select-none font-semibold" onClick={() => handleSort('folderVersion')}>
                                Folder Version Number
                                {sortField === 'folderVersion' && (
                                  sortDirection === 'asc' ? <CaretUp size={12} /> : <CaretDown size={12} />
                                )}
                              </div>
                            </TableHead>
                          )}
                        </TableRow>

                        {/* Filter Row */}
                        <TableRow className="bg-white border-b-2">
                          <TableHead className="p-1 border-r">
                            {/* Empty cell for checkbox column */}
                          </TableHead>
                          {visibleColumns.documentName && (
                            <TableHead className="p-1 border-r">
                              <div className="relative">
                                <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  value={columnFilters.documentName}
                                  onChange={(e) => updateColumnFilter('documentName', e.target.value)}
                                  className="pl-7 h-7 text-sm"
                                />
                                {columnFilters.documentName && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                                    onClick={() => clearColumnFilter('documentName')}
                                  >
                                    <X size={10} />
                                  </Button>
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.planType && (
                            <TableHead className="p-1 border-r">
                              <div className="relative">
                                <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  value={columnFilters.planType}
                                  onChange={(e) => updateColumnFilter('planType', e.target.value)}
                                  className="pl-7 h-7 text-sm"
                                />
                                {columnFilters.planType && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                                    onClick={() => clearColumnFilter('planType')}
                                  >
                                    <X size={10} />
                                  </Button>
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.egwp && (
                            <TableHead className="p-1 border-r">
                              <Select 
                                value={columnFilters.egwp || 'all'} 
                                onValueChange={(value) => updateColumnFilter('egwp', value === 'all' ? '' : value)}
                              >
                                <SelectTrigger className="h-7 text-sm">
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
                            <TableHead className="p-1 border-r">
                              <div className="relative">
                                <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  value={columnFilters.folderName}
                                  onChange={(e) => updateColumnFilter('folderName', e.target.value)}
                                  className="pl-7 h-7 text-sm"
                                />
                                {columnFilters.folderName && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                                    onClick={() => clearColumnFilter('folderName')}
                                  >
                                    <X size={10} />
                                  </Button>
                                )}
                              </div>
                            </TableHead>
                          )}
                          {visibleColumns.folderVersion && (
                            <TableHead className="p-1">
                              <div className="relative">
                                <MagnifyingGlass size={12} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  value={columnFilters.folderVersion}
                                  onChange={(e) => updateColumnFilter('folderVersion', e.target.value)}
                                  className="pl-7 h-7 text-sm"
                                />
                                {columnFilters.folderVersion && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                                    onClick={() => clearColumnFilter('folderVersion')}
                                  >
                                    <X size={10} />
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
                            <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length + 1} className="text-center py-8 text-muted-foreground">
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
                                border-b transition-colors h-9
                              `}
                            >
                              <TableCell className="border-r p-2">
                                <Checkbox
                                  checked={selectedDocuments.includes(document.id)}
                                  onCheckedChange={(checked) => 
                                    handleDocumentSelect(document.id, checked as boolean)
                                  }
                                />
                              </TableCell>
                              {visibleColumns.documentName && (
                                <TableCell className="font-mono text-blue-600 font-medium border-r p-2 text-sm">
                                  {document.name}
                                </TableCell>
                              )}
                              {visibleColumns.planType && (
                                <TableCell className="border-r p-2">
                                  {document.planType ? (
                                    <Badge variant="outline" className="font-medium text-xs">
                                      {document.planType}
                                    </Badge>
                                  ) : (
                                    <span className="text-muted-foreground text-sm italic">—</span>
                                  )}
                                </TableCell>
                              )}
                              {visibleColumns.egwp && (
                                <TableCell className="border-r p-2">
                                  <Badge 
                                    variant={document.egwp === 'Yes' ? 'default' : 'secondary'}
                                    className={`text-xs ${document.egwp === 'Yes' ? 'bg-green-100 text-green-800 border-green-300' : ''}`}
                                  >
                                    {document.egwp}
                                  </Badge>
                                </TableCell>
                              )}
                              {visibleColumns.folderName && (
                                <TableCell className="font-mono text-sm border-r p-2">
                                  {document.folderName}
                                </TableCell>
                              )}
                              {visibleColumns.folderVersion && (
                                <TableCell className="font-mono text-sm p-2">
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
                  <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span>
                        Showing {startIndex + 1} - {Math.min(endIndex, filteredAndSortedDocuments.length)} of {filteredAndSortedDocuments.length}
                        {documents.length !== filteredAndSortedDocuments.length && (
                          <span className="text-blue-600 font-medium">
                            {' '}(filtered from {documents.length} total)
                          </span>
                        )}
                        {selectedDocuments.length > 0 && (
                          <Badge variant="secondary" className="ml-2 text-xs">
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
                          className="h-7 w-7 p-0"
                        >
                          <CaretLeft size={12} />
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
                            className="w-14 h-7 text-center text-sm"
                          />
                          <span className="text-sm">of {totalPages}</span>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="h-7 w-7 p-0"
                        >
                          <CaretRight size={12} />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="queued-collateral" className="mt-4">
          <QueuedCollateral />
        </TabsContent>
        
        <TabsContent value="system-compare" className="mt-4">
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
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Publish</h1>
          <p className="text-muted-foreground mt-1">Share and distribute documents</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Publishing features coming soon...</p>
      </div>
    </div>
  )
}

export function AskBenny() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Ask Benny</h1>
          <p className="text-muted-foreground mt-1">Your AI assistant for document help</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">AI assistant coming soon...</p>
      </div>
    </div>
  )
}

export function AdminSettings() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Admin Settings</h1>
          <p className="text-muted-foreground mt-1">Manage system configuration</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Admin settings coming soon...</p>
      </div>
    </div>
  )
}

export function DesignStudio() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Design Studio</h1>
          <p className="text-muted-foreground mt-1">Create and manage templates</p>
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <p className="text-muted-foreground">Design studio coming soon...</p>
      </div>
    </div>
  )
}