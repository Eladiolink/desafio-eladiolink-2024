import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const jsonAnimais = new URL('../data/animais.json', import.meta.url)
const ANIMAIS = JSON.parse(await readFile(jsonAnimais, 'utf8'))

const jsonRecinto = new URL('../data/recinto.json', import.meta.url)
const RECINTO = JSON.parse(await readFile(jsonRecinto, 'utf8'))

class ObterDados{
  static pegarAnimais(){
    return  ANIMAIS
  }

  static pegarRecintos(){
    return RECINTO
  }
}

export { ObterDados as ObterDados };
