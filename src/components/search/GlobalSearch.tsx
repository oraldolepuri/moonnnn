import { useState, useEffect } from 'react';
import { Search, Filter, Home, Users, FileText, MapPin, Calendar, DollarSign, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { User } from '../../types';

interface SearchResult {
  id: string;
  type: 'property' | 'client' | 'agent' | 'deal';
  title: string;
  subtitle: string;
  description: string;
  metadata: Record<string, any>;
  relevanceScore: number;
}

interface GlobalSearchProps {
  user: User;
}

export function GlobalSearch({ user }: GlobalSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevance');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock search data
  const mockSearchData: SearchResult[] = [
    {
      id: '1',
      type: 'property',
      title: '123 Luxury Avenue',
      subtitle: 'Single Family Home',
      description: 'Beautiful 4-bedroom home in downtown area with modern amenities',
      metadata: {
        price: 850000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2400,
        location: 'Downtown',
        status: 'active'
      },
      relevanceScore: 95
    },
    {
      id: '2',
      type: 'client',
      title: 'John Smith',
      subtitle: 'Buyer',
      description: 'Looking for family home in suburban area, budget $400-600k',
      metadata: {
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        status: 'active',
        agent: 'Sarah Johnson'
      },
      relevanceScore: 88
    },
    {
      id: '3',
      type: 'agent',
      title: 'Sarah Johnson',
      subtitle: 'Senior Agent',
      description: 'Top performing agent specializing in luxury properties',
      metadata: {
        office: 'Downtown Main Office',
        dealsCompleted: 32,
        totalSales: 3200000,
        rating: 4.9
      },
      relevanceScore: 92
    },
    {
      id: '4',
      type: 'deal',
      title: 'Deal #2024-001',
      subtitle: '456 Oak Street',
      description: 'Sale of 3-bedroom condo to first-time buyers',
      metadata: {
        amount: 420000,
        status: 'in_progress',
        client: 'Michael Chen',
        agent: 'Emily Rodriguez',
        expectedClose: '2024-02-15'
      },
      relevanceScore: 78
    },
    {
      id: '5',
      type: 'property',
      title: '789 Garden Lane',
      subtitle: 'Townhouse',
      description: 'Modern 3-bedroom townhouse with private garden',
      metadata: {
        price: 650000,
        bedrooms: 3,
        bathrooms: 2.5,
        sqft: 1800,
        location: 'Westside',
        status: 'pending'
      },
      relevanceScore: 85
    }
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      const timer = setTimeout(() => {
        const filtered = mockSearchData.filter(item => {
          const matchesQuery = 
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
          
          const matchesCategory = categoryFilter === 'all' || item.type === categoryFilter;
          
          return matchesQuery && matchesCategory;
        });

        // Sort results
        const sorted = [...filtered].sort((a, b) => {
          switch (sortBy) {
            case 'relevance':
              return b.relevanceScore - a.relevanceScore;
            case 'date':
              return new Date().getTime() - new Date().getTime(); // Mock sorting
            case 'alphabetical':
              return a.title.localeCompare(b.title);
            default:
              return 0;
          }
        });

        setSearchResults(sorted);
        setIsSearching(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, categoryFilter, sortBy]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'property': return Home;
      case 'client': return Users;
      case 'agent': return Users;
      case 'deal': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'property': return 'default';
      case 'client': return 'secondary';
      case 'agent': return 'outline';
      case 'deal': return 'destructive';
      default: return 'secondary';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setCategoryFilter('all');
    setSortBy('relevance');
  };

  const resultsByType = searchResults.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  return (
    <div className="space-y-6">
      <div>
        <h1>Global Search</h1>
        <p className="text-muted-foreground">
          Search across all properties, clients, agents, and deals with advanced filtering
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="Search properties, clients, agents, deals, or anything else..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 text-lg h-12"
        />
      </div>

      {/* Search Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[150px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="property">Properties</SelectItem>
            <SelectItem value="client">Clients</SelectItem>
            <SelectItem value="agent">Agents</SelectItem>
            <SelectItem value="deal">Deals</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => addFilter('high-value')}>
            High Value
          </Button>
          <Button variant="outline" size="sm" onClick={() => addFilter('recent')}>
            Recent
          </Button>
          <Button variant="outline" size="sm" onClick={() => addFilter('urgent')}>
            Urgent
          </Button>
        </div>

        {(activeFilters.length > 0 || categoryFilter !== 'all' || sortBy !== 'relevance') && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => removeFilter(filter)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Search Results */}
      {searchQuery.trim() && (
        <div className="space-y-6">
          {isSearching ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-muted-foreground">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="flex justify-between items-center">
                <p className="text-muted-foreground">
                  Found {searchResults.length} results for "{searchQuery}"
                </p>
              </div>

              <Tabs defaultValue="all" className="w-full">
                <TabsList>
                  <TabsTrigger value="all">All ({searchResults.length})</TabsTrigger>
                  {Object.entries(resultsByType).map(([type, results]) => (
                    <TabsTrigger key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}s ({results.length})
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="space-y-4">
                    {searchResults.map((result) => {
                      const IconComponent = getTypeIcon(result.type);
                      return (
                        <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                <IconComponent className="w-6 h-6" />
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <h3 className="font-semibold">{result.title}</h3>
                                    <Badge variant={getTypeColor(result.type)}>
                                      {result.type}
                                    </Badge>
                                  </div>
                                  <span className="text-sm text-muted-foreground">
                                    {result.relevanceScore}% match
                                  </span>
                                </div>
                                <p className="text-muted-foreground">{result.subtitle}</p>
                                <p className="text-sm">{result.description}</p>
                                
                                {/* Type-specific metadata */}
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                  {result.type === 'property' && (
                                    <>
                                      <span className="flex items-center">
                                        <DollarSign className="w-4 h-4 mr-1" />
                                        {formatCurrency(result.metadata.price)}
                                      </span>
                                      <span>{result.metadata.bedrooms} bed, {result.metadata.bathrooms} bath</span>
                                      <span className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {result.metadata.location}
                                      </span>
                                    </>
                                  )}
                                  {result.type === 'client' && (
                                    <>
                                      <span>{result.metadata.email}</span>
                                      <span>{result.metadata.phone}</span>
                                      <span>Agent: {result.metadata.agent}</span>
                                    </>
                                  )}
                                  {result.type === 'agent' && (
                                    <>
                                      <span>{result.metadata.office}</span>
                                      <span>{result.metadata.dealsCompleted} deals</span>
                                      <span>★ {result.metadata.rating}/5.0</span>
                                    </>
                                  )}
                                  {result.type === 'deal' && (
                                    <>
                                      <span className="flex items-center">
                                        <DollarSign className="w-4 h-4 mr-1" />
                                        {formatCurrency(result.metadata.amount)}
                                      </span>
                                      <span>Client: {result.metadata.client}</span>
                                      <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Close: {result.metadata.expectedClose}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>

                {Object.entries(resultsByType).map(([type, results]) => (
                  <TabsContent key={type} value={type} className="mt-6">
                    <div className="space-y-4">
                      {results.map((result) => {
                        const IconComponent = getTypeIcon(result.type);
                        return (
                          <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                                  <IconComponent className="w-6 h-6" />
                                </div>
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">{result.title}</h3>
                                    <span className="text-sm text-muted-foreground">
                                      {result.relevanceScore}% match
                                    </span>
                                  </div>
                                  <p className="text-muted-foreground">{result.subtitle}</p>
                                  <p className="text-sm">{result.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </>
          ) : (
            <div className="text-center py-8">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!searchQuery.trim() && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Start searching</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Search across all your properties, clients, agents, and deals. 
            Use filters to narrow down your results.
          </p>
        </div>
      )}
    </div>
  );
}