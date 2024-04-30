import { IsNotEmpty } from "class-validator";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: "tb_temas"})
export class Tema{


    @PrimaryGeneratedColumn() //Chave Primaria e auto_increment
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @Column({length: 200, nullable: false})
    @ApiProperty()
    descricao: string;


    @ApiProperty()
    @OneToMany(() => Postagem, (Postagem) => Postagem.tema )
    postagem: Postagem[] // Listar Todas as postagens associadas a um tema

}