import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetPokemonByIdService } from '../services/getPokemonById.service';
import { RolesGuard } from 'src/modules/auth/strategies/RoleGuard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';

@Controller('pokemon')
@UseGuards(RolesGuard)
export class PokemonController {
  constructor(private readonly getPokemonByIdService: GetPokemonByIdService) {}

  @Get(':id')
  @Roles('user')
  async findAll(@Param('id') id: string) {
    const pokemon = await this.getPokemonByIdService.execute(id);
    return pokemon;
  }
}
