import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Travels } from './travels';
import { CreateTravelDto } from './creat-travel.dto';
import { UpdateTravelDto } from './update-travel.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  utazasok: Travels[] = [
    {
      id: 1,
      utazasiCel: "Japan ",
      leiras: "Go hiking on Mt. Fuji, visit the Tokyo Imperial Palace, or just relax at a traditional, family owned hot spring resort.",
      kep: "https://upload.wikimedia.org/wikipedia/commons/6/63/Views_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg",
      ar: 199_999,
      kedvezmeny: 10,
    },
    {
      id: 2,
      utazasiCel: "Egypt ",
      leiras: "Where the pharaohs and the oldest gods lived.",
      kep: "https://upload.wikimedia.org/wikipedia/commons/c/c2/01_khafre_north.jpg",
      ar: 155_000,
      kedvezmeny: 0,
    },
    {
      id: 3,
      utazasiCel: "Easter Island ",
      leiras: "There are a few giant head statues I guess...",
      kep: "https://upload.wikimedia.org/wikipedia/commons/4/40/Rano_Raraku_quarry.jpg",
      ar: 250_000,
      kedvezmeny: 50
    }
  ]
  nextID = 4

  @Get('travels')
  utazasokListazasa() {
    return this.utazasok
  }

  @Get('travels/:id')
  utazasIdListazasa(@Param('id') id: string) {
    const idSzam = parseInt(id);
    const utazas = this.utazasok.find(utazas => utazas.id == idSzam);
    if (!utazas) {
      throw new NotFoundException("Nincs ilyen ID-jű utazás")
    }
    return utazas;
  }

  @Post('travels')
  UjUtazasLetrehozasa(@Body() ujUtazas: CreateTravelDto){
    const UjUtazasLetrehozasa: Travels = {
      id: this.nextID,
      ...ujUtazas,
      kedvezmeny:0,
    }
    this.nextID++;
    this.utazasok.push(UjUtazasLetrehozasa);
    return ujUtazas;
  }

  @Patch('travels/:id')
  UtazasModositasa(@Param('id') id: string, @Body() UtazasUpdate: UpdateTravelDto){
    const idSzam = parseInt(id);
    const utazas = this.utazasok.findIndex(utazas => utazas.id == idSzam);
    if (!utazas) {
      throw new NotFoundException("Nincs ilyen ID-jű utazas")
    }
    const eUtazas = this.utazasok[utazas];
    const kUtazas: Travels = {
      ...eUtazas,
      ...UtazasUpdate,
    };
    this.utazasok[utazas] = kUtazas;
    return kUtazas;
  }

  @Delete('travels/:id')
  UtazasTorlese(@Param('id') id: string) {
    const idSzam = parseInt(id);
    const utazas = this.utazasok.findIndex(utazas => utazas.id == idSzam);
    if (!utazas) {
      throw new NotFoundException("Nincs ilyen ID-jű utazas")
    }
    this.utazasok.splice(utazas,1)
  }
}
