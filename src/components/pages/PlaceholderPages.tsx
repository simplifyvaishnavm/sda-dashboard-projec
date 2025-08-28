import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FileText, Clock, BarChart3 } from "@phosphor-icons/react"

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
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Generate</h1>
          <p className="text-muted-foreground mt-1">AI-powered document creation</p>
        </div>
      </div>
      
      <GenerateTabs />
    </div>
  )
}

function GenerateTabs() {
  return (
    <Tabs defaultValue="generate" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="generate" className="flex items-center gap-2">
          <FileText className="size-4" />
          Generate Collateral
        </TabsTrigger>
        <TabsTrigger value="queued" className="flex items-center gap-2">
          <Clock className="size-4" />
          Queued Collateral
        </TabsTrigger>
        <TabsTrigger value="compare" className="flex items-center gap-2">
          <BarChart3 className="size-4" />
          System Generated Compare
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="generate" className="mt-6">
        <div className="bg-card rounded-lg border border-border p-8">
          <div className="text-center mb-6">
            <FileText className="size-12 mx-auto text-primary mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Generate New Collateral</h3>
            <p className="text-muted-foreground">Create professional documents with AI assistance</p>
          </div>
          <div className="max-w-md mx-auto">
            <p className="text-sm text-muted-foreground text-center">Document generation interface coming soon...</p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="queued" className="mt-6">
        <div className="bg-card rounded-lg border border-border p-8">
          <div className="text-center mb-6">
            <Clock className="size-12 mx-auto text-accent mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Queued Collateral</h3>
            <p className="text-muted-foreground">Track your pending document generation requests</p>
          </div>
          <div className="max-w-md mx-auto">
            <p className="text-sm text-muted-foreground text-center">Queue management interface coming soon...</p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="compare" className="mt-6">
        <div className="bg-card rounded-lg border border-border p-8">
          <div className="text-center mb-6">
            <BarChart3 className="size-12 mx-auto text-secondary-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">System Generated Compare</h3>
            <p className="text-muted-foreground">Compare and analyze system-generated documents</p>
          </div>
          <div className="max-w-md mx-auto">
            <p className="text-sm text-muted-foreground text-center">Comparison tools coming soon...</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
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