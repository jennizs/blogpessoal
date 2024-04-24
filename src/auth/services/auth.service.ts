import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "src/usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Injectable()
export class AuthService {

    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcript: Bcrypt
    ){}

    async validateUser(username: string, password: string): Promise<any> {

        const buscaUsuario = await this.usuarioService.findByUsuario(username);
        if(!buscaUsuario)
            throw new HttpException('Usuario nao encontrado!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcript.compararSenhas(buscaUsuario.senha, password)

        if(buscaUsuario && matchPassword) {
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }

        return null
    }

    async login(UsuarioLogin: UsuarioLogin){

        const payload = {
            sub: UsuarioLogin.usuario
        }

        const buscaUsuario = await this.usuarioService.findByUsuario(UsuarioLogin.usuario);

        if(!buscaUsuario)
            throw new HttpException('Usuario nao encontrado', HttpStatus.NOT_FOUND)

        return{
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: buscaUsuario.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,

        }
    }
}