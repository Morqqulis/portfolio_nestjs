import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import config from 'src/config'
import { UserModule } from 'src/modules/user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [config] }),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				dialect: 'postgres',
				host: configService.get('database.host'),
				port: configService.get('database.port'),
				database: configService.get('database.name'),
				username: configService.get('database.user'),
				password: configService.get('database.password'),
				synchronize: true,
				autoLoadModels: true,
				models: [],
			}),
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
