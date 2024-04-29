import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategy/local.estrategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { Bcrypt } from './bcrypt/bcrypt';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions:{
            expiresIn: '1h'
        }
    })
  ],
  providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [Bcrypt],
})
export class AuthModule { }