import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Postagem } from "../entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";

@Injectable()
export class PostagemService {
    constructor(
     @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find();
    }
   
    async findById(id: number): Promise<Postagem> {

        let postagem = await this.postagemRepository.findOne({
            where: {
                id
            }, 
            relations: {
                tema: true,
                usuario: true,
            }
        });
        // checar se a postagem não foi encontrada
        if (!postagem)
            throw new HttpException('Postagem nao encontrada!', HttpStatus.NOT_FOUND);
    
        // retorna a postagem caso ela exista
        return postagem;
    }
    
    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
    
            },
            relations: {
                tema: true,
                usuario: true,
            }
    
    
        })      
    
    }
    
      async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepository.save(postagem);
      }
    
      async update(postagem: Postagem): Promise<Postagem> {
    
        let buscaTema: Postagem = await this.findById(postagem.id);
    
        if (!buscaTema || !postagem.id)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    
        return await this.postagemRepository.save(postagem);
      }
    
    
      async delete(id: number): Promise<DeleteResult> {
     
        let buscaPostagem = await this.findById(id);
    
        if (!buscaPostagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);
    
        return await this.postagemRepository.delete(id);
      }
    
    }
