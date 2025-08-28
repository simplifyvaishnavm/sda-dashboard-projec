import { useState } from "react"
import { useKV } from '@github/spark/hooks'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Clock, BarChart3, X } from "@phosphor-icons/react"

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
    { id: 'H0169009000', name: 'H0169009000', planType: 'HMOPOS', egwp: 'No', folderName: 'H0169009000', folderVersion: '2026_0.01' }
  ]
  
  const handleDocumentSelect = (docId: string, checked: boolean) => {
    setSelectedDocuments((current: string[]) => 
      checked ? [...current, docId] : current.filter(id => id !== docId)
    )
  }
  
  const handleCollateralSelect = (collateral: string, checked: boolean) => {
    setSelectedCollaterals((current: string[]) => 
      checked ? [...current, collateral] : current.filter(c => c !== collateral)
    )
  }

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
                  <div className="flex items-center justify-end">                    
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Queue
                    </Button>
                  </div>
                  
                  <CardTitle className="text-lg flex items-center justify-between mt-4">
                    Select Documents
                    <Button variant="ghost" size="sm">
                      <X size={16} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-12"></TableHead>
                          <TableHead>Document Name</TableHead>
                          <TableHead>Plan Type</TableHead>
                          <TableHead>EGWP</TableHead>
                          <TableHead>Folder Name</TableHead>
                          <TableHead>Folder Version Number</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documents.map((document) => (
                          <TableRow key={document.id}>
                            <TableCell>
                              <Checkbox
                                checked={selectedDocuments.includes(document.id)}
                                onCheckedChange={(checked) => 
                                  handleDocumentSelect(document.id, checked as boolean)
                                }
                              />
                            </TableCell>
                            <TableCell className="font-mono text-blue-600">
                              {document.name}
                            </TableCell>
                            <TableCell>{document.planType}</TableCell>
                            <TableCell>{document.egwp}</TableCell>
                            <TableCell className="font-mono">
                              {document.folderName}
                            </TableCell>
                            <TableCell className="font-mono">
                              {document.folderVersion}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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