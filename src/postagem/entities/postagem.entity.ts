import { IsNotEmpty } from "class-validator";
import { Tema } from "src/tema/entities/Tema.entidade";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: "tb_postagens"})
export class Postagem{


    @PrimaryGeneratedColumn() //Chave Primaria e auto_increment
    id: number;

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string;

    @IsNotEmpty() // so funciona em string
    @Column({length: 1000, nullable: false})
    texto: string;

    @UpdateDateColumn()
    data: Date;

    @ManyToOne(() => Tema, (Tema) => Tema.postagem, { 
        onDelete: "CASCADE"
    })
    tema: Tema // chave estrangeira


}