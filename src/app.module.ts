import { join } from 'path/win32';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationoSchema } from './config/joi.validation';

@Module({
  imports: [
    

    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema:JoiValidationoSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGODB'),
      }),
    }),

    PokemonModule,

    CommonModule,

    SeedModule,

    
  ],
})
export class AppModule {}
