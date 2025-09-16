import { Module } from '@nestjs/common';
import { PokemonController } from './controllers/pokemon.controller';
import { GetPokemonByIdService } from './services/getPokemonById.service';

@Module({
  controllers: [PokemonController],
  providers: [GetPokemonByIdService],
  exports: [],
})
export class PokemonModule {}
