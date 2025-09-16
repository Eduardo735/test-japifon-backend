import { Controller, Get, Param } from '@nestjs/common';
import { GetPokemonByIdService } from '../services/getPokemonById.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly getPokemonByIdService: GetPokemonByIdService) {}

  @Get(':id')
  async findAll(@Param('id') id: string) {
    const pokemon = await this.getPokemonByIdService.execute(id);
    return pokemon;
  }
}
