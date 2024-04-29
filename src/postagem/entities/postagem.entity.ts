import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Tema } from "../../tema/entities/Tema.entidade";
import { Usuario } from "../../usuario/entities/usuario.entity";


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

    @ManyToOne(() => Usuario, (Usuario) => Usuario.postagem, { 
        onDelete: "CASCADE"
    })
    usuario: Usuario; // chave estrangeira



}