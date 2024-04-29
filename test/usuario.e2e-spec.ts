import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../src/usuario/entities/usuario.entity';
import { Tema } from '../src/tema/entities/Tema.entidade';
import { Postagem } from '../src/postagem/entities/postagem.entity';

describe('Testes dos Modulos usuario e Auth (e2e)', () => {

  let token: any;
  let usuarioId: any;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Usuario, Tema, Postagem],
          synchronize: true,
          dropSchema: true,
        }),
        AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  it("01 - Deve cadastrar um novo usuario", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-'
      })
      .expect(201)

    usuarioId = resposta.body.id;

    console.log(JSON.stringify(resposta.body))

  });

  it("02 - Não deve cadastrar um usuario duplicado", async () => {
     await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: '-'
      })
      .expect(400)


  });

  it("03 - Deve autenticar o usuario (login)", async () => {
    const resposta = await request(app.getHttpServer())
      .post("/usuarios/logar")
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot',
      })
      .expect(200)

    token = resposta.body.token;

    console.log(token)

  })





  //   it("04 - Deve listar todos os usuarios", async () => {
  //     return request(app.getHttpServer())
  //       .get('/usuarios/all')
  //       .set('Authorization', `${token}`)
  //       .send({})
  //       .expect(200);

  //   });

  //   it("05 - Deve atualizar um usuario", async () => {
  //     return request(app.getHttpServer())
  //       .put('/usuarios/atualizar')
  //       .set('Authorization', `${token}`)
  //       .send({
  //         id: usuarioId,
  //         nome: 'geandro',
  //         usuario: 'root@root.com',
  //         senha: 'geandro123',
  //         foto: ' '
  //       })
  //       .expect(400)
  //       .then(resposta => {
  //         expect("Usuario atualizado").toEqual(resposta.body.nome);
  //       })

});
