import { IsNotEmpty } from "class-validator";
import { Postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: "tb_temas"})
export class Tema{


    @PrimaryGeneratedColumn() //Chave Primaria e auto_increment
    id: number;

    @IsNotEmpty()
    @Column({length: 200, nullable: false})
    descricao: string;

    @OneToMany(() => Postagem, (Postagem) => Postagem.tema )
    postagem: Postagem[] // Listar Todas as postagens associadas a um tema

}