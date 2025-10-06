import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Home, Users, Calendar, BarChart3, PieChart, MapPin, Target, TrendingUp as Forecast, AlertTriangle, Clock, Star, Building2, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { User } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface AdvancedAnalyticsProps {
  user: User;
}

export function AdvancedAnalytics({ user }: AdvancedAnalyticsProps) {
  const [timeRange, setTimeRange] = useState('last_6_months');

  // Mock analytics data with Albanian cities and data
  const salesData = [
    { month: 'Jan', sales: 2400, listings: 45, revenue: 12000000, avgPrice: 95000000 },
    { month: 'Feb', sales: 1398, listings: 52, revenue: 9800000, avgPrice: 87000000 },
    { month: 'Mar', sales: 9800, listings: 38, revenue: 24500000, avgPrice: 110000000 },
    { month: 'Apr', sales: 3908, listings: 61, revenue: 15600000, avgPrice: 98000000 },
    { month: 'May', sales: 4800, listings: 43, revenue: 19200000, avgPrice: 105000000 },
    { month: 'Jun', sales: 3800, listings: 49, revenue: 18100000, avgPrice: 102000000 }
  ];

  const officePerformance = [
    { office: 'Qendra Tiranë', revenue: 24500000, deals: 24, agents: 12, commission: 735000 },
    { office: 'Durrës', revenue: 18900000, deals: 18, agents: 8, commission: 567000 },
    { office: 'Vlorë', revenue: 12500000, deals: 12, agents: 6, commission: 375000 },
    { office: 'Shkodër', revenue: 9800000, deals: 9, agents: 5, commission: 294000 }
  ];

  const propertyTypes = [
    { name: 'Apartament', value: 45, color: '#0088FE' },
    { name: 'Vilë', value: 25, color: '#00C49F' },
    { name: 'Dyqan', value: 20, color: '#FFBB28' },
    { name: 'Zyrë', value: 10, color: '#FF8042' }
  ];

  const agentPerformance = [
    { name: 'Arben Metaj', deals: 24, revenue: 24000000, satisfaction: 4.8, commission: 720000 },
    { name: 'Mirela Koci', deals: 32, revenue: 32000000, satisfaction: 4.9, commission: 960000 },
    { name: 'Endrit Rama', deals: 18, revenue: 18000000, satisfaction: 4.6, commission: 540000 },
    { name: 'Klara Bega', deals: 21, revenue: 21000000, satisfaction: 4.7, commission: 630000 },
    { name: 'Dritan Hoxha', deals: 15, revenue: 15000000, satisfaction: 4.5, commission: 450000 }
  ];

  const territorySales = [
    { territory: 'Tiranë', Q1: 18000000, Q2: 24500000, Q3: 22000000, Q4: 28000000 },
    { territory: 'Durrës', Q1: 15000000, Q2: 18900000, Q3: 16500000, Q4: 19500000 },
    { territory: 'Vlorë', Q1: 12000000, Q2: 12500000, Q3: 14000000, Q4: 15500000 },
    { territory: 'Shkodër', Q1: 9500000, Q2: 9800000, Q3: 11000000, Q4: 12500000 }
  ];

  // Market Analysis Data
  const marketTrends = [
    { month: 'Jan', avgPrice: 95000000, inventory: 245, absorption: 68 },
    { month: 'Feb', avgPrice: 87000000, inventory: 268, absorption: 72 },
    { month: 'Mar', avgPrice: 110000000, inventory: 189, absorption: 85 },
    { month: 'Apr', avgPrice: 98000000, inventory: 212, absorption: 79 },
    { month: 'May', avgPrice: 105000000, inventory: 198, absorption: 82 },
    { month: 'Jun', avgPrice: 102000000, inventory: 205, absorption: 76 }
  ];

  const priceByLocation = [
    { location: 'Blloku', avgPrice: 180000000, change: '+12%', count: 45 },
    { location: 'Kombinat', avgPrice: 85000000, change: '+8%', count: 78 },
    { location: 'Lapraka', avgPrice: 75000000, change: '+5%', count: 62 },
    { location: '21 Dhjetori', avgPrice: 120000000, change: '+15%', count: 34 },
    { location: 'Astir', avgPrice: 95000000, change: '+7%', count: 56 }
  ];

  // Commission & Financial Data
  const commissionData = [
    { month: 'Jan', totalCommission: 360000, agentCommission: 252000, officeCommission: 108000 },
    { month: 'Feb', totalCommission: 294000, agentCommission: 205800, officeCommission: 88200 },
    { month: 'Mar', totalCommission: 735000, agentCommission: 514500, officeCommission: 220500 },
    { month: 'Apr', totalCommission: 468000, agentCommission: 327600, officeCommission: 140400 },
    { month: 'May', totalCommission: 576000, agentCommission: 403200, officeCommission: 172800 },
    { month: 'Jun', totalCommission: 543000, agentCommission: 380100, officeCommission: 162900 }
  ];

  // Customer Analytics Data
  const clientAnalytics = [
    { month: 'Jan', newClients: 45, repeatClients: 12, satisfaction: 4.2 },
    { month: 'Feb', newClients: 52, repeatClients: 8, satisfaction: 4.3 },
    { month: 'Mar', newClients: 38, repeatClients: 15, satisfaction: 4.5 },
    { month: 'Apr', newClients: 61, repeatClients: 18, satisfaction: 4.4 },
    { month: 'May', newClients: 43, repeatClients: 22, satisfaction: 4.6 },
    { month: 'Jun', newClients: 49, repeatClients: 19, satisfaction: 4.4 }
  ];

  // Performance Goals Data
  const goalTracking = [
    { metric: 'Shitje Mujore', target: 50, actual: 48, percentage: 96 },
    { metric: 'Të Ardhura', target: 20000000, actual: 18100000, percentage: 91 },
    { metric: 'Klientë të Rinj', target: 60, actual: 49, percentage: 82 },
    { metric: 'Ditë në Treg', target: 25, actual: 28, percentage: 89 }
  ];

  // Inventory Analysis
  const inventoryData = [
    { priceRange: '< 50M ALL', active: 45, sold: 32, daysOnMarket: 18 },
    { priceRange: '50-100M ALL', active: 78, sold: 65, daysOnMarket: 25 },
    { priceRange: '100-150M ALL', active: 34, sold: 28, daysOnMarket: 32 },
    { priceRange: '150-200M ALL', active: 12, sold: 8, daysOnMarket: 45 },
    { priceRange: '> 200M ALL', active: 8, sold: 3, daysOnMarket: 67 }
  ];

  const kpiData = [
    {
      title: 'Të Ardhura Totale',
      value: formatCurrency(82000000),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      description: 'vs tremuji i kaluar'
    },
    {
      title: 'Prona të Shitura',
      value: '245',
      change: '+8.3%',
      trend: 'up',
      icon: Home,
      description: 'këtë tremujor'
    },
    {
      title: 'Agjentë Aktivë',
      value: '64',
      change: '+5.2%',
      trend: 'up',
      icon: Users,
      description: 'vs muaji i kaluar'
    },
    {
      title: 'Ditë mesatare në treg',
      value: '28',
      change: '-15.2%',
      trend: 'down',
      description: 'përmirësim'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1>Analitika të Avancuara</h1>
          <p className="text-muted-foreground">
            Kuptim i plotë dhe metrika performancës për biznesin tuaj të pasurive të patundshme
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[200px]">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last_7_days">7 Ditët e Fundit</SelectItem>
            <SelectItem value="last_30_days">30 Ditët e Fundit</SelectItem>
            <SelectItem value="last_3_months">3 Muajt e Fundit</SelectItem>
            <SelectItem value="last_6_months">6 Muajt e Fundit</SelectItem>
            <SelectItem value="last_year">Vitin e Kaluar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-semibold mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                    )}
                    <span className="text-sm text-green-500">{kpi.change}</span>
                    <span className="text-sm text-muted-foreground ml-1">{kpi.description}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  {kpi.icon && <kpi.icon className="w-6 h-6 text-primary" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-9 h-auto flex-wrap">
          <TabsTrigger value="overview">Përmbledhje</TabsTrigger>
          <TabsTrigger value="sales">Shitjet</TabsTrigger>
          <TabsTrigger value="market">Tregu</TabsTrigger>
          <TabsTrigger value="financial">Financiare</TabsTrigger>
          <TabsTrigger value="customers">Klientët</TabsTrigger>
          <TabsTrigger value="inventory">Inventari</TabsTrigger>
          <TabsTrigger value="offices">Zyrat</TabsTrigger>
          <TabsTrigger value="agents">Agjentët</TabsTrigger>
          <TabsTrigger value="goals">Objektivat</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Tendenca e Shitjeve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Llojet e Pronave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={propertyTypes}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {propertyTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Krahasimi i Performancës së Zyrave</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={officePerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="office" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(Number(value)) : value,
                    name
                  ]} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" name="Revenue" />
                  <Bar dataKey="deals" fill="#82ca9d" name="Deals" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Vëllimi Mujor i Shitjeve</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'revenue' ? formatCurrency(Number(value)) : value,
                      name === 'revenue' ? 'Të Ardhura' : 'Shitje'
                    ]} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} name="Të Ardhura" />
                    <Line type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} name="Shitje" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Listimi vs Shitjet</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="listings" fill="#8884d8" name="Listime të Reja" />
                    <Bar dataKey="sales" fill="#82ca9d" name="Shitje" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Çmimi Mesatar dhe Trendi</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value, name) => [
                    name === 'avgPrice' ? formatCurrency(Number(value)) : value,
                    name === 'avgPrice' ? 'Çmimi Mesatar' : 'Shitje'
                  ]} />
                  <Legend />
                  <Bar yAxisId="right" dataKey="sales" fill="#82ca9d" name="Shitje" />
                  <Line yAxisId="left" type="monotone" dataKey="avgPrice" stroke="#8884d8" strokeWidth={2} name="Çmimi Mesatar" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offices" className="space-y-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Metrikat e Performancës së Zyrave
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Zyra</th>
                        <th className="text-left p-4">Të Ardhura</th>
                        <th className="text-left p-4">Marrëveshje</th>
                        <th className="text-left p-4">Agjentë</th>
                        <th className="text-left p-4">Komisioni</th>
                        <th className="text-left p-4">Të Ardhura/Agjent</th>
                        <th className="text-left p-4">Statusi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {officePerformance.map((office, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 font-medium">{office.office}</td>
                          <td className="p-4">{formatCurrency(office.revenue)}</td>
                          <td className="p-4">{office.deals}</td>
                          <td className="p-4">{office.agents}</td>
                          <td className="p-4">{formatCurrency(office.commission)}</td>
                          <td className="p-4">{formatCurrency(office.revenue / office.agents)}</td>
                          <td className="p-4">
                            <Badge variant={index < 2 ? 'default' : 'secondary'}>
                              {index < 2 ? 'Mbi Objektiv' : 'Në Rrugë'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Të Ardhurat sipas Zyrave</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={officePerformance}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                        nameKey="office"
                        label={({ office, percent }) => `${office} ${(percent * 100).toFixed(0)}%`}
                      >
                        {officePerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Efikasiteti i Zyrave</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {officePerformance.map((office, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{office.office}</span>
                          <span className="text-sm text-muted-foreground">{office.deals} marrëveshje</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Komisioni:</span>
                            <p className="font-semibold">{formatCurrency(office.commission)}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Efikasiteti:</span>
                            <p className="font-semibold">{Math.round(office.deals / office.agents * 10) / 10} marrëveshje/agjent</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Agjentët me Performancë të Lartë
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentPerformance.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.deals} marrëveshje të përfunduara</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(agent.revenue)}</p>
                      <p className="text-sm text-muted-foreground">★ {agent.satisfaction}/5.0</p>
                      <p className="text-xs text-blue-600">Komisioni: {formatCurrency(agent.commission)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performanca e Agjentëve - Të Ardhura</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={agentPerformance} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="revenue" fill="#8884d8" name="Të Ardhura" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Numri i Marrëveshjeve</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={agentPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="deals" fill="#82ca9d" name="Marrëveshje" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Analiza e Detajuar e Agjentëve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {agentPerformance.map((agent, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{agent.name}</h4>
                      <Badge variant={index < 2 ? 'default' : 'secondary'}>
                        #{index + 1}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Marrëveshje:</span>
                        <span className="font-medium">{agent.deals}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Të Ardhura:</span>
                        <span className="font-medium">{formatCurrency(agent.revenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Komisioni:</span>
                        <span className="font-medium">{formatCurrency(agent.commission)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kënaqësia:</span>
                        <span className="font-medium flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          {agent.satisfaction}/5.0
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Analysis Tab */}
        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trendet e Tregut
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={marketTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      name === 'avgPrice' ? formatCurrency(Number(value)) : value,
                      name === 'avgPrice' ? 'Çmimi Mesatar' : 
                      name === 'inventory' ? 'Inventari' : 'Përthithja %'
                    ]} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="avgPrice" stroke="#8884d8" name="Çmimi Mesatar" />
                    <Bar yAxisId="right" dataKey="inventory" fill="#82ca9d" name="Inventari" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Çmimet sipas Lokacionit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {priceByLocation.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{location.location}</p>
                        <p className="text-sm text-muted-foreground">{location.count} prona</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(location.avgPrice)}</p>
                        <p className={`text-sm ${location.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {location.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Financial Reports Tab */}
        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="w-5 h-5 mr-2" />
                  Analiza e Komisioneve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={commissionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Area type="monotone" dataKey="totalCommission" stackId="1" stroke="#8884d8" fill="#8884d8" name="Komisioni Total" />
                    <Area type="monotone" dataKey="agentCommission" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Komisioni Agjentit" />
                    <Area type="monotone" dataKey="officeCommission" stackId="3" stroke="#ffc658" fill="#ffc658" name="Komisioni Zyrës" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performanca Financiare</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Komisioni Total</p>
                      <p className="text-2xl font-semibold">{formatCurrency(2976000)}</p>
                      <p className="text-sm text-green-500">+18.5% nga muaji i kaluar</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Fitimi i Zyrës</p>
                      <p className="text-2xl font-semibold">{formatCurrency(892800)}</p>
                      <p className="text-sm text-green-500">+15.2% nga muaji i kaluar</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium mb-2">Shpërndarja e Komisionit</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Agjentët (70%)</span>
                        <span>{formatCurrency(2083200)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Zyra (30%)</span>
                        <span>{formatCurrency(892800)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Customer Analytics Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Analiza e Klientëve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={clientAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="newClients" fill="#8884d8" name="Klientë të Rinj" />
                    <Bar dataKey="repeatClients" fill="#82ca9d" name="Klientë të Përsëritur" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Kënaqësia e Klientëve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={clientAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[4, 5]} />
                    <Tooltip formatter={(value) => [`${value}/5.0`, 'Kënaqësia']} />
                    <Line type="monotone" dataKey="satisfaction" stroke="#8884d8" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Metrikat e Klientëve</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Klientë Totalë</p>
                  <p className="text-2xl font-semibold">289</p>
                  <p className="text-sm text-green-500">+12.4%</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Klientë Aktivë</p>
                  <p className="text-2xl font-semibold">94</p>
                  <p className="text-sm text-green-500">+8.7%</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Përqindja e Përsëritjes</p>
                  <p className="text-2xl font-semibold">34%</p>
                  <p className="text-sm text-green-500">+5.2%</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Kohëzgjatja Mesatare</p>
                  <p className="text-2xl font-semibold">45 ditë</p>
                  <p className="text-sm text-red-500">+3 ditë</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Inventory Analysis Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Analiza e Inventarit sipas Çmimit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.priceRange}</p>
                      <p className="text-sm text-muted-foreground">{item.daysOnMarket} ditë mesatare në treg</p>
                    </div>
                    <div className="flex space-x-8 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Aktive</p>
                        <p className="font-semibold">{item.active}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Shitur</p>
                        <p className="font-semibold">{item.sold}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Shkalla Shitjeve</p>
                        <p className="font-semibold">{Math.round((item.sold / (item.active + item.sold)) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventari Aktiv</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={inventoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="priceRange" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="active" fill="#8884d8" name="Prona Aktive" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ditët në Treg</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={inventoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="priceRange" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} ditë`, 'Ditë në Treg']} />
                    <Line type="monotone" dataKey="daysOnMarket" stroke="#ff7300" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Goals & Performance Tab */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Ndjekja e Objektivave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goalTracking.map((goal, index) => (
                  <div key={index} className="p-6 border rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">{goal.metric}</h4>
                      <Badge variant={goal.percentage >= 95 ? 'default' : goal.percentage >= 80 ? 'secondary' : 'destructive'}>
                        {goal.percentage}%
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Objektivi:</span>
                        <span>{goal.metric.includes('Të Ardhura') ? formatCurrency(goal.target) : goal.target}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Aktuale:</span>
                        <span>{goal.metric.includes('Të Ardhura') ? formatCurrency(goal.actual) : goal.actual}</span>
                      </div>
                      <Progress value={goal.percentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Parashikimi i Performancës</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Forecast className="w-5 h-5 text-blue-500 mr-2" />
                      <span className="font-medium">Parashikimi për Korrik</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Bazuar në trendet aktuale</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Shitje të pritura:</span>
                        <p className="font-semibold">52 prona</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Të ardhura të pritura:</span>
                        <p className="font-semibold">{formatCurrency(19500000)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                      <span className="font-medium">Rekomandime</span>
                    </div>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Rritni fokusimin në segmentin 50-100M ALL</li>
                      <li>• Përmirësoni strategjinë e marketingut për Shkodër</li>
                      <li>• Trainoni agjentët për shitjen e pronave luksore</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Krahasimi Mujor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span>Qershor vs Maj</span>
                    <span className="text-green-500">+8.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span>Qershor vs Qershor i kaluar</span>
                    <span className="text-green-500">+24.7%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span>Mesatarja 6-mujore</span>
                    <span className="text-blue-500">{formatCurrency(16800000)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                    <span>Objektivi vjetor (50%)</span>
                    <span className="text-green-500">Në rrugë të mbarë</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}