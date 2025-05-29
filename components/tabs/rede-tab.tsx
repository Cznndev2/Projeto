"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Activity, Edit, Filter, Network, Plus, Router, Search, Server, Trash2, Wifi } from "lucide-react"

// Dados de exemplo
const redeData = [
  {
    id: 1,
    nome: "Switch Principal",
    tipo: "Switch",
    ip: "192.168.1.1",
    local: "Sala de Servidores",
    fabricante: "Cisco",
    modelo: "Catalyst 9300",
    status: "Online",
  },
  {
    id: 2,
    nome: "Roteador Internet",
    tipo: "Roteador",
    ip: "200.150.100.1",
    local: "Sala de Servidores",
    fabricante: "Mikrotik",
    modelo: "CCR1036",
    status: "Online",
  },
  {
    id: 3,
    nome: "AP Recepção",
    tipo: "Access Point",
    ip: "192.168.1.10",
    local: "Recepção",
    fabricante: "Ubiquiti",
    modelo: "UniFi AP Pro",
    status: "Online",
  },
  {
    id: 4,
    nome: "AP Sala de Reuniões",
    tipo: "Access Point",
    ip: "192.168.1.11",
    local: "Sala de Reuniões",
    fabricante: "Ubiquiti",
    modelo: "UniFi AP Pro",
    status: "Offline",
  },
  {
    id: 5,
    nome: "Switch Andar 2",
    tipo: "Switch",
    ip: "192.168.1.2",
    local: "Andar 2",
    fabricante: "HP",
    modelo: "Aruba 2930F",
    status: "Online",
  },
  {
    id: 6,
    nome: "Firewall",
    tipo: "Firewall",
    ip: "192.168.1.254",
    local: "Sala de Servidores",
    fabricante: "Fortinet",
    modelo: "FortiGate 100F",
    status: "Online",
  },
  {
    id: 7,
    nome: "AP Escritório",
    tipo: "Access Point",
    ip: "192.168.1.12",
    local: "Escritório",
    fabricante: "Ubiquiti",
    modelo: "UniFi AP Pro",
    status: "Alerta",
  },
  {
    id: 8,
    nome: "Switch Andar 3",
    tipo: "Switch",
    ip: "192.168.1.3",
    local: "Andar 3",
    fabricante: "HP",
    modelo: "Aruba 2930F",
    status: "Online",
  },
]

export function RedeTab() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")
  const [openDialog, setOpenDialog] = useState(false)

  // Filtrar dados com base na pesquisa e filtro
  const filteredData = redeData.filter((item) => {
    const matchesSearch =
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.local.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "todos" || item.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Função para renderizar o ícone com base no tipo
  const renderIcon = (tipo) => {
    switch (tipo.toLowerCase()) {
      case "switch":
        return <Network className="h-4 w-4" />
      case "roteador":
        return <Router className="h-4 w-4" />
      case "access point":
        return <Wifi className="h-4 w-4" />
      case "firewall":
        return <Server className="h-4 w-4" />
      default:
        return <Network className="h-4 w-4" />
    }
  }

  // Função para renderizar o badge de status
  const renderStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "online":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Online
          </Badge>
        )
      case "offline":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Offline
          </Badge>
        )
      case "alerta":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Alerta
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Gerenciamento de Rede</CardTitle>
          <CardDescription>Gerencie dispositivos de rede, configurações e monitoramento.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nome, IP ou localização..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="alerta">Alerta</SelectItem>
                </SelectContent>
              </Select>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Dispositivo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Dispositivo de Rede</DialogTitle>
                    <DialogDescription>Preencha os detalhes do novo dispositivo de rede.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nome" className="text-right">
                        Nome
                      </Label>
                      <Input id="nome" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="tipo" className="text-right">
                        Tipo
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="switch">Switch</SelectItem>
                          <SelectItem value="roteador">Roteador</SelectItem>
                          <SelectItem value="access-point">Access Point</SelectItem>
                          <SelectItem value="firewall">Firewall</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="ip" className="text-right">
                        Endereço IP
                      </Label>
                      <Input id="ip" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="local" className="text-right">
                        Localização
                      </Label>
                      <Input id="local" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="fabricante" className="text-right">
                        Fabricante
                      </Label>
                      <Input id="fabricante" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="modelo" className="text-right">
                        Modelo
                      </Label>
                      <Input id="modelo" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Salvar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Endereço IP</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Fabricante</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {renderIcon(item.tipo)}
                        {item.nome}
                      </div>
                    </TableCell>
                    <TableCell>{item.tipo}</TableCell>
                    <TableCell>{item.ip}</TableCell>
                    <TableCell>{item.local}</TableCell>
                    <TableCell>{item.fabricante}</TableCell>
                    <TableCell>{renderStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredData.length} de {redeData.length} itens
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Próximo
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Status da Rede</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dispositivos Online</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">85%</span>
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-green-500 w-[85%]" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dispositivos Offline</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">10%</span>
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-red-500 w-[10%]" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dispositivos em Alerta</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">5%</span>
                  <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-amber-500 w-[5%]" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tráfego de Rede</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[120px] w-full">
              <div className="flex h-full items-end gap-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-primary w-full rounded-sm"
                    style={{ height: `${Math.max(15, Math.random() * 100)}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>23:59</span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full justify-between text-xs">
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3 text-primary" />
                <span>Média: 45 Mbps</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3 text-primary" />
                <span>Pico: 120 Mbps</span>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Alertas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-lg border p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <Activity className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">AP Sala de Reuniões Offline</p>
                  <p className="text-xs text-muted-foreground">Há 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border p-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                  <Activity className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">AP Escritório - Sinal Fraco</p>
                  <p className="text-xs text-muted-foreground">Há 45 minutos</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-xs">
              Ver todos os alertas
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
