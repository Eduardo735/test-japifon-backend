import { Injectable } from '@nestjs/common';

type Pokemon = {
  id: number;
  name: string;
  [key: string]: unknown;
};

@Injectable()
export class GetPokemonByIdService {
  async execute(id: string): Promise<Pokemon> {
    const response = await fetch(
      `${process.env.POKEMON_API_BASE_URL}/pokemon/${id}`,
    );
    const raw = (await response.json()) as unknown;
    const data = raw as Pokemon;
    return data;
  }
}
