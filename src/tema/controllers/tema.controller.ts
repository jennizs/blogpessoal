import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseArrayPipe, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { get } from "http";
import { Tema } from "../entities/Tema.entidade";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";


@UseGuards(JwtAuthGuard)
@Controller("/Temas")
export class TemaController {
    constructor(private readonly temaService: TemaService) {  }

    @Get()
    @HttpCode(HttpStatus.OK) // 200
    findAll(): Promise<Tema[]> {
       return this.temaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK) // 200
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tema>{
        return this.temaService.findById(id);
    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK) // 200
    findByDescricao(@Param('descricao') descricao: string): Promise<Tema[]>{
        return this.temaService.findByDescricao(descricao);
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.create(tema);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.update(tema);
    }  

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.temaService.delete(id);
    }
}

