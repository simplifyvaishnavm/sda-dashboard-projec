import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Users, TrendingUp, FolderOpen, FilePdf, ShareNetwork, Robot, PaintBrush } from '@phosphor-icons/react'

interface DashboardProps {
  onNavigate?: (page: string) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const navigationTiles = [
    {
      id: 'master-list',
      title: 'Manage',
      description: 'Manage collateral content',
      icon: FolderOpen,
      gradient: 'from-blue-500/20 to-blue-600/20',
      iconColor: 'text-blue-600',
      bgHover: 'hover:bg-blue-50'
    },
    {
      id: 'generate',
      title: 'Generate',
      description: 'Generate PDF documents',
      icon: FilePdf,
      gradient: 'from-purple-500/20 to-purple-600/20',
      iconColor: 'text-purple-600',
      bgHover: 'hover:bg-purple-50'
    },
    {
      id: 'publish',
      title: 'Publish',
      description: 'Publish content to portal',
      icon: ShareNetwork,
      gradient: 'from-green-500/20 to-green-600/20',
      iconColor: 'text-green-600',
      bgHover: 'hover:bg-green-50'
    },
    {
      id: 'ask-benny',
      title: 'Ask Benny',
      description: 'AI assistant help',
      icon: Robot,
      gradient: 'from-orange-500/20 to-orange-600/20',
      iconColor: 'text-orange-600',
      bgHover: 'hover:bg-orange-50'
    },
    {
      id: 'collaborate',
      title: 'Collaborate',
      description: 'Work together',
      icon: Users,
      gradient: 'from-pink-500/20 to-pink-600/20',
      iconColor: 'text-pink-600',
      bgHover: 'hover:bg-pink-50'
    }
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back to SimplifyDocs</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          New Document
        </Button>
      </div>

      {/* Quick Navigation Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {navigationTiles.map((tile) => {
          const IconComponent = tile.icon
          return (
            <Card 
              key={tile.id}
              className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${tile.bgHover} group`}
              onClick={() => onNavigate?.(tile.id)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-br ${tile.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent size={20} className={tile.iconColor} weight="duotone" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{tile.title}</h3>
                <p className="text-xs text-muted-foreground">{tile.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Published</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">+8 this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}