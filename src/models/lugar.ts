import { Tag } from "./tag"

export type Lugar = {
    id: number,
    name: string,
    address?: string,
    number?: number,
    cep?: string,
    cityZoneDetails: {
      cityZoneId: number,
      cityZone: string
    },
    hasVisited: boolean,
    avaliation?: number,
    observation?: string,
    tagDetails?: Tag[]
  }