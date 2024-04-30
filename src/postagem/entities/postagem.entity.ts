import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/Tema.entidade";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity({name: "tb_postagens"})
export class Postagem{


    @ApiProperty()
    @PrimaryGeneratedColumn() //Chave Primaria e auto_increment
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string;

    @ApiProperty()
    @IsNotEmpty() // so funciona em string
    @Column({length: 1000, nullable: false})
    texto: string;

    @ApiProperty()
    @UpdateDateColumn()
    data: Date;

    @ApiProperty()
    @ManyToOne(() => Tema, (Tema) => Tema.postagem, { 
        onDelete: "CASCADE"
    })
    tema: Tema // chave estrangeira

    @ApiProperty()
    @ManyToOne(() => Usuario, (Usuario) => Usuario.postagem, { 
        onDelete: "CASCADE"
    })
    usuario: Usuario; // chave estrangeira



}