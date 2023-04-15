export type Region = {
    region: string
}

export type Country = {
    name: {
        common: string
        official: string
    },
    flag: string,
    capital: string,
    population: number,
    area: number,
    cioc: string,
    cca2: string,
    id: string,
    languages: {
        [key: string]: string
    },
    borders?: string[]
}
